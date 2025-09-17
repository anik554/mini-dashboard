import Sidebar from './components/Sidebar'
import './globals.css'

export const metadata = {
  title: 'Mini Dashboard',
  description: 'Practical exam dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  )
}
