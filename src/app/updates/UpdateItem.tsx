import Link from 'next/link';
import moment from 'moment/moment';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa6';
import BgIcon from '@/components/atoms/BgIcon';
import { Update } from '@/types/Update';
import { MarkdownBody } from '@/components/MarkdownBody';

type UpdateItemProps = {
    update: Update;
};

export default function UpdateItem({ update }: UpdateItemProps) {
    const formattedDate = update.date
        ? moment(update.date, 'YYYY MMM D').format('Do MMMM, YYYY')
        : null;

    return (
        <div
            id={update.slug}
            className='duration-400 my-3 h-auto rounded-2xl bg-slate-100 p-4 transition ease-in-out dark:bg-slate-900'
        >
            <div className='flex h-full flex-col gap-5 lg:flex-row'>
                <div className='relative flex h-72 w-full lg:h-auto lg:w-[20rem] xl:w-[16rem]'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt='Update image'
                        src={update.image ?? 'https://picsum.photos/300/250'}
                        className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
                    />
                </div>
                <div className='flex h-full w-full flex-col justify-between'>
                    <div>
                        <div className='mb-2 flex flex-row items-start justify-between'>
                            <span className='flex justify-end gap-1 italic'>
                                <BgIcon icon={<FaRegCalendarAlt />} />
                                {formattedDate}
                            </span>

                            <div className='hidden sm:flex'>
                                <Tags tags={update.tags} />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <h2>{update.title}</h2>
                        </div>

                        <div className='update-body mb-2 h-fit font-updates text-sm sm:mb-4'>
                            <MarkdownBody>{update.body}</MarkdownBody>
                        </div>

                        <div className='flex justify-end sm:hidden'>
                            <Tags tags={update.tags} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Tags = ({ tags }: { tags: string[] }) => {
    return (
        <>
            {tags && tags.length > 0 && (
                <div className='flex flex-wrap gap-1'>
                    <BgIcon icon={<FaHashtag />} accent />
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/updates/tags/${tag}`}
                            className='rounded-md bg-indigo-300 px-1 text-sm font-semibold hover:brightness-110 dark:bg-indigo-900 dark:text-white dark:hover:brightness-125 lg:text-base'
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};
