// src/components/Error/Error.jsx
import { Link } from 'react-router';
import errorImage from '../../assets/error-paage.png';

const Error = () => {
  return (
    <section className="min-h-screen bg-[#F7F9F9] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#234636] bg-[#DCFCE7] px-3 py-1 rounded-full">
        404 Error
      </span>
      <img
        src={errorImage}
        alt="404 Error"
        className="w-full max-w-sm sm:max-w-md max-h-[38vh] object-contain mx-auto"
      />
      <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-[#1B2631]">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-[#64748B] max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 bg-[#234636] hover:bg-[#1b362a] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
      >
        ← Back to Home
      </Link>
    </section>
  );
};

export default Error;