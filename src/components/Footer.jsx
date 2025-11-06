export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center mt-10">
      <p className="text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} FitFusion. All rights reserved.
      </p>
    </footer>
  );
}
