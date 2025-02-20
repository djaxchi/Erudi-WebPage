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
    <nav className="fixed top-4 left-4 right-4 max-w-6xl mx-auto bg-gradient-to-r from-purple-500 to-purple-400 rounded-full px-6 py-3 flex items-center justify-between text-white shadow-neon-dk-purple-1 ">
    {/* Logo/Brand */}
    <div className="text-xl font-semibold">
        Hireo
    </div>
    
    {/* Navigation Links - mapping through our navItems array */}
    <div className="flex items-center space-x-8">
        {navItems.map((item) => (
        <a
            key={item.label}
            href={item.href}
            className={`text-sm ${
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
        className="bg-white text-purple-500 px-4 py-1 rounded-full text-sm hover:bg-purple-50 transition-colors"
        onClick={() => console.log('Documents clicked')}
        >
        Mes Documents
        </button>
    </div>
    </nav>
);
};

export default Navbar;