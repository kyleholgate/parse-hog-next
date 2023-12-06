import { useState, useEffect } from 'react';
import HL7Message from '@/app/models/HL7Message';
import Component from '@/app/components/hl7/Component';

const Field = ({ field, field_id }) => {
    return (
        <span className="field" id={field_id}>
            {field.components.map((component, index) => (
                <>
                    <Component key={index} component={component} />
                    {index < field.components.length - 1 && <span className='component-separator'>^</span>}
                </>
            ))}
        </span>
    );
};

export default Field;


/*
{components.map((component, index) => (
                <Component key={index} component={component} />
            ))}
*/