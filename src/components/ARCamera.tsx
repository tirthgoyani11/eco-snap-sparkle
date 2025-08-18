import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useCamera } from "@/hooks/useCamera";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { 
  Camera, 
  CameraOff, 
  AlertCircle, 
  Eye,
  Scan,
  Zap
} from "lucide-react";

interface ARCameraProps {
  onProductDetected?: (product: any) => void;
  className?: string;
}

export function ARCamera({ onProductDetected, className = "" }: ARCameraProps) {
  const { 
    isActive, 
    isLoading, 
    error, 
    hasPermission, 
    videoRef, 
    startCamera, 
    stopCamera 
  } = useCamera();
  
  const { triggerHaptic } = useHapticFeedback();
  const [isScanning, setIsScanning] = useState(false);
  const [detectedProducts, setDetectedProducts] = useState<any[]>([]);

  // Simulate product detection
  useEffect(() => {
    if (!isActive) return;

    const detectProducts = () => {
      // Simulate random product detection
      if (Math.random() > 0.7) {
        const mockProduct = {
          id: Math.random().toString(),
          name: "Organic Cotton T-Shirt",
          brand: "EcoWear",
          ecoScore: 85,
          position: {
            x: Math.random() * 60 + 20, // 20-80%
            y: Math.random() * 60 + 20, // 20-80%
          },
          confidence: Math.random() * 0.3 + 0.7, // 70-100%
        };
        
        setDetectedProducts(prev => [mockProduct]);
        onProductDetected?.(mockProduct);
        triggerHaptic('light');
      } else {
        setDetectedProducts([]);
      }
    };

    const interval = setInterval(detectProducts, 2000);
    return () => clearInterval(interval);
  }, [isActive, onProductDetected, triggerHaptic]);

  const handleStartCamera = async () => {
    triggerHaptic('medium');
    await startCamera();
  };

  const handleStopCamera = () => {
    triggerHaptic('light');
    stopCamera();
    setDetectedProducts([]);
  };

  const handleScan = () => {
    if (!isActive) return;
    
    setIsScanning(true);
    triggerHaptic('medium');
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      triggerHaptic('success');
    }, 2000);
  };

  return (
    <div className={`relative bg-black rounded-xl overflow-hidden ${className}`}>
      {/* Camera Feed */}
      <div className="relative aspect-video bg-gray-900">
        {isActive && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            autoPlay
          />
        )}
        
        {/* Camera Placeholder */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Camera feed will appear here</p>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm">Starting camera...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-red-900/20 flex items-center justify-center"
          >
            <div className="text-center text-white bg-red-500/20 backdrop-blur-md p-6 rounded-xl">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Camera Access Error</h3>
              <p className="text-sm text-red-200 mb-4">{error}</p>
              <Button 
                onClick={handleStartCamera}
                variant="outline"
                size="sm"
                className="text-white border-white/30"
              >
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

        {/* AR Overlays */}
        <AnimatePresence>
          {isActive && detectedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'absolute',
                left: `${product.position.x}%`,
                top: `${product.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="pointer-events-none"
            >
              {/* Product Detection Box */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                {/* Detection Frame */}
                <div className="w-24 h-24 border-2 border-primary/80 rounded-lg relative">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary" />
                </div>

                {/* Floating Info */}
                <motion.div
                  animate={{ y: [-5, -10, -5] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                >
                  <div className="glass-card px-3 py-2 rounded-full text-xs text-white font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-xs font-bold">
                        {product.ecoScore}
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Confidence Indicator */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                    {Math.round(product.confidence * 100)}% match
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Scanning Animation */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Scanning Lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{ top: `${20 + i * 15}%` }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Scanning Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_1px,transparent_1px)] [background-size:30px_30px] animate-pulse" />
          </motion.div>
        )}

        {/* Status Indicators */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="space-y-2">
            {isActive && (
              <Badge variant="secondary" className="bg-black/50 text-white">
                <Eye className="h-3 w-3 mr-1" />
                AR Active
              </Badge>
            )}
            {detectedProducts.length > 0 && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                <Scan className="h-3 w-3 mr-1" />
                {detectedProducts.length} Product{detectedProducts.length > 1 ? 's' : ''} Detected
              </Badge>
            )}
          </div>
          
          {isScanning && (
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              <Zap className="h-3 w-3 mr-1" />
              Analyzing...
            </Badge>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-center gap-4">
          {!isActive ? (
            <Button
              onClick={handleStartCamera}
              disabled={isLoading}
              variant="premium"
              size="lg"
              className="rounded-full"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
              {isLoading ? 'Starting...' : 'Start AR'}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleScan}
                disabled={isScanning}
                variant="premium"
                size="lg"
                className="rounded-full"
              >
                {isScanning ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Scan className="h-5 w-5" />
                )}
                {isScanning ? 'Scanning...' : 'Scan'}
              </Button>
              
              <Button
                onClick={handleStopCamera}
                variant="glass"
                size="lg"
                className="rounded-full"
              >
                <CameraOff className="h-5 w-5" />
                Stop
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}