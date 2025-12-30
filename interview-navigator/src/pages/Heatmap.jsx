import { motion } from 'framer-motion'
import { ChevronRight, Flame, Info, ArrowRight } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const heatmapData = [
  { rank: 1, company: 'Amazon', score: 92, roles: ['SDE II', 'Applied ML'], logo: '🟠' },
  { rank: 2, company: 'Microsoft', score: 75, roles: ['SWE', 'PM'], logo: '🔵' },
  { rank: 3, company: 'Snowflake', score: 63, roles: ['Data Eng', 'SWE'], logo: '❄️' },
  { rank: 4, company: 'Meta', score: 48, roles: ['SWE Infra', 'TPM'], logo: '🔷' },
  { rank: 5, company: 'Google', score: 45, roles: ['SWE', 'SRE'], logo: '🔴' },
  { rank: 6, company: 'Apple', score: 38, roles: ['iOS Dev', 'ML'], logo: '🍎' },
  { rank: 7, company: 'Uber', score: 32, roles: ['Backend', 'Mobile'], logo: '⚫' },
  { rank: 8, company: 'Airbnb', score: 28, roles: ['Full Stack', 'iOS'], logo: '🏠' },
]

export default function Heatmap() {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary cursor-pointer hover:underline">Home</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Heatmap</span>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <CardTitle>Active Hiring Heatmap</CardTitle>
              </div>
              <Button variant="ghost" size="icon" title="Activity score = new posts per week (rolling 14d)">
                <Info className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm mt-4 p-3 rounded-lg bg-muted">
              <div className="flex gap-2">
                <span className="text-muted-foreground">Region:</span>
                <span className="font-medium">Pacific Northwest</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Updated:</span>
                <span className="font-medium">3h ago</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">Source mix:</span>
                <span className="font-medium">LeetCode 70% / Reddit 30%</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-[60px_200px_1fr_250px_100px] gap-4 px-4 py-2 rounded-lg bg-muted">
              <div className="text-xs font-bold text-muted-foreground uppercase">Rank</div>
              <div className="text-xs font-bold text-muted-foreground uppercase">Company</div>
              <div className="text-xs font-bold text-muted-foreground uppercase">Activity Score</div>
              <div className="text-xs font-bold text-muted-foreground uppercase">Hot Roles</div>
              <div className="text-xs font-bold text-muted-foreground uppercase">Action</div>
            </div>

            {/* Table Body */}
            <div className="space-y-2">
              {heatmapData.map((item, index) => (
                <motion.div
                  key={item.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ x: 4 }}
                  className="grid md:grid-cols-[60px_200px_1fr_250px_100px] gap-4 p-4 rounded-lg bg-muted/50 border border-border hover:border-primary hover:bg-muted transition-all cursor-pointer items-center"
                >
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background font-bold text-muted-foreground">
                      {item.rank}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.logo}</span>
                    <span className="font-semibold">{item.company}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-border rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      </motion.div>
                    </div>
                    <span className="font-bold w-8 text-right">{item.score}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.roles.map((role, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/10 text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>"Activity score" = new posts per week (rolling 14d)</span>
              </div>
              <Button variant="secondary">
                View full hiring map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  )
}