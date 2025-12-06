import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT_DIR = path.join(__dirname, '..', 'NiverPhotos')
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets')

// Configurações de compressão
const IMAGE_CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 80,
}

const VIDEO_CONFIG = {
  // CRF mais alto = mais compressão (18-28 é bom range, 23 é default)
  crf: 28,
  // Escala máxima
  maxHeight: 720,
}

// Função para sanitizar nome do arquivo
function sanitizeFilename(filename) {
  return filename
    .replace(/WhatsApp (Image|Video) /g, '')
    .replace(/ at /g, '_')
    .replace(/\s+/g, '_')
    .replace(/[()]/g, '')
    .replace(/__+/g, '_')
}

// Comprimir imagem
async function compressImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath)
    const metadata = await image.metadata()

    let pipeline = image

    // Redimensionar se necessário
    if (metadata.width > IMAGE_CONFIG.maxWidth || metadata.height > IMAGE_CONFIG.maxHeight) {
      pipeline = pipeline.resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    await pipeline.jpeg({ quality: IMAGE_CONFIG.quality, mozjpeg: true }).toFile(outputPath)

    const inputStats = fs.statSync(inputPath)
    const outputStats = fs.statSync(outputPath)
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)

    console.log(`✅ Imagem: ${path.basename(outputPath)}`)
    console.log(
      `   ${(inputStats.size / 1024).toFixed(0)}KB → ${(outputStats.size / 1024).toFixed(
        0
      )}KB (${reduction}% redução)`
    )

    return true
  } catch (error) {
    console.error(`❌ Erro ao comprimir imagem ${inputPath}:`, error.message)
    return false
  }
}

// Comprimir vídeo usando ffmpeg
async function compressVideo(inputPath, outputPath) {
  try {
    // Verifica se ffmpeg está instalado
    try {
      await execAsync('ffmpeg -version')
    } catch {
      console.error('❌ FFmpeg não está instalado. Instale com: brew install ffmpeg')
      return false
    }

    const inputStats = fs.statSync(inputPath)
    console.log(
      `🎬 Comprimindo vídeo: ${path.basename(inputPath)} (${(inputStats.size / 1024 / 1024).toFixed(
        1
      )}MB)...`
    )

    // Comando ffmpeg para comprimir vídeo
    const command = `ffmpeg -i "${inputPath}" -vf "scale=-2:${VIDEO_CONFIG.maxHeight}" -c:v libx264 -crf ${VIDEO_CONFIG.crf} -preset medium -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`

    await execAsync(command)

    const outputStats = fs.statSync(outputPath)
    const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)

    console.log(`✅ Vídeo: ${path.basename(outputPath)}`)
    console.log(
      `   ${(inputStats.size / 1024 / 1024).toFixed(1)}MB → ${(
        outputStats.size /
        1024 /
        1024
      ).toFixed(1)}MB (${reduction}% redução)`
    )

    return true
  } catch (error) {
    console.error(`❌ Erro ao comprimir vídeo ${inputPath}:`, error.message)
    return false
  }
}

// Função principal
async function main() {
  console.log('🚀 Iniciando compressão de mídia...\n')

  // Verifica se a pasta de entrada existe
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Pasta de entrada não encontrada: ${INPUT_DIR}`)
    process.exit(1)
  }

  // Cria pasta de saída se não existir
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Lista todos os arquivos
  const files = fs.readdirSync(INPUT_DIR)
  const images = files.filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
  const videos = files.filter((f) => /\.(mp4|mov|avi)$/i.test(f))

  console.log(`📁 Encontrados: ${images.length} imagens, ${videos.length} vídeos\n`)

  // Processa imagens
  console.log('📷 Processando imagens...\n')
  for (const image of images) {
    const inputPath = path.join(INPUT_DIR, image)
    const outputFilename = sanitizeFilename(image)
    const outputPath = path.join(OUTPUT_DIR, outputFilename)
    await compressImage(inputPath, outputPath)
  }

  // Processa vídeos
  if (videos.length > 0) {
    console.log('\n🎥 Processando vídeos...\n')
    for (const video of videos) {
      const inputPath = path.join(INPUT_DIR, video)
      const outputFilename = sanitizeFilename(video)
      const outputPath = path.join(OUTPUT_DIR, outputFilename)
      await compressVideo(inputPath, outputPath)
    }
  }

  console.log('\n✨ Compressão concluída!')

  // Mostra tamanho total
  const outputFiles = fs.readdirSync(OUTPUT_DIR)
  let totalSize = 0
  for (const file of outputFiles) {
    const stats = fs.statSync(path.join(OUTPUT_DIR, file))
    totalSize += stats.size
  }
  console.log(`📊 Tamanho total em assets: ${(totalSize / 1024 / 1024).toFixed(1)}MB`)
}

main().catch(console.error)
