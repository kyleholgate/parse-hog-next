import { useState, useEffect } from 'react';
import HL7Message from '@/app/models/HL7Message';

const Subcomponent = ({ subcomponent }) => {
    return (
        <div className="subcomponent">
            {subcomponent.value}
        </div>
    );
};

export default Subcomponent;