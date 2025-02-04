import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400", "700"],
  display: "swap"
})

export const metadata = {
  title: '1xbook9',
  description: '1xbook9 - Bet better on the best betting exchange',
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
