import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BarcodeProduct } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const useBarcodeAPI = () => {
  const [isLooking, setIsLooking] = useState(false);
  const { toast } = useToast();

  const lookupBarcode = async (barcode: string): Promise<BarcodeProduct | null> => {
    setIsLooking(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('barcode-lookup', {
        body: { barcode }
      });

      if (error) {
        console.error('Barcode lookup error:', error);
        toast({
          title: "Lookup Failed",
          description: "Failed to lookup barcode. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      if (!data?.success) {
        toast({
          title: "Product Not Found",
          description: "This barcode was not found in our database.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Product Found!",
        description: `Found: ${data.data.product_name}`,
      });

      return data.data;
    } catch (error) {
      console.error('Barcode API error:', error);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLooking(false);
    }
  };

  return {
    lookupBarcode,
    isLooking
  };
};