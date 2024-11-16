import { Update } from '@/types/Update';
import UpdateItem from '@/app/updates/UpdateItem';

export async function UpdateList({ updates }: { updates: Update[] }) {
    return (
        <section>
            <div className='flex flex-col gap-4 pb-10 pt-5'>
                {updates
                    .filter((update) => update !== null)
                    .map((update, index) => (
                        <UpdateItem key={index} update={update} />
                    ))}
            </div>
        </section>
    );
}
