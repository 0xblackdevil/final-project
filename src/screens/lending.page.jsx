
import LANDING_SVG from "../assets/landing_svg.svg";
import LIST_OF_SERVICES from "../utils/services";
import LIST_OF_FAQS from "../utils/questions";
import SectionTitle from "../components/section_title";
import FeatureCard from "../components/feature_card";
import { useState } from "react";
import FAQ_Card from "../components/faqs_card";


function LendingPage() {

    const [accordionIndex, setAccordionIndex] = useState(null);

    return (
        <div className="">

            <div className="flex justify-center items-center px-10 py-10 pb-0">
                <div >
                    <p className="text-xl">MIT ADT University Managment Portal</p>
                    <h1 className="text-6xl w-1/2 mt-2">Bringing Excellence To Student</h1>
                    <p className="text-gray-400 text-lg mt-8">- Empowering and inspiring all students to excel as life long learners</p>
                </div>
                <div>
                    <img src={LANDING_SVG} alt="" className="h-96 w-96" />
                </div>
            </div>

            <div className="px-20 py-10">
                <SectionTitle title="Features" overlayText="Our Features" description="Make your academy flow more advanced with our platform" />

                <div className="grid grid-cols-3 gaps-5 mt-5">
                    {LIST_OF_SERVICES.map((data, index) => <FeatureCard data={data} key={index} />)}
                </div>
            </div>

            <div className="px-20 py-10">
                <SectionTitle title={"FAQs"} overlayText={"Have Any Question"} description={"Frequently asked questions"} />

                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-1/2">
                        {LIST_OF_FAQS.map((data, index) => <FAQ_Card data={data} isOpen={index === accordionIndex && true} key={index} setIndex={() => setAccordionIndex(index === accordionIndex ? null : index)} />)}
                    </div>
                </div>
            </div>

            <footer className="bg-[#6c35de] text-white">
                <p className="py-5 text-center">© 2022 Academy. Al rights reserved</p>
            </footer>
        </div>
    )
}

export default LendingPage