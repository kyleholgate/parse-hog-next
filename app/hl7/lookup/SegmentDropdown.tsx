"use client";

import { useState, useEffect } from 'react';
import { hl7Fields } from "@/app/models/HL7Definitions";

const SegmentDropdown = () => {
    const [selectedSegment, setSelectedSegment] = useState('');

    useEffect(() => {
        if (selectedSegment) {
            const element = document.getElementById(selectedSegment);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [selectedSegment]);

    const handleSelectChange = (e) => {
        setSelectedSegment(e.target.value);
    };

    return (
        <div className="sticky top-0 left-0 p-4 z-10">
            <select onChange={handleSelectChange} value={selectedSegment}>
                <option value="">Select a Segment</option>
                {Object.keys(hl7Fields).map(segment => (
                    <option key={segment} value={segment}>{segment}</option>
                ))}
            </select>
        </div >
    );
};

export default SegmentDropdown;
