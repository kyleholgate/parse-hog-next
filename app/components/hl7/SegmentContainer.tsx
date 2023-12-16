import { useState } from 'react';
import Segment from '@/app/components/hl7/Segment';
import SegmentTable from '@/app/components/hl7/SegmentTable';

const SegmentContainer = ({ segment }) => {
    const [isTableVisible, setIsTableVisible] = useState(false);

    const toggleTable = () => {
        setIsTableVisible(!isTableVisible);
    };

    return (
        <div className="segment-container flex flex-col py-1">
            <div className="flex flex-row">
                <div className='flex-grow'>
                    <Segment segment={segment} />
                </div>
                <div className='flex justify-end items-center'>
                    <button className='toggle-button' onClick={toggleTable}>Toggle</button>
                </div>
            </div>
            <div className={`flex transition-all duration-200 ease-in-out ${isTableVisible ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}>
                <div className='basis-10'></div>
                <div className='grow'>
                    <SegmentTable segment={segment} />
                </div>
            </div>
        </div>
    );
}

export default SegmentContainer;
