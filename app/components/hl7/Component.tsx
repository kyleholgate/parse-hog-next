const Component = ({ component }) => {
    return (
        <span className="component" id={component.name}>
            {component.value}
        </span>
    );
};

export default Component;