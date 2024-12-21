import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Row, Col, Form, InputGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../store/BlogSlice"; // Adjust the import path

import { AiFillHeart, AiOutlineComment, AiOutlineSave , AiOutlineSearch} from "react-icons/ai"; // Icons

const Userboard = () => {
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch blogs on mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Get blogs from Redux store
  const blogsData = useSelector((state) => state.blog.blogs?.data || []);

  const handleExpand = (id) => {
    setExpandedBlogId((prevId) => (prevId === id ? null : id));
  };

  const handleLike = (id) => {
    console.log(`Liked blog ${id}`);
    // Implement like functionality here
  };

  const handleComment = (id) => {
    console.log(`Commenting on blog ${id}`);
    // Implement comment functionality here
  };

  const handleSave = (id) => {
    console.log(`Saved blog ${id}`);
    // Implement save functionality here
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand>MyBlogs</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link active>Blogs</Nav.Link>
          <Nav.Link onClick={() => navigate("/favorites")}>Favorites</Nav.Link>
          <Button variant="outline-light" href="/" className="ms-3">
                Logout
              </Button>        </Nav>
      </Navbar>

      {/* Blogs Section */}
      <Container>
      <Row className="align-items-center mb-4">
          <Col xs={6}>
            <h2>Explore Blogs</h2>
          </Col>
          <Col xs={6} className="text-right">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroup.Text>
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
  {blogsData.length === 0 ? (
    <div className="text-center">No blogs available</div>
  ) : (
    blogsData.map((blog) => (
      <Col key={blog._id} md={8} className="mb-4">
        <Card className="shadow-lg">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    expandedBlogId === blog._id
                      ? blog.content
                      : blog.content.substring(0, 200) + "...",
                }}
              />
              <div
                className="text-primary mt-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleExpand(blog._id)}
              >
                {expandedBlogId === blog._id ? "Show Less" : "Read More"}
              </div>
            </Card.Text>
            <div className="d-flex justify-content-start align-items-center mt-2">
              <AiFillHeart
                style={{
                  color: "red",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => handleLike(blog._id)}
              />
              <AiOutlineComment
                style={{ fontSize: "1.5rem", cursor: "pointer", marginRight: "10px" }}
                onClick={() => handleComment(blog._id)}
              />
              <AiOutlineSave
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
                onClick={() => handleSave(blog._id)}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))
  )}
</Row>

      </Container>
    </>
  );
};

export default Userboard;
