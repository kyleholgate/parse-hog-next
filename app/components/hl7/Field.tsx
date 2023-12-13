import { Fragment } from 'react';
import Tooltip from '@/app/components/Tooltip';
import Component from '@/app/components/hl7/Component';

const Field = ({ field }) => {
    return (
        <Tooltip content={`${field.segmentType}-${field.index}: ${field.description}`}>
            <span className="field" id={field.name} data-tippy-content={field.description} >
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
        </Tooltip>
    );
};

export default Field;