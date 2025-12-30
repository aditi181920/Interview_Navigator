import Navbar from './Navbar'

export default function Layout({ children, showNav = true }) {
  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  )
}