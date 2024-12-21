import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../store/BlogSlice"; // Ensure this path is correct

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
  const { status, loading, error } = useSelector((state) => state.blog); // Redux state for status, loading, and error

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };
    dispatch(createBlog(blogData)); // Dispatch the action to create the blog
    console.log("Blog Data Submitted:", blogData);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h3>Create New Blog</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Title Input */}
                <Form.Group className="mb-3">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Tags Input */}
                <Form.Group className="mb-3">
                  <Form.Label>Tags (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., technology, programming, JavaScript"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </Form.Group>

                {/* Content Editor */}
                <Form.Group className="mb-4">
                  <Form.Label>Content</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Write your blog content here..."
                    style={{ height: "200px", marginBottom: "10px" }} // Adjusted margin-bottom
                  />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    href="/admin"
                    size="lg"
                    style={{ width: "200px", marginTop: "20px" }} // Added margin-top for spacing
                    disabled={loading}
                  >
                    {loading ? "Publishing..." : "Publish Blog"}
                  </Button>
                </div>

                {/* Status or Error message */}
                {status && <p className="text-center mt-3">{status}</p>}
                {error && <p className="text-center mt-3 text-danger">{error}</p>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateBlog;
