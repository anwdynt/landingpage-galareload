import type { Route } from "./+types/privacy";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Kebijakan Privasi | Gala Reload" },
        {
            name: "description",
            content:
                "Kebijakan Privasi Gala Reload. Kami menghargai privasi dan perlindungan data pribadi Anda.",
        },
    ];
};

export default function PrivacyPolicy() {
    return (
        <div className="bg-white min-h-screen py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-left">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2 font-metropolis">
                    Kebijakan Privasi Gala Reload
                </h1>
                <p className="text-gray-600 mb-8 font-metropolis">
                    Tanggal Berlaku: 09 April 2025
                </p>

                <div className="space-y-8 text-base leading-7 text-gray-700 font-metropolis">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">PENDAHULUAN</h2>
                        <p className="mb-4">
                            Gala Reload menghargai privasi dan perlindungan data pribadi setiap
                            pengguna. Kebijakan Privasi ini disusun untuk menjelaskan bagaimana
                            kami mengumpulkan, menggunakan, mengelola, dan melindungi informasi
                            Anda saat Anda menggunakan layanan kami, baik melalui website maupun
                            aplikasi mobile.
                        </p>
                        <p>
                            Dengan menggunakan layanan Gala Reload, Anda menyetujui pengumpulan
                            dan penggunaan informasi sesuai dengan kebijakan ini. Kami
                            berkomitmen untuk menjaga kerahasiaan dan keamanan data pribadi
                            Anda, sesuai dengan ketentuan hukum yang berlaku di Indonesia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            1. Informasi yang Kami Kumpulkan
                        </h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Informasi Pribadi:</strong> Nama lengkap, alamat email,
                                nomor telepon, alamat, foto KTP/selfie (untuk keperluan
                                verifikasi).
                            </li>
                            <li>
                                <strong>Informasi Transaksi:</strong> Riwayat pembelian, isi ulang
                                pulsa, pembayaran tagihan, dan aktivitas lainnya.
                            </li>
                            <li>
                                <strong>Informasi Teknis:</strong> Alamat IP, jenis perangkat,
                                sistem operasi, browser, dan aktivitas log.
                            </li>
                            <li>
                                <strong>Data Lokasi:</strong> Jika Anda mengaktifkan izin lokasi,
                                kami dapat mengakses data lokasi Anda untuk meningkatkan layanan.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            2. Cara Kami Menggunakan Informasi Anda
                        </h2>
                        <p className="mb-2">Data yang kami kumpulkan digunakan untuk:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Menyediakan layanan isi ulang pulsa dan pembayaran digital.</li>
                            <li>Verifikasi dan validasi identitas pengguna.</li>
                            <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
                            <li>
                                Mengirimkan notifikasi, pembaruan, dan penawaran promosi (jika
                                disetujui).
                            </li>
                            <li>Mencegah penipuan dan aktivitas tidak sah.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            3. Penyimpanan dan Keamanan Data
                        </h2>
                        <p>
                            Kami menyimpan informasi Anda menggunakan sistem yang aman dengan
                            enkripsi dan prosedur keamanan untuk melindungi data dari akses
                            ilegal, kehilangan, atau kerusakan.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            4. Berbagi Informasi
                        </h2>
                        <p className="mb-2">
                            Kami tidak menjual informasi Anda ke pihak ketiga. Kami hanya
                            membagikan data jika:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Dibutuhkan oleh penyedia layanan pihak ketiga yang membantu
                                operasional kami (misalnya: sistem pembayaran, notifikasi).
                            </li>
                            <li>
                                Diminta oleh otoritas hukum yang sah sesuai hukum yang berlaku.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            5. Hak Pengguna
                        </h2>
                        <p className="mb-2">Sebagai pengguna, Anda berhak untuk:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Mengakses dan memeriksa data pribadi Anda.</li>
                            <li>Memperbarui atau memperbaiki informasi yang tidak akurat.</li>
                            <li>
                                Meminta penghapusan data pribadi (sesuai hukum yang berlaku).
                            </li>
                            <li>Menarik kembali persetujuan atas penggunaan data.</li>
                        </ul>
                        <p className="mt-2">
                            Permintaan dapat diajukan melalui kontak layanan pelanggan kami.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            6. Cookie dan Teknologi Pelacakan
                        </h2>
                        <p className="mb-2">
                            Kami menggunakan cookie dan teknologi serupa untuk memudahkan
                            navigasi, memahami preferensi pengguna, dan meningkatkan pengalaman
                            Anda di situs kami.
                        </p>
                        <p>
                            Anda dapat mengatur browser untuk menolak sebagian atau seluruh
                            cookie, namun hal ini dapat mempengaruhi fungsionalitas layanan.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            7. Tautan ke Situs Pihak Ketiga
                        </h2>
                        <p>
                            Layanan kami dapat mengandung tautan ke situs lain yang tidak
                            dioperasikan oleh kami. Kami tidak bertanggung jawab atas konten dan
                            kebijakan privasi dari situs tersebut.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            8. Perubahan atas Kebijakan Privasi
                        </h2>
                        <p>
                            Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan akan
                            diumumkan melalui halaman ini. Anda dianjurkan untuk memeriksa
                            kebijakan secara berkala.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            9. Hukum dan Peraturan yang Berlaku
                        </h2>
                        <p className="mb-2">
                            Kebijakan Privasi ini tunduk pada hukum dan peraturan yang berlaku
                            di Republik Indonesia, termasuk Undang-Undang No. 27 Tahun 2022
                            tentang Perlindungan Data Pribadi (UU PDP).
                        </p>
                        <p>
                            Setiap sengketa yang timbul dari penggunaan layanan atau kebijakan
                            ini akan diselesaikan terlebih dahulu secara musyawarah. Jika tidak
                            tercapai kesepakatan, akan diselesaikan melalui jalur hukum di
                            wilayah hukum Republik Indonesia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                            10. Hubungi Kami
                        </h2>
                        <p className="mb-2">
                            Jika Anda memiliki pertanyaan terkait kebijakan privasi ini, silakan
                            hubungi kami di:
                        </p>
                        <p>
                            <strong>Alamat:</strong> Jln Batan Selatan No. 54, Miroto, Semarang
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
