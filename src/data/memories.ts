export interface Memory {
  type: 'photo' | 'video'
  src: string
  message?: string
  author?: string
}

export const memories: Memory[] = [
  // Videos
  {
    type: 'photo',
    src: '/assets/foto_exemplo.jpeg',
    message: 'Feliz Aniversário, Thiago! Que saudade de você por aqui...',
    author: 'Familia',
  },
  {
    type: 'video',
    src: '/assets/WhatsApp Video 2025-12-05 at 19.30.47.mp4',
  },
  {
    type: 'video',
    src: '/assets/WhatsApp Video 2025-12-05 at 22.40.17.mp4',
  },
  {
    type: 'video',
    src: '/assets/WhatsApp Video 2025-12-05 at 18.02.31.mp4',
  },
  {
    type: 'video',
    src: '/assets/WhatsApp Video 2025-12-05 at 16.39.01.mp4',
  },

  // Fotos e vídeos embaralhados
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.13_2.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-05_08.55.25_1.jpeg',
  },
  {
    type: 'video',
    src: '/assets/WhatsApp Video 2025-12-05 at 10.59.51.mp4',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.31.40.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.12_3.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-05_11.11.26.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.33.00_1.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.12_4.jpeg',
  },
  {
    type: 'video',
    src: '/assets/WhatsApp Video 2025-12-05 at 11.10.25.mp4',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_18.46.23.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.13_1.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-05_08.55.24.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.32.59.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.12_1.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-05_08.55.25_2.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/foto.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.13.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.31.41.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.12.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-05_11.16.04.jpeg',
    message: 'Queria estar aqui, com vocês! Exatamente aqui... Com vocês!',
    author: 'Arthur',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.33.00_2.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.27.13_3.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-05_08.55.25.jpeg',
  },
  {
    type: 'photo',
    src: '/assets/2025-12-03_17.33.00.jpeg',
  },
]
