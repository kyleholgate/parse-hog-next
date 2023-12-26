import React, { useState } from 'react';

const CopyToClipboard = ({ children, textToCopy, notificationText = "Copied to clipboard!" }) => {
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [notificationPosition, setNotificationPosition] = useState({ top: 0, left: 0 });

    const copyTextToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setShowCopyNotification(true);
            setTimeout(() => {
                setShowCopyNotification(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const position = {
            top: rect.top + window.scrollY - 50,
            left: rect.left + window.scrollX
        };
        setNotificationPosition(position);
        copyTextToClipboard();
    };

    return (
        <div onClick={handleClick}>
            {children}
            {showCopyNotification && (
                <div className="absolute p-2 bg-black text-white rounded shadow-lg"
                    style={{
                        top: `${notificationPosition.top}px`,
                        left: `${notificationPosition.left}px`,
                        animation: 'floatAway 1s ease-in-out forwards'
                    }}>
                    {notificationText}
                </div>
            )}
        </div>
    );
};

export default CopyToClipboard;
