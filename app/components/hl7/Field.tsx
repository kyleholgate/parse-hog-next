import { Fragment } from 'react';
import Component from '@/app/components/hl7/Component';

const Field = ({ field }) => {
    return (
        <span className="field" id={field.name} title={field.description} >
            {field.components.length > 0 ? (
                field.components.map((component, index) => (
                    <Fragment key={component.name}>
                        <Component component={component} />
                        {index < field.components.length - 1 && <span className='component-separator'>^</span>}
                    </Fragment>
                ))
            ) : (
                field.value
            )}
        </span>
    );
};

export default Field;