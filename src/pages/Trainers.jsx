export default function Trainers() {
  const trainers = [
    { name: "Asha Patel", specialty: "Strength Coach" },
    { name: "Rohit Singh", specialty: "Cardio Expert" },
    { name: "Maya Roy", specialty: "Yoga Instructor" },
  ];

  return (
    <div className="pt-20 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Our Trainers</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {trainers.map((t) => (
          <div key={t.name} className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <p className="text-gray-500">{t.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
