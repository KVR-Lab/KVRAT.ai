import DashboardCard from "./DashboardCard";

export default function StatsGrid() {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <DashboardCard
                title="Projects"
                value="12"
            />

            <DashboardCard
                title="Plugins"
                value="28"
            />

            <DashboardCard
                title="Memory"
                value="2.4 GB"
            />

            <DashboardCard
                title="Runtime"
                value="Running"
            />

        </div>

    );

}