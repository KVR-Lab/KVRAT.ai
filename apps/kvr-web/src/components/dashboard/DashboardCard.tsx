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