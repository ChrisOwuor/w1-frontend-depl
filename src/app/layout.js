import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400", "700"],
  display: "swap"
})

export const metadata = {
  title: 'Bet',
  description: 'Developed by GrenLyfe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
