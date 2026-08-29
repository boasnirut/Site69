import { writeRepoFile, readRepoFile } from './_lib/repo.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { heroBanners, achievements, activities } = req.body || {}
    const fullData = {
      heroBanners,
      achievements,
      activities,
    }
    const jsonContent = JSON.stringify(fullData, null, 2)

    let currentSha = null
    try {
      const existing = await readRepoFile('public/data/siteData.json')
      currentSha = existing?.sha || null
    } catch (e) {
      // File may not exist yet
    }

    await writeRepoFile(
      'public/data/siteData.json',
      jsonContent,
      'data: update siteData.json via Admin Portal',
      currentSha
    )

    return res.status(200).json({
      success: true,
      message: 'ซิงค์และอัปเดตข้อมูลตรงสู่ GitHub & Vercel สำเร็จเรียบร้อยแล้ว!',
    })
  } catch (error) {
    console.error('API Sync Error:', error)
    return res.status(500).json({
      error: error.message || 'เกิดข้อผิดพลาดในการเขียนข้อมูลลงใน GitHub',
    })
  }
}
