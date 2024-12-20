import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../store/BlogSlice"; // Update as per your Redux logic

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
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
    console.log("Delete blog with ID:", id);
  };

  const handleEdit = (id) => {
    window.location.href = `/admin/edit-blog/${id}`;
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Manage Blogs</h2>
      <Row>
        {blogs.length === 0 ? (
          <div className="text-center">No blogs available</div>
        ) : (
          blogs.map((blog) => (
            <Col key={blog._id} md={4} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.content.substring(0, 100) + "...",
                      }}
                    />
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleEdit(blog._id)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default BlogsList;
