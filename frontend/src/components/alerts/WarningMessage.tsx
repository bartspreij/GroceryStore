interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return <p className="text-red-400">{message}</p>;
};

export default ErrorMessage;
