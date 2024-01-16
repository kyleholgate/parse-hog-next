// SegmentTable.jsx
import React from 'react';
import { Segment } from '@/app/models/HL7Message';

type SegmentTableProps = {
    segment: Segment;
};

const SegmentTable = ({ segment }: SegmentTableProps) => {
    return (
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
    );
};

export default SegmentTable;
