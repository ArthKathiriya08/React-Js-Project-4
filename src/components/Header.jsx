import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="main-header d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
      <Link
        to={isLoggedIn ? "/blogs" : "/login"}
        className="brand-link text-decoration-none"
      >
        <h2 className="brand-title mb-0">My Blog</h2>
      </Link>

      <nav className="header-nav d-flex align-items-center flex-wrap gap-2">
        {isLoggedIn ? (
          <>
            <Link to="/blogs" className="header-btn header-outline">
              All Blogs
            </Link>

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
          </>
        ) : (
          <>
            <Link to="/login" className="header-btn header-outline">
              Login
            </Link>

            <Link to="/register" className="header-btn header-add">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
