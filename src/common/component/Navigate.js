import React from 'react';
import { Home, Layout, PieChart, User } from 'lucide-react';

const NavIcon = ({ active = false, isLast = false }) => {
    if (isLast) {
        return (
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${active ? 'bg-green-400' : 'bg-green-900'}`}>
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full ml-1"></div>
                </div>
            </div>
        );
    }
    return (
        <div className={`w-10 h-10 rounded-full ${active ? 'bg-white' : 'bg-green-900/20'}`} />
    );
};

const Navigation = () => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-900/80 rounded-full p-2">
            <div className="flex items-center gap-2">
                <NavIcon active />
                <NavIcon />
                <NavIcon />
                <NavIcon />
                <NavIcon isLast active />
            </div>
        </div>
    );
};

export default Navigation;