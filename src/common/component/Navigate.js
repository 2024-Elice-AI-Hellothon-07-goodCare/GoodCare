import React from 'react';
import { Home, ClipboardList, Heart, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavIcon = ({ Icon, active = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
            ${active ? 'bg-white text-green-900' : 'bg-green-900 text-white/70'}`}
        >
            <Icon size={20} />
        </div>
    );
};

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;



    const handleNavigation = (path) => {
        navigate(path);
    };

    const isHomePath = currentPath === '/home' || currentPath === '/caregiver/home';
    const isRoutinePath = currentPath.includes('/routine');
    const isHealthPath = currentPath.includes('/health');
    const isCommunityPath = currentPath.includes('/myinfo');

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-900 rounded-full p-2 flex items-center gap-2">
            <NavIcon
                Icon={Home}
                active={isHomePath}
                onClick={() => handleNavigation('/home')}
            />
            <NavIcon
                Icon={ClipboardList}
                active={isRoutinePath}
                onClick={() => handleNavigation('/routine/routine-main')}
            />
            <NavIcon
                Icon={Heart}
                active={isHealthPath}
                onClick={() => handleNavigation('/dashboard/health')}
            />
            <NavIcon
                Icon={Users}
                active={isCommunityPath}
                onClick={() => handleNavigation('/myinfo')}
            />

        </div>
    );
};

export default Navigation;