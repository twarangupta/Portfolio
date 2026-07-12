import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="page-wrapper not-found-page">
      <div className="container not-found-inner">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn btn-primary" id="not-found-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
