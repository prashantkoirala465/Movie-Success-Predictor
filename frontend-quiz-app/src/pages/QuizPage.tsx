import React, { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import MovieCard from '../components/MovieCard';
import QuizControls from '../components/QuizControls';
import ScoreDisplay from '../components/ScoreDisplay';
import FeedbackMessage from '../components/FeedbackMessage';
import FilterControls from '../components/FilterControls';
import {
  getMovieToGuess,
  submitGuess,
  getFilterOptions,
} from '../services/backendService';
import type {
  QuizMovieFromBackend,
  GuessResponse,
  FilterOptions,
  GetMovieParams,
} from '../services/backendService';
import { getPosterUrl } from '../services/tmdbService';
import { motion, AnimatePresence } from 'framer-motion';

// Simple component for wrong guess visual effect
const WrongGuessEffect: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div 
      className="fixed inset-0 bg-red-600/40 backdrop-blur-sm z-[1000] animate-wrongGuessFlash"
      onAnimationEnd={(e) => {
        // Optional: Clean up class if animation is one-shot and you want to re-trigger via class change
        // (e.target as HTMLElement).classList.remove('animate-wrongGuessFlash'); 
      }}
    >
      <style>
        {`
          @keyframes wrongGuessFlash {
            0% { opacity: 0; transform: scale(1.05); }
            25% { opacity: 1; transform: scale(1); }
            75% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.05); }
          }
          .animate-wrongGuessFlash {
            animation: wrongGuessFlash 0.7s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

const QuizPage: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState<QuizMovieFromBackend | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean | null }>({
    message: '',
    isCorrect: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<GetMovieParams>({});

  // State for confetti
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWrongGuessEffect, setShowWrongGuessEffect] = useState(false);
  const { width, height } = useWindowSize();

  // Fetch filter options on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setError("Could not load filter options.");
      }
    };
    fetchOptions();
  }, []);

  const loadNextMovie = useCallback(async (filtersToApply?: GetMovieParams) => {
    setIsLoading(true);
    setError(null);
    setFeedback({ message: '', isCorrect: null });
    setCurrentMovie(null);
    setShowConfetti(false);
    setShowWrongGuessEffect(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const movie = await getMovieToGuess(filtersToApply || selectedFilters);
      setCurrentMovie(movie);
    } catch (err: any) {
      console.error("Error loading next movie:", err);
      setError(err.message || "Oops! We couldn't load the next movie. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (filterOptions) { // Only load initial movie once filter options are available
        loadNextMovie({}); // Load with no filters initially, or respect current selectedFilters
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]); // Removed loadNextMovie from deps to avoid loop, it's stable with useCallback

  const handleFilterChange = (filterType: keyof GetMovieParams, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value || undefined }));
  };

  const handleApplyFilters = () => {
    loadNextMovie(selectedFilters);
  };

  const handleGuess = async (guess: 'Hit' | 'Flop') => {
    if (!currentMovie) return;
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 750));
      const result: GuessResponse = await submitGuess(currentMovie.id, guess);
      setFeedback({
        message: result.feedbackMessage,
        isCorrect: result.isCorrect,
      });
      setScore((prev) => (result.isCorrect ? prev + 1 : prev));
      setTotalQuestions((prev) => prev + 1);

      if (result.isCorrect) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Confetti duration
      } else {
        setShowWrongGuessEffect(true);
        setTimeout(() => setShowWrongGuessEffect(false), 1500); // Wrong guess effect duration
      }

      setTimeout(() => {
        loadNextMovie(selectedFilters);
      }, result.isCorrect ? 4500 : 3000); // Longer for confetti, shorter for wrong guess

    } catch (err: any) {
      console.error("Error submitting guess:", err);
      setError(err.message || "Oh no! Your guess couldn't be submitted. Let's try again.");
    }
  };

  const handleNextMovie = () => {
    setFeedback({ message: '', isCorrect: null });
    loadNextMovie(selectedFilters);
  };

  let posterUrlForCard = ''; // Default to empty string
  if (currentMovie && currentMovie.posterUrl) {
    const fullPosterPath = getPosterUrl(currentMovie.posterUrl);
    if (fullPosterPath) {
      posterUrlForCard = fullPosterPath;
    }
    // If fullPosterPath is null, posterUrlForCard remains '', which is a valid string for MovieCard
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-display font-bold text-white mb-4"
          >
            Movie Success Quiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Can you predict which movies were hits and which were flops?
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left column: Movie Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <MovieCard
              title={currentMovie?.title || 'Loading...'}
              posterUrl={posterUrlForCard}
            />
          </motion.div>

          {/* Right column: Controls and Score */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="card">
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Make Your Prediction
              </h2>
              <QuizControls
                onGuess={handleGuess}
                disabled={isLoading || !!feedback.message}
              />
            </div>

            <AnimatePresence mode="wait">
              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card"
                >
                  <FeedbackMessage
                    message={feedback.message}
                    isCorrect={feedback.isCorrect}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextMovie}
                    className="btn-primary w-full mt-4"
                  >
                    Next Movie
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="card">
              <ScoreDisplay
                score={score}
                totalQuestions={totalQuestions}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 