import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Target, Flame, ArrowRight, Lightbulb } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Home() {
  const navigate = useNavigate()

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Your Interview Command Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick a card to dive in
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Target Selector Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 h-full"
              onClick={() => navigate('/target-setup')}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <CardTitle>Target Selector</CardTitle>
                  </div>
                  <Badge>Setup</Badge>
                </div>
                <CardDescription>What it does</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Set company/role/location preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Choose goals to personalize insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Save targets for instant alerts</span>
                  </li>
                </ul>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Example</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-accent/20 border-accent/30 text-accent">Amazon</Badge>
                    <Badge variant="outline" className="bg-primary/20 border-primary/30 text-primary">SDE II</Badge>
                    <Badge variant="outline" className="bg-secondary/20 border-secondary/30 text-secondary">US</Badge>
                    <Badge variant="success">System Design</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-primary font-semibold">
                  <span>Click to: Open Target Setup</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Heatmap Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              className="cursor-pointer hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 h-full"
              onClick={() => navigate('/heatmap')}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <CardTitle>Active Hiring Heatmap</CardTitle>
                  </div>
                  <Badge variant="secondary">Insights</Badge>
                </div>
                <CardDescription>What it does</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>See who's hiring near you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ranked by posting activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Track hot roles and trends</span>
                  </li>
                </ul>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-3">Example (sample rows)</p>
                  <div className="space-y-2">
                    {[
                      { company: 'Amazon', score: 92 },
                      { company: 'Microsoft', score: 75 },
                      { company: 'Meta', score: 48 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                        <span className="text-sm font-medium w-24">{item.company}</span>
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-8">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-primary font-semibold">
                  <span>Click to: Open Heatmap</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 p-4 rounded-lg bg-primary/10 border border-primary/20"
        >
          <Lightbulb className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> Start with Target Selector to personalize your experience
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  )
}