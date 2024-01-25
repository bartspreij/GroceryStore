import { useState } from 'react';
import Popup from '../Popup';
import Login from '../auth/Login';
import Registration from '../auth/Registration';

const MenuDropdown = () => {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

    const openLoginPopup = () => setIsLoginPopupOpen(true);
    const closeLoginPopup = () => setIsLoginPopupOpen(false);

    const openRegisterPopup = () => setIsRegisterPopupOpen(true);
    const closeRegisterPopup = () => setIsRegisterPopupOpen(false);

    return (
        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
                <button type="button" onClick={openLoginPopup}>
                    Log In
                </button>
                <Popup isOpen={isLoginPopupOpen} onClose={closeLoginPopup}>
                    <Login />
                </Popup>
            </li>
            <li>
                <button type="button" onClick={openRegisterPopup}>
                    Register
                </button>
                <Popup
                    isOpen={isRegisterPopupOpen}
                    onClose={closeRegisterPopup}
                >
                    <Registration />
                </Popup>
            </li>
        </ul>
    );
};

export default MenuDropdown;
