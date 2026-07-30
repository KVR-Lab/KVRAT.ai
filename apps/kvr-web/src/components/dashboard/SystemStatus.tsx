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