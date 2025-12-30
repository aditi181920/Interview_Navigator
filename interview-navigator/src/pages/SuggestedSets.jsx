import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Filter, Clock, TrendingUp, ChevronDown, MessageSquare, ThumbsUp, Calendar } from 'lucide-react'
import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

// Mock data - in production, fetch from API
const questionsData = [
  {
    id: 1,
    question: "Implement LRU Cache with O(1) operations",
    round: "Round 1",
    type: "Coding",
    difficulty: "Medium",
    frequency: 12,
    lastAsked: "2024-01-15",
    tags: ["Hash Map", "Doubly Linked List", "Design"],
    answers: [
      { id: 1, author: "user123", upvotes: 45, content: "Use HashMap + Doubly Linked List. HashMap stores key->node mapping, DLL maintains order...", code: "class LRUCache:\n  def __init__(self, capacity)..." },
      { id: 2, author: "user456", upvotes: 32, content: "Alternative approach using OrderedDict in Python...", code: "from collections import OrderedDict..." },
      { id: 3, author: "user789", upvotes: 18, content: "Java implementation with explanation...", code: "class LRUCache {\n  private Map<Integer, Node> map..." }
    ]
  },
  {
    id: 2,
    question: "Find shortest path in weighted graph (variant: some edges can be negative)",
    round: "Round 2",
    type: "Coding",
    difficulty: "Hard",
    frequency: 8,
    lastAsked: "2024-01-10",
    tags: ["Graph", "Bellman-Ford", "Shortest Path"],
    answers: [
      { id: 4, author: "graphExpert", upvotes: 67, content: "Use Bellman-Ford algorithm since Dijkstra fails with negative weights...", code: "def bellman_ford(graph, source):" },
      { id: 5, author: "algoMaster", upvotes: 41, content: "Check for negative cycles first, then apply modified Dijkstra...", code: "def detect_negative_cycle(graph):" }
    ]
  },
  {
    id: 3,
    question: "Design a distributed rate limiter",
    round: "Round 3",
    type: "System Design",
    difficulty: "Hard",
    frequency: 15,
    lastAsked: "2024-01-20",
    tags: ["System Design", "Rate Limiting", "Distributed Systems"],
    answers: [
      { id: 6, author: "sysDesignPro", upvotes: 89, content: "Token bucket algorithm with Redis for distributed state. Use sliding window for precision...", code: null },
      { id: 7, author: "architect101", upvotes: 54, content: "Leaky bucket approach with consistent hashing for horizontal scaling...", code: null }
    ]
  },
  {
    id: 4,
    question: "Merge K sorted linked lists",
    round: "Round 1",
    type: "Coding",
    difficulty: "Medium",
    frequency: 10,
    lastAsked: "2024-01-12",
    tags: ["Heap", "Linked List", "Merge"],
    answers: [
      { id: 8, author: "coder99", upvotes: 38, content: "Use min-heap to track smallest element from each list...", code: "import heapq\ndef mergeKLists(lists):" }
    ]
  }
]

export default function SuggestedSets() {
  const [sortBy, setSortBy] = useState('frequency') // 'frequency', 'newest'
  const [filterRound, setFilterRound] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState({}) // { questionId: answerId }

  // Sort and filter questions
  const filteredQuestions = questionsData
    .filter(q => filterRound === 'all' || q.round === filterRound)
    .filter(q => filterType === 'all' || q.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'frequency') return b.frequency - a.frequency
      if (sortBy === 'newest') return new Date(b.lastAsked) - new Date(a.lastAsked)
      return 0
    })

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

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
          <span className="text-primary cursor-pointer hover:underline">Target Setup</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Suggested Practice Sets</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Amazon SDE II - Practice Questions</h1>
            <p className="text-muted-foreground">Based on {questionsData.length} recent interview reports</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              {/* Sort By */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Sort By
                </label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 rounded-md bg-muted border border-border"
                >
                  <option value="frequency">Most Frequent</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Filter by Round */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Filter by Round</label>
                <select 
                  value={filterRound}
                  onChange={(e) => setFilterRound(e.target.value)}
                  className="w-full p-2 rounded-md bg-muted border border-border"
                >
                  <option value="all">All Rounds</option>
                  <option value="Round 1">Round 1</option>
                  <option value="Round 2">Round 2</option>
                  <option value="Round 3">Round 3</option>
                  <option value="Round 4">Round 4</option>
                </select>
              </div>

              {/* Filter by Type */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Filter by Type</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-2 rounded-md bg-muted border border-border"
                >
                  <option value="all">All Types</option>
                  <option value="Coding">Coding</option>
                  <option value="System Design">System Design</option>
                  <option value="Behavioral">Behavioral</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Question Header */}
                  <div 
                    className="p-5 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleQuestion(q.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">{q.round}</Badge>
                          <Badge 
                            variant={q.difficulty === 'Hard' ? 'warning' : q.difficulty === 'Medium' ? 'default' : 'success'}
                          >
                            {q.difficulty}
                          </Badge>
                          <Badge variant="secondary">{q.type}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
                        <div className="flex flex-wrap gap-2">
                          {q.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span className="font-semibold">{q.frequency}x asked</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(q.lastAsked).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{q.answers.length} solutions</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-sm text-primary">
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedQuestion === q.id ? 'rotate-180' : ''}`} />
                      <span>{expandedQuestion === q.id ? 'Hide' : 'View'} Solutions</span>
                    </div>
                  </div>

                  {/* Answers Section */}
                  <AnimatePresence>
                    {expandedQuestion === q.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="p-5 bg-muted/30">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            Community Solutions ({q.answers.length})
                          </h4>
                          
                          {/* Answer Tabs */}
                          <div className="flex gap-2 mb-4 overflow-x-auto">
                            {q.answers.map((ans) => (
                              <Button
                                key={ans.id}
                                variant={selectedAnswer[q.id] === ans.id ? 'default' : 'secondary'}
                                size="sm"
                                onClick={() => setSelectedAnswer({ ...selectedAnswer, [q.id]: ans.id })}
                              >
                                {ans.author}
                                <div className="flex items-center gap-1 ml-2">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>{ans.upvotes}</span>
                                </div>
                              </Button>
                            ))}
                          </div>

                          {/* Selected Answer */}
                          {(() => {
                            const currentAnswer = q.answers.find(a => a.id === selectedAnswer[q.id]) || q.answers[0]
                            return (
                              <motion.div
                                key={currentAnswer.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                              >
                                <div className="p-4 rounded-lg bg-background border border-border">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                                        {currentAnswer.author[0].toUpperCase()}
                                      </div>
                                      <span className="font-semibold">{currentAnswer.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-500">
                                      <ThumbsUp className="h-4 w-4" />
                                      <span className="font-semibold">{currentAnswer.upvotes}</span>
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground mb-3">{currentAnswer.content}</p>
                                  {currentAnswer.code && (
                                    <pre className="p-4 rounded-lg bg-muted text-sm overflow-x-auto">
                                      <code>{currentAnswer.code}</code>
                                    </pre>
                                  )}
                                </div>
                              </motion.div>
                            )
                          })()}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No questions found with the selected filters.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </Layout>
  )
}