import { type LoaderFunctionArgs, type ActionFunctionArgs, Link, useLoaderData, useFetcher, Form } from "react-router";
import { requireUserId } from "~/server/session.server";
import { prisma } from "~/server/db.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { createPost } from "~/server/post.server";
import {
    FileText,
    Users,
    Tag,
    MessageSquare,
    PenTool,
    Clock,
    ChevronRight,
    ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request, "/admin-panel");

    // 1. Fetch Stats
    const [
        publishedPostsCount,
        draftPostsCount,
        categoriesCount,
        usersCount,
        recentPosts
    ] = await Promise.all([
        prisma.post.count({ where: { status: "PUBLISHED" } }),
        prisma.post.count({ where: { status: "DRAFT" } }),
        prisma.category.count(),
        prisma.user.count(),
        prisma.post.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { author: { select: { name: true } } }
        })
    ]);

    return {
        stats: { publishedPostsCount, draftPostsCount, categoriesCount, usersCount },
        recentPosts,
        user: await prisma.user.findUnique({ where: { id: Number(userId) } })
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireUserId(request, "/admin-panel");
    const formData = await request.formData();
    const intent = formData.get("intent");

    try {
        if (intent === "quick-draft") {
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;

            if (!title) throw new Error("Title is required");

            await createPost({
                title,
                content,
                status: "DRAFT",
                slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now(),
                authorId: Number(userId)
            });

            return { success: true, message: "Draft saved successfully" };
        }
    } catch (e: any) {
        return { error: e.message };
    }
    return null;
}

export default function DashboardPage() {
    const { stats, recentPosts, user } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (fetcher.data?.success) {
            toast.success(fetcher.data.message);
            formRef.current?.reset();
        } else if (fetcher.data?.error) {
            toast.error(fetcher.data.error);
        }
    }, [fetcher.data]);

    // Time greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Selamat Pagi" : hour < 18 ? "Selamat Sore" : "Selamat Malam";

    return (
        <div className="space-y-6">
            {/* Welcome Panel */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold font-metropolis mb-2">
                        {greeting}, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-neutral-500 mb-6 max-w-2xl">
                        Selamat datang di Gala Reload Admin Panel. Ini adalah pusat kendali untuk mengelola konten, pengguna, dan pengaturan situs Anda.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <PermissionGuard require="create_posts">
                            <Button asChild>
                                <Link to="/admin/posts/new">
                                    <PenTool className="mr-2 h-4 w-4" /> Tulis Artikel Baru
                                </Link>
                            </Button>
                        </PermissionGuard>
                        <Button variant="outline" asChild>
                            <Link to="/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" /> Lihat Situs
                            </Link>
                        </Button>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-neutral-800 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
                <div className="absolute bottom-0 right-10 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full translate-y-1/3 opacity-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* At a Glance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Sekilas Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>Artikel Diterbitkan</span>
                                </div>
                                <span className="font-bold text-lg">{stats.publishedPostsCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                                    <FileText className="mr-2 h-4 w-4 text-orange-500" />
                                    <span>Draft Artikel</span>
                                </div>
                                <span className="font-bold text-lg">{stats.draftPostsCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                                    <Tag className="mr-2 h-4 w-4" />
                                    <span>Kategori</span>
                                </div>
                                <span className="font-bold text-lg">{stats.categoriesCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Total Pengguna</span>
                                </div>
                                <span className="font-bold text-lg">{stats.usersCount}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-neutral-50 dark:bg-neutral-900 border-t p-3">
                        <p className="text-xs text-neutral-500">Update terakhir: {new Date().toLocaleTimeString()}</p>
                    </CardFooter>
                </Card>

                {/* Quick Draft */}
                <PermissionGuard require="create_posts">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-lg">Draf Cepat</CardTitle>
                            <CardDescription>Punya ide artikel? Tulis dan simpan dulu.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <fetcher.Form method="post" id="quick-draft-form" ref={formRef} className="space-y-4">
                                <input type="hidden" name="intent" value="quick-draft" />
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="sr-only">Judul</Label>
                                    <Input id="title" name="title" placeholder="Judul Artikel..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="sr-only">Konten</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        placeholder="Apa yang ada di pikiran Anda?"
                                        className="min-h-[120px] resize-none"
                                    />
                                </div>
                                <Button type="submit" disabled={fetcher.state !== "idle"}>
                                    {fetcher.state !== "idle" ? "Menyimpan..." : "Simpan Draf"}
                                </Button>
                            </fetcher.Form>
                        </CardContent>
                    </Card>
                </PermissionGuard>

                {/* Activity Feed */}
                <Card className="md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
                        <CardDescription>Artikel yang baru saja dibuat atau diedit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentPosts.length > 0 ? (
                                recentPosts.map((post: any) => (
                                    <div key={post.id} className="flex gap-3 group">
                                        <div className="text-neutral-300 dark:text-neutral-600 pt-1">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <Link
                                                to={`/admin/posts/${post.id}`}
                                                className="font-medium text-blue-600 dark:text-blue-400 hover:underline line-clamp-1"
                                            >
                                                {post.title}
                                            </Link>
                                            <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                                                <span>{new Date(post.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                                                <span>&bull;</span>
                                                <span className={post.status === 'PUBLISHED' ? 'text-green-600' : 'text-amber-600'}>
                                                    {post.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-500 text-sm">Belum ada aktivitas.</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-neutral-50 dark:bg-neutral-900 border-t p-3">
                        <Link to="/admin/posts" className="text-xs flex items-center text-blue-600 hover:underline">
                            Lihat semua aktivitas <ChevronRight className="h-3 w-3 ml-1" />
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
