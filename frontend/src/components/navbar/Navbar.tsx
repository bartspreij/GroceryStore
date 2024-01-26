/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import { fetchCategories } from '../../api/tag-api';
import { Tag } from '../../domain/tag';
import CartDropdown from '../cart/CartDropdown';
import MenuDropdown from './MenuDropdown';
import { useAuth } from '../auth/AuthProvider';
import SuccessMessage from '../common/SuccessMessage';

const Navbar = () => {
    const [categories, setCategories] = useState<Tag[]>([]);
    const { isAdmin, successMessage } = useAuth();

    useEffect(() => {
        const loadCategories = async () => {
            const tags = await fetchCategories();
            setCategories(tags);
        };
        loadCategories();
    }, []);

    return (
        <>
            {successMessage && <SuccessMessage message={successMessage} />}
            <div className="navbar bg-base-100 mb-4 sticky top-0 z-10 border-b-2">
                <div className="flex-1 mr-2">
                    <a href="/" className="btn btn-ghost text-xl">
                        GroceryStore
                    </a>

                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost"
                        >
                            <span>Categories</span>
                        </div>
                        <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                {categories.map((category) => (
                                    <a
                                        href={`/?c=${category.name}`}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <form action="/" method="get">
                            <input
                                type="text"
                                name="q"
                                placeholder="Search"
                                className="input input-bordered w-24 md:w-auto"
                            />
                        </form>
                    </div>
                </div>
                <div className="flex-none">
                    {isAdmin && (
                        <a href="/admin" className="btn btn-ghost text-xl">
                            Admin
                        </a>
                    )}
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

                        <MenuDropdown />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;
