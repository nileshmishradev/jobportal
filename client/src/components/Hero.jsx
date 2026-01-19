import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);
    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value,
        });
        setIsSearched(true);
    };

    return (
        <section className="relative w-full overflow-hidden">
            {/* background image */}
            <img
                src={assets.bgImage}
                alt=""
                className="absolute -z-10 opacity-50"
            />
            <div className="mx-8 sm:mx-16 xl:mx-24 pt-20">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-5xl font-semibold sm:leading-16 text-gray-700">
                        Find Your <span className="text-blue-600">Dream Job</span>
                        <br />
                        Build Your Career Today
                    </h1>

                    <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
                        Explore thousands of job opportunities from top companies. Search by
                        job title and location to find the perfect role that matches your
                        skills and ambition.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="flex items-center justify-between bg-white rounded border text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
                    <div className="flex items-center w-full">
                        <img className="h-4 sm:h-5" src={assets.search_icon} alt="search" />
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            className="max-sm:text-xs p-2 rounded outline-none w-full"
                            ref={titleRef}
                        />
                    </div>

                    <div className="flex items-center w-full">
                        <img className="h-4 sm:h-5" src={assets.location_icon} alt="location" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="max-sm:text-xs p-2 rounded outline-none w-full"
                            ref={locationRef}
                        />
                    </div>

                    <button
                        onClick={onSearch}
                        className="bg-blue-600 px-6 py-2 rounded text-white m-1"
                    >
                        Search
                    </button>
                </div>

                {/* Trusted By */}
                <div className="border border-gray-300 shadow-md mx-2 mt-8 p-6 rounded-md bg-white/80 backdrop-blur-sm">
                    <div className="flex justify-center gap-10 lg:gap-24 flex-wrap items-center">
                        <p className="font-medium">Trusted by</p>
                        <img className="h-6" src={assets.microsoft_logo} alt="Microsoft" />
                        <img className="h-6" src={assets.walmart_logo} alt="Walmart" />
                        <img className="h-6" src={assets.accenture_logo} alt="Accenture" />
                        <img className="h-6" src={assets.samsung_logo} alt="Samsung" />
                        <img className="h-6" src={assets.amazon_logo} alt="Amazon" />
                        <img className="h-6" src={assets.adobe_logo} alt="Adobe" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
