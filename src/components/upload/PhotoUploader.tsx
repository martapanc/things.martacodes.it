import { useEffect, useRef, useState } from 'react';
import PinGate from './PinGate';
import { albums } from '@/data/albums';

const WIDGET_SCRIPT_SRC = 'https://upload-widget.cloudinary.com/global/all.js';
const UPLOAD_PRESET = 'Convert to Webp';

// Only the slice of the widget's API this component actually calls
interface CloudinaryWidget {
    open: () => void;
}
interface CloudinaryUploadResult {
    event: string;
    info?: { secure_url: string; original_filename: string };
}
interface CloudinaryGlobal {
    createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: CloudinaryUploadResult) => void
    ) => CloudinaryWidget;
}
declare global {
    interface Window {
        cloudinary?: CloudinaryGlobal;
    }
}

function loadWidgetScript(): Promise<void> {
    if (window.cloudinary) return Promise.resolve();

    const existing = document.querySelector(
        `script[src="${WIDGET_SCRIPT_SRC}"]`
    );
    if (existing) {
        return new Promise((resolve) =>
            existing.addEventListener('load', () => resolve())
        );
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = WIDGET_SCRIPT_SRC;
        script.onload = () => resolve();
        script.onerror = () =>
            reject(new Error('Failed to load Cloudinary widget script'));
        document.head.appendChild(script);
    });
}

type Destination = 'food' | 'travel' | 'updates' | 'custom';

// Matches the id convention already used in albums.ts (isle-of-skye, etc.),
// so a freehand "New York" lands in the same folder a matching albums.ts
// entry would later point at.
function slugify(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function resolveFolder(
    destination: Destination,
    travelAlbum: string,
    newAlbumSlug: string,
    customFolder: string
): string {
    switch (destination) {
        case 'food':
            return 'Food';
        case 'updates':
            return 'Updates';
        case 'travel':
            return `Travel/${travelAlbum === '__new__' ? slugify(newAlbumSlug) : travelAlbum}`;
        case 'custom':
            return customFolder.trim();
    }
}

interface UploadedPhoto {
    url: string;
    filename: string;
    folder: string;
}

function Uploader() {
    const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as
        | string
        | undefined;

    const [destination, setDestination] = useState<Destination>('food');
    const [travelAlbum, setTravelAlbum] = useState(
        albums[0]?.id ?? '__new__'
    );
    const [newAlbumSlug, setNewAlbumSlug] = useState('');
    const [customFolder, setCustomFolder] = useState('');
    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');
    const [scriptReady, setScriptReady] = useState(false);
    const [opening, setOpening] = useState(false);
    const [uploaded, setUploaded] = useState<UploadedPhoto[]>([]);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const widgetRef = useRef<CloudinaryWidget | null>(null);

    useEffect(() => {
        loadWidgetScript()
            .then(() => setScriptReady(true))
            .catch(() => setScriptReady(false));
    }, []);

    const folder = resolveFolder(
        destination,
        travelAlbum,
        newAlbumSlug,
        customFolder
    );
    // `folder` alone isn't enough to validate: an empty new-album slug still
    // resolves to the non-empty string 'Travel/', which would silently drop
    // the photo into the general Travel folder instead of a new album.
    const folderValid =
        destination === 'travel' && travelAlbum === '__new__'
            ? slugify(newAlbumSlug).length > 0
            : destination === 'custom'
              ? customFolder.trim().length > 0
              : folder.length > 0;

    const openWidget = async () => {
        if (!scriptReady || !window.cloudinary || !cloudName) return;
        setOpening(true);

        const tagList = tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);

        widgetRef.current = window.cloudinary.createUploadWidget(
            {
                cloudName,
                uploadPreset: UPLOAD_PRESET,
                folder,
                tags: tagList.length ? tagList : undefined,
                context: caption ? { alt: caption } : undefined,
                sources: ['camera', 'local'],
                multiple: true,
                maxFiles: 20,
                cropping: true,
                croppingShowDimensions: true,
                showAdvancedOptions: false,
                styles: {
                    palette: {
                        window: '#ffffff',
                        windowBorder: '#90a0b3',
                        tabIcon: '#2563eb',
                        menuIcons: '#5a616a',
                        textDark: '#000000',
                        textLight: '#ffffff',
                        link: '#2563eb',
                        action: '#2563eb',
                        inactiveTabIcon: '#0e2f5a',
                        error: '#dc2626',
                        inProgress: '#2563eb',
                        complete: '#16a34a',
                        sourceBg: '#f4f6f9',
                    },
                },
            },
            (error, result) => {
                if (error) return;
                if (result.event === 'success' && result.info) {
                    setUploaded((prev) => [
                        {
                            url: result.info!.secure_url,
                            filename: result.info!.original_filename,
                            folder,
                        },
                        ...prev,
                    ]);
                }
                if (result.event === 'close') setOpening(false);
            }
        );

        widgetRef.current.open();
    };

    const copyUrl = async (url: string) => {
        await navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 1500);
    };

    if (!cloudName) {
        return (
            <p className='mx-auto mt-20 max-w-sm text-center text-slate-500'>
                PUBLIC_CLOUDINARY_CLOUD_NAME isn't set.
            </p>
        );
    }

    const destinations: { id: Destination; label: string }[] = [
        { id: 'food', label: 'Food' },
        { id: 'travel', label: 'Travel' },
        { id: 'updates', label: 'Updates (incl. cats)' },
        { id: 'custom', label: 'Custom folder' },
    ];

    return (
        <div className='mx-auto flex max-w-md flex-col gap-5 px-4 pb-16 pt-8'>
            <h1 className='text-center text-xl font-bold'>Upload a photo</h1>

            <div className='flex flex-col gap-1.5'>
                <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                    Destination
                </span>
                <div className='grid grid-cols-2 gap-2'>
                    {destinations.map(({ id, label }) => (
                        <button
                            key={id}
                            type='button'
                            onClick={() => setDestination(id)}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                destination === id
                                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-300'
                                    : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {destination === 'travel' && (
                <div className='flex flex-col gap-1.5'>
                    <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Album
                    </span>
                    <select
                        value={travelAlbum}
                        onChange={(event) =>
                            setTravelAlbum(event.target.value)
                        }
                        className='rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900'
                    >
                        {albums.map((album) => (
                            <option key={album.id} value={album.id}>
                                {album.title}
                            </option>
                        ))}
                        <option value='__new__'>New album…</option>
                    </select>
                    {travelAlbum === '__new__' && (
                        <>
                            <input
                                value={newAlbumSlug}
                                onChange={(event) =>
                                    setNewAlbumSlug(event.target.value)
                                }
                                placeholder='e.g. lisbon'
                                className='rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900'
                            />
                            <p className='text-xs text-slate-500 dark:text-slate-400'>
                                A brand-new album still needs a one-line
                                addition to{' '}
                                <code>src/data/albums.ts</code> before it
                                shows up on the site — this just gets the
                                photos into the right Cloudinary folder ahead
                                of that.
                            </p>
                        </>
                    )}
                </div>
            )}

            {destination === 'custom' && (
                <div className='flex flex-col gap-1.5'>
                    <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Folder
                    </span>
                    <input
                        value={customFolder}
                        onChange={(event) =>
                            setCustomFolder(event.target.value)
                        }
                        placeholder='e.g. Blog'
                        className='rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900'
                    />
                </div>
            )}

            <div className='flex flex-col gap-1.5'>
                <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                    Caption / alt text (optional)
                </span>
                <input
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                    className='rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900'
                />
            </div>

            <div className='flex flex-col gap-1.5'>
                <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                    Tags (optional, comma-separated)
                </span>
                <input
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                    placeholder='cats, life'
                    className='rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900'
                />
            </div>

            <button
                type='button'
                onClick={openWidget}
                disabled={!scriptReady || !folderValid || opening}
                className='rounded-lg bg-blue-600 px-4 py-3 font-medium text-white disabled:opacity-50 dark:bg-blue-700'
            >
                {!scriptReady
                    ? 'Loading…'
                    : opening
                      ? 'Uploading…'
                      : `Upload to ${folder || '…'}`}
            </button>

            {uploaded.length > 0 && (
                <div className='mt-4 flex flex-col gap-2'>
                    <span className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                        Uploaded this session
                    </span>
                    <ul className='flex flex-col gap-2'>
                        {uploaded.map((photo) => (
                            <li
                                key={photo.url}
                                className='flex items-center gap-3 rounded-lg border border-slate-200 p-2 dark:border-slate-800'
                            >
                                <img
                                    src={photo.url}
                                    alt=''
                                    className='h-12 w-12 rounded object-cover'
                                />
                                <div className='min-w-0 flex-1'>
                                    <p className='truncate text-sm'>
                                        {photo.filename}
                                    </p>
                                    <p className='truncate text-xs text-slate-400'>
                                        {photo.folder}
                                    </p>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => copyUrl(photo.url)}
                                    className='shrink-0 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium dark:bg-slate-800'
                                >
                                    {copiedUrl === photo.url
                                        ? 'Copied!'
                                        : 'Copy URL'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function PhotoUploader() {
    return (
        <PinGate>
            <Uploader />
        </PinGate>
    );
}
