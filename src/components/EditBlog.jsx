import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blogs/${id}`)
      .then((response) => {
        setName(response.data.name);
        setImage(response.data.image);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        alert("Failed to load blog!");
      });
  }, [id]);

  function handleUpdate(event) {
    event.preventDefault();

    const updatedBlog = {
      name: name,
      image: image,
      description: description,
    };

    axios
      .put(`http://localhost:3000/blogs/${id}`, updatedBlog)
      .then(() => {
        alert("Blog Updated Successfully!");
        navigate("/blogs");
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        alert("Failed to update blog!");
      });
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3 auth-page">
      <div className="row w-100 auth-container">
        {/* Current Image Preview */}
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
                <p>Your selected image will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Blog Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4 p-lg-5">
          <div className="w-100" style={{ maxWidth: "420px" }}>
            <h2 className="text-center fw-bold mb-2">
              Update Blog
            </h2>

            <p className="text-center text-secondary mb-4">
              Make changes to your blog.
            </p>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Blog Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg auth-input"
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
                  placeholder="Enter image URL"
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
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg w-100 auth-button"
              >
                Update Blog
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

export default EditBlog;
