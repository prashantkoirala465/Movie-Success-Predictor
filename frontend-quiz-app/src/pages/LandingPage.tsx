import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChartBarIcon, LightBulbIcon, TrophyIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Predictions',
    description: 'Our machine learning model analyzes multiple factors to predict movie success with high accuracy.',
    icon: LightBulbIcon,
  },
  {
    name: 'Test Your Intuition',
    description: 'Challenge yourself against our AI model and see if you can predict which movies will be hits.',
    icon: TrophyIcon,
  },
  {
    name: 'Learn From Data',
    description: 'Understand the patterns and factors that contribute to a movie\'s success in the box office.',
    icon: ChartBarIcon,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-900 to-dark-900" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mb-6">
              Predict Movie Success
              <span className="block text-primary-400">Like Never Before</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Challenge our AI model in predicting which movies will be hits or flops.
              Test your movie industry knowledge and learn what makes a film successful.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/quiz"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-400 transition-colors duration-200 shadow-lg hover:shadow-primary-500/20"
              >
                Start Predicting
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-500/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Why Use MoviePredictor?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines machine learning with your intuition to create
              an engaging experience in movie success prediction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative p-6 bg-dark-700 rounded-xl hover:bg-dark-600 transition-colors duration-200"
              >
                <div className="absolute -top-4 left-6">
                  <span className="inline-flex items-center justify-center p-3 bg-primary-500/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary-400" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-primary-900/10 to-dark-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
              Ready to Test Your Movie Prediction Skills?
            </h2>
            <p className="text-gray-300 mb-10">
              Join thousands of movie enthusiasts who are already challenging our AI
              and improving their understanding of the film industry.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-400 transition-colors duration-200 shadow-lg hover:shadow-primary-500/20"
            >
              Start the Quiz
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 