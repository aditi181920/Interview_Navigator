import { motion } from 'framer-motion'
import { ChevronRight, BarChart3, DollarSign, MapPin, MessageSquare, Scale, Target } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import ComparisonWidget from '../components/ComparisonWidget'

export default function TargetSetup() {
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
          <span className="text-foreground font-medium">Target Setup</span>
        </div>

        {/* Selection Bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-card border border-border"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Company:</span>
            <span className="font-semibold">Amazon</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Role:</span>
            <span className="font-semibold">SDE2</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Location:</span>
            <span className="font-semibold">US</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Updated:</span>
            <span className="font-semibold">24h</span>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Key Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Key Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Interview Rounds', value: '5' },
                      { label: 'Difficulty', value: 'Medium', color: 'text-yellow-500' },
                      { label: 'Avg Timeline', value: '4 weeks' },
                      { label: 'Sample Size', value: '118 reports' },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-lg bg-muted border border-border">
                        <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color || ''}`}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Compensation */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Compensation Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Base', value: '$185k' },
                      { label: 'Bonus', value: '$35k' },
                      { label: 'RSU', value: '$55k' },
                    ].map((comp, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted text-center border border-border">
                        <p className="text-xs text-muted-foreground mb-1">{comp.label}</p>
                        <p className="text-xl font-bold text-green-500">{comp.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg bg-muted border border-border">
                    <p className="text-sm font-medium mb-3">Total Compensation Range</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">$210k</span>
                      <div className="flex-1 h-2 bg-border rounded-full relative overflow-hidden">
                        <div className="absolute h-full w-3/5 bg-gradient-to-r from-primary to-green-500 rounded-full" />
                        <div className="absolute top-[-28px] left-[60%] transform -translate-x-1/2 text-sm font-bold text-green-500">
                          $275k
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">$360k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Locations & Perks */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    Locations & Perks
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                {/* All Locations this company offers */}
                <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                    All Amazon SDE II Locations:
                    </p>
                    <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10">Seattle, WA</Badge>
                    <Badge variant="outline" className="bg-primary/10">New York, NY</Badge>
                    <Badge variant="outline" className="bg-primary/10">Austin, TX</Badge>
                    <Badge variant="outline" className="bg-primary/10">San Francisco, CA</Badge>
                    <Badge variant="success">Remote (HQ approval)</Badge>
                    </div>
                </div>

                {/* Location-specific perks */}
                <div className="border-t border-border pt-4">
                    <p className="text-sm font-semibold mb-3">
                    Perks for <span className="text-primary">SDE II</span> in <span className="text-primary">United States</span>:
                    </p>
                    
                    <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                        <span className="font-medium">Relocation Support</span>
                        <Badge variant="success">✓ Yes</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                        <span className="font-medium">Visa Sponsorship</span>
                        <Badge variant="success">✓ H1B, L1</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                        <span className="font-medium">Remote Work</span>
                        <Badge variant="outline">Hybrid (3 days/week)</Badge>
                    </div>
                    </div>

                    <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">Additional Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Sign-on: $50k (2yr split)</Badge>
                        <Badge variant="outline">Wellness: $1200/yr</Badge>
                        <Badge variant="outline">401k: 4% match</Badge>
                        <Badge variant="outline">Stock refresh eligible</Badge>
                        <Badge variant="outline">Education: $5k/yr</Badge>
                    </div>
                    </div>
                </div>
                </CardContent>
            </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Practice Focus */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Practice Focus (top rounds)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { num: '1', name: 'Coding (DS/Algo)', percent: '45%', hasLink: true },
                      { num: '2', name: 'System Design', percent: '30%', hasLink: true },
                      { num: '3', name: 'Behavioral', percent: '25%', hasLink: true },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted border border-border">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-lg font-bold text-primary">{item.num}.</span>
                          <span className="flex-1 font-medium">{item.name}</span>
                          <span className="text-lg font-bold text-secondary">{item.percent}</span>
                        </div>
                        {item.hasLink && (
                            <p className="text-xs text-muted-foreground ml-8">
                                of reports • <button 
                                onClick={() => navigate('/suggested-sets')} 
                                className="text-primary hover:underline"
                                >
                                Suggested sets →
                                </button>
                            </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Questions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Latest Questions & Answers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { round: 'Round 1 - Coding', q: 'Q1: LRU cache variant...' },
                      { round: 'Round 2 - Coding', q: 'Q2: Graph shortest path...' },
                      { round: 'Round 3 - Design', q: 'Q: Design distributed queue...' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted border border-border flex flex-col gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">[{item.round}]</span>
                        <span className="text-sm">{item.q}</span>
                        <Button variant="ghost" size="sm" className="self-start">View Ans</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ComparisonWidget 
                baseCompany="Amazon" 
                baseRole="SDE II" 
                baseLocation="United States" 
            />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}