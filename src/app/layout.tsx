import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ハッシュタグ提案ツール | 無料・Instagram・X対応',
  description: '無料のハッシュタグ自動提案ツール。カテゴリを選ぶだけで、Instagram・X向けの人気・ミドル・ニッチタグをまとめて提案。Free hashtag generator for Instagram and X.',
  openGraph: {
    title: 'ハッシュタグ提案ツール | 無料',
    description: 'カテゴリを選ぶだけでSNSハッシュタグを自動提案',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-sans">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
