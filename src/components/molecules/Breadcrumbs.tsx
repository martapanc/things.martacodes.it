import {Breadcrumbs as MuiBreadcrumbs, Typography} from "@mui/material";
import Link from "next/link";

type BreadcrumbItem = {
    path: string;
    label: string;
}

const Breadcrumbs = (breadCrumbs: { past: BreadcrumbItem[], current?: string }) => {
    const { past, current } = breadCrumbs;

    return (
        <div className="mb-4">
            <MuiBreadcrumbs aria-label="breadcrumb" className="text-black dark:text-white">
                {past.map(item => (
                    <Link key={item.path} className="text-slate-900 dark:text-slate-200" href={item.path}>
                        {item.label}
                    </Link>
                ))}
                {current &&
                    <Typography className="text-slate-500 dark:text-slate-500">{current}</Typography>
                }
            </MuiBreadcrumbs>
        </div>
    )
}

export default Breadcrumbs;