import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/FeatureTile";
import { TestimonialCard } from "@/components/TestimonialCard";
import { ParticleField } from "@/components/ParticleField";
import { 
  Scan, 
  Play, 
  Sparkles, 
  Shield, 
  Zap, 
  Leaf, 
  Users, 
  Award,
  ArrowRight,
  Camera,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI-Powered Scanner",
    description: "Instantly scan any product with your camera to get detailed eco-impact analysis and sustainability scores."
  },
  {
    icon: Sparkles,
    title: "Smart Alternatives",
    description: "Discover eco-friendly alternatives with better sustainability scores and environmental impact ratings."
  },
  {
    icon: BarChart3,
    title: "Impact Tracking", 
    description: "Track your environmental impact over time and see how your choices make a difference for the planet."
  },
  {
    icon: Shield,
    title: "Verified Data",
    description: "All product data is verified through multiple sources to ensure accuracy and trustworthiness."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of eco-conscious consumers working together for a sustainable future."
  },
  {
    icon: Award,
    title: "Gamified Experience",
    description: "Earn points, unlock achievements, and compete on leaderboards while making eco-friendly choices."
  }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Environmental Advocate",
    avatar: "/api/placeholder/40/40",
    content: "EcoSnap AI has transformed how I shop. I can instantly see the environmental impact of products and find better alternatives. It's like having an eco-expert in my pocket!",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Sustainable Living Enthusiast",
    avatar: "/api/placeholder/40/40", 
    content: "The AI recommendations are spot-on. I've reduced my carbon footprint by 40% just by following the app's suggestions. The gamification keeps me motivated!",
    rating: 5
  },
  {
    name: "Maria Rodriguez",
    role: "Green Business Owner",
    avatar: "/api/placeholder/40/40",
    content: "I use EcoSnap to verify the sustainability claims of products for my eco-friendly store. The data is reliable and helps me stock truly sustainable products.",
    rating: 5
  }
];

const steps = [
  {
    number: "01",
    title: "Scan Product",
    description: "Point your camera at any product barcode or packaging"
  },
  {
    number: "02", 
    title: "Get Eco Score",
    description: "Instantly receive a comprehensive sustainability rating"
  },
  {
    number: "03",
    title: "Find Alternatives", 
    description: "Discover better eco-friendly options with one tap"
  }
];

export default function Index() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 eco-gradient opacity-30" />
        <ParticleField count={30} />
        
        {/* Floating Orbs */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-12 rounded-3xl mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm font-medium mb-6"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                AI-Powered Sustainability Scanner
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              >
                Scan. Learn. 
                <br />
                Choose Better.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              >
                Discover the environmental impact of products instantly. 
                Make informed, sustainable choices with AI-powered insights.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/scanner">
                  <Button 
                    variant="premium"
                    size="xl"
                    className="group"
                  >
                    <Scan className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    Try the Scanner
                    <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  variant="glass" 
                  size="xl"
                  className="group"
                >
                  <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  View Demo
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Powerful Features for 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Eco-Conscious Choices
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform makes sustainable shopping effortless with cutting-edge technology and real-time data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureTile
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to start making better choices for the planet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20 -translate-y-1/2" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <Card className="glass-card text-center p-8 relative z-10">
                  <CardContent className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold"
                    >
                      {step.number}
                    </motion.div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of eco-conscious consumers making a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 eco-gradient opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 text-center rounded-3xl max-w-4xl mx-auto"
          >
            <Leaf className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Make a 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}Difference?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your sustainable journey today and be part of the solution for a greener tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/scanner">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-6 rounded-xl"
                >
                  <Scan className="h-5 w-5 mr-3" />
                  Start Scanning Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass-button text-lg px-8 py-6 rounded-xl"
                >
                  <Zap className="h-5 w-5 mr-3" />
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}