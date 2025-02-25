import { useWordPress } from '../context/WordPressContext';
import { Link } from 'react-router-dom';

export function Products() {
    const { products, loading, error } = useWordPress();

    console.log('Products component render:', {
        productsLength: products?.length,
        firstProduct: products?.[0],
        loading,
        error
    });

    if (loading) {
        return (
            <div className="p-4 text-center">
                <div className="text-xl">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-600">
                <h2 className="text-xl font-bold">Error Loading Products:</h2>
                <pre className="mt-2 p-2 bg-red-100 rounded">{error}</pre>
            </div>
        );
    }

    if (!products?.length) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">No products found</h2>
                <pre className="mt-2 p-2 bg-gray-100 rounded">
                    {JSON.stringify({ products, loading, error }, null, 2)}
                </pre>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Our Products ({products.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    console.log('Rendering product:', product);
                    return (
                        <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
                            {product.images?.[0] && (
                                <img
                                    src={product.images[0].src}
                                    alt={product.images[0].alt || product.name}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        console.error('Image load error:', e);
                                        e.currentTarget.src = 'fallback-image-url';
                                    }}
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                {product.short_description && (
                                    <div
                                        className="text-gray-600 mb-4 text-sm"
                                        dangerouslySetInnerHTML={{ __html: product.short_description }}
                                    />
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">
                                        {product.sale_price ? (
                                            <>
                                                <span className="line-through text-gray-400 mr-2">
                                                    ${product.regular_price}
                                                </span>
                                                ${product.sale_price}
                                            </>
                                        ) : (
                                            `$${product.regular_price || product.price}`
                                        )}
                                    </span>
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 