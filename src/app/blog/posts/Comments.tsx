'use client';

import Giscus from '@giscus/react';

export const Comments = () => {
    return (
        <Giscus
            id='comments'
            repo='martapanc/things.martacodes.it'
            repoId='R_kgDONF_fjQ'
            category='General'
            categoryId='DIC_kwDONF_fjc4Cl6xR'
            mapping='pathname'
            term='Welcome to @giscus/react component!'
            reactionsEnabled='1'
            emitMetadata='0'
            inputPosition='top'
            theme='light'
            lang='en'
            loading='lazy'
        />
    );
};
