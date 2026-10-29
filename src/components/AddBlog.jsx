import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const newBlog = {
      name: name,
      image: image,
      description: description,
    };

    axios
      .post("http://localhost:3000/blogs", newBlog)
      .then(() => {
        alert("Blog Added Successfully!");
        navigate("/blogs");
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        alert("Failed to add blog!");
      });
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3 auth-page">
      <div className="row w-100 auth-container">
        {/* Image Preview Section */}
        <div className="col-md-6 p-0">
          <div className="blog-auth-image h-100">
            {image ? (
              <img
                src={image}
                alt="Blog Preview"
                className="blog-form-preview"
              />
            ) : (
              <div className="blog-image-placeholder">
                <h3>Blog Image Preview</h3>
                <p>Enter an image URL to preview it here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Blog Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
          <div className="w-100" style={{ maxWidth: "420px" }}>
            <h2 className="text-center fw-bold mb-2">
              Create New Blog
            </h2>

            <p className="text-center text-secondary mb-4">
              Share your story with the world.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Blog Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg auth-input"
                  placeholder="Enter blog name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  className="form-control form-control-lg auth-input"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control auth-input"
                  rows="4"
                  placeholder="Write your blog description..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg w-100 auth-button"
              >
                Add Blog
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={() => navigate("/blogs")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
