import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showScroll, setShowScroll] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // BMI Calculator
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  // Calorie Calculator
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.2);
  const [calories, setCalories] = useState(null);

  // FAQ & Fitness Tools
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeTool, setActiveTool] = useState(1);

  const testimonials = [
    { name: "Puspendra", text: "FitFusion helped me achieve my goals with proper guidance and motivation." },
    { name: "Nishanshu", text: "The trainers are excellent and the progress tracking system is amazing." },
    { name: "Rahul", text: "One of the best fitness platforms I’ve used. FitFusion changed my habits!" },
  ];

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setMessageSent(false), 4000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // BMI
  const calculateBMI = (e) => {
    e.preventDefault();
    const h = height / 100;
    const bmiValue = (weight / (h * h)).toFixed(1);
    setBmi(bmiValue);
    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 24.9) setCategory("Normal");
    else if (bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  // Calorie
  const calculateCalories = (e) => {
    e.preventDefault();
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    setCalories(Math.round(bmr * activity));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 scroll-smooth">

      {/* ===== SUCCESS MESSAGE ===== */}
      {messageSent && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          Message sent successfully!
        </motion.div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section
        id="home"
        className="pt-28 pb-20 text-center bg-gradient-to-b from-cyan-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-cyan-600 mb-6"
        >
          Welcome to FitFusion
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg mb-8">
          Transform your fitness journey with personalized workouts, expert guidance,
          and a motivating community that pushes you forward.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#bmi"
            className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-cyan-600 transition"
          >
            Check BMI
          </a>
          <a
            href="#contact"
            className="border border-cyan-500 text-cyan-500 px-8 py-3 rounded-lg font-medium hover:bg-cyan-50 dark:hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* ===== TRAINERS ===== */}
      <motion.section
        id="trainers"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 text-center bg-gray-100 dark:bg-gray-800"
      >
        <h2 className="text-3xl font-bold mb-10 text-cyan-500">Our Trainers</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            { name: "Heem Desai", role: "Strength Coach", color: "bg-gradient-to-br from-cyan-400 to-blue-500" },
            { name: "Sarthak Modi", role: "Cardio Specialist", color: "bg-gradient-to-br from-green-400 to-emerald-500" },
            { name: "Saurabh Pal", role: "Yoga Instructor", color: "bg-gradient-to-br from-purple-400 to-pink-500" },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            >
              <div className={`${t.color} w-full h-52 rounded-lg mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-inner`}>
                {t.role.split(" ")[0]}
              </div>
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== BMI CALCULATOR ===== */}
      <motion.section
        id="bmi"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-8 text-cyan-500">BMI Calculator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your height and weight to check your Body Mass Index (BMI)
        </p>
        <form
          onSubmit={calculateBMI}
          className="grid md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
        >
          <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="p-3 border rounded-lg dark:bg-gray-700" required />
          <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-3 border rounded-lg dark:bg-gray-700" required />
          <button type="submit" className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition">Calculate</button>
        </form>
        {bmi && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mt-6 bg-cyan-100 dark:bg-cyan-900 p-6 rounded-lg">
            <p className="text-lg font-semibold">Your BMI: <span className="text-cyan-600">{bmi}</span></p>
            <p className="text-gray-700 dark:text-gray-300">Category: <b>{category}</b></p>
          </motion.div>
        )}
      </motion.section>

      {/* ===== NEW FITNESS TOOLS (1–4) ===== */}
      <section className="py-16 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-cyan-500 mb-6">Fitness Tools</h2>
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setActiveTool(num)}
              className={`px-6 py-2 rounded-full font-semibold ${
                activeTool === num ? "bg-cyan-500 text-white" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              } hover:bg-cyan-400 transition`}
            >
              {num === 1 && "1️⃣ Calorie Calculator"}
              {num === 2 && "2️⃣ Gym Timings"}
              {num === 3 && "3️⃣ FAQs"}
              {num === 4 && "4️⃣ Upcoming Events"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTool === 1 && (
            <motion.div
              key="calorie"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-500">Calorie Calculator</h3>
              <form onSubmit={calculateCalories} className="grid md:grid-cols-5 gap-4">
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="p-3 border rounded-lg dark:bg-gray-700" required />
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-3 border rounded-lg dark:bg-gray-700">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="p-3 border rounded-lg dark:bg-gray-700" required />
                <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-3 border rounded-lg dark:bg-gray-700" required />
                <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))} className="p-3 border rounded-lg dark:bg-gray-700">
                  <option value="1.2">Sedentary</option>
                  <option value="1.375">Lightly Active</option>
                  <option value="1.55">Moderately Active</option>
                  <option value="1.725">Very Active</option>
                </select>
                <button className="md:col-span-5 bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 transition">
                  Calculate
                </button>
              </form>
              {calories && (
                <p className="mt-4 text-lg">
                  Daily Calorie Needs: <b className="text-cyan-500">{calories} kcal</b>
                </p>
              )}
            </motion.div>
          )}

          {activeTool === 2 && (
            <motion.div
              key="timings"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-500">Gym Timings & Facilities</h3>
              <p><b>Monday – Saturday:</b> 6:00 AM – 10:00 PM</p>
              <p><b>Sunday:</b> Closed</p>
              <ul className="mt-4 space-y-2 text-left">
                <li>✔ Weight Training Zone</li>
                <li>✔ Cardio Machines</li>
                <li>✔ Yoga & Meditation Room</li>
                <li>✔ Nutrition & Juice Bar</li>
              </ul>
            </motion.div>
          )}

          {activeTool === 3 && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-500">FAQs</h3>
              {[
                { q: "Can beginners join?", a: "Absolutely! We offer beginner programs." },
                { q: "Do you give diet plans?", a: "Yes, for Pro & Elite members." },
                { q: "Are female trainers available?", a: "Yes, we have certified female trainers." },
              ].map((faq, i) => (
                <div key={i} className="mb-4">
                  <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="w-full text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-semibold">
                    {faq.q}
                  </button>
                  {openFAQ === i && <p className="p-4 bg-cyan-50 dark:bg-gray-700 rounded-b-lg">{faq.a}</p>}
                </div>
              ))}
            </motion.div>
          )}

          {activeTool === 4 && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-cyan-500">Upcoming Events</h3>
              <ul className="space-y-3">
                <li>5K Run — Dec 15, 2025</li>
                <li>30-Day Transformation — Jan 1, 2026</li>
                <li>Yoga Marathon — Dec 21, 2025</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

            {/* ===== WORKOUT PLAN SECTION ===== */}
      <motion.section
        id="workout"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-100 dark:bg-gray-800 text-center"
      >
        <h2 className="text-3xl font-bold mb-10 text-cyan-500">Weekly Workout Schedule</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {[
            { day: "Monday", workout: "Chest & Triceps" },
            { day: "Tuesday", workout: "Back & Biceps" },
            { day: "Wednesday", workout: "Cardio & Abs" },
            { day: "Thursday", workout: "Legs & Core" },
            { day: "Friday", workout: "Shoulders & Arms" },
            { day: "Saturday", workout: "Full Body Stretch" },
          ].map((plan, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-cyan-500 mb-2">{plan.day}</h3>
              <p className="text-gray-600 dark:text-gray-300">{plan.workout}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>


      {/* ===== PRICING SECTION ===== */}
      <motion.section
        id="pricing"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 text-center max-w-6xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-10 text-cyan-500">Membership Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Basic", price: "₹999/mo", features: ["Gym Access", "Group Classes"], highlighted: false },
            { name: "Pro", price: "₹1999/mo", features: ["Personal Trainer", "Diet Plan", "Progress Tracking"], highlighted: true },
            { name: "Elite", price: "₹3499/mo", features: ["All Pro Features", "24/7 Access", "VIP Support"], highlighted: false },
          ].map((plan, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className={`p-8 rounded-xl shadow hover:shadow-lg transition ${plan.highlighted ? "bg-cyan-500 text-white" : "bg-white dark:bg-gray-800"}`}>
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className={`text-xl font-bold mb-6 ${plan.highlighted ? "text-white" : "text-cyan-500"}`}>{plan.price}</p>
              <ul className={`mb-6 space-y-2 ${plan.highlighted ? "text-white/90" : "text-gray-600 dark:text-gray-300"}`}>
                {plan.features.map((f, j) => <li key={j}>• {f}</li>)}
              </ul>
              <button className={`px-6 py-2 rounded-lg transition ${plan.highlighted ? "bg-white text-cyan-500 hover:bg-gray-100" : "bg-cyan-500 text-white hover:bg-cyan-600"}`}>
                Join Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== TESTIMONIAL SECTION ===== */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-100 dark:bg-gray-900 text-center"
      >
        <h2 className="text-3xl font-bold mb-10 text-cyan-500">What People Say</h2>
        <motion.div key={currentTestimonial} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-8">
          <p className="text-gray-700 dark:text-gray-300 italic mb-4">
            "{testimonials[currentTestimonial].text}"
          </p>
          <h3 className="font-semibold text-cyan-500">— {testimonials[currentTestimonial].name}</h3>
        </motion.div>
      </motion.section>

      {/* ===== CONTACT SECTION ===== */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-8 text-cyan-500">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-3 border rounded-lg dark:bg-gray-800" required />
          <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="p-3 border rounded-lg dark:bg-gray-800" required />
          <textarea placeholder="Your Message" rows="4" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="p-3 border rounded-lg dark:bg-gray-800" required></textarea>
          <button className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition">
            Send Message
          </button>
        </form>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© {new Date().getFullYear()} FitFusion. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="#" className="hover:text-cyan-500">Instagram</a>
          <a href="#" className="hover:text-cyan-500">YouTube</a>
          <a href="#" className="hover:text-cyan-500">LinkedIn</a>
        </div>
      </footer>

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-cyan-500 text-white p-3 rounded-full shadow-lg hover:bg-cyan-600 transition">
          ↑
        </button>
      )}
    </div>
  );
}
    
