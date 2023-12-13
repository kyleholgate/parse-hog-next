import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';

const Tooltip = ({ content, children }) => {
    return (
        <Tippy content={content} theme='hog' placement="top" followCursor="horizontal" arrow={true} duration={0} plugins={[followCursor]}>
            {children}
        </Tippy>
    );
};

export default Tooltip;