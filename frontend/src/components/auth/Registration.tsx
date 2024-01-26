/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, ref, ObjectSchema, InferType } from 'yup';
import { User } from '../../domain/user';
import { postUser } from '../../api/user-api';
import WarningMessage from '../alerts/WarningMessage';

const userSchema: ObjectSchema<User> = object().shape({
    fullName: string().required('Full name is required'),
    username: string().email().required('Email is required'),
    password: string().min(4, 'Must be at least 4 characters long').required(),
    confirmPassword: string()
        .oneOf([ref('password'), null], "Password doesn't match")
        .required('Confirm password is required'),
});

type FormValues = InferType<typeof userSchema>;

interface RegistrationProps {
    onSuccess: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onSuccess }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = async (userData: User) => {
        try {
            const response = await postUser(userData);
            onSuccess();
        } catch (error) {
            let errorMessage =
                'An unexpected error occurred. Please try again later.';

            if (error.response.status === 409) {
                errorMessage =
                    'This email address is already in use. Please use a different email or log in.';
            }

            setError('root', { message: errorMessage });
        }
    };

    return (
        <div className="card shrink-0 w-full max-w-sm bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="text"
                        placeholder="Full name..."
                        {...register('fullName')}
                        autoComplete="name"
                    />
                </div>
                {errors.fullName?.message && (
                    <WarningMessage message={errors.fullName.message} />
                )}
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="password"
                        placeholder="Confirm Password..."
                        {...register('confirmPassword')}
                        autoComplete="current-password"
                    />
                </div>
                {errors.confirmPassword?.message && (
                    <WarningMessage message={errors.confirmPassword.message} />
                )}
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary m-1">
                        Register
                    </button>
                    {errors.root?.message && (
                        <WarningMessage message={errors.root.message} />
                    )}
                </div>
            </form>
        </div>
    );
};

export default Registration;
