import { Search, Bell, User, Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6 flex-1">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Compass className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient hidden sm:inline">
              Interview Navigator
            </span>
          </button>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search company/role..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}