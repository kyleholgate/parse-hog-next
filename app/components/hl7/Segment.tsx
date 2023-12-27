// NextJS Segment component that renders a single HL7 segment, has children Field components

import { Fragment } from 'react';
import Field from '@/app/components/hl7/Field';
import Tooltip from '@/app/components/ui/Tooltip';

const Segment = ({ segment }) => {
    return (
        <div className="segment flex flex-wrap py-1 font-normal">
            <Tooltip content={`${segment.segmentType}: ${segment.description}`}>
                <div>
                    <span className="segment-type field">{segment.segmentType}</span>
                    {/* Render the first field separator only if it's not MSH */}
                    {segment.segmentType !== 'MSH' && <span className='field-separator'>{segment.field_separator}</span>}
                </div>
            </Tooltip>
            {segment.fields.map((field, index) => (
                <Fragment key={field.name}>
                    <Field field={field} />
                    {/* Add field separator except for the last field and for MSH-1 */}
                    {(index < segment.fields.length - 1) && !(segment.segmentType === 'MSH' && index === 0) && <span className='field-separator'>{segment.field_separator}</span>}
                </Fragment>
            ))}
        </div>
    );
};

export default Segment;