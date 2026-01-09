import { redirect, type LoaderFunctionArgs } from "react-router";
import { destroySession, getSession, requireUserId } from "~/server/session.server";

export async function action({ request }: LoaderFunctionArgs) {
    const session = await getSession(request);
    return redirect("/admin-panel", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    return null;
}
