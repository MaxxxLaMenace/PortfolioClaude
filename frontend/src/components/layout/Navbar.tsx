import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/projects', label: 'Projets' },
    { to: '/skills', label: 'Compétences' },
    { to: '/contact', label: 'Contact' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-accent-400 font-semibold'
      : 'text-primary-300 hover:text-primary-100 transition-colors';

  return (
    <nav className="bg-primary-900 border-b border-primary-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-accent-400">
            Portfolio
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>
            )}
            {user && (
              <button
                onClick={logout}
                className="text-primary-400 hover:text-red-400 transition-colors text-sm"
              >
                Déconnexion
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-primary-300 hover:text-primary-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block px-2 py-2 rounded ${isActive ? 'text-accent-400 font-semibold' : 'text-primary-300 hover:text-primary-100'}`
                }
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block px-2 py-2 rounded ${isActive ? 'text-accent-400 font-semibold' : 'text-primary-300 hover:text-primary-100'}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </NavLink>
            )}
            {user && (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="block w-full text-left px-2 py-2 text-primary-400 hover:text-red-400"
              >
                Déconnexion
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
