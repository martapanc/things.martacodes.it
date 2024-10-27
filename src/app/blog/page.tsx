import LayoutClient from "@/app/layout-client";
import {PostList} from "@/app/blog/PostList";

export default function Blog() {
    return (
        <LayoutClient headerText="Marta Writes">
            <h1>Blog</h1>


            <PostList />
        </LayoutClient>
    );
}
