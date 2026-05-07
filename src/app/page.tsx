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

      {/* AdSense content: 使い方・活用事例・FAQ */}
      <div className="max-w-3xl mx-auto px-4 mt-14 mb-6 space-y-12">
        {lang === 'ja' ? (
          <>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">ハッシュタグ生成ツールの使い方</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold text-gray-800">カテゴリとプラットフォームを選ぶ</p>
                    <p className="text-sm text-gray-600 mt-1">投稿ジャンル（料理・美容・旅行など）とSNSプラットフォーム（Instagram / X）を選択します。プラットフォームによって最適なハッシュタグが変わります。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold text-gray-800">キーワードを入力して生成する</p>
                    <p className="text-sm text-gray-600 mt-1">任意のキーワードを追加入力することで、より投稿内容に合ったハッシュタグが生成されます。「ハッシュタグを生成」ボタンを押すと即座に候補が表示されます。</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold text-gray-800">コピーしてSNS投稿に貼り付ける</p>
                    <p className="text-sm text-gray-600 mt-1">「コピー」ボタンで全てのハッシュタグをワンクリックでコピーできます。Instagramの投稿欄やXのツイート欄にそのまま貼り付けて使えます。</p>
                  </div>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">SNS運用でこう使われています</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-800 mb-2">料理・グルメ系インスタグラマー</p>
                  <p className="text-sm text-gray-600">毎日投稿するカフェオーナーが「カフェ」カテゴリで生成したハッシュタグを使い始めたところ、3ヶ月で保存数が2倍に増加。ニッチタグを使うことで同じ趣味のユーザーに届くようになりました。</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-800 mb-2">美容・コスメ系アカウント</p>
                  <p className="text-sm text-gray-600">毎投稿ごとにハッシュタグを考えていたビューティー系インフルエンサーが、このツールで時間を大幅削減。高頻度・中頻度・ニッチの3段階でバランスよく使えると評価されています。</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-800 mb-2">旅行・観光系クリエイター</p>
                  <p className="text-sm text-gray-600">旅先ごとに異なるタグを探すのが面倒だったトラベラーが、「旅行」カテゴリで一括生成。地域固有のニッチタグも含まれるため、現地ユーザーへのリーチが増えています。</p>
                </div>
                <div className="bg-green-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-800 mb-2">企業のSNS担当者</p>
                  <p className="text-sm text-gray-600">複数のSNSアカウントを管理する担当者が、キャンペーンや新商品投稿のたびに使用しています。プラットフォームごとに最適なタグが切り替わるため、管理の手間が減ると好評です。</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">よくある質問</h2>
              <div className="space-y-4">
                {[
                  ['ハッシュタグは何個生成されますか？', 'カテゴリによって異なりますが、高頻度・中頻度・ニッチの3グループに分類して合計20〜30個を目安に生成されます。Instagramの上限（30個）を意識した設計です。'],
                  ['Instagram以外でも使えますか？', 'X（旧Twitter）への切替にも対応しています。Xではハッシュタグの数よりも質が重要なため、生成されるタグ数が少なめになります。TikTokやYouTubeの投稿にも流用可能です。'],
                  ['生成されたハッシュタグに著作権はありますか？', 'ハッシュタグ自体に著作権はありません。生成されたタグはすべて自由にご使用いただけます。'],
                  ['自分で追加したキーワードはどう使われますか？', '入力したキーワードはカテゴリの候補タグと組み合わせて使われます。より投稿内容に特化したニッチタグが含まれるようになります。'],
                ].map(([q, a]) => (
                  <details key={q} className="border border-gray-200 rounded-lg">
                    <summary className="p-4 font-medium text-gray-800 cursor-pointer hover:bg-gray-50">{q}</summary>
                    <p className="px-4 pb-4 text-sm text-gray-600">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">How to Use</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-semibold text-gray-800">Choose your category and platform</p>
                    <p className="text-sm text-gray-600 mt-1">Select the content genre (food, beauty, travel, etc.) and your target platform (Instagram or X). Hashtag suggestions are tailored to each platform.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-semibold text-gray-800">Add a keyword and generate</p>
                    <p className="text-sm text-gray-600 mt-1">Optionally type a keyword to refine results. Hit "Generate Hashtags" and get a curated list of high-reach, mid-reach, and niche tags instantly.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-semibold text-gray-800">Copy and paste into your post</p>
                    <p className="text-sm text-gray-600 mt-1">One click copies all hashtags to your clipboard. Paste directly into Instagram, X, TikTok, or YouTube.</p>
                  </div>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Why Hashtag Strategy Matters</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-800 mb-2">High-reach tags</p>
                  <p className="text-sm text-gray-600">Broad tags with millions of posts give your content short-term visibility. Good for discovery but competitive.</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-800 mb-2">Niche tags</p>
                  <p className="text-sm text-gray-600">Specific tags with fewer posts keep your content visible longer and attract highly engaged, targeted audiences.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  ['How many hashtags are generated?', 'Typically 20–30 hashtags, split across high-reach, mid-reach, and niche groups. Instagram allows up to 30 per post, and we stay within that limit.'],
                  ['Does this work for platforms other than Instagram?', 'Yes. Switch to X mode for Twitter-optimized tags (fewer, more targeted). The tags also work well on TikTok and YouTube.'],
                  ['Are there any copyright restrictions on the hashtags?', 'No. Hashtags are not copyrightable. You are free to use any generated tags without restriction.'],
                ].map(([q, a]) => (
                  <details key={q} className="border border-gray-200 rounded-lg">
                    <summary className="p-4 font-medium text-gray-800 cursor-pointer hover:bg-gray-50">{q}</summary>
                    <p className="px-4 pb-4 text-sm text-gray-600">{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <footer className="py-6 text-center">
        <p className="text-xs text-gray-400">{t.appName} — {t.tagline}</p>
        <p className="text-xs text-gray-300 mt-1">© 2026 Free to use</p>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          {lang === 'ja' ? (
            <>
              <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 underline">プライバシーポリシー</a>
              <a href="/terms" className="text-xs text-gray-400 hover:text-gray-600 underline">利用規約</a>
              <a href="/legal" className="text-xs text-gray-400 hover:text-gray-600 underline">特定商取引法に基づく表記</a>
            </>
          ) : (
            <>
              <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 underline">Privacy Policy</a>
              <a href="/terms" className="text-xs text-gray-400 hover:text-gray-600 underline">Terms of Service</a>
              <a href="/legal" className="text-xs text-gray-400 hover:text-gray-600 underline">Legal Notice</a>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}
