// NextJS Segment component that renders a single HL7 segment, has children Field components

import { useState, useEffect } from 'react';
import HL7Message from '@/app/models/HL7Message';
import Field from '@/app/components/hl7/Field';

const Segment = ({ segment }) => {
    return (
        <div className="segment">
            <span className="segmentType">{segment.segmentType}</span>
            {segment.fields.map((field, index) => (
                <>
                    <Field key={index} field={field} field_id={`${segment.segmentType}-${index}`}
                    />
                    {index < segment.fields.length - 1 && <span className='field-separator'>|</span>}
                </>
            ))}
        </div>
    );
};

export default Segment;