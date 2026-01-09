export interface ProductItem {
    category: string;
    provider: string; // operator name from top level
    code: string;     // detail.kode
    product: string;  // detail.nama
    price: string;    // detail.harga_warga
    status: string;   // detail.status (if exists, else 'available')
}

export interface ApiProductDetail {
    kode: string;
    nama: string;
    harga_warga: string;
    catatan: string;
    status?: string;
}

export interface ApiProductGroup {
    operator: string;
    detail: ApiProductDetail[];
}

export interface RawCategoryResponse {
    catatan: string;
}

export interface RawOperatorResponse {
    operator: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface IndexProps {
    pricingData: ProductItem[];
    categories: Category[];
    operators: string[];
    activeCategory: string;
    activeOperator: string;
}
