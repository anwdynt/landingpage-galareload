export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    image: string;
    color: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Cara Memulai Bisnis Pulsa dari Nol",
        slug: "cara-memulai-bisnis-pulsa-dari-nol",
        excerpt: "Panduan lengkap bagi pemula yang ingin terjun ke dunia bisnis server pulsa dengan modal minim namun keuntungan maksimal.",
        content: `
            <p class="lead">Memulai bisnis pulsa bisa menjadi langkah awal yang menjanjikan untuk kemandirian finansial. Dengan modal yang relatif kecil, Anda bisa menjangkau pangsa pasar yang sangat luas karena pulsa dan kuota internet kini telah menjadi kebutuhan pokok.</p>
            
            <p>Di era digital ini, kebutuhan akan konektivitas tidak pernah surut. Hampir setiap orang memiliki smartphone dan membutuhkan pulsa atau data untuk tetap terhubung. Inilah peluang emas yang bisa Anda manfaatkan.</p>

            <h3>1. Persiapan Modal Mental dan Materi</h3>
            <p>Banyak orang berpikir bisnis pulsa butuh modal jutaan. Salah besar! Anda bisa memulai hanya dengan:</p>
            <ul>
                <li>Smartphone (Android/iOS) yang Anda gunakan sehari-hari.</li>
                <li>Deposit awal minimal <strong>Rp 50.000</strong>.</li>
                <li>Niat dan ketekunan untuk melayani pelanggan.</li>
            </ul>
            
            <h3>2. Memilih Server Terpercaya</h3>
            <p>Kunci sukses bisnis pulsa adalah kecepatan transaksi dan kestabilan harga. Jangan tergiur harga terlalu murah tapi transaksi sering gagal. Pilihlah mitra seperti <strong>Gala Reload</strong> yang menawarkan:</p>
            <ul>
                <li>Transaksi 24 Jam Non-stop.</li>
                <li>Customer Service responsif.</li>
                <li>Produk lengkap (Pulsa, Data, Token PLN, E-Wallet).</li>
            </ul>

            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" alt="Ilustrasi Bisnis" class="my-8 rounded-xl shadow-lg w-full object-cover h-64" />

            <h3>3. Strategi Pemasaran Sederhana</h3>
            <p>Mulailah dari lingkungan terdekat. Tawarkan ke keluarga, teman kuliah, atau rekan kerja. Anda juga bisa memanfaatkan status WhatsApp untuk promosi.</p>
            
            <blockquote>
                "Kunci dari bisnis jasa adalah kepercayaan. Layani satu pelanggan dengan baik, maka dia akan membawa sepuluh pelanggan baru untuk Anda."
            </blockquote>

            <h3>4. Pembukuan itu Penting!</h3>
            <p>Jangan campurkan uang pribadi dengan modal usaha. Sekecil apapun untungnya, catatlah. Gala Reload menyediakan fitur <em>Web Report</em> untuk memudahkan Anda memantau riwayat transaksi dan keuntungan harian.</p>

            <p>Selamat mencoba dan semoga sukses menjadi juragan pulsa!</p>
        `,
        date: "12 Okt 2025",
        author: "Admin Gala",
        category: "Bisnis",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: 2,
        title: "Keuntungan Fitur Web Report bagi Agen",
        slug: "keuntungan-fitur-web-report-bagi-agen",
        excerpt: "Optimalkan pembukuan dan monitoring transaksi Anda dengan fitur Web Report yang realtime dan akurat.",
        content: `
            <p>Pembukuan yang rapi adalah ciri bisnis yang sehat. Seringkali agen pulsa pemula gulung tikar bukan karena tidak lari, tapi karena uang modal terpakai akibat tidak adanya pencatatan yang jelas.</p>
            
            <p>Gala Reload menghadirkan fitur <strong>Web Report</strong> sebagai asisten pribadi Anda dalam mengelola bisnis.</p>
            
            <h3>Apa itu Web Report?</h3>
            <p>Web Report adalah dashboard berbasis web yang memungkinkan Anda melihat seluruh aktivitas transaksi akun Anda secara detail dan realtime.</p>

            <h3>Fitur Unggulan:</h3>
            <ul>
                <li><strong>Rekap Transaksi:</strong> Lihat status sukses/gagal transaksi detik itu juga.</li>
                <li><strong>Mutasi Saldo:</strong> Pantau aliran keluar masuk saldo agar transparan.</li>
                <li><strong>Laporan Laba Rugi:</strong> Ketahui berapa keuntungan bersih Anda hari ini, minggu ini, atau bulan ini.</li>
                <li><strong>Kelola Downline:</strong> Bagi Master Dealer, fitur ini vital untuk memantau performa agen di bawah jaringan Anda.</li>
            </ul>

            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Analisa Data" class="my-8 rounded-xl shadow-lg w-full object-cover h-64" />
            
            <h3>Cara Mengakses</h3>
            <p>Cukup login ke halaman Web Report Gala Reload menggunakan ID Agen dan PIN Anda. Pastikan Anda menjaga kerahasiaan password dan OTP saat login.</p>
        `,
        date: "15 Okt 2025",
        author: "Tech Team",
        category: "Fitur",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        color: "bg-purple-100 text-purple-800"
    },
    {
        id: 3,
        title: "Tips Aman Transaksi Digital di Era Modern",
        slug: "tips-aman-transaksi-digital",
        excerpt: "Jaga keamanan akun dan saldo Anda dengan mengikuti praktik terbaik keamanan siber yang kami rekomendasikan.",
        content: `
            <p>Kejahatan siber (cyber crime) semakin marak. Sebagai pebisnis digital, keamanan akun adalah prioritas nomor satu. Saldo di akun Anda adalah uang tunai, jagalah layaknya dompet Anda sendiri.</p>

            <h3>Modus Penipuan yang Sering Terjadi:</h3>
            <ol>
                <li><strong>Social Engineering:</strong> Penipu mengaku sebagai CS Gala Reload dan meminta kode OTP.</li>
                <li><strong>Phishing:</strong> Link palsu yang menyerupai website resmi untuk mencuri password.</li>
                <li><strong>Hadiah Palsu:</strong> Iming-iming menang undian namun harus transfer sejumlah uang/pulsa.</li>
            </ol>

            <h3>Langkah Pencegahan:</h3>
            <ul>
                <li><strong>OTP itu RAHASIA:</strong> Jangan pernah berikan kode OTP/Login Link kepada SIAPAPUN, termasuk pihak yang mengaku CS Gala Reload. CS Resmi tidak pernah meminta OTP.</li>
                <li><strong>Ganti PIN Berkala:</strong> Ubah PIN transaksi Anda minimal sebulan sekali. Hindari tanggal lahir.</li>
                <li><strong>Verifikasi Resmi:</strong> Selalu cek informasi melalui channel resmi Gala Reload (Aplikasi/Website).</li>
            </ul>

            <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80" alt="Keamanan Siber" class="my-8 rounded-xl shadow-lg w-full object-cover h-64" />

            <p>Ingat, keamanan dimulai dari diri sendiri. <em>Be Smart, Be Safe!</em></p>
        `,
        date: "20 Okt 2025",
        author: "Security",
        category: "Tips",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        color: "bg-green-100 text-green-800"
    },
    {
        id: 4,
        title: "Mengenal Jalur Transaksi: Jabber, IP, & SMS",
        slug: "mengenal-jalur-transaksi-jabber-ip-sms",
        excerpt: "Perbandingan mendalam mengenai berbagai jalur transaksi yang tersedia di Gala Reload untuk kecepatan maksimal.",
        content: `
            <p>Dalam dunia server pulsa, "jalur" adalah jalan yang dilalui request transaksi Anda menuju server pusat. Memilih jalur yang tepat bisa mempercepat transaksi hingga hitungan detik.</p>

            <h3>1. Jalur IP (Aplikasi/Web)</h3>
            <p>Ini adalah jalur paling populer dan direkomendasikan saat ini. Transaksi dikirim via koneksi internet.</p>
            <ul>
                <li><strong>Kelebihan:</strong> Sangat cepat, biaya gratis (pakai kuota), realtime.</li>
                <li><strong>Kekurangan:</strong> Butuh koneksi internet stabil.</li>
            </ul>

            <h3>2. Jalur Jabber/XMPP</h3>
            <p>Biasanya digunakan oleh pengguna H2H (Host to Host) atau pengguna aplikasi pihak ketiga.</p>
            <ul>
                <li><strong>Kelebihan:</strong> Ringan, cepat, enkripsi aman.</li>
                <li><strong>Kekurangan:</strong> Setup awal sedikit teknis.</li>
            </ul>

            <h3>3. Jalur SMS</h3>
            <p>Jalur klasik yang masih diandalkan.</p>
            <ul>
                <li><strong>Kelebihan:</strong> Bisa digunakan di HP jadul, tidak butuh internet (sinyal EDGE/GPRS bisa).</li>
                <li><strong>Kekurangan:</strong> Ada biaya SMS (tergantung operator), ada delay jika trafik operator padat.</li>
            </ul>

            <p>Di Gala Reload, kami mendukung semua jalur tersebut untuk memastikan transaksi Anda tetap jalan apapun kondisinya.</p>
        `,
        date: "25 Okt 2025",
        author: "Dev Ops",
        category: "Teknis",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        color: "bg-orange-100 text-orange-800"
    },
    {
        id: 5,
        title: "Strategi Marketing untuk Konter Pulsa",
        slug: "strategi-marketing-untuk-konter-pulsa",
        excerpt: "Tingkatkan omzet konter Anda dengan strategi pemasaran sederhana yang sering dilupakan oleh pebisnis pemula.",
        content: `
            <p>Punya konter fisik? Jangan hanya duduk menunggu pembeli. Lakukan strategi jemput bola dan retensi pelanggan.</p>

            <h3>Ide Promo Kreatif:</h3>
            <ul>
                <li><strong>Paket Hemat:</strong> "Beli Pulsa 100rb + Token PLN 50rb, Gratis Admin!"</li>
                <li><strong>Kartu Member:</strong> "Kumpulkan 10 stempel transaksi, Gratis Pulsa 5.000."</li>
                <li><strong>Giveaway Kecil:</strong> Untuk pelanggan setia di akhir bulan.</li>
            </ul>

            <h3>Tampilan Konter:</h3>
            <p>Pastikan daftar harga jelas dan mudah dibaca (gunakan layar TV atau spanduk bersih). Konter yang terang dan bersih lebih mengundang pembeli daripada yang gelap dan kusam.</p>

            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" alt="Marketing Plan" class="my-8 rounded-xl shadow-lg w-full object-cover h-64" />
            
            <p>Sukses selalu untuk usaha Anda!</p>
        `,
        date: "01 Nov 2025",
        author: "Marketing",
        category: "Strategi",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
        color: "bg-pink-100 text-pink-800"
    }
];
