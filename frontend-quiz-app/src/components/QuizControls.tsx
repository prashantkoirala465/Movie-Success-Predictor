import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface QuizControlsProps {
  onGuess: (guess: 'Hit' | 'Flop') => void;
  disabled?: boolean; // Optional: to disable buttons during loading/feedback
}

const QuizControls = ({ onGuess, disabled = false }: QuizControlsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onGuess('Hit')}
        disabled={disabled}
        className={`
          relative group overflow-hidden rounded-lg px-6 py-4
          bg-gradient-to-br from-emerald-500 to-emerald-600
          disabled:from-emerald-500/50 disabled:to-emerald-600/50
          disabled:cursor-not-allowed
          transition-all duration-200
        `}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="relative flex items-center justify-center space-x-2">
          <TrophyIcon className="w-5 h-5" />
          <span className="font-medium">Hit</span>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onGuess('Flop')}
        disabled={disabled}
        className={`
          relative group overflow-hidden rounded-lg px-6 py-4
          bg-gradient-to-br from-rose-500 to-rose-600
          disabled:from-rose-500/50 disabled:to-rose-600/50
          disabled:cursor-not-allowed
          transition-all duration-200
        `}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <div className="relative flex items-center justify-center space-x-2">
          <XCircleIcon className="w-5 h-5" />
          <span className="font-medium">Flop</span>
        </div>
      </motion.button>
    </div>
  );
};

export default QuizControls; 