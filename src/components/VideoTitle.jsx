import React from "react";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className=" absolute p-4 sm:px-8 md:px-16 lg:px-24 text-white w-full  aspect-16/9 bg-gradient-to-r from-black ">
            <div className="h-full flex flex-col justify-end lg:pb-[25%]">
                <h1 className="text-3xl md:text-6xl font-bold">{title}</h1>
                <p className="py-2 sm:py-4 md:py-6 text-gray-500 text-xs font-light md:text-lg w-2/4 md:w-98">
                    {overview}
                </p>
                <div className="flex gap-2">
                    <button className="bg-white text-sm md:text-lg hover:bg-white/70 text-black px-4 py-1 rounded-sm">
                        ➤ Play
                    </button>
                    <button className="bg-gray-400/50 text-sm md:text-lg  px-4 py-1 rounded-sm">
                        ⓘ More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoTitle;
