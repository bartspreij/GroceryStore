import Register from './Register';

const RegisterPopUp = () => (
    <div className="dropdown-item">
        <button
            type="button"
            onClick={() => document.getElementById('register').showModal()}
        >
            Register
        </button>
        <dialog id="register" className="modal flex justify-center">
            <div className="modal-box flex justify-center">
                <Register />
            </div>
        </dialog>
    </div>
);

export default RegisterPopUp;
