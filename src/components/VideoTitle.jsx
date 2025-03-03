import React from "react";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="pt-60 px-12">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-1/3">{overview}</p>
            <div className="flex gap-2">
                <button className="bg-gray-400/50 text-black px-4 py-1 rounded-sm">
                    ➤ Play
                </button>
                <button className="bg-gray-400/50  px-4 py-1 rounded-sm">
                    ⓘ More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
