import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Scale, Check, X, DollarSign, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

// Mock database - in production, fetch from API
const companiesDB = {
  'Amazon': {
    roles: ['SDE I', 'SDE II', 'SDE III', 'Principal Engineer'],
    locations: {
      'United States': {
        'SDE II': {
          compensation: { base: 185, bonus: 35, rsu: 55, total: 275 },
          perks: ['Visa support', 'Sign-on split', 'Wellness fund', 'Relocation', '401k match']
        }
      }
    }
  },
  'Google': {
    roles: ['SWE L3', 'SWE L4', 'SWE L5', 'Staff SWE'],
    locations: {
      'United States': {
        'SWE L4': {
          compensation: { base: 195, bonus: 45, rsu: 80, total: 320 },
          perks: ['Visa support', 'Wellness fund', 'Relocation', '401k match', 'Free meals', 'Gym access', 'Education budget']
        }
      }
    }
  },
  'Microsoft': {
    roles: ['SDE I', 'SDE II', 'Senior SDE', 'Principal SDE'],
    locations: {
      'United States': {
        'SDE II': {
          compensation: { base: 175, bonus: 30, rsu: 60, total: 265 },
          perks: ['Visa support', 'Relocation', '401k match', 'Education budget', 'Remote work']
        }
      }
    }
  },
  'Meta': {
    roles: ['E3', 'E4', 'E5', 'E6'],
    locations: {
      'United States': {
        'E4': {
          compensation: { base: 190, bonus: 40, rsu: 90, total: 320 },
          perks: ['Visa support', 'Wellness fund', 'Relocation', '401k match', 'Free meals', 'Commuter benefits']
        }
      }
    }
  }
}

export default function ComparisonWidget({ baseCompany = 'Amazon', baseRole = 'SDE II', baseLocation = 'United States' }) {
  const [compareCompany, setCompareCompany] = useState('Google')
  const [compareRole, setCompareRole] = useState('SWE L4')
  const [showComparison, setShowComparison] = useState(false)

  const baseData = companiesDB[baseCompany]?.locations[baseLocation]?.[baseRole]
  const compareData = companiesDB[compareCompany]?.locations[baseLocation]?.[compareRole]
  const availableRoles = companiesDB[compareCompany]?.roles || []

  // Auto-select first available role when company changes
  useEffect(() => {
    if (availableRoles.length > 0 && !availableRoles.includes(compareRole)) {
      setCompareRole(availableRoles[0])
    }
  }, [compareCompany])

  const handleShowComparison = () => {
    setShowComparison(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-orange-500" />
          Comparison Widget
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selection */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Compare with Company:</label>
            <select 
              value={compareCompany}
              onChange={(e) => setCompareCompany(e.target.value)}
              className="w-full p-3 rounded-lg bg-muted border border-border"
            >
              {Object.keys(companiesDB).filter(c => c !== baseCompany).map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Select Role:</label>
            <select 
              value={compareRole}
              onChange={(e) => setCompareRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-muted border border-border"
            >
              {availableRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm">
            <MapPin className="h-4 w-4 inline mr-2 text-primary" />
            <span className="text-muted-foreground">Comparing in:</span>
            <span className="font-semibold ml-1">{baseLocation}</span>
          </div>
        </div>

        <Button 
          onClick={handleShowComparison}
          className="w-full"
        >
          Show Detailed Comparison
        </Button>

        {/* Comparison Results */}
        {showComparison && baseData && compareData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-4 border-t border-border"
          >
            {/* Header */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Base</p>
                <p className="font-bold">{baseCompany}</p>
                <p className="text-sm text-muted-foreground">{baseRole}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/10">
                <p className="text-sm text-muted-foreground mb-1">Comparing</p>
                <p className="font-bold">{compareCompany}</p>
                <p className="text-sm text-muted-foreground">{compareRole}</p>
              </div>
            </div>

            {/* Compensation Comparison */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Compensation Breakdown (in $k)
              </h4>
              <div className="space-y-2">
                {['base', 'bonus', 'rsu', 'total'].map((key) => {
                  const baseValue = baseData.compensation[key]
                  const compareValue = compareData.compensation[key]
                  const diff = compareValue - baseValue
                  const isDiffPositive = diff > 0

                  return (
                    <div key={key} className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center p-2 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium capitalize">{key}:</span>
                      <div className="text-center">
                        <span className="font-semibold">${baseValue}k</span>
                      </div>
                      <div className={`text-center font-semibold ${
                        isDiffPositive ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        ${compareValue}k
                        {diff !== 0 && (
                          <span className="text-xs ml-1">
                            ({isDiffPositive ? '+' : ''}{diff}k)
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Perks Comparison */}
            <div>
              <h4 className="font-semibold mb-3">Perks & Benefits</h4>
              <div className="space-y-2">
                {/* All unique perks */}
                {Array.from(new Set([...baseData.perks, ...compareData.perks])).map((perk) => {
                  const baseHas = baseData.perks.includes(perk)
                  const compareHas = compareData.perks.includes(perk)

                  return (
                    <div key={perk} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-sm">{perk}</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background">
                        {baseHas ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        !baseHas && compareHas ? 'bg-green-500/20' : 
                        baseHas && !compareHas ? 'bg-red-500/20' : 
                        'bg-background'
                      }`}>
                        {compareHas ? (
                          <Check className={`h-4 w-4 ${!baseHas && compareHas ? 'text-green-500' : 'text-green-500'}`} />
                        ) : (
                          <X className={`h-4 w-4 ${baseHas && !compareHas ? 'text-red-500' : 'text-red-500'}`} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm">
                <span className="font-semibold">{compareCompany}</span> offers{' '}
                <span className="text-green-500 font-bold">
                  ${compareData.compensation.total - baseData.compensation.total}k more
                </span>{' '}
                in total compensation
                {compareData.perks.filter(p => !baseData.perks.includes(p)).length > 0 && (
                  <>
                    {' '}and{' '}
                    <span className="text-green-500 font-bold">
                      {compareData.perks.filter(p => !baseData.perks.includes(p)).length} additional perks
                    </span>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}