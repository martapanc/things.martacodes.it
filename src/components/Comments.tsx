import Giscus from '@giscus/react';
import { useState, useEffect } from 'react';

export const Comments = () => {
    const [theme, setTheme] = useState<'dark_tritanopia' | 'light_high_contrast'>('dark_tritanopia');

    useEffect(() => {
        // Read initial theme
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark_tritanopia' : 'light_high_contrast');

        // Watch for theme changes
        const observer = new MutationObserver(() => {
            const isDarkNow = document.documentElement.classList.contains('dark');
            setTheme(isDarkNow ? 'dark_tritanopia' : 'light_high_contrast');
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        // `@giscus/react`'s <Giscus> renders `null` until its lazy-loaded
        // script resolves, so on first render (including Astro's SSR pass)
        // this component has no output at all. That's fine for client:load,
        // but Astro's client:visible directive observes the *children* of
        // the island — not the island itself — to know when to hydrate. An
        // island with zero children gives it nothing to watch, so it never
        // fires and the comments never load. This wrapper div is the thing
        // client:visible actually observes.
        <div className="pt-4">
            <Giscus
                id='comments'
                repo='martapanc/things.martacodes.it'
                repoId='R_kgDORm-gXA'
                category='General'
                categoryId='DIC_kwDORm-gXM4DB0PB'
                strict='0'
                mapping='title'
                reactionsEnabled='1'
                emitMetadata='0'
                inputPosition='top'
                theme={theme}
                lang='en'
                loading='lazy'
            />
        </div>
    );
};
