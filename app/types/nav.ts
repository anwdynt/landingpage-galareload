import React from 'react';

export interface NavItem {
    name: string;
    link?: string;
    children?: {
        name: string;
        link: string;
        description?: string;
    }[];
}

export interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

export interface NavBodyProps {
    children: React.ReactNode;
    visible?: boolean;
}

export interface NavItemsProps {
    items: NavItem[];
}

export interface MobileNavProps {
    children: React.ReactNode;
    visible?: boolean;
}

export interface MobileNavMenuProps {
    isOpen: boolean;
    children: React.ReactNode;
}
