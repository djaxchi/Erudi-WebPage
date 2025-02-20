// Define our navigation item type
interface NavItem {
    label: string;
    href: string;
    isButton?: boolean;
    }

// Navigation items - we could move this to a separate config file
const navItems: NavItem[] = [
{ label: 'Accueil', href: '#', isButton: true },
{ label: 'Modèles de CV', href: '#' },
{ label: 'Tarification', href: '#' },
];

import React from 'react';

const Navbar: React.FC = () => {
return (
    <nav className="fixed top-7 left-4 right-4 h-[4.5rem] max-w mx-10 bg-gradient-to-r from-[#826AED] to-[#8300E0] rounded-full px-6 py-3 flex items-center justify-between text-white shadow-neon-dk-purple-1 ">
    {/* Logo/Brand */}
    <div className="text-3xl font-semibold">
        Hireo
    </div>
    
    {/* Navigation Links - mapping through our navItems array */}
    <div className="flex items-center space-x-8">
        {navItems.map((item) => (
        <a
            key={item.label}
            href={item.href}
            className={`text-xl ${
            item.isButton
                ? 'bg-white text-purple-500 px-4 py-1 rounded-full'
                : 'hover:text-purple-100'
            }`}
        >
            {item.label}
        </a>
        ))}
    </div>
    
    {/* Right Section */}
    <div>
        <button 
        className="bg-white text-purple-500 px-4 py-1 rounded-full text-xl hover:bg-purple-50 transition-colors"
        onClick={() => console.log('Documents clicked')}
        >
        Mes Documents
        </button>
    </div>
    </nav>
);
};

export default Navbar;