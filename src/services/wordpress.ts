const WP_API_URL = import.meta.env.VITE_WP_API_URL;
const WC_API_BASE = WP_API_URL.replace('/wp/v2', ''); // Remove /wp/v2 to get the base URL

interface Post {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    date: string;
    slug: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
    };
}

interface WooProduct {
    id: number;
    name: string;
    slug: string;
    price: string;
    regular_price: string;
    sale_price: string;
    description: string;
    short_description: string;
    images: Array<{
        id: number;
        src: string;
        alt: string;
    }>;
    stock_status: string;
    categories: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

export const WordPressService = {
    async getPosts(): Promise<Post[]> {
        try {
            const response = await fetch(`${WP_API_URL}/posts?_embed`);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    async getPost(slug: string): Promise<Post> {
        try {
            const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
            if (!response.ok) throw new Error('Network response was not ok');
            const posts = await response.json();
            return posts[0];
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    },

    async getPages(): Promise<Post[]> {
        try {
            const response = await fetch(`${WP_API_URL}/pages?_embed`);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Error fetching pages:', error);
            throw error;
        }
    },

    async getPage(slug: string): Promise<Post> {
        try {
            const response = await fetch(`${WP_API_URL}/pages?slug=${slug}&_embed`);
            if (!response.ok) throw new Error('Network response was not ok');
            const pages = await response.json();
            return pages[0];
        } catch (error) {
            console.error('Error fetching page:', error);
            throw error;
        }
    },

    async getProducts(): Promise<WooProduct[]> {
        try {
            const url = `${WC_API_BASE}/wc/v3/products?consumer_key=${import.meta.env.VITE_WC_CONSUMER_KEY}&consumer_secret=${import.meta.env.VITE_WC_CONSUMER_SECRET}`;
            console.log('Fetching products from:', url);

            const response = await fetch(url);
            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            console.log('Products data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    async getProduct(id: number): Promise<WooProduct> {
        try {
            const response = await fetch(
                `${WC_API_BASE}/wc/v3/products/${id}?consumer_key=${import.meta.env.VITE_WC_CONSUMER_KEY}&consumer_secret=${import.meta.env.VITE_WC_CONSUMER_SECRET}`
            );
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
}; 