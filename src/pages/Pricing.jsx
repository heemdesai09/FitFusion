export default function Pricing() {
  const plans = [
    { name: "Basic", price: "₹999/mo" },
    { name: "Pro", price: "₹1999/mo" },
    { name: "Elite", price: "₹3499/mo" },
  ];

  return (
    <div className="pt-20 text-center">
      <h1 className="text-3xl font-bold mb-6">Pricing Plans</h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div key={p.name} className="p-6 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="mt-2 text-cyan-500">{p.price}</p>
            <button className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
