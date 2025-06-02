import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BeakerIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  DocumentTextIcon,
  FolderIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ServerIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: RocketLaunchIcon,
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: LightBulbIcon,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    icon: PuzzlePieceIcon,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: CodeBracketIcon,
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: ServerIcon,
  },
  {
    id: 'ml-model',
    title: 'ML Model',
    icon: CpuChipIcon,
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: BeakerIcon,
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: WrenchScrewdriverIcon,
  },
  {
    id: 'cli',
    title: 'CLI Tools',
    icon: CommandLineIcon,
  },
  {
    id: 'project-structure',
    title: 'Project Structure',
    icon: FolderIcon,
  },
  {
    id: 'contributing',
    title: 'Contributing',
    icon: DocumentTextIcon,
  },
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button when scrolled down 500px
      setShowBackToTop(window.scrollY > 500);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Documentation Header */}
      <div className="h-16" /> {/* Navbar spacer */}
      <header className="bg-gradient-to-b from-dark-900 to-dark-800 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl"
          >
            Everything you need to know about the Movie Success Predictor project,
            from setup to deployment.
          </motion.p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-20 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeSection === section.id
                      ? 'text-white bg-primary-500/10 border border-primary-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  <section.icon className="w-5 h-5 mr-2" />
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-9 prose prose-invert max-w-none">
            <section id="introduction" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <RocketLaunchIcon className="w-8 h-8 mr-3 text-primary-500" />
                Introduction
              </h2>
              <p className="text-gray-300 mb-6">
                The Movie Success Predictor is a sophisticated machine learning project that combines
                data science with web technology to predict whether a movie will be a hit or a flop.
                This project was developed as part of DATA 200 Final Project, demonstrating the
                practical application of machine learning in the entertainment industry.
              </p>
              <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                    Interactive quiz interface for testing movie success predictions
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                    Machine learning model with 70.47% accuracy
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                    Analysis of 375,377 movies from 1970 to 2018
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                    Real-time integration with TMDB API
                  </li>
                </ul>
              </div>
            </section>

            <section id="getting-started" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <LightBulbIcon className="w-8 h-8 mr-3 text-primary-500" />
                Getting Started
              </h2>
              <div className="space-y-6">
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                      Node.js (v18 or later)
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                      Python (3.8 or later)
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3" />
                      TMDB API key
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Frontend Setup</h3>
                  <div className="bg-dark-800/50 rounded-lg p-4 font-mono text-sm">
                    <p className="text-gray-300">cd frontend</p>
                    <p className="text-gray-300">npm install</p>
                    <p className="text-gray-300">npm run dev</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Backend Setup</h3>
                  <div className="bg-dark-800/50 rounded-lg p-4 font-mono text-sm">
                    <p className="text-gray-300">cd backend</p>
                    <p className="text-gray-300">python -m venv venv</p>
                    <p className="text-gray-300">source venv/bin/activate  # On Windows: venv\Scripts\activate</p>
                    <p className="text-gray-300">pip install -r requirements.txt</p>
                    <p className="text-gray-300">python app.py</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="architecture" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <PuzzlePieceIcon className="w-8 h-8 mr-3 text-primary-500" />
                Architecture
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  The Movie Success Predictor follows a modern, scalable architecture that separates
                  concerns between the frontend, backend, and machine learning components:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Frontend Layer</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>React + Vite</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>Framer Motion</li>
                    </ul>
                  </div>
                  <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Backend Layer</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>Flask API</li>
                      <li>SQLite Database</li>
                      <li>TMDB Integration</li>
                      <li>JWT Authentication</li>
                    </ul>
                  </div>
                  <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                    <h3 className="text-xl font-semibold text-white mb-4">ML Layer</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>scikit-learn</li>
                      <li>pandas</li>
                      <li>numpy</li>
                      <li>Feature Engineering</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="frontend" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <CodeBracketIcon className="w-8 h-8 mr-3 text-primary-500" />
                Frontend
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  The frontend is built with React and TypeScript, utilizing modern web technologies
                  to create a responsive and interactive user interface.
                </p>
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Key Components</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-white">MovieCard</h4>
                      <p className="text-gray-300">Displays movie information and poster</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">QuizControls</h4>
                      <p className="text-gray-300">Handles user predictions</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">ScoreDisplay</h4>
                      <p className="text-gray-300">Shows user performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="backend" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <ServerIcon className="w-8 h-8 mr-3 text-primary-500" />
                Backend
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  The backend is powered by Flask, providing RESTful APIs for the frontend and
                  handling machine learning model predictions.
                </p>
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4">API Endpoints</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-dark-900 rounded-lg">
                      <code className="text-primary-400">GET /api/quiz/next-movie</code>
                      <p className="text-gray-300 mt-2">Fetches the next movie for prediction</p>
                    </div>
                    <div className="p-4 bg-dark-900 rounded-lg">
                      <code className="text-primary-400">POST /api/quiz/submit-guess</code>
                      <p className="text-gray-300 mt-2">Submits user's prediction and returns result</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="ml-model" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <CpuChipIcon className="w-8 h-8 mr-3 text-primary-500" />
                ML Model
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  The machine learning model uses various algorithms to predict movie success,
                  trained on a dataset of over 375,000 movies.
                </p>
                <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
                  <h3 className="text-xl font-semibold text-white mb-4">Model Performance</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-dark-900 rounded-lg">
                      <p className="text-lg font-medium text-white">Accuracy</p>
                      <p className="text-2xl font-bold text-primary-400">70.47%</p>
                    </div>
                    <div className="p-4 bg-dark-900 rounded-lg">
                      <p className="text-lg font-medium text-white">Training Data</p>
                      <p className="text-2xl font-bold text-primary-400">375,377 Movies</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="api" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <BeakerIcon className="w-8 h-8 mr-3 text-primary-500" />
                API Reference
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  Detailed documentation of all available API endpoints and their usage.
                </p>
                {/* Add more API documentation content */}
              </div>
            </section>

            <section id="deployment" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <WrenchScrewdriverIcon className="w-8 h-8 mr-3 text-primary-500" />
                Deployment
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  Instructions for deploying the application to various platforms.
                </p>
                {/* Add deployment instructions */}
              </div>
            </section>

            <section id="cli" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <CommandLineIcon className="w-8 h-8 mr-3 text-primary-500" />
                CLI Tools
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  Command-line tools for data collection and model training.
                </p>
                {/* Add CLI documentation */}
              </div>
            </section>

            <section id="project-structure" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <FolderIcon className="w-8 h-8 mr-3 text-primary-500" />
                Project Structure
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  Overview of the project's file and directory organization.
                </p>
                {/* Add project structure documentation */}
              </div>
            </section>

            <section id="contributing" className="mb-16">
              <h2 className="flex items-center text-3xl font-bold text-white mb-6">
                <DocumentTextIcon className="w-8 h-8 mr-3 text-primary-500" />
                Contributing
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300">
                  Guidelines for contributing to the project.
                </p>
                {/* Add contributing guidelines */}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-400 transition-all duration-200 ${
          showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Documentation; 