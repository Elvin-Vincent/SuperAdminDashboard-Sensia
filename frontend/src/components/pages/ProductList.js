import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Form,
  ListGroup,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import CommentHistoryModal from "../components/comments/CommentHistoryModal";

const ProductList = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get("/comments/?page=products");
        setComments(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = async () => {
    try {
      const response = await api.post("/comments/", {
        page: "products",
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    }
  };

  const handleShowHistory = (comment) => {
    setSelectedComment(comment);
    setShowHistoryModal(true);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>Products List</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <div className="mb-4">
        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1">{comment.content}</p>
                    <small className="text-muted">
                      Posted by {comment.user.email} on{" "}
                      {new Date(comment.created_at).toLocaleString()}
                      {comment.updated_at !== comment.created_at && (
                        <span> • Edited</span>
                      )}
                    </small>
                  </div>
                  <div>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleShowHistory(comment)}
                    >
                      History
                    </Button>
                    {(user?.is_superadmin || user?.id === comment.user.id) && (
                      <>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => {
                            const newContent = prompt(
                              "Edit comment",
                              comment.content
                            );
                            if (newContent) {
                              api
                                .patch(`/comments/${comment.id}/`, {
                                  content: newContent,
                                })
                                .then((updated) => {
                                  setComments(
                                    comments.map((c) =>
                                      c.id === comment.id ? updated.data : c
                                    )
                                  );
                                })
                                .catch((err) =>
                                  setError("Failed to update comment")
                                );
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-danger"
                          onClick={() => {
                            if (window.confirm("Delete this comment?")) {
                              api
                                .delete(`/comments/${comment.id}/`)
                                .then(() => {
                                  setComments(
                                    comments.filter((c) => c.id !== comment.id)
                                  );
                                })
                                .catch((err) =>
                                  setError("Failed to delete comment")
                                );
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Add Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={handleAddComment}
        disabled={!newComment.trim()}
      >
        Add Comment
      </Button>

      <CommentHistoryModal
        show={showHistoryModal}
        onHide={() => setShowHistoryModal(false)}
        comment={selectedComment}
      />
    </Container>
  );
};

export default ProductList;
