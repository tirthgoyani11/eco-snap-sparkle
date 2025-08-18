import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ARCamera } from "@/components/ARCamera";
import { ARProductOverlay } from "@/components/ARProductOverlay";
import { useToast } from "@/hooks/use-toast";
import { 
  Smartphone, 
  Camera, 
  Scan, 
  Eye,
  Zap,
  Download,
  Share2,
  Play,
  Info,
  Settings,
  Fullscreen
} from "lucide-react";

export default function ARPreview() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();

  const handleProductDetected = (product: any) => {
    // Auto-show overlay for detected products
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
    setSelectedProduct(null);
  };

  const handleViewDetails = (product: any) => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${product.name}`,
    });
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          AR 
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {" "}Experience
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Point your camera at products to see real-time eco scores and sustainable alternatives in AR.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Main AR Camera View */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Live AR Camera
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    onClick={handleFullscreen}
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Fullscreen className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ARCamera 
                onProductDetected={handleProductDetected}
                className="min-h-[400px] lg:min-h-[500px]"
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-3 gap-4"
          >
            <Button variant="glass" className="h-16 flex-col gap-2">
              <Scan className="h-5 w-5" />
              <span className="text-xs">Quick Scan</span>
            </Button>
            <Button variant="glass" className="h-16 flex-col gap-2">
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Share AR</span>
            </Button>
            <Button variant="glass" className="h-16 flex-col gap-2">
              <Download className="h-5 w-5" />
              <span className="text-xs">Save Image</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Side Panel - Features & Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* AR Features */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                AR Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Eye,
                  title: "Real-time Detection",
                  description: "Instantly identify products through your camera",
                  active: true
                },
                {
                  icon: Zap,
                  title: "Live Eco Scores",
                  description: "See sustainability ratings floating above products",
                  active: true
                },
                {
                  icon: Scan,
                  title: "Smart Alternatives",
                  description: "Get better eco-friendly suggestions instantly",
                  active: false
                },
                {
                  icon: Smartphone,
                  title: "Mobile Optimized",
                  description: "Smooth experience on all devices",
                  active: true
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                    feature.active 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'glass-button'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    feature.active 
                      ? 'bg-primary text-white' 
                      : 'bg-primary/10'
                  }`}>
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      {feature.active && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Tutorial */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                How to Use AR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Allow camera access when prompted",
                "Point camera at any product",
                "Wait for AR overlay to appear",
                "Tap on floating info for details"
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Download App CTA */}
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Get the Mobile App</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Experience full AR capabilities with our native mobile app
              </p>
              <Button variant="premium" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download App
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Product Overlay */}
      <ARProductOverlay
        product={selectedProduct}
        isVisible={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}