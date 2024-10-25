'use client';

import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Mode = 'dark' | 'light';

export interface ThemeToggleProps {
	includeLabels?: boolean;
}

const ThemeToggle = ({ includeLabels }: ThemeToggleProps) => {
	const { theme, setTheme } = useTheme();
	const [mode, setMode] = useState<Mode>(theme as Mode);

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
			{/*<DarkModeToggle*/}
			{/*	mode={mode}*/}
			{/*	dark={includeLabels ? 'Dark' : ''}*/}
			{/*	light={includeLabels ? 'Light' : ''}*/}
			{/*	size='sm'*/}
			{/*	inactiveTrackColor='#e2e8f0'*/}
			{/*	inactiveTrackColorOnHover='#f8fafc'*/}
			{/*	inactiveTrackColorOnActive='#cbd5e1'*/}
			{/*	activeTrackColor='#444444'*/}
			{/*	activeTrackColorOnHover='#1e293b'*/}
			{/*	activeTrackColorOnActive='#0f172a'*/}
			{/*	inactiveThumbColor='#1e293b'*/}
			{/*	activeThumbColor='#e2e8f0'*/}
			{/*	inactiveLabelColor=''*/}
			{/*	inactiveLabelColorOnHover=''*/}
			{/*	inactiveLabelColorOnActive=''*/}
			{/*	activeLabelColor='#0f172a'*/}
			{/*	activeLabelColorOnHover='#0f172a'*/}
			{/*	activeLabelColorOnActive='#0f172a'*/}
			{/*	ariaLabel='Toggle Dark / Light Mode'*/}
			{/*	onChange={toggleTheme}*/}
			{/*/>*/}
		</div>
	);
};

export default ThemeToggle;
