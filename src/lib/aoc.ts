import { Language } from 'highlight.js';

const langAoc = (): Language => {
    return {
        contains: [
            {
                className: 'hash',
                begin: /#/,
            },
            {
                className: 'caret',
                begin: /[\^><v]/,
            },
            {
                className: 'dot',
                begin: /\./,
            },
            {
                className: 'up',
                begin: /[A-Z]/,
            },
            {
                className: 'pipe',
                begin: /[+|-]/,
            },
            {
                className: 'at',
                begin: /@/,
            },
            {
                className: 'box',
                begin: /[\[\]]/,
            },
        ],
    };
};

export default langAoc;
