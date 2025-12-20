import { Phone, Smartphone } from "lucide-react";
export default function Footer() {
    return (
        <footer className="w-full bg-neutral-950 text-neutral-300">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* ABOUT */}
                <div>
                    <h3 className="text-white text-lg font-metropolis font-semibold mb-4">
                        Tentang Kami
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-400 font-google-sans">
                        Didirikan pada tahun 2015, Galareload lahir dari visi
                        untuk membantu bisnis Indonesia bertransformasi digital.
                        Berawal dari tim kecil yang passionate terhadap
                        teknologi, kini kami telah melayani lebih dari{' '}
                        <span className="text-white font-medium">
                            30.000 member
                        </span>{' '}
                        di seluruh Indonesia.
                    </p>
                </div>

                {/* ADDRESS */}
                <div>
                    <h3 className="text-white text-lg font-metropolis font-semibold mb-4">
                        Alamat
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-google-sans">
                        Jalan Batan Selatan No. 54, Miroto, Kec. Semarang
                        Tengah, Kota Semarang, Jawa Tengah 50134
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                        <p className="gap-2 flex"><Phone className="text-white w-4 h-auto" /> 024-3517625</p>
                        <p className="gap-2 flex"><Smartphone className="text-white w-4 h-auto" /> +62 851-9129-5757</p>
                    </div>
                </div>

                {/* NAVIGATION */}
                <div>
                    <h3 className="text-white text-lg font-metropolis font-semibold mb-4">
                        Navigasi
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400 font-google-sans">
                        <li className="hover:text-white transition">Fitur</li>
                        <li className="hover:text-white transition">Solusi</li>
                        <li className="hover:text-white transition">
                            Hubungi Kami
                        </li>
                        <li className="hover:text-white transition">
                            Tentang Kami
                        </li>
                        <li className="hover:text-white transition">FAQ</li>
                    </ul>
                </div>

                {/* PRODUCTS */}
                <div>
                    <h3 className="text-white text-lg font-metropolis font-semibold mb-4">
                        Produk & Layanan
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400 font-google-sans">
                        <li className="hover:text-white transition">
                            Harga Produk
                        </li>
                        <li className="hover:text-white transition">
                            Biaya Layanan
                        </li>
                        <li className="hover:text-white transition">
                            Kebijakan Privasi
                        </li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500">
                    <p>
                        © {new Date().getFullYear()} Galareload. All rights
                        reserved.
                    </p>
                    <p className="mt-2 md:mt-0">
                        Platform Server Pulsa Terintegrasi
                    </p>
                </div>
            </div>
        </footer>
    );
}
