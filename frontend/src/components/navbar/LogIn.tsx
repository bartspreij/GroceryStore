/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

const LogIn = (onLogIn) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in with:', email, password);
    };

    return (
        <div className="card shrink-0 w-full max-w-sm bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="email"
                        placeholder="email"
                        name="username"
                        autoComplete="username"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-control mt-6">
                    <button
                        onClick={onLogIn}
                        type="submit"
                        className="btn btn-primary"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
