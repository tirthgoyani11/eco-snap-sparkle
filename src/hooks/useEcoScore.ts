import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EcoScoreBreakdown } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const useEcoScore = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const calculateEcoScore = async (productData: {
    product_name: string;
    brand?: string;
    category?: string;
    materials?: string[];
    packaging?: string[];
    ingredients?: string[];
    carbon_footprint?: number;
    recyclable?: boolean;
    organic?: boolean;
    local?: boolean;
    fair_trade?: boolean;
  }): Promise<EcoScoreBreakdown | null> => {
    setIsCalculating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('eco-score', {
        body: productData
      });

      if (error) {
        console.error('Eco-score calculation error:', error);
        toast({
          title: "Calculation Failed",
          description: "Failed to calculate eco-score. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      if (!data?.success) {
        toast({
          title: "Calculation Failed",
          description: data?.error || "Unknown error occurred",
          variant: "destructive",
        });
        return null;
      }

      return data.data;
    } catch (error) {
      console.error('Eco-score API error:', error);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    calculateEcoScore,
    isCalculating
  };
};