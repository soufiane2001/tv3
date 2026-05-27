'use client';
import { usePlayerStore } from '@/store/useStore';
import VideoPlayer from './VideoPlayer';
import { AnimatePresence, motion } from 'framer-motion';

export default function FloatingPlayer() {
  const { currentChannel, isPlayerOpen, closePlayer } = usePlayerStore();

  return (
    <AnimatePresence>
      {isPlayerOpen && currentChannel && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-[100] w-80 sm:w-96 shadow-2xl shadow-black/60 rounded-xl overflow-hidden border border-white/10"
        >
          <VideoPlayer
            channel={currentChannel}
            onClose={closePlayer}
            autoPlay
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
