import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UserPermissionsModal = ({ show, onHide, user, pages, onSave }) => {
  const [email, setEmail] = useState("");
  const [permissions, setPermissions] = useState([]);

  // Initialize form when modal opens
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setPermissions([...user.permissions]);
    } else {
      setEmail("");
      setPermissions(
        pages.map((page) => ({
          page: page.id,
          can_view: false,
          can_edit: false,
          can_create: false,
          can_delete: false,
        }))
      );
    }
  }, [show, user, pages]);

  const handlePermissionChange = (pageId, permissionType) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.page === pageId ? { ...p, [permissionType]: !p[permissionType] } : p
      )
    );
  };

  const handleSubmit = () => {
    if (!user && !email) {
      alert("Please enter an email address");
      return;
    }
    onSave({ email, permissions });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {user ? "Edit User Permissions" : "Add New User"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!user && (
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
        )}

        <h5>Page Permissions</h5>
        <table className="table">
          <thead>
            <tr>
              <th>Page</th>
              <th>View</th>
              <th>Edit</th>
              <th>Create</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => {
              const pagePerms =
                permissions.find((p) => p.page === page.id) || {};
              return (
                <tr key={page.id}>
                  <td>{page.name}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={pagePerms.can_view || false}
                      onChange={() =>
                        handlePermissionChange(page.id, "can_view")
                      }
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={pagePerms.can_edit || false}
                      onChange={() =>
                        handlePermissionChange(page.id, "can_edit")
                      }
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={pagePerms.can_create || false}
                      onChange={() =>
                        handlePermissionChange(page.id, "can_create")
                      }
                    />
                  </td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={pagePerms.can_delete || false}
                      onChange={() =>
                        handlePermissionChange(page.id, "can_delete")
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserPermissionsModal;
