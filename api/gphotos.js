export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { url } = req.query
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid url parameter' })
  }

  try {
    // 1. Fetch Google Photos URL (following redirects)
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    })

    if (!response.ok) {
      return res.status(400).json({ error: `Failed to fetch URL. HTTP Status: ${response.status}` })
    }

    const html = await response.text()

    // 2. Extract og:image meta tag
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      html.match(/<meta[^>]+name=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']og:image["']/i)

    let coverImage = ''
    if (ogMatch && ogMatch[1] && ogMatch[1].startsWith('http')) {
      coverImage = ogMatch[1]
      if (coverImage.includes('googleusercontent.com')) {
        coverImage = coverImage.replace(/=w\d+-h\d+.*$/, '') + '=w1000-h750-no'
      }
    }

    // 3. Extract all lh3.googleusercontent.com images in the album page
    const lh3Matches =
      html.match(/https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9_\-]+/gi) ||
      html.match(/https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9_\-]+/gi) ||
      []

    // Deduplicate and append high quality 4:3 size parameter =w1000-h750-no
    const uniqueImages = Array.from(new Set(lh3Matches)).map(
      (imgUrl) => imgUrl.replace(/=w\d+-h\d+.*$/, '') + '=w1000-h750-no'
    )

    if (coverImage && !uniqueImages.includes(coverImage)) {
      uniqueImages.unshift(coverImage)
    }

    return res.status(200).json({
      success: true,
      cover: coverImage || uniqueImages[0] || '',
      images: uniqueImages.length > 0 ? uniqueImages : (coverImage ? [coverImage] : []),
    })
  } catch (error) {
    console.error('Google Photos Extractor Error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
