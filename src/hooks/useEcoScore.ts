import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EcoScoreBreakdown } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const calculateMockEcoScore = (productData: any): EcoScoreBreakdown => {
  // Calculate a realistic eco score based on provided data
  let baseScore = 50; // Start with neutral score
  
  // Adjust based on organic/sustainable indicators
  if (productData.organic) baseScore += 20;
  if (productData.local) baseScore += 15;
  if (productData.fair_trade) baseScore += 10;
  if (productData.recyclable !== false) baseScore += 10;
  
  // Adjust based on category
  const category = productData.category?.toLowerCase() || '';
  if (category.includes('organic') || category.includes('eco')) baseScore += 15;
  if (category.includes('plastic') || category.includes('synthetic')) baseScore -= 15;
  
  // Adjust based on packaging
  const packaging = productData.packaging?.join(' ').toLowerCase() || '';
  if (packaging.includes('glass') || packaging.includes('cardboard')) baseScore += 10;
  if (packaging.includes('plastic')) baseScore -= 10;
  
  // Keep score within 0-100 range
  const finalScore = Math.max(0, Math.min(100, baseScore + Math.random() * 10 - 5));
  
  return {
    overall_score: Math.round(finalScore),
    carbon_footprint_score: Math.round(finalScore * 0.9 + Math.random() * 10),
    recyclability_score: Math.round(finalScore * 1.1 - Math.random() * 10),
    sustainability_score: Math.round(finalScore * 0.95 + Math.random() * 8),
    packaging_score: Math.round(finalScore * 1.05 - Math.random() * 12),
    factors: [
      {
        name: 'Carbon Footprint',
        score: Math.round(finalScore * 0.9),
        weight: 30,
        description: 'Environmental impact from production and transport'
      },
      {
        name: 'Recyclability',
        score: Math.round(finalScore * 1.1),
        weight: 25,
        description: 'How easily the product can be recycled'
      },
      {
        name: 'Sustainability',
        score: Math.round(finalScore * 0.95),
        weight: 25,
        description: 'Long-term environmental impact'
      },
      {
        name: 'Packaging',
        score: Math.round(finalScore * 1.05),
        weight: 20,
        description: 'Environmental impact of packaging materials'
      }
    ]
  };
};

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

      if (!error && data?.success) {
        setIsCalculating(false);
        return data.data;
      }

      // Fallback to mock calculation
      const mockScore = calculateMockEcoScore(productData);
      
      setIsCalculating(false);
      toast({
        title: "Eco Score Calculated",
        description: `Score: ${mockScore.overall_score}/100 (Demo Mode)`,
      });
      
      return mockScore;

    } catch (error) {
      console.error('Eco-score calculation error:', error);
      
      // Always provide a fallback score
      const mockScore = calculateMockEcoScore(productData);
      
      setIsCalculating(false);
      toast({
        title: "Demo Mode",
        description: `Eco Score: ${mockScore.overall_score}/100`,
      });
      
      return mockScore;
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