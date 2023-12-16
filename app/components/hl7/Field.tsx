import { Fragment, useState } from 'react';
import Tooltip from '@/app/components/Tooltip';
import Component from '@/app/components/hl7/Component';

const Field = ({ field }) => {
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [notificationPosition, setNotificationPosition] = useState({ top: 0, left: 0 });


    const copyTextToClipboard = async (text, position) => {
        try {
            await navigator.clipboard.writeText(text);
            setNotificationPosition(position);
            setShowCopyNotification(true);
            setTimeout(() => {
                setShowCopyNotification(false);
            }, 2000); // Hide the notification after 2 seconds
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };


    const handleDoubleClick = (e) => {
        const text = e.currentTarget.textContent || e.currentTarget.innerText;
        const rect = e.currentTarget.getBoundingClientRect();
        const position = {
            top: rect.top + window.scrollY - 50,
            left: rect.left + window.scrollX
        };
        console.log(position);
        copyTextToClipboard(text, position);
    };


    return (
        <Fragment>
            <Tooltip content={`${field.segmentType}-${field.index}: ${field.description}`}>
                <span className="field" id={field.name} data-tippy-content={field.description} onDoubleClick={handleDoubleClick} >
                    {field.components.length > 0 ? (
                        field.components.map((component, index) => (
                            <Fragment key={component.name}>
                                <Component component={component} />
                                {index < field.components.length - 1 && <span className='component-separator'>^</span>}
                            </Fragment>
                        ))
                    ) : (
                        field.value
                    )}
                </span>
            </Tooltip>
            {
                showCopyNotification && (
                    <div className="absolute p-2 bg-black text-white rounded shadow-lg"
                        style={{
                            top: `${notificationPosition.top}px`,
                            left: `${notificationPosition.left}px`,
                            animation: 'floatAway 1s ease-in-out forwards'
                        }}>
                        Copied to clipboard!
                    </div>
                )
            }
        </Fragment>
    );
};

export default Field;