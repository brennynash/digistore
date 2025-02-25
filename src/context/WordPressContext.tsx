import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WordPressService } from '../services/wordpress';

interface WordPressContextType {
    posts: any[];
    pages: any[];
    products: any[];
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}

const WordPressContext = createContext<WordPressContextType | undefined>(undefined);

export function WordPressProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [postsData, pagesData, productsData] = await Promise.all([
                WordPressService.getPosts(),
                WordPressService.getPages(),
                WordPressService.getProducts()
            ]);
            setPosts(postsData);
            setPages(pagesData);
            setProducts(productsData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch WordPress data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <WordPressContext.Provider value={{ posts, pages, products, loading, error, refreshData: fetchData }}>
            {children}
        </WordPressContext.Provider>
    );
}

export function useWordPress() {
    const context = useContext(WordPressContext);
    if (context === undefined) {
        throw new Error('useWordPress must be used within a WordPressProvider');
    }
    return context;
} 