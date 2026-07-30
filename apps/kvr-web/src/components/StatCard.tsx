type Props = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-xl border p-5 shadow bg-white">
      <div className="text-gray-500 text-sm">{title}</div>

      <div className="text-2xl font-bold mt-2">
        {value}
      </div>
    </div>
  );
}