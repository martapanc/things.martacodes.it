import { useState, type ReactNode, type SyntheticEvent } from 'react';

const STORAGE_KEY = 'upload-pin-ok';

async function sha256Hex(value: string): Promise<string> {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
}

interface Props {
    children: ReactNode;
}

/**
 * Client-side speed bump, not real access control — there's no backend to
 * verify against, so a determined visitor could always read the hash out of
 * the bundle and brute-force a short PIN offline. It exists to stop a
 * stumbled-upon or accidentally-shared URL from being casually abused, not
 * to protect against a targeted attacker.
 */
export default function PinGate({ children }: Props) {
    const expectedHash = import.meta.env.PUBLIC_UPLOAD_PIN_HASH as
        | string
        | undefined;

    // Storing the hash itself (not just a boolean) means changing the PIN
    // automatically invalidates every previously-unlocked browser — the
    // stored value stops matching, so the gate reappears next visit rather
    // than silently staying open under a retired PIN forever.
    const [unlocked, setUnlocked] = useState(
        () => !!expectedHash && localStorage.getItem(STORAGE_KEY) === expectedHash
    );
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!expectedHash) return;

        setChecking(true);
        const hash = await sha256Hex(pin);
        setChecking(false);

        if (hash === expectedHash) {
            localStorage.setItem(STORAGE_KEY, expectedHash);
            setUnlocked(true);
        } else {
            setError(true);
            setPin('');
        }
    };

    if (!expectedHash) {
        return (
            <p className='mx-auto mt-20 max-w-sm text-center text-slate-500'>
                PUBLIC_UPLOAD_PIN_HASH isn't set — this page can't unlock
                without it.
            </p>
        );
    }

    if (unlocked) return <>{children}</>;

    return (
        <form
            onSubmit={handleSubmit}
            className='mx-auto mt-24 flex max-w-xs flex-col gap-3 px-4 text-center'
        >
            <p className='text-slate-500 dark:text-slate-400'>
                Enter the PIN to continue
            </p>
            <input
                type='password'
                inputMode='numeric'
                autoFocus
                value={pin}
                onChange={(event) => {
                    setPin(event.target.value);
                    setError(false);
                }}
                className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-center text-lg tracking-widest dark:border-slate-700 dark:bg-slate-900'
            />
            {error && (
                <p className='text-sm text-red-600 dark:text-red-400'>
                    Wrong PIN
                </p>
            )}
            <button
                type='submit'
                disabled={checking || !pin}
                className='rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50 dark:bg-blue-700'
            >
                {checking ? 'Checking…' : 'Unlock'}
            </button>
        </form>
    );
}
