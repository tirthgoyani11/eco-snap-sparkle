import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Alternative } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const useAlternatives = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateAlternatives = async (productData: {
    product_name: string;
    brand?: string;
    category?: string;
    eco_score?: number;
    price_range?: 'budget' | 'mid' | 'premium';
  }): Promise<Alternative[]> => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('alternatives', {
        body: productData
      });

      if (error) {
        console.error('Alternatives generation error:', error);
        toast({
          title: "Generation Failed",
          description: "Failed to generate alternatives. Please try again.",
          variant: "destructive",
        });
        return [];
      }

      if (!data?.success) {
        toast({
          title: "Generation Failed",
          description: data?.error || "Unknown error occurred",
          variant: "destructive",
        });
        return [];
      }

      if (data.data.length > 0) {
        toast({
          title: "Alternatives Found!",
          description: `Found ${data.data.length} eco-friendly alternatives`,
        });
      }

      return data.data;
    } catch (error) {
      console.error('Alternatives API error:', error);
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAlternatives,
    isGenerating
  };
};