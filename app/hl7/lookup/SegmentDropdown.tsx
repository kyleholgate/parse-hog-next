"use client";

import { useState, useEffect } from 'react';
import { hl7Fields } from "@/models/HL7Definitions";

const SegmentDropdown = () => {
    const [selectedSegment, setSelectedSegment] = useState('');

    useEffect(() => {
        if (selectedSegment) {
            const element = document.getElementById(selectedSegment);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' }); // smooth scroll not working
            }
        }
    }, [selectedSegment]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSegment(e.target.value);
    };

    return (
        <div className="sticky text-end top-0 right-0 pt-2 z-50">
            <select className='p-2 border border-gray-400 rounded' onChange={handleSelectChange} value={selectedSegment}>
                <option value="">Jump to...</option>
                {Object.keys(hl7Fields).map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                ))}
            </select>
        </div >
    );
};

export default SegmentDropdown;
