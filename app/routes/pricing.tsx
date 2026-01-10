import { type ClientLoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/pricing";
import { useLoaderData } from "react-router";
import { Index } from "../pages/pricing";
import { getCategories, getOperators, getProducts } from "~/client/api/pricing";
import type { ProductItem, ApiProductGroup } from "~/types/pricing";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
    const url = new URL(request.url);
    const categoryParam = url.searchParams.get("category");
    const rawOperatorParam = url.searchParams.get("operator");

    const categories = await getCategories();
    const activeCategory = categoryParam || (categories.length > 0 ? categories[0].id : 'all');

    let operators: string[] = ['all'];
    if (activeCategory !== 'all') {
        operators = await getOperators(activeCategory);
    }

    let activeOperator = rawOperatorParam;
    if (!activeOperator && operators.length > 1) {
        activeOperator = operators[1];
    } else if (!activeOperator) {
        activeOperator = 'all';
    }

    // 3. Fetch Products
    let products: ProductItem[] = [];
    if (activeCategory !== 'all') {
        try {
            // Fetch data
            const result = await getProducts(activeCategory, activeOperator === 'all' ? '' : activeOperator);

            // Normalize to array of groups
            let groups: ApiProductGroup[] = [];
            if (Array.isArray(result)) {
                groups = result;
            } else if (result && typeof result === 'object') {
                // Check if it's a single group object or wrapper
                if ('operator' in result && 'detail' in result) {
                    groups = [result as ApiProductGroup];
                } else if ('data' in result && Array.isArray(result.data)) {
                    groups = result.data;
                }
            }

            // Flatten to ProductItem[]
            products = groups.flatMap(group => {
                if (!group.detail || !Array.isArray(group.detail)) return [];
                return group.detail.map(item => ({
                    category: activeCategory,
                    provider: group.operator, // Use the operator name from the group level
                    code: item.kode,
                    product: item.nama,
                    price: item.harga_warga,
                    status: 'available' // Default since not in provided response snippet
                }));
            });

        } catch (e) {
            console.error("Failed to fetch products", e);
        }
    }

    return {
        categories,
        operators,
        products,
        activeCategory,
        activeOperator
    };
}

import { JsonLd } from "~/components/seo/json-ld";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Daftar Harga Pulsa & PPOB Termurah | Gala Reload' },
        { name: 'description', content: 'Cek daftar harga pulsa all operator, token listrik, paket data, dan voucher game termurah di Gala Reload. Update real-time.' },
        { name: 'keywords', content: 'harga pulsa termurah, daftar harga agen pulsa, harga token listrik, harga voucher game, harga ppob, bisnis pulsa untung' },
        { property: 'og:title', content: 'Daftar Harga Pulsa & PPOB Termurah | Gala Reload' },
        { property: 'og:description', content: 'Cek daftar harga pulsa all operator, token listrik, paket data, dan voucher game termurah.' },
    ];
}

export default function Pricing() {
    const data = useLoaderData<typeof clientLoader>();

    const pricingSchema = {
        "@context": "https://schema.org",
        "@type": "PriceListComponent",
        "name": "Daftar Harga Gala Reload",
        "description": "Daftar harga produk pulsa, paket data, dan PPOB Gala Reload.",
        "url": "https://galareload.id/pricing"
    };

    return (
        <>
            <JsonLd data={pricingSchema} />
            <Index
                pricingData={data.products}
                categories={data.categories}
                operators={data.operators}
                activeCategory={data.activeCategory}
                activeOperator={data.activeOperator}
            />
        </>
    );
}