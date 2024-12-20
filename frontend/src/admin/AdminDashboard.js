import React from 'react';
import { Container, Row, Col, Card, Button, Table, Navbar, Nav } from 'react-bootstrap';

const AdminDashboard = () => {
  const blogs = [
    { id: 1, title: "Blog Post 1", date: "2024-12-15", status: "Published" },
    { id: 2, title: "Blog Post 2", date: "2024-12-10", status: "Draft" },
    { id: 3, title: "Blog Post 3", date: "2024-12-05", status: "Published" },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" href="/" className="ms-3">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Content */}
      <Container className="my-5">
        {/* Dashboard Overview */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Blogs</Card.Title>
                <Card.Text className="display-4">12</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Published Blogs</Card.Title>
                <Card.Text className="display-4">8</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Draft Blogs</Card.Title>
                <Card.Text className="display-4">4</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Create Blog Section */}
        <Row className="mb-4">
          <Col className="text-center">
            <Button variant="primary" size="lg" href="/create">
              Create New Blog
            </Button>
          </Col>
        </Row>

        {/* Blog List */}
        <Row>
          <Col>
            <h3>Your Blogs</h3>
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>{blog.id}</td>
                    <td>{blog.title}</td>
                    <td>{blog.date}</td>
                    <td>{blog.status}</td>
                    <td>
                      <Button variant="success" size="sm" href={`/edit-blog/${blog.id}`}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
