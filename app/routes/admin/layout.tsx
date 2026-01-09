import { Outlet, redirect, Form, NavLink, useLoaderData, useSubmit, useLocation } from "react-router";
import type { Route } from "./+types/layout";
import { requireUserId } from "~/server/session.server";
import { getUserById } from "~/server/auth.server";
import { getUserPermissions, getUserRoles } from "~/server/rbac.server";
import {
    LayoutDashboard,
    FileText,
    LogOut,
    Settings,
    Users,
    Tag
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "~/components/ui/sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import ReduxProvider from "~/components/providers/redux-provider"; // Import Provider

export async function loader({ request }: Route.LoaderArgs) {
    const userId = await requireUserId(request);
    const user = await getUserById(Number(userId));

    if (!user) {
        throw redirect("/logout");
    }

    // RBAC Check: We allow any authenticated user to enter the admin shell.
    // Specific routes and sidebar components will handle granular permissions.
    // if (user.role !== "ADMIN" && user.role !== "EDITOR") {}

    const permissions = await getUserPermissions(user.id);
    const roles = await getUserRoles(user.id); // Get IDs of roles or slugs, assuming slugs based on rbac.server

    return { user, permissions, roles };
}

export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                Admin Panel
            </motion.span>
        </a>
    );
};
export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
    const { user, permissions, roles } = loaderData;
    const [open, setOpen] = useState(false);
    const submit = useSubmit();
    const location = useLocation();

    const links = [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        }
    ];

    if (permissions.includes("view_posts")) {
        links.push({
            label: "Artikel Blog",
            href: "/admin/posts",
            icon: <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        });
    }

    if (permissions.includes("manage_categories")) {
        links.push({
            label: "Kategori",
            href: "/admin/categories",
            icon: <Tag className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        });
    }

    if (permissions.includes("manage_users")) {
        links.push({
            label: "Pengguna",
            href: "/admin/users",
            icon: <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        });
    }

    // Handle logout with a form submission programmatically or via a hidden form if needed, 
    // but useSubmit is simpler.

    return (
        <div className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
            "h-screen" // Full screen height
        )}>
            <ReduxProvider>
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Form action="/logout" method="post">
                                <button
                                    type="submit"
                                    className={cn(
                                        "flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer w-full bg-transparent border-none text-left"
                                    )}
                                >
                                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                    <motion.span
                                        animate={{
                                            display: open ? "inline-block" : "none",
                                            opacity: open ? 1 : 0,
                                        }}
                                        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                                    >
                                        Keluar
                                    </motion.span>
                                </button>
                            </Form>
                        </div>
                    </SidebarBody>
                </Sidebar>

                {/* Main Content */}
                <div className="flex flex-1">
                    <div className="p-2 b-12 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </ReduxProvider>
        </div>
    );
}
