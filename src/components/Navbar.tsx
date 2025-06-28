import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  activePage?: string;
}

// New site structure
const navItems: NavItem[] = [
  { label: 'Download',    href: '/download' },
  { label: 'About',       href: '/about' },
  { label: 'Contact Us',  href: '/contact' },
];

const Navbar: React.FC<NavbarProps> = ({ activePage = '/' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fermer le menu mobile lors du changement de route ou redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsOpen(false);
      }
    };

    const handleRouteChange = () => {
      setIsOpen(false);
    };

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', handleResize);
    
    // Écouter les changements d'URL (pour les SPAs)
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Fermer le menu lors d'un clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navbar = document.querySelector('nav');
      
      if (navbar && !navbar.contains(target) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-7 left-4 right-4 mx-10 rounded-2xl bg-[#041915]/80 backdrop-blur-xl border border-white/10 shadow-lg z-50">
      <div className="relative z-10 px-6 py-3 flex items-center justify-between h-[4.5rem]">
        {/* Logo */}
        <div className="text-3xl font-semibold text-white cursor-pointer">
          <a href="/">erudi</a>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          {navItems.map((item) => {
            const isActive = activePage === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-xl transition cursor-pointer ${
                  isActive
                    ? 'text-emerald-400 px-4 py-1 rounded-xl font-semibold shadow-sm hover:text-[#e6f2ed] hover:bg-emerald-400/60'
                    : 'hover:text-[#e6f2ed] hover:bg-emerald-400/20 px-4 py-1 rounded-xl font-semibold shadow-sm'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#041915]/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 space-y-4 text-white">
          {navItems.map((item) => {
            const isActive = activePage === item.href;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block w-full text-left text-lg py-2 px-2 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/30'
                      : 'hover:text-emerald-300 hover:bg-white/5'
                    }
                  `}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;