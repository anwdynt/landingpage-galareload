import type { RawCategoryResponse, RawOperatorResponse } from "~/types/pricing";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const baseUrl = API_URL;
    const url = `${baseUrl}${endpoint}`;
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            console.error(`Fetch failed for ${url}: ${response.status} ${response.statusText}`);
            throw new Error(`API Error: ${response.statusText} (${response.status}) at ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error details:", error);
        throw error;
    }
}

export async function getCategories() {
    const rawCategories: RawCategoryResponse[] = await fetchWithAuth('getTipe');
    return rawCategories.map(item => ({
        id: item.catatan,
        name: item.catatan
    }));
}

export async function getOperators(category: string) {
    const rawOperators: RawOperatorResponse[] = await fetchWithAuth(`getOperator?tipe=${category}`);
    const opList = rawOperators.map(op => op.operator);
    return ['all', ...opList];
}

export async function getProducts(tipe: string, operator: string) {
    return await fetchWithAuth('hargaGala', {
        method: 'POST',
        body: JSON.stringify({
            tipe,
            operator: operator === 'all' ? '' : operator
        })
    });
}

export async function exportPriceList() {
    return await fetchWithAuth('exportHarga', {
        method: 'GET',
    });
}
