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