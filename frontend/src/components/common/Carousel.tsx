const Carousel = ({ children }) => {
    return (
        <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
            {children}
        </div>
    );
};

export default Carousel;
