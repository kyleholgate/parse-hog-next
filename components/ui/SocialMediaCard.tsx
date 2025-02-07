// Import React and Next.js libraries
import React from 'react';

// Define the interface for our props
interface SocialCardProps {
    icon: React.ReactNode;
    headingText: string;
    href: string;
    buttonText: string;
    descriptionText: string;
}

// Update the SocialMediaCard component
const SocialMediaCard: React.FC<SocialCardProps> = ({ icon, headingText, href, buttonText, descriptionText }) => {
    return (
        <>
            <a href={href} target="_blank" className="max-w-sm w-full h-full">
                <div className="max-w-sm h-full bg-white rounded-lg border border-gray-200 shadow-md ">
                    <div className="flex justify-center pt-5">
                        {/* Render the passed React node here */}
                        <span className="text-7xl text-violet-800">{icon}</span>
                    </div>
                    <div className="p-5">
                        <h3 className="text-lg text-center font-semibold tracking-tight text-violet-900 hover:underline">{headingText}</h3>
                        <p className="font-normal text-xs text-center text-gray-700 ">{descriptionText}</p>
                        <div className="flex justify-center mt-auto">
                            <button
                                className="mt-4 inline-flex items-center py-3 px-6 text-lg font-medium text-center text-white bg-violet-800 rounded-lg hover:bg-violet-900 focus:ring-4 focus:ring-violet-400 ">
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
};

// Export the component
export default SocialMediaCard;
