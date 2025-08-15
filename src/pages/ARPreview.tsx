import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ScoreRing";
import { EcoBadge } from "@/components/EcoBadge";
import { 
  Smartphone, 
  Camera, 
  Scan, 
  Eye,
  Zap,
  Download,
  Share2,
  Play
} from "lucide-react";

export default function ARPreview() {
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
            {" "}Preview
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience augmented reality shopping with real-time eco scores floating above products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Side - AR Preview */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Phone Frame with AR Demo */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                AR Experience Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto max-w-sm">
                {/* Phone Frame */}
                <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl">
                  <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                    {/* Screen Content */}
                    <div className="relative h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                      {/* Simulated Camera View Background */}
                      <div className="absolute inset-0 bg-[url('/api/placeholder/300/600')] bg-cover bg-center opacity-50" />
                      
                      {/* AR Overlay - Product with Floating Eco Score */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          {/* Product Image */}
                          <motion.div
                            animate={{ 
                              y: [0, -5, 0],
                              rotateY: [0, 5, 0, -5, 0]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity,
                              ease: "easeInOut" 
                            }}
                            className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center"
                          >
                            <img
                              src="/api/placeholder/100/100"
                              alt="Product"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          </motion.div>

                          {/* Floating Eco Score Chip */}
                          <motion.div
                            animate={{ 
                              y: [-10, -15, -10],
                              rotate: [0, 2, 0, -2, 0]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut" 
                            }}
                            className="absolute -top-8 -right-4"
                          >
                            <div className="glass-card p-3 rounded-full animate-pulse-glow">
                              <ScoreRing score={85} size="sm" animated={false} />
                            </div>
                          </motion.div>

                          {/* Floating Eco Badges */}
                          <motion.div
                            animate={{ 
                              y: [0, -3, 0],
                              x: [0, 2, 0]
                            }}
                            transition={{ 
                              duration: 2.5, 
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.5
                            }}
                            className="absolute -bottom-4 -left-6"
                          >
                            <div className="flex gap-1">
                              <EcoBadge type="organic" size="sm" animated={false} />
                              <EcoBadge type="recyclable" size="sm" animated={false} />
                            </div>
                          </motion.div>

                          {/* Scan Lines Animation */}
                          <motion.div
                            animate={{ scaleY: [0, 1, 0] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              ease: "easeInOut" 
                            }}
                            className="absolute inset-0 border-2 border-primary/50 rounded-2xl"
                          />
                        </div>
                      </div>

                      {/* AR UI Elements */}
                      <div className="absolute top-4 left-4 right-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Camera className="h-3 w-3 mr-1" />
                            AR Mode
                          </Badge>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                            <Eye className="h-3 w-3 mr-1" />
                            Product Detected
                          </Badge>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="glass-card p-3 rounded-xl">
                          <h4 className="font-semibold text-sm text-white mb-1">
                            Organic Cotton T-Shirt
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-300">EcoWear Brand</span>
                            <div className="flex items-center gap-1 text-xs text-green-400">
                              <Zap className="h-3 w-3" />
                              High Sustainability
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone Details */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Play className="h-4 w-4 mr-2" />
                  Try AR Demo
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 glass-button">
                    <Download className="h-4 w-4 mr-2" />
                    Download App
                  </Button>
                  <Button variant="outline" className="flex-1 glass-button">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Features & Info */}
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
                  title: "Real-time Recognition",
                  description: "Instantly identify products through your camera with AI-powered computer vision."
                },
                {
                  icon: Zap,
                  title: "Live Eco Scores",
                  description: "See sustainability ratings floating above products in real-time."
                },
                {
                  icon: Scan,
                  title: "Instant Alternatives",
                  description: "Get suggestions for better eco-friendly options with a single tap."
                },
                {
                  icon: Smartphone,
                  title: "Mobile Optimized",
                  description: "Smooth AR experience optimized for all modern smartphones."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg glass-button"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>How AR Shopping Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Point Your Camera",
                  description: "Open the app and point your camera at any product in a store."
                },
                {
                  step: "02",
                  title: "AI Recognition",
                  description: "Our AI instantly recognizes the product and analyzes its sustainability."
                },
                {
                  step: "03",
                  title: "AR Overlay",
                  description: "See eco scores, badges, and alternatives floating above the product."
                },
                {
                  step: "04",
                  title: "Make Better Choices",
                  description: "Use the information to make more sustainable purchasing decisions."
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Tech Specs */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-1">iOS</h5>
                  <p className="text-muted-foreground text-xs">iOS 12.0 or later</p>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Android</h5>
                  <p className="text-muted-foreground text-xs">Android 8.0 (API 26)</p>
                </div>
                <div>
                  <h5 className="font-medium mb-1">ARCore</h5>
                  <p className="text-muted-foreground text-xs">Required for Android</p>
                </div>
                <div>
                  <h5 className="font-medium mb-1">ARKit</h5>
                  <p className="text-muted-foreground text-xs">Required for iOS</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Badge variant="secondary" className="mr-2">GPU Accelerated</Badge>
                <Badge variant="secondary" className="mr-2">Machine Learning</Badge>
                <Badge variant="secondary">Real-time Processing</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}