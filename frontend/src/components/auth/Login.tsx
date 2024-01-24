/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, InferType } from 'yup';
import { loginUser } from '../../api/user-api';
import { LoginRequest } from '../../domain/LoginRequest';

const loginSchema = object().shape({
    username: string().email().required(),
    password: string().min(4).max(20).required(),
});

type FormValues = InferType<typeof loginSchema>;

const Login = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (userData: LoginRequest) => {
        try {
            const response = await loginUser(userData);
            console.log(response.data);
            throw new Error();
        } catch (error) {
            setError('username', {
                message: 'Wrong password',
            });
        }
    };

    return (
        <div className="card shrink-0 w-full max-w-sm bg-base-100">
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
                <div className="form-control mt-6">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Login"
                    />
                </div>
                {errors.root && (
                    <div className="text-red-500">{errors.root.message}</div>
                )}
            </form>
        </div>
    );
};

export default Login;
