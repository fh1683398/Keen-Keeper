import { useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#284B3B] text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const navItems = (
    <>
      <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkStyle}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
        </svg>
        <span>Home</span>
      </NavLink>

      <NavLink to="/timeline" onClick={() => setIsOpen(false)} className={navLinkStyle}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
        </svg>
        <span>Timeline</span>
      </NavLink>

      <NavLink to="/stats" onClick={() => setIsOpen(false)} className={navLinkStyle}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16M7 14l4-4 3 3 5-5" />
        </svg>
        <span>Stats</span>
      </NavLink>
    </>
  );

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-360 mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} className="text-xl sm:text-2xl tracking-tight">
          <span className="font-bold text-slate-900">Keen</span>
          <span className="font-semibold text-[#284B3B]">Keeper</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {navItems}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-gray-100 flex flex-col gap-2 bg-white">
          {navItems}
        </div>
      )}
    </nav>
  );
};

export default Navbar;