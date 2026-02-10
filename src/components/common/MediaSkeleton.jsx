import React from 'react';

const MediaSkeleton = () => {
    return (
        <div className="bg-gray-800/80 backdrop-blur rounded-xl overflow-hidden shadow-lg border border-gray-700 animate-pulse">
            <div className="w-full h-80 bg-gray-700"></div>
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4 ml-2"></div>
                </div>
                <div className="space-y-2 pt-2">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

export default MediaSkeleton;
