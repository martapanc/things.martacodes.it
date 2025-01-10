'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export const Comments = () => {
    const theme = useTheme();

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
            theme={
                theme.resolvedTheme === 'dark'
                    ? 'dark_tritanopia'
                    : 'light_high_contrast'
            }
            lang='en'
            loading='lazy'
        />
    );
};
