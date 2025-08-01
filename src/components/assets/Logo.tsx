import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="inline-flex items-center space-x-2">
      <img
        src="/logo_removebg.png"
        alt="Logo Icon"
        className="max-w-50 transition-all"
      />
    </Link>
  );
}

export default Logo