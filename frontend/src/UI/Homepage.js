import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

const Homepage = () => {
  const heroStyles = {
    backgroundImage: "url('https://source.unsplash.com/1600x900/?blogging,writing')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
  };

  const titleStyles = {
    fontWeight: "bold",
    fontSize: "3rem",
  };

  const subtitleStyles = {
    fontSize: "1.25rem",
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">MyBlogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/blogs">Blogs</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Button variant="outline-light" href="/auth" className="ms-3">
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div style={heroStyles}>
        <Container className="text-center">
          <h1 style={titleStyles}>Welcome to MyBlogs</h1>
          <p style={subtitleStyles}>
            Share your thoughts, explore diverse perspectives, and connect with the world.
          </p>
          <Button variant="primary" size="lg" href="/auth" className="mt-3">
            Get Started
          </Button>
        </Container>
      </div>

      {/* Highlights Section */}
      <Container className="my-5">
        <Row className="text-center">
          <Col md={4}>
            <h3>Create Blogs</h3>
            <p>Easily share your ideas and stories with the world.</p>
          </Col>
          <Col md={4}>
            <h3>Explore Content</h3>
            <p>Read blogs on various topics and discover new perspectives.</p>
          </Col>
          <Col md={4}>
            <h3>Manage with Ease</h3>
            <p>Admins can manage posts and ensure content quality.</p>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; 2024 MyBlogs. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-end">
              <a href="/privacy" className="text-light me-3">
                Privacy Policy
              </a>
              <a href="/terms" className="text-light">
                Terms of Service
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Homepage;
