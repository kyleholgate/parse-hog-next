import { useState } from 'react';
import SegmentContainer from '@/components/hl7/SegmentContainer';
import SegmentTable from '@/components/hl7/SegmentTable';
import ExpandIcon from '@/components/ui/ExpandIconButton';
import CopyToClipboard from '@/components/CopyToClipboard';
import CopyIconButton from '@/components/ui/CopyIconButton';
import Tooltip from '@/components/ui/Tooltip';
import { Segment } from '@/models/HL7Message';

type SegmentSectionProps = {
    segment: Segment;
};


const SegmentSection = ({ segment }: SegmentSectionProps) => {
    const [isTableVisible, setIsTableVisible] = useState(false);

    const toggleTable = () => {
        setIsTableVisible(!isTableVisible);
    };

    return (
        <div className="segment-container flex flex-col py-1">
            <div className="flex flex-row">
                <div className='flex-grow'>
                    <SegmentContainer segment={segment} />
                </div>
                <div className='flex justify-end items-center divide-x-2'>
                    <CopyToClipboard textToCopy={segment.raw_value} notificationText='Segment Copied!'>
                        <Tooltip content='Copy Segment to Clipboard'><span><CopyIconButton /></span></Tooltip>
                    </CopyToClipboard>
                    <button className='text-3xl px-4' onClick={toggleTable}>
                        <Tooltip content={isTableVisible ? 'Close Segment Table' : 'View Segment Table'}><span><ExpandIcon isExpanded={isTableVisible} /></span></Tooltip>
                    </button>
                </div>
            </div>
            <div className={`flex transition-all duration-200 ease-in-out ${isTableVisible ? 'opacity-100 my-2' : 'opacity-0 max-h-0'} overflow-hidden`}>
                <div className='basis-10'></div>
                <div className='grow'>
                    <SegmentTable segment={segment} />
                </div>
            </div>
        </div>
    );
}

// export type and component
export type { SegmentSectionProps };
export default SegmentSection;