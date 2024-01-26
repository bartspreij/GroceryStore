interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <p className="text-red-400">{message}</p>;
};

export default ErrorMessage;
