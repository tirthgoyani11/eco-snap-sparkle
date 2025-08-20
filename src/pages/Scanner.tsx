import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ScoreRing";
import { ProductCard } from "@/components/ProductCard";
import { AlternativeCard } from "@/components/AlternativeCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { ScanningOverlay } from "@/components/ScanningOverlay";
import { useScannerMock } from "@/hooks/useScannerMock";
import { useToast } from "@/hooks/use-toast";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { 
  Scan, 
  Camera, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Sparkles
} from "lucide-react";

export default function Scanner() {
  const { state, result, startScan, reset, isScanning, hasResult, hasError } = useScannerMock();
  const { toast } = useToast();
  const { triggerHaptic } = useHapticFeedback();

  const handleScan = () => {
    triggerHaptic('medium');
    startScan();
    toast({
      title: "Scanning started",
      description: "Point your camera at the product barcode...",
    });
  };

  const handleSwap = (alternative: any) => {
    triggerHaptic('success');
    toast({
      title: "Great choice!",
      description: `Swapped to ${alternative.name} - ${alternative.savings}% better for the environment!`,
    });
  };

  const getStatusConfig = () => {
    switch (state) {
      case 'scanning':
        return {
          icon: Scan,
          label: 'Scanning...',
          color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
        };
      case 'found':
        return {
          icon: CheckCircle,
          label: 'Product Found',
          color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
        };
      case 'error':
        return {
          icon: AlertCircle,
          label: 'Scan Failed',
          color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
        };
      default:
        return {
          icon: Camera,
          label: 'Ready to Scan',
          color: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

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
          AI Product 
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {" "}Scanner
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Scan any product to discover its environmental impact and find sustainable alternatives.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Side - Scanner */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Camera Preview */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                {/* Simulated Camera View */}
                <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
                  {isScanning ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-center"
                    >
                      <LoadingSpinner size="lg" />
                      <p className="text-sm text-muted-foreground mt-4">
                        Analyzing product...
                      </p>
                    </motion.div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Point camera at product
                      </p>
                    </div>
                  )}
                </div>

                {/* Enhanced Scanning Overlay */}
                <ScanningOverlay isVisible={isScanning} progress={isScanning ? 75 : 0} />

                {/* Shimmer Effect when scanning */}
                {isScanning && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status & Scan Button */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <StatusIcon className="h-5 w-5" />
                  <span className="font-medium">Scanner Status</span>
                </div>
                <Badge className={statusConfig.color}>
                  {statusConfig.label}
                </Badge>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  variant="premium"
                  size="xl"
                  className="w-full group"
                >
                  <AnimatePresence mode="wait">
                    {isScanning ? (
                      <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <LoadingSpinner size="sm" />
                        Scanning...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="scan"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <Scan className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        Start Scan
                        <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>

                {(hasResult || hasError) && (
                  <Button
                    onClick={reset}
                    variant="glass"
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset Scanner
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Results */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorState
                  title="Scan Failed"
                  description="Unable to recognize the product. Please try again with better lighting or a clearer view of the barcode."
                  onRetry={handleScan}
                />
              </motion.div>
            )}

            {hasResult && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Product Result */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Product Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductCard 
                      product={result.product}
                      onViewDetails={(product) => {
                        toast({
                          title: "Product Details",
                          description: `Viewing details for ${product.name}`,
                        });
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Eco Score Details */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Eco Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Overall Sustainability</span>
                      <ScoreRing score={result.product.eco_score} size="md" />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carbon Footprint</span>
                          <span>{result.product.carbon_footprint}g CO₂</span>
                        </div>
                        <Progress value={100 - (result.product.carbon_footprint / 200) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recyclability</span>
                          <span>{result.product.recyclable ? '100%' : '0%'}</span>
                        </div>
                        <Progress value={result.product.recyclable ? 100 : 0} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Sustainability Score</span>
                          <span>{result.product.sustainable ? '95%' : '25%'}</span>
                        </div>
                        <Progress value={result.product.sustainable ? 95 : 25} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alternatives */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-secondary" />
                      Greener Alternatives
                      <Badge variant="secondary" className="ml-auto">
                        {result.alternatives.length} found
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.alternatives.map((alternative, index) => (
                      <motion.div
                        key={alternative.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AlternativeCard
                          alternative={alternative}
                          onSwap={handleSwap}
                          compact
                        />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {state === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <Card className="glass-card">
                  <CardContent className="p-12">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                    <h3 className="text-xl font-semibold mb-4">Ready to Scan</h3>
                    <p className="text-muted-foreground mb-6">
                      Click the scan button to analyze a product's environmental impact and discover sustainable alternatives.
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        AI-powered analysis
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Instant results
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Better alternatives
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}