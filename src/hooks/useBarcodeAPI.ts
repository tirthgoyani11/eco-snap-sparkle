import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarcodeProduct } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Mock data for when API fails
const mockBarcodeData: Record<string, BarcodeProduct> = {
  '1234567890123': {
    code: '1234567890123',
    product_name: 'Organic Apple Juice',
    brands: 'Nature\'s Best',
    categories: 'Beverages, Fruit juices',
    ingredients_text: 'Organic apple juice from concentrate',
    packaging: 'Glass bottle',
    ecoscore_grade: 'a',
    nutriscore_grade: 'b',
    image_url: '/api/placeholder/200/200',
  },
  '9876543210987': {
    code: '9876543210987',
    product_name: 'Eco-Friendly Detergent',
    brands: 'Green Clean',
    categories: 'Household, Cleaning products',
    ingredients_text: 'Plant-based surfactants, essential oils',
    packaging: 'Recyclable bottle',
    ecoscore_grade: 'a',
    nutriscore_grade: undefined,
    image_url: '/api/placeholder/200/200',
  }
};

export const useBarcodeAPI = () => {
  const [isLooking, setIsLooking] = useState(false);
  const { toast } = useToast();

  const lookupBarcode = async (barcode: string): Promise<BarcodeProduct | null> => {
    setIsLooking(true);
    
    try {
      // First try Supabase function
      const { data, error } = await supabase.functions.invoke('barcode-lookup', {
        body: { barcode }
      });

      if (!error && data?.success) {
        setIsLooking(false);
        toast({
          title: "Product Found!",
          description: `Found: ${data.data.product_name}`,
        });
        return data.data;
      }

      // Fallback to mock data
      if (mockBarcodeData[barcode]) {
        setIsLooking(false);
        toast({
          title: "Product Found!",
          description: `Found: ${mockBarcodeData[barcode].product_name}`,
        });
        return mockBarcodeData[barcode];
      }

      // Generate a mock product for demo purposes
      const mockProduct: BarcodeProduct = {
        code: barcode,
        product_name: 'Sample Product',
        brands: 'Demo Brand',
        categories: 'General',
        ingredients_text: 'Sample ingredients',
        packaging: 'Standard packaging',
        ecoscore_grade: Math.random() > 0.5 ? 'a' : 'b',
        nutriscore_grade: 'b',
        image_url: '/api/placeholder/200/200',
      };

      setIsLooking(false);
      toast({
        title: "Demo Product",
        description: "This is a demo product for testing purposes.",
      });

      return mockProduct;

    } catch (error) {
      console.error('Barcode API error:', error);
      setIsLooking(false);
      
      // Fallback to mock data even on error
      const mockProduct: BarcodeProduct = {
        code: barcode,
        product_name: 'Sample Product (Demo)',
        brands: 'Demo Brand',
        categories: 'General',
        ingredients_text: 'Sample ingredients for demo',
        packaging: 'Standard packaging',
        ecoscore_grade: 'b',
        nutriscore_grade: 'c',
        image_url: '/api/placeholder/200/200',
      };

      toast({
        title: "Using Demo Data",
        description: "API unavailable, showing demo product.",
        variant: "default",
      });

      return mockProduct;
    } finally {
      setIsLooking(false);
    }
  };

  return {
    lookupBarcode,
    isLooking
  };
};