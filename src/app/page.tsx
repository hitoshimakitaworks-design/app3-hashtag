'use client'
import { useState } from 'react'
import { Hash, Copy, Check, Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { hashtagData, categories } from '@/data/hashtags'

type CategoryKey = keyof typeof hashtagData
type Platform = 'instagram' | 'x'

export default function Home() {
  const { t, lang, toggle } = useI18n()
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState<CategoryKey>('food')
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [result, setResult] = useState<{ high: string[]; mid: string[]; niche: string[] } | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const generate = () => {
    const base = hashtagData[category]
    // Add keyword as custom tag if provided
    const keyTag = keyword.trim() ? [`#${keyword.trim().replace(/^#/, '').replace(/\s+/g, '_')}`] : []
    setResult({
      high: [...keyTag, ...base.high].slice(0, 8),
      mid: base.mid.slice(0, 8),
      niche: base.niche.slice(0, 8),
    })
  }

  const copyTags = (tags: string[], key: string) => {
    navigator.clipboard.writeText(tags.join(' ')).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const copyAll = () => {
    if (!result) return
    const all = [...result.high, ...result.mid, ...result.niche].join(' ')
    navigator.clipboard.writeText(all).then(() => {
      setCopied('all')
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const tagCount = result ? result.high.length + result.mid.length + result.niche.length : 0

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="text-purple-600" size={22} />
            <span className="font-bold text-gray-800 text-sm md:text-base">{t.appName}</span>
          </div>
          <button onClick={toggle} className="text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50">
            {lang === 'ja' ? 'EN' : 'JA'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Input card */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-sm">
          {/* Category */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2">{t.category}</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${category === cat ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
                >
                  {t.categories[cat as keyof typeof t.categories]}
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2">{t.platform}</label>
            <div className="flex gap-2">
              {(['instagram', 'x'] as Platform[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${platform === p ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'}`}
                >
                  {p === 'instagram' ? 'Instagram' : 'X (Twitter)'}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.keyword}</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder={t.keywordPlaceholder}
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generate()}
            />
          </div>

          <button
            onClick={generate}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md"
          >
            <Sparkles size={18} /> {t.generate}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-700">{t.result} ({tagCount}個)</h2>
              <button
                onClick={copyAll}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-colors ${copied === 'all' ? 'bg-green-100 text-green-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
              >
                {copied === 'all' ? <><Check size={15} />{t.copied}</> : <><Copy size={15} />{t.copyAll}</>}
              </button>
            </div>

            {[
              { key: 'high', tags: result.high, labelColor: 'text-rose-600', btnActive: 'bg-rose-100 text-rose-700', tagBase: 'bg-rose-50 text-rose-700 hover:bg-rose-100', label: t.high },
              { key: 'mid', tags: result.mid, labelColor: 'text-amber-600', btnActive: 'bg-amber-100 text-amber-700', tagBase: 'bg-amber-50 text-amber-700 hover:bg-amber-100', label: t.mid },
              { key: 'niche', tags: result.niche, labelColor: 'text-emerald-600', btnActive: 'bg-emerald-100 text-emerald-700', tagBase: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100', label: t.niche },
            ].map(({ key, tags, labelColor, btnActive, tagBase, label }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold ${labelColor}`}>{label}</span>
                  <button
                    onClick={() => copyTags(tags, key)}
                    className={`text-xs flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${copied === key ? btnActive : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  >
                    {copied === key ? <><Check size={12} />{t.copied}</> : <><Copy size={12} />copy</>}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => copyTags([tag], tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${copied === tag ? 'bg-green-100 text-green-700' : tagBase}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">{t.tip}</p>
          </div>
        )}
      </main>

      <footer className="py-6 text-center">
        <p className="text-xs text-gray-400">{t.appName} — {t.tagline}</p>
      </footer>
    </div>
  )
}
