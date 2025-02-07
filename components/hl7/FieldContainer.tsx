import { Fragment, useState } from 'react';
import Tooltip from '@/components/ui/Tooltip';
import Component from '@/components/hl7/ComponentContainer';
import CopyToClipboard from '@/components/CopyToClipboard';
import { Field } from '@/models/HL7Message';

type FieldContainerProps = {
    field: Field;
};

const FieldContainer = ({ field }: FieldContainerProps) => {
    return (
        <Fragment>
            <CopyToClipboard textToCopy={field.value} notificationText="Field Copied!">
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
            </CopyToClipboard>
        </Fragment>
    );
};

export default FieldContainer;