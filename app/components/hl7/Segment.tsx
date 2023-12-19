// NextJS Segment component that renders a single HL7 segment, has children Field components

import { Fragment } from 'react';
import Field from '@/app/components/hl7/Field';
import Tooltip from '@/app/components/ui/Tooltip';

const Segment = ({ segment }) => {
    return (
        <div className="segment flex flex-wrap py-1 font-normal">
            <Tooltip content={`${segment.segmentType}: ${segment.description}`}>
                <div><span className="segment-type field">{segment.segmentType}</span><span className='field-separator'>|</span></div>
            </Tooltip>
            {segment.fields.map((field, index) => (
                <Fragment key={field.name}>
                    <Field field={field} />
                    {index < segment.fields.length - 1 && <span className='field-separator'>|</span>}
                </Fragment>
            ))}
        </div>
    );
};

export default Segment;