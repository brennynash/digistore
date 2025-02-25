import { useWordPress } from '../context/WordPressContext';

export function BlogPosts() {
    const { posts, loading, error } = useWordPress();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <article key={post.id} className="border rounded-lg p-4">
                    {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                        <img
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post.title.rendered}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                    )}
                    <h2 className="text-xl font-bold mb-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                </article>
            ))}
        </div>
    );
} 