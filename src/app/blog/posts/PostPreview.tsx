import Link from 'next/link';

import {categories, Post, tags} from '@/types/Post';
import moment from "moment/moment";
import {calcWordsAndReadingTime} from "@/lib/blog-posts";
import {TbCategory} from "react-icons/tb";
import {FaChevronRight, FaRegCalendarAlt} from "react-icons/fa";
import {AiOutlineRead} from "react-icons/ai";
import {MdOutlineTimer} from "react-icons/md";
import {FaHashtag} from "react-icons/fa6";
import UnstyledLink from "@/components/atoms/links/UnstyledLink";

type PostPreviewProps = {
    post: Post;
};

export default function PostPreview({post}: PostPreviewProps) {
    const formattedDate = post.date ? moment(post.date).format('Do MMMM, YYYY') : null;

    const {words, readingTime} = calcWordsAndReadingTime(post.body);

    return (
        <div
            className='my-3 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 transition ease-in-out duration-400 h-68 xl:h-56'>
            <div className='flex flex-row gap-5 h-full'>
                <div className='flex w-[20rem] xl:w-[16rem] relative'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt='Post preview image'
                        src={post.image ?? 'https://picsum.photos/300/250'}
                        className='rounded-xl object-cover absolute top-0 left-0 w-full h-full'
                    />
                </div>
                <div className='flex flex-col justify-between h-full w-full'>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="flex gap-1.5">
                                <TbCategory className="h-6"/>
                                <UnstyledLink
                                    className='animated-underline focus-visible:ring-primary-300 rounded-sm text-sm font-medium text-blue-950 focus:outline-none focus-visible:ring dark:text-gray-200'
                                    href={`/blog/categories/${post.category ?? 'uncategorized'}`}
                                    aria-label={categories[post.category]}
                                >
                                    {categories[post.category] ?? 'Uncategorized'}
                                </UnstyledLink>
                            </span>
                            <span className='italic flex justify-end gap-1.5'>
                                <FaRegCalendarAlt className="h-6"/>
                                {formattedDate}
                            </span>
                        </div>
                        <Link href={`/blog/posts/${post.slug}`}>
                            <div className="mb-3">
                                <h1 className="hover:text-indigo-500">
                                    {post.title}
                                </h1>
                            </div>
                        </Link>
                        <div className='mb-5'>
                            {post.description}
                        </div>
                    </div>

                    <div className="flex flex-col xl:flex-row justify-between">
                        <div className="flex gap-6">
                            <span className="flex gap-1.5">
                              <AiOutlineRead className="h-6"/>
                                {words} words
                            </span>
                            <span className="flex gap-1.5">
                                <MdOutlineTimer className="h-6"/>
                                {readingTime}
                            </span>
                        </div>
                        <div className="flex gap-1">
                            <FaHashtag className="h-6"/>
                            {post.tags.map(tag => (
                                <Link key={tag} href={`/blog/tags/${tag}`}
                                      className="dark:bg-indigo-900 bg-indigo-300 hover:bg-indigo-200 rounded-md px-1 dark:text-white font-semibold">
                                    {tags[tag]}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </Link>
    );
}
