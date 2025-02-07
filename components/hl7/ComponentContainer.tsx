import { Component } from '@/models/HL7Message';

type ComponentContainerProps = {
    component: Component;
};

const ComponentContainer = ({ component }: ComponentContainerProps) => {
    return (
        <span className="component" id={component.name}>
            {component.value}
        </span>
    );
};

export default ComponentContainer;