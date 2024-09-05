import Link from 'next/link';
import React from 'react';

export default function SideBarItem({ Icon, title, link, isOpen }) {
    return (
        <Link href={link}>
            <div className={`flex items-start justify-start w-full py-2 ${isOpen ? 'px-3' : 'justify-start'}`}>
                <Icon className="w-5 h-5" />
                {isOpen && <span className="ml-3 text-sm">{title}</span>}
            </div>
        </Link>
    );
}
