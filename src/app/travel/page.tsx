'use client';

import LayoutClient from '@/app/layout-client';
import Board from '@/app/travel/Board';

import './styles.css';

export default function Blog() {
    return (
        <LayoutClient headerText='Marta Travels'>
            <div className='mb-6'>
                <h1>Pics from around the World</h1>
            </div>

            <Board />
        </LayoutClient>
    );
}
