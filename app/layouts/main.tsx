import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavMenu,
    MobileNavToggle,
    NavbarLogo,
} from '~/components/ui/resizeable-navbar';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Outlet, Link } from 'react-router';
import Footer from '~/components/ui/footer';
import { cn } from '~/lib/utils';

export default function TitleLayout() {
    const [open, setOpen] = useState(false);
    const [mobileSub, setMobileSub] = useState<number | null>(null);

    const navItems = [
        { name: 'Home', link: '/' },
        {
            name: 'Produk',
            children: [
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
        { name: 'Blog', link: '/blog' },
        { name: 'Harga', link: '/pricing' },
        { name: 'Contact', link: 'https://api.whatsapp.com/send/?phone=6281329701020&text=Saya+butuh+informasi+terkait+produk+Gala+Reload&type=phone_number&app_absent=0', target: '_blank' },
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
                                {item.children ? (
                                    <>
                                        <button
                                            className="flex w-full justify-between text-left font-medium"
                                            onClick={() =>
                                                setMobileSub(
                                                    mobileSub === idx ? null : idx
                                                )
                                            }
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={cn(
                                                    'w-4 transition-transform',
                                                    mobileSub === idx && 'rotate-180'
                                                )}
                                            />
                                        </button>

                                        {mobileSub === idx && (
                                            <div className="ml-4 mt-2 flex flex-col gap-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        to={child.link}
                                                        className="flex items-center gap-2 text-sm text-neutral-900 dark:text-neutral-300"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <ArrowRight className="w-4" />
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.link || '#'}
                                        target={item.target}
                                        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                                        className="flex w-full justify-between text-left font-medium"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
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
