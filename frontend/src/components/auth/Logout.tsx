import { useAuth } from './AuthProvider';

const Logout = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="dropdown-item"
      type="button"
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  );
};

export default Logout;
