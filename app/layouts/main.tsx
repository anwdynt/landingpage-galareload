import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavMenu,
    MobileNavToggle,
    NavbarLogo,
    NavbarButton,
} from '~/components/ui/resizeable-navbar';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import Footer from '~/components/ui/footer';

export default function TitleLayout() {
    const [open, setOpen] = useState(false);
    const [mobileSub, setMobileSub] = useState<number | null>(null);

    const navItems = [
        { name: 'Home', link: '/' },
        {
            name: 'Produk',
            children: [
                {
                    name: 'Aplikasi Galareload',
                    link: '/product/aplikasi-galareload',
                    description: 'Aplikasi server pulsa untuk transaksi cepat, aman, dan mudah digunakan.',
                },
                {
                    name: 'Galareload Whitelabel',
                    link: '/product/whitelabel-galareload',
                    description: 'Bangun aplikasi pulsa dengan brand, logo, dan identitas bisnis Anda sendiri.',
                },
                {
                    name: 'Host to Host Galareload',
                    link: '/product/host-to-host-galareload',
                    description: 'Integrasi sistem langsung ke server Galareload untuk transaksi real-time yang stabil.',
                },
                {
                    name: 'Master Dealer Galareload',
                    link: '/product/master-dealer-galareload',
                    description: 'Bangun jaringan agen dan kembangkan bisnis Anda dengan Master Dealer Galareload.',
                },
            ],

        },
        { name: 'Pricing', link: '#pricing' },
        { name: 'Contact', link: '#contact' },
    ];

    return (
        <div className="relative w-full">
            <Navbar>
                {/* DESKTOP */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                </NavBody>

                {/* MOBILE */}
                <MobileNav>
                    <div className="flex items-center justify-between">
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={open}
                            onClick={() => setOpen(!open)}
                        />
                    </div>

                    <MobileNavMenu isOpen={open}>
                        {navItems.map((item, idx) => (
                            <div key={idx}>
                                <button
                                    className="flex w-full justify-between text-left font-medium"
                                    onClick={() =>
                                        setMobileSub(
                                            mobileSub === idx ? null : idx
                                        )
                                    }
                                >
                                    {item.name}
                                    {item.children && (
                                        <ChevronDown className="w-4" />
                                    )}
                                </button>

                                {mobileSub === idx && item.children && (
                                    <div className="ml-4 mt-2 flex flex-col gap-2">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.name}
                                                href={child.link}
                                                className="text-sm text-neutral-600"
                                                onClick={() => setOpen(false)}
                                            >
                                                {child.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            <main className="w-full">
                <Outlet />
                <Footer />
            </main>
        </div>
    );
}
