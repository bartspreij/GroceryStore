import { useState } from 'react';
import Popup from '../common/Popup';
import Login from '../auth/Login';
import Registration from '../auth/Registration';
import Logout from '../auth/Logout';
import { useAuth } from '../auth/AuthProvider';

const MenuDropdown = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const { user } = useAuth();

  const openLoginPopup = () => setIsLoginPopupOpen(true);
  const closeLoginPopup = () => setIsLoginPopupOpen(false);

  const openRegisterPopup = () => setIsRegisterPopupOpen(true);
  const closeRegisterPopup = () => setIsRegisterPopupOpen(false);

  return (
    <>
      <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {!user ? (
          <>
            <li>
              <button type="button" onClick={openLoginPopup}>
                Log In
              </button>
            </li>
            <li>
              <button type="button" onClick={openRegisterPopup}>
                Register
              </button>
            </li>
          </>
        ) : (
          <li>
            <Logout />
          </li>
        )}
      </ul>
      <Popup isOpen={isLoginPopupOpen} onClose={closeLoginPopup}>
        <Login onSuccess={closeLoginPopup} />
      </Popup>
      <Popup isOpen={isRegisterPopupOpen} onClose={closeRegisterPopup}>
        <Registration onSuccess={closeRegisterPopup} />
      </Popup>
    </>
  );
};

export default MenuDropdown;
