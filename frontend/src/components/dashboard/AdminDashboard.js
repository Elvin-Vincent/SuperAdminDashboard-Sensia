import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import UserPermissionsModal from "./UserPermissionsModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "admin@example.com",
      permissions: Array.from({ length: 10 }, (_, i) => ({
        page: i + 1,
        can_view: true,
        can_edit: true,
        can_create: true,
        can_delete: true,
      })),
    },
  ]);

  const [pages] = useState([
    { id: 1, name: "Products List" },
    { id: 2, name: "Marketing List" },
    { id: 3, name: "Order List" },
    { id: 4, name: "Media Plan" },
    { id: 5, name: "Offer Pricing SKUs" },
    { id: 6, name: "Clients" },
    { id: 7, name: "Suppliers" },
    { id: 8, name: "Customer Support" },
    { id: 9, name: "Sales Reports" },
    { id: 10, name: "Finance & Accounting" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditPermissions = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleSavePermissions = async ({ email, permissions }) => {
    try {
      if (selectedUser) {
        setUsers(
          users.map((u) =>
            u.id === selectedUser.id ? { ...u, permissions } : u
          )
        );
      } else {
        const newUser = {
          id: users.length + 1,
          email,
          permissions,
        };
        setUsers([...users, newUser]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-semibold">Admin User Management</h2>
            <Button variant="primary" onClick={handleAddUser}>
              + Add New User
            </Button>
          </div>

          <Table
            bordered
            hover
            responsive
            className="align-middle shadow-sm bg-white rounded"
          >
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Email</th>
                {pages.map((page) => (
                  <th key={page.id}>{page.name}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  {pages.map((page) => {
                    const perm = user.permissions.find(
                      (p) => p.page === page.id
                    );
                    return (
                      <td key={`${user.id}-${page.id}`} className="text-center">
                        {perm
                          ? `${perm.can_view ? "V" : ""}${
                              perm.can_edit ? "E" : ""
                            }${perm.can_create ? "C" : ""}${
                              perm.can_delete ? "D" : ""
                            }`
                          : "-"}
                      </td>
                    );
                  })}
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => handleEditPermissions(user)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <UserPermissionsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
        pages={pages}
        onSave={handleSavePermissions}
      />
    </Container>
  );
};

export default AdminDashboard;

// //if backend works
// //Admindashboard
// import React, { useState } from "react";
// import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
// import UserPermissionsModal from "./UserPermissionsModal";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       email: "admin@example.com",
//       permissions: Array.from({ length: 10 }, (_, i) => ({
//         page: i + 1,
//         can_view: true,
//         can_edit: true,
//         can_create: true,
//         can_delete: true,
//       })),
//     },
//   ]);

//   const [pages] = useState([
//     { id: 1, name: "Products List" },
//     { id: 2, name: "Marketing List" },
//     { id: 3, name: "Order List" },
//     { id: 4, name: "Media Plan" },
//     { id: 5, name: "Offer pricing SKUs" },
//     { id: 6, name: "Clients" },
//     { id: 7, name: "Suppliers" },
//     { id: 8, name: "Customer Support" },
//     { id: 9, name: "Sales Reports" },
//     { id: 10, name: "Finance & Accounting" },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const handleEditPermissions = (user) => {
//     setSelectedUser(user);
//     setShowModal(true);
//   };

//   const handleAddUser = () => {
//     setSelectedUser(null);
//     setShowModal(true);
//   };

//   const handleSavePermissions = ({ email, permissions }) => {
//     if (selectedUser) {
//       setUsers(
//         users.map((u) => (u.id === selectedUser.id ? { ...u, permissions } : u))
//       );
//     } else {
//       const newUser = {
//         id: users.length + 1,
//         email,
//         permissions,
//       };
//       setUsers([...users, newUser]);
//     }
//     setShowModal(false);
//   };

//   return (
//     <Container fluid className="p-4 bg-light min-vh-100">
//       <Row className="mb-4">
//         <Col>
//           <h2 className="text-primary">User Management Dashboard</h2>
//           <p className="text-muted">
//             Manage access and permissions for each user
//           </p>
//           <Button variant="success" className="mb-3" onClick={handleAddUser}>
//             + Add New User
//           </Button>

//           <div style={{ overflowX: "auto" }}>
//             <Table bordered hover responsive className="bg-white shadow-sm">
//               <thead className="thead-dark">
//                 <tr>
//                   <th>ID</th>
//                   <th>Email</th>
//                   {pages.map((page) => (
//                     <th key={page.id}>{page.name}</th>
//                   ))}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id}>
//                     <td>{user.id}</td>
//                     <td>{user.email}</td>
//                     {pages.map((page) => {
//                       const perm = user.permissions.find(
//                         (p) => p.page === page.id
//                       );
//                       return (
//                         <td key={`${user.id}-${page.id}`}>
//                           {perm ? (
//                             <span style={{ whiteSpace: "nowrap" }}>
//                               {perm.can_view && (
//                                 <span className="badge bg-info text-white mx-1">
//                                   V
//                                 </span>
//                               )}
//                               {perm.can_edit && (
//                                 <span className="badge bg-warning text-dark mx-1">
//                                   E
//                                 </span>
//                               )}
//                               {perm.can_create && (
//                                 <span className="badge bg-success text-white mx-1">
//                                   C
//                                 </span>
//                               )}
//                               {perm.can_delete && (
//                                 <span className="badge bg-danger text-white mx-1">
//                                   D
//                                 </span>
//                               )}
//                             </span>
//                           ) : (
//                             "None"
//                           )}
//                         </td>
//                       );
//                     })}
//                     <td>
//                       <Button
//                         variant="outline-primary"
//                         size="sm"
//                         onClick={() => handleEditPermissions(user)}
//                       >
//                         Edit
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Col>
//       </Row>

//       <UserPermissionsModal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         user={selectedUser}
//         pages={pages}
//         onSave={handleSavePermissions}
//       />
//     </Container>
//   );
// };

// export default AdminDashboard;
