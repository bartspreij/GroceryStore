import CartDropdown from './cart/CartDropdown';

const Navbar = () => (
    <div className="navbar bg-base-100">
        <div className="flex-1 justify-between pr-2">
            <a className="btn btn-ghost text-xl">GroceryStore</a>
            <div className="form-control text-align: right">
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                />
            </div>
        </div>
        <div className="flex-none">
            <CartDropdown />

            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default Navbar;
