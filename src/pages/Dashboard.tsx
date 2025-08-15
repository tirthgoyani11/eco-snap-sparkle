import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPIStat } from "@/components/KPIStat";
import { ScoreRing } from "@/components/ScoreRing";
import { ProductCard } from "@/components/ProductCard";
import { LoadingSkeleton } from "@/components/LoadingSpinner";
import { useStatsMock, useChartMock } from "@/hooks/useStatsMock";
import { mockProducts } from "@/lib/mock/products";
import { 
  Scan, 
  Leaf, 
  TrendingUp, 
  Award,
  Calendar,
  Eye,
  BarChart3,
  Zap,
  ArrowRight
} from "lucide-react";

export default function Dashboard() {
  const { stats, loading } = useStatsMock();
  const { data: chartData } = useChartMock();

  const recentScans = mockProducts.slice(0, 3);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <LoadingSkeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LoadingSkeleton className="h-32" count={3} />
          </div>
          <LoadingSkeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Your Eco 
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {" "}Dashboard
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your environmental impact and celebrate your sustainable choices.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <KPIStat
          title="Total Scans"
          value={stats.totalScans}
          icon={Scan}
          color="primary"
          change={12}
          changeLabel="this month"
        />
        <KPIStat
          title="Avg Eco Score"
          value={stats.avgEcoScore}
          unit="/100"
          icon={Leaf}
          color="success"
          change={8}
          changeLabel="improvement"
        />
        <KPIStat
          title="CO₂ Saved"
          value={stats.co2Saved}
          unit="kg"
          icon={TrendingUp}
          color="accent"
          change={23}
          changeLabel="this quarter"
        />
        <KPIStat
          title="Points Earned"
          value={stats.pointsEarned}
          icon={Award}
          color="warning"
          change={15}
          changeLabel="this week"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Environmental Impact Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
                  {/* Simulated Chart Area */}
                  <div className="space-y-4 w-full p-6">
                    {chartData.map((month, index) => (
                      <motion.div
                        key={month.month}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium w-12">{month.month}</span>
                        <div className="flex-1 mx-4">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                            className="h-4 bg-gradient-to-r from-primary to-secondary rounded-full origin-left"
                            style={{ width: `${(month.scans / 50) * 100}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground w-16 text-right">
                          {month.co2Saved}kg CO₂
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Scans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Scans
                  </div>
                  <Button variant="outline" size="sm" className="glass-button">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentScans.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard 
                        product={product}
                        onViewDetails={(product) => {
                          console.log("Viewing product:", product.name);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Level {stats.level}</div>
                  <p className="text-muted-foreground text-sm">Eco Warrior</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {stats.level + 1}</span>
                    <span>{stats.levelProgress}%</span>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-3 bg-muted rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.levelProgress}%` }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </motion.div>
                </div>

                <div className="text-center pt-4">
                  <ScoreRing score={stats.avgEcoScore} size="lg" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Your Average Eco Score
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                      ${achievement.unlocked 
                        ? 'glass-button' 
                        : 'bg-muted/30 opacity-60'
                      }
                    `}
                  >
                    <div className={`
                      text-2xl transition-transform duration-300
                      ${achievement.unlocked ? 'scale-100' : 'scale-75 grayscale'}
                    `}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="text-xs">
                        Unlocked
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-primary to-secondary">
                  <Scan className="h-4 w-4 mr-3" />
                  New Scan
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Eye className="h-4 w-4 mr-3" />
                  View History
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Award className="h-4 w-4 mr-3" />
                  Leaderboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}