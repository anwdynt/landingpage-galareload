import type { Route } from "./+types/our-team";
import { TeamGrid } from "~/components/team/teamGrid";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Our Team | Gala Reload" },
        {
            name: "description",
            content:
                "Meet the dedicated team behind Gala Reload. We are passionate about delivering the best server pulsa and PPOB services.",
        },
    ];
};

export default function OurTeam() {
    return (
        <div className="bg-white dark:bg-gray-900">
            <TeamGrid />
        </div>
    );
}
