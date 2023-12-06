import { useState, useEffect } from 'react';
import HL7Message from '@/app/models/HL7Message';
import Subcomponent from '@/app/components/hl7/Subcomponent';

const Component = ({ component }) => {
    return (
        <span className="subfield">
            {component.value}
        </span>
    );
};

export default Component;