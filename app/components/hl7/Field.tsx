import { Fragment } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import Component from '@/app/components/hl7/Component';

const Field = ({ field }) => {
    return (
        <Tippy content={`${field.segmentType}-${field.index}: ${field.description}`} theme='hog' placement="top" followCursor="horizontal" arrow={true} duration={0} plugins={[followCursor]}>
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
        </Tippy>
    );
};

export default Field;