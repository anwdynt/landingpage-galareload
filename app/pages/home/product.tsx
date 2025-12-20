import { Carousel, Card } from '~/components/ui/apple-cards-carousel';

export default function Product() {
    const cards = data.map((card, index) => <Card key={index} card={card} />);

    return (
        <div className="w-full h-full max-w-7xl container mx-auto">
            <Carousel items={cards} cardsData={data} />
        </div>
    );
}

const data = [
    {
        description:
            'Aplikasi penjualan Pulsa & PPOB lengkap dengan fitur terbaik dan harga yang terjangkau.',
        title: 'Aplikasi Galareload',
        src: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'https://www.youtube.com/embed/SVCBA-pBgt0',
    },
    {
        description:
            'Buat aplikasi dengan brandmu sendiri dengan dukungan webreport canggih dan mudah digunakan.',
        title: 'Gala Whitelabel',
        src: 'https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'https://www.youtube.com/embed/SVCBA-pBgt0',
    },
    {
        description:
            'Bangun jaringan, raih pencapaian besar, dan nikmati berbagai reward spesial setiap langkahnya.',
        title: 'Master Dealer',
        src: 'https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'https://www.youtube.com/embed/SVCBA-pBgt0',
    },
    {
        description:
            'Tambah supplier host to host dengan sistem cepat, stabil, dan harga kompetitif.',
        title: 'Host to Host',
        src: 'https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: 'https://www.youtube.com/embed/SVCBA-pBgt0',
    },
];
