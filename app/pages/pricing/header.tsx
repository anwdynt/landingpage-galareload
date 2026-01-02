import { ColourfulText } from "~/components/ui/colorfull-text";

export function Header() {
    return (
        <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-metropolis dark:text-white mb-4">
                Daftar Harga Produk<ColourfulText text="." />
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 font-google-sans text-lg mx-auto">
                Temukan harga terbaik untuk kebutuhan bisnis Anda. Update harga realtime dan termurah.
            </p>
        </div>
    );
}
