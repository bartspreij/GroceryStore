import LogIn from './LogIn';

const LogInPopUp = () => (
    <>
        <button
            type="button"
            onClick={() => document.getElementById('login').showModal()}
        >
            Log In
        </button>
        <dialog id="login" className="modal flex justify-center">
            <div className="modal-box flex justify-center">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        type="button"
                    >
                        ✕
                    </button>
                </form>
                <LogIn />
            </div>
        </dialog>
    </>
);

export default LogInPopUp;
