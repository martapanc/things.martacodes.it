'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function ResponsiveImage({
    src,
    alt,
}: {
    src: string;
    alt?: string;
}) {
    const [isVertical, setIsVertical] = useState<boolean | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const aspectRatio = img.width / img.height;
            setIsVertical(aspectRatio < 1);
        };
    }, [src]);

    return (
        <div
            className={`flex justify-center overflow-hidden ${isVertical === null ? 'opacity-0' : ''}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt || 'Image'}
                className={clsx(
                    'rounded-xl object-cover object-center',
                    isVertical ? 'w-full lg:mx-auto lg:w-2/3' : 'w-full'
                )}
            />
        </div>
    );
}
