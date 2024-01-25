/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, InferType } from 'yup';
import { useState } from 'react';
import { loginUser } from '../../api/user-api';
import WarningMessage from '../alerts/WarningMessage';
import { useAuth } from './AuthProvider';
import SuccesAlert from '../alerts/SuccesAlert';

const loginSchema = object().shape({
    username: string()
        .email('Invalid email format')
        .required('Email is required'),
    password: string()
        .min(4, 'Password must be at least 4 characters long')
        .required('Password is required'),
});

type FormValues = InferType<typeof loginSchema>;

interface LoginProps {
    onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
    });
    const [successLogin, setSuccessLogin] = useState(false);
    const { handleLogin } = useAuth();

    const onSubmit = async (userData: FormValues) => {
        try {
            const response = await loginUser(userData);
            handleLogin(response.data);
            onSuccess();
            setSuccessLogin(true);
        } catch (error) {
            let errorMessage =
                'An unexpected error occurred. Please try again later.';

            if (error.response?.status === 401) {
                errorMessage = 'Invalid email or password.';
            }

            setError('root', { message: errorMessage });
        }

        setTimeout(() => {
            setSuccessLogin(false);
        }, 2000);
    };

    return (
        <div className="card shrink-0 w-full max-w-sm bg-base-100">
            {successLogin && <SuccesAlert message="Logged in successfully!" />}
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        className="input input-bordered"
                        placeholder="Email..."
                        {...register('username')}
                        autoComplete="email"
                    />
                </div>
                {errors.username?.message && (
                    <WarningMessage message={errors.username.message} />
                )}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="password"
                        placeholder="Password..."
                        {...register('password')}
                        autoComplete="current-password"
                    />
                </div>
                {errors.password?.message && (
                    <WarningMessage message={errors.password.message} />
                )}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>
                {errors.root?.message && (
                    <WarningMessage message={errors.root.message} />
                )}
            </form>
        </div>
    );
};

export default Login;
