// Import React and Next.js libraries
import React from 'react';

// Define the interface for our props
interface SocialCardProps {
    icon: React.ReactNode;
    headingText: string;
    buttonText: string;
    descriptionText: string;
}

// Update the SocialMediaCard component
const SocialMediaCard: React.FC<SocialCardProps> = ({ icon, headingText, buttonText, descriptionText }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md ">
            <div className="flex justify-center pt-5">
                {/* Render the passed React node here */}
                <span className="text-7xl text-green-600">{icon}</span>
            </div>
            <div className="p-5">
                <h3 className="text-lg text-center font-semibold tracking-tight text-gray-900 ">{headingText}</h3>
                <p className="font-normal text-xs text-gray-700 ">{descriptionText}</p>
                <div className="flex justify-center">
                    <a href="#" className="mt-4 inline-flex items-center py-3 px-6 text-lg font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-400 ">
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
};

// Export the component
export default SocialMediaCard;
