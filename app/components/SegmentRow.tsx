import { useState } from 'react';
import Segment from '@/app/components/hl7/Segment';

const SegmentRow = ({ segment }) => {
    const [isTableVisible, setIsTableVisible] = useState(false);

    const toggleTable = () => {
        setIsTableVisible(!isTableVisible);
    };

    return (
        <div className="segment-row flex flex-col py-1">
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
                    <table className='w-full table-auto'>
                        <thead>
                            <tr>
                                <th className='w-2/12 px-4 py-2 border-b-2 border-gray-200 text-start'>Segment-Field</th>
                                <th className='w-4/12 px-4 py-2 border-b-2 border-gray-200 text-start'>Field Description</th>
                                <th className='w-6/12 px-4 py-2 border-b-2 border-gray-200 text-start'>Field Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {segment.fields.map((field) => (
                                <tr key={field.name} className='border-b border-slate-100 even:bg-zinc-100'>
                                    <td className='w-2/12 px-4 py-2'>{segment.segmentType}-{field.index}</td>
                                    <td className='w-4/12 px-4 py-2'>{field.description}</td>
                                    <td className='w-6/12 px-4 py-2'>{field.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SegmentRow;
