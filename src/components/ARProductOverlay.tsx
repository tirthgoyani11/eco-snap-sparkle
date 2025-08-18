import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScoreRing } from "@/components/ScoreRing";
import { EcoBadge } from "@/components/EcoBadge";
import { 
  X, 
  ExternalLink, 
  Heart, 
  Share2, 
  ShoppingCart,
  Zap,
  Leaf
} from "lucide-react";

interface ARProductOverlayProps {
  product: any;
  isVisible: boolean;
  onClose: () => void;
  onAddToCart?: (product: any) => void;
  onViewDetails?: (product: any) => void;
}

export function ARProductOverlay({ 
  product, 
  isVisible, 
  onClose, 
  onAddToCart, 
  onViewDetails 
}: ARProductOverlayProps) {
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-safe"
        >
          <Card className="glass-card border-t-2 border-primary/20">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Product Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 rounded-xl bg-muted overflow-hidden flex-shrink-0"
                  >
                    <img
                      src="/api/placeholder/64/64"
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.brand}
                    </p>
                    
                    {/* Eco Score */}
                    <div className="flex items-center gap-3">
                      <ScoreRing score={product.ecoScore} size="sm" />
                      <div className="flex gap-1">
                        <EcoBadge type="organic" size="sm" />
                        <EcoBadge type="recyclable" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="rounded-full flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Leaf className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">Low Impact</div>
                  <div className="text-xs text-muted-foreground">12.4g CO₂</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Recyclable</div>
                  <div className="text-xs text-muted-foreground">100%</div>
                </div>
                
                <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Zap className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400">Organic</div>
                  <div className="text-xs text-muted-foreground">Certified</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    onClick={() => onViewDetails?.(product)}
                    variant="outline"
                    className="flex-1 glass-button group"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    View Details
                  </Button>
                  
                  <Button
                    onClick={() => onAddToCart?.(product)}
                    variant="premium"
                    className="flex-1 group"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setIsLiked(!isLiked)}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                    >
                      <Heart 
                        className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </motion.div>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1" />
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">$24.99</div>
                    <div className="text-xs text-muted-foreground">Free shipping</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}