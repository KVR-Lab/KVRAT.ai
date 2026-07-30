$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$App = Join-Path $Root "apps\kvr-web"

function Write-KVRFile {

    param(
        [string]$RelativePath,
        [string]$Content
    )

    $Path = Join-Path $App $RelativePath

    $Dir = Split-Path $Path -Parent

    if (!(Test-Path $Dir)) {
        New-Item -ItemType Directory -Force $Dir | Out-Null
    }

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "[OK] $RelativePath"

}
Write-KVRFile `
"src\components\dashboard\DashboardCard.tsx" @'
type Props = {

    title:string;

    value:string;

};

export default function DashboardCard({

    title,

    value

}:Props){

    return(

        <div className="rounded-xl border bg-white p-5 shadow">

            <div className="text-gray-500 text-sm">

                {title}

            </div>

            <div className="text-3xl font-bold mt-3">

                {value}

            </div>

        </div>

    );

}
'@
Write-KVRFile `
"src\components\dashboard\StatsGrid.tsx" @'
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
'@
Write-KVRFile `
"src\components\dashboard\SystemStatus.tsx" @'
export default function SystemStatus() {

    const items = [

        { name: "API", status: "Online" },
        { name: "Runtime", status: "Running" },
        { name: "Memory", status: "Healthy" },
        { name: "Scheduler", status: "Active" },
        { name: "Plugins", status: "Loaded" }

    ];

    return (

        <div className="rounded-xl border bg-white p-6 shadow">

            <h2 className="text-xl font-semibold mb-4">

                System Status

            </h2>

            <div className="space-y-3">

                {items.map(item => (

                    <div
                        key={item.name}
                        className="flex items-center justify-between border-b pb-2"
                    >

                        <span>{item.name}</span>

                        <span className="font-semibold text-green-600">

                            {item.status}

                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}
'@
Write-KVRFile `
"src\components\dashboard\RecentActivity.tsx" @'
export default function RecentActivity() {

    const activities = [

        "Runtime started",
        "Planner initialized",
        "Vision module loaded",
        "Plugin registry updated",
        "Memory synchronized",
        "Knowledge index rebuilt"

    ];

    return (

        <div className="rounded-xl border bg-white p-6 shadow">

            <h2 className="text-xl font-semibold mb-4">

                Recent Activity

            </h2>

            <ul className="space-y-3">

                {activities.map((item,index)=>(

                    <li
                        key={index}
                        className="border-b pb-2"
                    >

                        {item}

                    </li>

                ))}

            </ul>

        </div>

    );

}
'@
Write-KVRFile `
"src\app\dashboard\page.tsx" @'
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
'@
Write-Host ""
Write-Host "====================================="
Write-Host "   KVR Dashboard Generated"
Write-Host "====================================="
Write-Host ""
Write-Host "Files created:"
Write-Host " - src\app\dashboard\page.tsx"
Write-Host " - src\components\dashboard\DashboardCard.tsx"
Write-Host " - src\components\dashboard\StatsGrid.tsx"
Write-Host " - src\components\dashboard\SystemStatus.tsx"
Write-Host " - src\components\dashboard\RecentActivity.tsx"