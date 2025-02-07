import React from 'react';
import { MdExpandMore } from 'react-icons/md';

type ExpandIconProps = {
    isExpanded: boolean;
};

const ExpandIcon = ({ isExpanded }: ExpandIconProps) => {
    return (
        <div
            style={{
                transition: 'transform 0.2s ease-in-out',
                transform: `rotate(${isExpanded ? '-180deg' : '0deg'})`
            }}
        >
            <MdExpandMore />
        </div>
    );
};

export default ExpandIcon;
