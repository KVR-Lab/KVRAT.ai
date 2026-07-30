export default function RuntimeCard({ runtime }: any) {

  return (

    <div className="rounded-xl border p-4">

      <h2 className="font-bold mb-3">
        المحرك
      </h2>

      <p>الحالة : {runtime.الحالة}</p>

      <p>الحلقة : {runtime.الحلقة_التشغيلية}</p>

      <p>المخطط : {runtime.المخطط}</p>

      <p>المنفذ : {runtime.المنفذ}</p>

    </div>

  );

}