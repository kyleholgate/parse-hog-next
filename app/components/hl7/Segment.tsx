// NextJS Segment component that renders a single HL7 segment, has children Field components

import { Fragment } from 'react';
import Field from '@/app/components/hl7/Field';

const Segment = ({ segment }) => {
    return (
        <div className="segment flex flex-wrap py-1">
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