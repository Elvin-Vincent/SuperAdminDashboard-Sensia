import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import api from "../../sevices.js/api";
import UserPermissionsModal from "./UserPermissionsModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user: currentUser } = useAuth();

  const PAGE_NAMES = [
    "Products List",
    "Marketing List",
    "Order List",
    "Media Plans",
    "Offer Pricing SKUs",
    "Clients",
    "Suppliers",
    "Customer Support",
    "Sales Reports",
    "Finance & Accounting",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/");
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSavePermissions = async (userData) => {
    try {
      let updatedUser;

      if (selectedUser) {
        // Update existing user
        const response = await api.put(
          `/users/${selectedUser.id}/permissions/`,
          userData
        );
        updatedUser = response.data;
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      } else {
        // Create new user
        const response = await api.post("/users/", userData);
        updatedUser = response.data;
        setUsers([...users, updatedUser]);
      }

      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save permissions");
    }
  };

  const renderPermissionBadges = (permissions, pageIndex) => {
    const pagePerms = permissions.find((p) => p.page === pageIndex + 1);
    if (!pagePerms) return <td className="text-center">-</td>;

    return (
      <td className="text-center">
        {pagePerms.can_view && (
          <Badge bg="info" className="me-1">
            V
          </Badge>
        )}
        {pagePerms.can_edit && (
          <Badge bg="warning" className="me-1">
            E
          </Badge>
        )}
        {pagePerms.can_create && (
          <Badge bg="success" className="me-1">
            C
          </Badge>
        )}
        {pagePerms.can_delete && <Badge bg="danger">D</Badge>}
      </td>
    );
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <h2>User Management</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="primary"
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
        >
          Add New User
        </Button>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              {PAGE_NAMES.map((name, index) => (
                <th key={index} className="text-center">
                  {name}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                {PAGE_NAMES.map((_, index) =>
                  renderPermissionBadges(user.permissions, index)
                )}
                <td className="text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    disabled={user.id === currentUser?.id}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <UserPermissionsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
        pageNames={PAGE_NAMES}
        onSave={handleSavePermissions}
      />
    </Container>
  );
};

export default AdminDashboard;
