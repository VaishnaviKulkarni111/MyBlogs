import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, editBlog, deleteBlog } from "../store/BlogSlice";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", tags: "" });
  const [expandedBlogId, setExpandedBlogId] = useState(null); // Track which blog is expanded

  const dispatch = useDispatch();

  // Fetch blogs from the backend
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Get blogs from Redux store
  const blogsData = useSelector((state) => state.blog.blogs?.data || []);
  console.log("BlogsData on page:", blogsData);

  useEffect(() => {
    setBlogs(blogsData);
  }, [blogsData]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormData({ 
      title: blog.title, 
      content: blog.content, 
      tags: blog.tags.join(", ") 
    });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (formData.title && formData.content) {
      const updatedData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      };
      dispatch(editBlog({ id: currentBlog._id, blogData: updatedData }));
      setShowEditModal(false);
    } else {
      alert("Title and Content are required.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpand = (blogId) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
  };

  return (
    <Container className="my-5">
            <Button variant="primary" href="admin"> Back to Dashboard</Button>

      <h2 className="text-center mb-4">Manage Blogs</h2>

      <Row className="justify-content-center">
  {blogs.length === 0 ? (
    <div className="text-center">No blogs available</div>
  ) : (
    blogs.map((blog) => (
      <Col key={blog._id} md={8} className="mb-4"> {/* Use md={12} to make it take full width */}
        <Card className="shadow-lg">
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    expandedBlogId === blog._id
                      ? blog.content
                      : blog.content.substring(0, 100) + "...",
                }}
              />
            </Card.Text>
            <Button variant="link" onClick={() => handleExpand(blog._id)}>
              {expandedBlogId === blog._id ? "Show Less" : "Show More"}
            </Button>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="primary" onClick={() => handleEdit(blog)}>
                Edit
              </Button>
              <Button
                variant="danger"
                className="ms-2"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))
  )}
</Row>


      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                rows={5}
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
              <Form.Text>Separate tags with commas.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BlogsList;
