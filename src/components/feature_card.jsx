/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeatureCard = ({ data }) => {
    return <div className="flex justify-center">
        <div className="border-l-4 border-black px-5">

            <div className="h-10 w-10 rounded-full bg-[#6c35de] text-white flex justify-center items-center">
                <FontAwesomeIcon icon={data.icon} />
            </div>

            <h1 className="text-xl font-bold">{data.text}</h1>
            <p className="mt-2">{data.desc}</p>
        </div>
    </div>
}
export default FeatureCard;