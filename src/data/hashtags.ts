type HashtagSet = { high: string[]; mid: string[]; niche: string[] }
type CategoryKey = 'food' | 'beauty' | 'fitness' | 'lifestyle' | 'business' | 'travel' | 'fashion' | 'pet' | 'photo' | 'study'

export const hashtagData: Record<CategoryKey, HashtagSet> = {
  food: {
    high: ['#カフェ', '#グルメ', '#ランチ', '#おいしい', '#食べ物', '#cafe', '#food', '#foodie'],
    mid: ['#カフェ巡り', '#カフェスタグラム', '#ランチタイム', '#コーヒー好き', '#スイーツ', '#cafestagram', '#instafood', '#foodphotography'],
    niche: ['#カフェ活', '#カフェ探し', '#隠れ家カフェ', '#古民家カフェ', '#ラテアート', '#specialtycoffee', '#coffeeart', '#thirdwavecoffee'],
  },
  beauty: {
    high: ['#コスメ', '#美容', '#メイク', '#スキンケア', '#beauty', '#makeup', '#skincare', '#cosmetics'],
    mid: ['#コスメ好き', '#デパコス', '#プチプラコスメ', '#美容好き', '#makeuplover', '#makeuptutorial', '#skincareroutine', '#kbeauty'],
    niche: ['#コスメレビュー', '#新作コスメ', '#コスメオタク', '#ナチュラルメイク', '#makeupjunkie', '#crueltyfreebeauty', '#glowyskin', '#cleanbeauty'],
  },
  fitness: {
    high: ['#筋トレ', '#ダイエット', '#ジム', '#健康', '#fitness', '#gym', '#workout', '#diet'],
    mid: ['#筋トレ女子', '#筋トレ記録', '#ダイエット記録', '#ボディメイク', '#workoutmotivation', '#fitnessmotivation', '#gymlife', '#healthylifestyle'],
    niche: ['#宅トレ', '#自重トレーニング', '#ダイエットメシ', '#プロテインレシピ', '#homeworkout', '#calisthenics', '#macros', '#mealprep'],
  },
  lifestyle: {
    high: ['#暮らし', '#日常', '#生活', '#シンプルライフ', '#lifestyle', '#daily', '#life', '#minimalist'],
    mid: ['#丁寧な暮らし', '#おうち時間', '#暮らしを整える', '#シンプルな暮らし', '#simplicitylife', '#slowliving', '#homelife', '#liveauthentic'],
    niche: ['#暮らしの記録', '#整理収納', '#断捨離', '#ナチュラルライフ', '#zerowaste', '#sustainableliving', '#intentionalliving', '#hygge'],
  },
  business: {
    high: ['#副業', '#フリーランス', '#起業', '#ビジネス', '#sidehustle', '#freelance', '#entrepreneur', '#business'],
    mid: ['#副業収入', '#フリーランス生活', '#個人事業主', '#在宅ワーク', '#passiveincome', '#workfromhome', '#onlinebusiness', '#digitalnomad'],
    niche: ['#副業初心者', '#Webライター', '#マイクロSaaS', '#個人開発', '#solopreneur', '#buildinpublic', '#indiehacker', '#bootstrapped'],
  },
  travel: {
    high: ['#旅行', '#旅', '#国内旅行', '#観光', '#travel', '#trip', '#vacation', '#explore'],
    mid: ['#旅行好き', '#旅行記録', '#女子旅', '#一人旅', '#travelgram', '#wanderlust', '#travelphotography', '#travellife'],
    niche: ['#旅行好きな人と繋がりたい', '#秘境', '#マイナー観光地', '#バックパッカー', '#offthebeatenpath', '#slowtravel', '#budgettravel', '#solotravel'],
  },
  fashion: {
    high: ['#ファッション', '#コーデ', '#おしゃれ', '#OOTD', '#fashion', '#style', '#outfit', '#ootd'],
    mid: ['#今日のコーデ', '#プチプラコーデ', '#シンプルコーデ', '#大人カジュアル', '#fashionblogger', '#streetstyle', '#casualstyle', '#minimalistfashion'],
    niche: ['#ナチュラルコーデ', '#スローファッション', '#サスティナブルファッション', '#古着女子', '#sustainablefashion', '#vintagestyle', '#capsulewardrobe', '#ethicalfashion'],
  },
  pet: {
    high: ['#犬', '#猫', '#ペット', '#いぬすたぐらむ', '#dog', '#cat', '#pet', '#dogsofinstagram'],
    mid: ['#犬のいる暮らし', '#猫のいる暮らし', '#わんこ', '#にゃんこ', '#doglife', '#catlife', '#petphotography', '#catsofinstagram'],
    niche: ['#保護犬', '#保護猫', '#トイプードル', '#柴犬', '#rescuedog', '#adoptdontshop', '#shiba', '#toypoodle'],
  },
  photo: {
    high: ['#写真', '#カメラ', '#写真好き', '#photography', '#photo', '#camera', '#photooftheday', '#photographer'],
    mid: ['#写真撮ってる人と繋がりたい', '#カメラ好き', '#一眼レフ', '#ミラーレス', '#streetphotography', '#landscapephotography', '#portraitphotography', '#naturephotography'],
    niche: ['#フィルム写真', '#モノクロ写真', '#逆光', '#スナップ写真', '#filmphotography', '#analogphotography', '#35mm', '#goldenhour'],
  },
  study: {
    high: ['#勉強', '#資格', '#受験', '#学習', '#study', '#learning', '#exam', '#education'],
    mid: ['#勉強垢', '#資格勉強', '#社会人勉強', '#独学', '#studygram', '#studywithme', '#selfstudy', '#certification'],
    niche: ['#勉強記録', '#宅建', '#簿記', '#TOEIC勉強', '#studymotivation', '#boki', '#toeic', '#studyaesthetic'],
  },
}

export const categories = Object.keys(hashtagData) as CategoryKey[]
