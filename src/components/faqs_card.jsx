import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
const FAQ_Card = ({ data, isOpen, setIndex }) => {
    return (
        <div className="py-5 px-3 border-b border-gray-200">
            <div className="cursor-pointer flex justify-between items-center" onClick={() => setIndex()}>
                <h1 className="text-xl">{data.q}</h1>
                <FontAwesomeIcon icon={isOpen ? faArrowDown : faArrowRight} />
            </div>
            <p className={isOpen ? "block pt-2" : "hidden"}>{data.a}</p>
        </div>
    )

}

export default FAQ_Card;