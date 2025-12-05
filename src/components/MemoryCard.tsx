import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import type { Memory } from '../data/memories';

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

export function MemoryCard({ memory, index }: MemoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index === 0 ? 0.3 : 0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="memory-card"
    >
      {/* Container da mídia */}
      <div className={`media-container ${memory.type === 'video' ? 'video-container' : ''}`}>
        {/* Skeleton de loading */}
        {isLoading && (
          <div className="skeleton">
            <div className="skeleton-shimmer" />
          </div>
        )}

        {memory.type === 'photo' ? (
          <img
            src={memory.src}
            alt={memory.message || 'Uma memória especial'}
            onLoad={handleMediaLoad}
            className={`media-content ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
          />
        ) : (
          <div className={`video-wrapper ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            <ReactPlayer
              src={memory.src}
              width="100%"
              height="100%"
              controls
              playing={false}
              playsInline
              onReady={handleMediaLoad}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </div>
        )}
      </div>

      {/* Mensagem e autor */}
      {(memory.message || memory.author) && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="message-container"
        >
          {memory.message && <p className="message-text">{memory.message}</p>}
          {memory.author && <span className="author-text">— {memory.author}</span>}
        </motion.div>
      )}
    </motion.article>
  );
}
