import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // Load the blog selected by the URL.
  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [id]);

  if (!blog) {
    return <p className="text-center mt-5">Loading blog...</p>;
  }

  function deleteBlog(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    // Delete only after the user confirms.
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/blogs/${id}`)
        .then(() => {
          alert("Blog deleted successfully!");
          window.location.href = "/blogs";
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
          alert("Failed to delete blog!");
        });
    }
  }

  return (
    <div className="container py-4">
      <div className="blog-details-card">
        {/* Blog Image */}
        <div className="blog-details-image">
          <img src={blog.image} alt={blog.name} />
        </div>

        {/* Blog Information */}
        <div className="blog-details-content">
          <h1 className="blog-details-title">{blog.name}</h1>

          <div className="blog-details-description">
            <p>{blog.description}</p>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-3">
        <Link to="/blogs" className="btn btn-outline-primary">
          ← Back to Blogs
        </Link>

        <Link to={`/edit-blog/${blog.id}`} className="btn btn-warning">
          Edit
        </Link>

        <button className="btn btn-danger" onClick={() => deleteBlog(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
