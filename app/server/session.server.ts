import { createCookieSessionStorage, redirect } from "react-router";

// Secret key for cookie implementation
// In production, this should be in .env: SESSION_SECRET="super-secret-key"
const sessionSecret = process.env.SESSION_SECRET || "default-secret-key-change-me";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [sessionSecret],
        secure: false, // process.env.NODE_ENV === "production",
    },
});

export async function getSession(request: Request) {
    const cookie = request.headers.get("Cookie");
    return sessionStorage.getSession(cookie);
}

export async function commitSession(session: any) {
    return sessionStorage.commitSession(session);
}

export async function destroySession(session: any) {
    return sessionStorage.destroySession(session);
}

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await sessionStorage.getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
        },
    });
}

export async function getUserSession(request: Request) {
    const session = await getSession(request);
    return session.get("userId");
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
    const session = await getSession(request);
    const userId = session.get("userId");

    if (!userId) {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
        throw redirect(`/admin-panel?${searchParams}`);
    }

    return userId;
}
