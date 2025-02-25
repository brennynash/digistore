import React, { createContext, useContext, useState } from 'react';
import { CustomizationOption, ProductCustomization } from '../types/customization';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface CustomizationContextType {
  customizations: ProductCustomization[];
  addCustomization: (productId: string, option: CustomizationOption) => void;
  removeCustomization: (productId: string, optionId: string) => void;
  updateCustomization: (productId: string, option: CustomizationOption) => void;
  getProductCustomizations: (productId: string) => CustomizationOption[];
  bulkAssignCustomization: (productIds: string[], option: CustomizationOption) => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [customizations, setCustomizations] = useState<ProductCustomization[]>(
    getLocalStorage('productCustomizations') || []
  );

  const saveCustomizations = (newCustomizations: ProductCustomization[]) => {
    setCustomizations(newCustomizations);
    setLocalStorage('productCustomizations', newCustomizations);
  };

  const addCustomization = (productId: string, option: CustomizationOption) => {
    const newCustomizations = [...customizations];
    const productIndex = newCustomizations.findIndex(c => c.productId === productId);

    if (productIndex === -1) {
      newCustomizations.push({ productId, options: [option] });
    } else {
      newCustomizations[productIndex].options.push(option);
    }

    saveCustomizations(newCustomizations);
  };

  const removeCustomization = (productId: string, optionId: string) => {
    const newCustomizations = customizations.map(custom => {
      if (custom.productId === productId) {
        return {
          ...custom,
          options: custom.options.filter(opt => opt.id !== optionId)
        };
      }
      return custom;
    }).filter(custom => custom.options.length > 0);

    saveCustomizations(newCustomizations);
  };

  const updateCustomization = (productId: string, option: CustomizationOption) => {
    const newCustomizations = customizations.map(custom => {
      if (custom.productId === productId) {
        return {
          ...custom,
          options: custom.options.map(opt => 
            opt.id === option.id ? option : opt
          )
        };
      }
      return custom;
    });

    saveCustomizations(newCustomizations);
  };

  const getProductCustomizations = (productId: string) => {
    const product = customizations.find(c => c.productId === productId);
    return product?.options || [];
  };

  const bulkAssignCustomization = (productIds: string[], option: CustomizationOption) => {
    const newCustomizations = [...customizations];
    
    productIds.forEach(productId => {
      const productIndex = newCustomizations.findIndex(c => c.productId === productId);
      
      if (productIndex === -1) {
        newCustomizations.push({ productId, options: [option] });
      } else {
        const existingOption = newCustomizations[productIndex].options.find(
          opt => opt.id === option.id
        );
        
        if (!existingOption) {
          newCustomizations[productIndex].options.push(option);
        }
      }
    });

    saveCustomizations(newCustomizations);
  };

  return (
    <CustomizationContext.Provider value={{
      customizations,
      addCustomization,
      removeCustomization,
      updateCustomization,
      getProductCustomizations,
      bulkAssignCustomization
    }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};