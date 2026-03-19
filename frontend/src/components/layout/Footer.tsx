import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 border-t border-primary-800 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-primary-400 text-sm">
          &copy; {currentYear} Portfolio. Tous droits réservés.
        </p>
        <p className="text-primary-500 text-xs mt-1">
          Construit avec React, TypeScript &amp; Node.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
