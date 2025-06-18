import React, { useState, useEffect } from "react";
import { Modal, ListGroup, Spinner } from "react-bootstrap";
import api from "../../services/api";

const CommentHistoryModal = ({ show, onHide, comment }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && comment) {
      setLoading(true);
      api
        .get(`/comments/${comment.id}/history/`)
        .then((response) => {
          setHistory(response.data);
        })
        .finally(() => setLoading(false));
    }
  }, [show, comment]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Comment History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <ListGroup variant="flush">
            {history.map((item) => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{item.action.toUpperCase()}</strong> by{" "}
                    {item.user.email}
                  </div>
                  <small className="text-muted">
                    {new Date(item.changed_at).toLocaleString()}
                  </small>
                </div>
                <div className="mt-2">{item.content}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentHistoryModal;
