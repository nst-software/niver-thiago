import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { memories } from './data/memories';
import { MemoryCard } from './components/MemoryCard';

function App() {
  return (
    <div className="app-container">
      {/* Fundo com textura noise */}
      <div className="noise-overlay" />

      {/* Header aconchegante */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="header"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="heart-icon"
        >
          <Heart className="w-6 h-6" fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="title"
        >
          Feliz 25, Thiago!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="subtitle"
        >
          Um abraço de quem te ama, <br />
          do outro lado do oceano.
        </motion.p>
      </motion.header>

      {/* Feed de memórias */}
      <main className="feed-container">
        {memories.map((memory, index) => (
          <MemoryCard key={index} memory={memory} index={index} />
        ))}
      </main>

      {/* Footer carinhoso */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="footer"
      >
        <div className="footer-divider" />
        <p className="footer-text">
          Feito com carinho por quem sente sua falta 💛
        </p>
        <p className="footer-date">06 de Dezembro de 2025</p>
      </motion.footer>
    </div>
  );
}

export default App;
