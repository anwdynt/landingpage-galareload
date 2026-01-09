import { redirect, Form, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/login";
import { login } from "~/server/auth.server";
import { createUserSession, getUserSession } from "~/server/session.server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

export function meta() {
    return [{ title: "Login Admin - Gala Reload" }];
}

// loader
export async function loader({ request }: Route.LoaderArgs) {
    const userId = await getUserSession(request);
    if (userId) {
        return redirect("/admin/dashboard");
    }
    return null;
}

// action
export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectTo = formData.get("redirectTo") as string || "/admin/dashboard";

    if (!email || !password) {
        return { error: "Email dan Password wajib diisi." };
    }

    try {
        const user = await login({ email, password });

        if (!user) {
            return { error: "Email atau Password salah." };
        }

        return createUserSession(user.id.toString(), redirectTo);
    } catch (e: any) {
        return { error: e.message };
    }
}

export default function Login() {
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (actionData?.error) {
            toast.error(actionData.error);
        }
    }, [actionData]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black px-4 font-sans">

            {/* Brutalist Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 relative"
            >
                {/* Decor: Corner Blocks */}
                <div className="absolute top-0 left-0 w-4 h-4 bg-black" />
                <div className="absolute top-0 right-0 w-4 h-4 bg-black" />
                <div className="absolute bottom-0 left-0 w-4 h-4 bg-black" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-black" />

                <div className="text-center mb-10 pt-4">
                    <div className="w-16 h-16 bg-black text-white mx-auto flex items-center justify-center text-3xl font-black mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(150,150,150,1)]">
                        G
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Panel</h1>
                    <p className="text-sm font-bold mt-2 uppercase tracking-widest border-b-2 border-black inline-block pb-1">Internal User</p>
                </div>

                <Form method="post" className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-bold text-lg uppercase">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@galareload.id"
                                required
                                className="rounded-none border-2 border-black bg-white focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-3 h-12 text-lg placeholder:text-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="font-bold text-lg uppercase">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="rounded-none border-2 border-black bg-white focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-3 h-12 text-lg placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full cursor-pointer h-14 bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-none text-xl font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(100,100,100,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] transition-all flex items-center justify-center gap-2 mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin w-6 h-6" />
                                Processing
                            </>
                        ) : (
                            <>
                                MASUK
                            </>
                        )}
                    </Button>
                </Form>
            </motion.div>

            <div className="fixed bottom-4 left-4 font-mono text-xs opacity-50">
                SYSTEM: SECURE
            </div>
        </div>
    );
}
