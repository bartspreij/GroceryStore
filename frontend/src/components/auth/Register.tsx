/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, ref, ObjectSchema } from 'yup';
import ErrorMessage from '../common/ErrorMessage';
import { User } from '../../domain/user';
import { postUser } from '../../api/user-api';

const Register = () => {
    const userSchema: ObjectSchema<User> = object().shape({
        firstName: string().required('Your First Name is Required!'),
        email: string().email().required('Email must be a valid email!'),
        password: string()
            .min(4)
            .max(20)
            .required('Password must be at least 4 characters!'),
        confirmPassword: string()
            .oneOf([ref('password'), null], "Passwords Don't Match!")
            .required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userSchema),
    });

    const onSubmit = async (userData: User) => {
        console.log(userData);
        try {
            const response = await postUser(userData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
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
                        {...register('firstName')}
                        autoComplete="name"
                    />
                    <ErrorMessage message={errors.firstName?.message} />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        className="input input-bordered"
                        placeholder="Email..."
                        {...register('email')}
                        autoComplete="email"
                    />
                    <ErrorMessage message={errors.email?.message} />
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
                    <ErrorMessage message={errors.password?.message} />
                </div>
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
                    <ErrorMessage message={errors.confirmPassword?.message} />
                </div>
                <div className="form-control mt-6">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Register"
                    />
                </div>
            </form>
        </div>
    );
};

export default Register;
