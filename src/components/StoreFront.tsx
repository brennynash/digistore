@@ .. @@
 export const StoreFront = () => {
   return (
     <div className="min-h-screen bg-black grid-pattern">
       <NewsMarquee />
       <Header />
       
   )
 }
-      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
+      <main className="max-w-7xl mx-auto px-6 py-4 sm:py-8 space-y-6 sm:space-y-12">
         <Hero />
         <GifSection />
         <ProductGrid />
         <Stats />
       </main>