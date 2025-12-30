import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Compass, Target, TrendingUp, Brain, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const navigate = useNavigate()

  const handleGoogleAuth = () => {
    setTimeout(() => navigate('/home'), 1000)
  }

  const handleEmailAuth = (e) => {
    e.preventDefault()
    setTimeout(() => navigate('/home'), 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl relative z-10">
        {/* Brand Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary via-secondary to-accent p-12 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="h-12 w-12 text-white" />
              <h1 className="text-4xl font-bold text-white">
                Interview Navigator
              </h1>
            </div>
            <p className="text-white/90 text-lg mb-8">
              Your intelligent companion for tech interview preparation
            </p>
            <ul className="space-y-4">
              {[
                { icon: TrendingUp, text: 'Track hiring momentum by region' },
                { icon: Target, text: 'Save targets for instant alerts' },
                { icon: Brain, text: 'Prep-focused insights & practice' },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Auth Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card p-12 flex flex-col justify-center"
        >
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-gradient">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isSignUp ? 'Start your interview prep journey' : 'Continue your prep journey'}
            </p>

            <div className="space-y-4">
              <Button 
                onClick={handleGoogleAuth}
                className="w-full h-12"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              {!showEmailForm ? (
                <Button 
                  variant="secondary"
                  onClick={() => setShowEmailForm(true)}
                  className="w-full h-12"
                  size="lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Continue with Email
                </Button>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleEmailAuth}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      required
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                  <Button 
                    type="button"
                    variant="ghost" 
                    className="w-full"
                    onClick={() => alert('Magic link sent! (Demo)')}
                  >
                    Send Magic Link
                  </Button>
                </motion.form>
              )}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignUp ? 'Already have an account?' : 'New here?'}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 text-primary font-semibold hover:underline"
              >
                {isSignUp ? 'Sign in' : 'Create account'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}