import { UpdatesLayoutWrapper } from '@/app/updates/updates-layout';
import getAllUpdates from '@/lib/updates';
import { UpdateList } from '@/app/updates/UpdateList';

export default function Updates() {
    const updates = getAllUpdates();

    return (
        <UpdatesLayoutWrapper>
            <h1>Updates</h1>

            <UpdateList updates={updates} />
        </UpdatesLayoutWrapper>
    );
}
