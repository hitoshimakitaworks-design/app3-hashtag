import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'
import { HowToProvider } from '@/lib/howToContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { HowToDrawer } from '@/components/HowToDrawer'
import { HowToLayout } from '@/components/HowToLayout'
import { FeedbackWidget } from '@/components/FeedbackWidget'
import { PaywallBanner } from '@/components/PaywallBanner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ハッシュタグ提案ツール | 無料・Instagram・X対応',
  description: '無料のハッシュタグ自動提案ツール。カテゴリを選ぶだけで、Instagram・X向けの人気・ミドル・ニッチタグをまとめて提案。Free hashtag generator for Instagram and X.',
  openGraph: {
    title: 'ハッシュタグ提案ツール | 無料',
    description: 'カテゴリを選ぶだけでSNSハッシュタグを自動提案',
    type: 'website',
  },
  verification: {
    google: '3ERn8pqN4gQ3dHkD8UsRSbDWPxsvZY1mQog5ynGaO4g',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-sans">
        <I18nProvider>
          <HowToProvider>
            <HowToLayout>
              <Header />
              {children}
              <Footer />
            </HowToLayout>
            <HowToDrawer />
            <FeedbackWidget />
            <PaywallBanner />
            <CookieBanner />
          </HowToProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
