import StatsGrid from "@/components/dashboard/StatsGrid";
import SystemStatus from "@/components/dashboard/SystemStatus";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {

    return (

        <main className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-7xl mx-auto space-y-8">

                <header>

                    <h1 className="text-4xl font-bold">

                        KVR Dashboard

                    </h1>

                    <p className="text-gray-600 mt-2">

                        Enterprise AI Control Center

                    </p>

                </header>

                <StatsGrid />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    <SystemStatus />

                    <RecentActivity />

                </div>

            </div>

        </main>

    );

}