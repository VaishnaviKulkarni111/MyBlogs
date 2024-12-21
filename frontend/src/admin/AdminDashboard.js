import React from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, ListGroup } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: "#712cf9" }} variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/list">View Blogs</Nav.Link>
              <Nav.Link href="/create">Create New</Nav.Link>
              <Button variant="outline-light" href="/" className="ms-3">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Content */}
      <Container style={{ paddingTop: "100px" }}>
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
                <Card.Title>Liked By Users</Card.Title>
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

        {/* Notifications Section */}
        <Row className="mb-4">
          <Col md={9} className="mx-auto">
          <h2>Recent Notifications</h2>

            <Card className="shadow-sm">
              <ListGroup variant="flush">
                <ListGroup.Item>User1 liked your blog.</ListGroup.Item>
                <ListGroup.Item>User2 commented on "Blog Title".</ListGroup.Item>
                <ListGroup.Item>User3 saved your blog.</ListGroup.Item>
                <ListGroup.Item>User4 liked your blog.</ListGroup.Item>
                <ListGroup.Item>User5 shared your blog.</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        
      </Container>
    </>
  );
};

export default AdminDashboard;
