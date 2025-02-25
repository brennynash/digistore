@@ .. @@
         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           <Settings size={24} />
           Product Customization
         </h2>
       </div>
 
-      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
         {products.map(product => {
           const customizations = getProductCustomizations(product.id);
           const isSelected = selectedProduct === product.id;
         }
         )
         }
@@ .. @@