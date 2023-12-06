import { useState, useEffect } from 'react';
import Component from '@/app/components/hl7/Component';

const Field = ({ field }) => {
    return (
        <span className="field" id={field.name}>
            {field.value}
        </span>
    );
};

export default Field;


/*
{components.map((component, index) => (
                <Component key={index} component={component} />
            ))}
*/