'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import "@theme-toggles/react/css/Expand.css"
import { Expand } from "@theme-toggles/react";

type Mode = 'dark' | 'light';

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [, setMode] = useState<Mode>(theme as Mode);

	useEffect(() => {
		setMode(theme as Mode);
	}, [theme]);

	const toggleTheme = () => {
		const currentTheme = theme === 'dark';

		setMode(currentTheme ? 'light' : 'dark');
		return setTheme(currentTheme ? 'light' : 'dark');
	};

	return (
		<div className='flex w-full justify-center'>
			{/* @ts-expect-error: required props */}
			<Expand toggle={toggleTheme} toggled={theme === 'light'} placeholder={'Theme toggle'} />
		</div>
	);
};

export default ThemeToggle;
