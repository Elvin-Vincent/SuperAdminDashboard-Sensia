import React, { useState } from "react";
import { Card, Button, Form, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const ProductsList = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState([
    { id: 1, text: "Sample comment", userId: 1, createdAt: new Date() },
  ]);
  const [newComment, setNewComment] = useState("");

  // Get permissions for this page (ID 1)
  const permissions = user?.permissions?.find((p) => p.page === 1) || {};

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        text: newComment,
        userId: user.id,
        createdAt: new Date(),
      },
    ]);
    setNewComment("");
  };

  return (
    <div>
      <h2>Products List</h2>

      {/* Comment Section */}
      <div className="mt-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="mb-2">
            <Card.Body>
              <Card.Text>{comment.text}</Card.Text>
              <div className="d-flex justify-content-between">
                <small className="text-muted">
                  User #{comment.userId} •{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
                <div>
                  {permissions.can_edit && (
                    <Button variant="link" size="sm">
                      Edit
                    </Button>
                  )}
                  {permissions.can_delete && (
                    <Button variant="link" size="sm" className="text-danger">
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}

        {permissions.can_create && (
          <div className="mt-3">
            <Form.Control
              as="textarea"
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={handleAddComment}
            >
              Post Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
