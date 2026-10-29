import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList({ onLogout }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  function deleteBlog(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/blogs/${id}`)
        .then(() => {
          // Last page number after this blog is removed
          const lastPage = Math.max(
            1,
            Math.ceil((filteredBlogs.length - 1) / blogsPerPage),
          );

          setBlogs((previousBlogs) =>
            previousBlogs.filter((blog) => blog.id !== id),
          );

          // If the current page becomes empty, move to the last page
          setCurrentPage((page) => Math.min(page, lastPage));
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
          alert("Failed to delete blog!");
        });
    }
  }

  const filteredBlogs = blogs
    .filter((blog) => blog.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage,
  );

  return (
    <div className="container py-3">
      {/* Header */}
      <header className="main-header d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <h2 className="brand-title mb-0">
          {JSON.parse(localStorage.getItem("user"))?.name || "My"}'s Blog
        </h2>

        <nav className="header-nav d-flex align-items-center flex-wrap gap-2">
          <Link to="/add-blog" className="header-btn header-add">
            + Add Blog
          </Link>

          <button
            type="button"
            className="header-btn header-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Search and Sorting Toolbar */}
      <div className="blog-toolbar mb-4">
        <div className="search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>

          <input
            type="text"
            className="form-control search-input"
            placeholder="Search blogs by name..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="sort-wrapper">
          <select
            className="form-select sort-select"
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="asc">Name: A to Z</option>
            <option value="desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* Blog Cards */}
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : filteredBlogs.length === 0 ? (
        <p>No matching blogs found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {currentBlogs.map((blog) => (
            <div className="col" key={blog.id}>
              <div className="card blog-card h-100">
                <img
                  src={blog.image}
                  alt={blog.name}
                  className="blog-card-image"
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{blog.name}</h5>

                  <p className="card-text text-secondary">{blog.description}</p>

                  <div className="d-flex gap-2 mt-auto">
                    <Link
                      to={`/edit-blog/${blog.id}`}
                      className="btn btn-warning flex-fill"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger flex-fill"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredBlogs.length > 6 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogList;
