// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title, overlayText, description }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center py-10">
            <div className="relative flex justify-center">
                <h1 className="text-8xl text-gray-100 font-extrabold">{overlayText}</h1>
                <h2 className="text-3xl absolute bottom-2 text-black">{title}</h2>
            </div>
            <p className="text-sm mt-3">{description}</p>
        </div>
    )
}

export default SectionTitle