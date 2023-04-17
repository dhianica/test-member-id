'use client'
import '../../styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className='bg-light'>
        <main>
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
