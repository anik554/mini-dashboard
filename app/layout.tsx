import Sidebar from "./components/Sidebar";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Mini Dashboard",
  description: "Practical exam dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-200 min-h-screen">
        <Providers>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 min-h-screen">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}