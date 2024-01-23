import Register from './Register';

const RegisterPopUp = () => (
    <>
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
    </>
);

export default RegisterPopUp;
