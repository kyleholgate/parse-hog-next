import React from 'react';
import { Subcomponent } from '@/app/models/HL7Message';

type SubcomponentContainerProps = {
    subcomponent: Subcomponent;
};

const SubcomponentContainer = ({ subcomponent }: SubcomponentContainerProps) => {
    return (
        <div className="subcomponent">
            {subcomponent.value}
        </div>
    );
};

export default SubcomponentContainer;