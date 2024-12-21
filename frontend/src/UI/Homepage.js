import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";

const Homepage = () => {
  const heroStyles = {
    backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/039/363/857/non_2x/ai-generated-floral-purple-flower-background-ai-generated-photo.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
    position: "relative",
    marginTop: "56px", 
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(113, 44, 249, 0.2)",
    zIndex: 1,
  };

  const titleStyles = {
    fontWeight: "bold",
    fontSize: "3rem",
    marginBottom: "0.5rem",
    zIndex: 2,
  };

  const subtitleStyles = {
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
    zIndex: 2,
  };

  const highlightCardStyles = {
    background: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <Navbar style={{ backgroundColor: "#712cf9" }} variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">MyBlogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/blogs" style={{ color: "#fff" }}>Blogs</Nav.Link>
              <Nav.Link href="/about" style={{ color: "#fff" }}>About</Nav.Link>
              <Nav.Link href="/contact" style={{ color: "#fff" }}>Contact</Nav.Link>
              <Button
                style={{ backgroundColor: "#fff", color: "#712cf9", border: "none" }}
                href="/auth"
                className="ms-3"
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div style={heroStyles}>
        <div style={overlayStyles}></div>
        <Container className="text-center position-relative">
          <h1 style={titleStyles}>Welcome to MyBlogs</h1>
          <p style={subtitleStyles}>
            Share your thoughts, explore diverse perspectives, and connect with the world.
          </p>
          <Button
            style={{
              backgroundColor: "white",
              color: "#712cf9" ,
              borderColor: "#712cf9",
              fontSize: "1.2rem",
            }}
            size="lg"
            href="/auth"
            className="mt-3"
          >
            Get Started
          </Button>
        </Container>
      </div>

      {/* Highlights Section */}
      <Container className="my-5">
        <Row className="g-4 text-center">
          <Col md={4}>
            <div style={highlightCardStyles}>
              <h4 style={{ color: "#712cf9" }}>Create Blogs</h4>
              <p>Easily share your ideas and stories with the world.</p>
            </div>
          </Col>
          <Col md={4}>
            <div style={highlightCardStyles}>
              <h4 style={{ color: "#712cf9" }}>Explore Content</h4>
              <p>Read blogs on various topics and discover new perspectives.</p>
            </div>
          </Col>
          <Col md={4}>
            <div style={highlightCardStyles}>
              <h4 style={{ color: "#712cf9" }}>Manage with Ease</h4>
              <p>Admins can manage posts and ensure content quality.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: "#712cf9", color: "#fff" }}>
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; 2024 MyBlogs. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-end">
              <a href="/privacy" style={{ color: "#fff" }} className="me-3">
                Privacy Policy
              </a>
              <a href="/terms" style={{ color: "#fff" }}>
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
