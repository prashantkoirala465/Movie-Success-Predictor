# 🎬 Movie Success Predictor

A sophisticated machine learning-powered web application that predicts whether a movie will be a hit or a flop. This interactive quiz game lets users test their intuition against a trained ML model while learning about the factors that contribute to a movie's success.

![Movie Success Predictor](./frontend-quiz-app/src/assets/preview.png)

## 📚 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Machine Learning Model](#machine-learning-model)
- [Data Collection & Processing](#data-collection--processing)
- [Installation & Setup](#installation--setup)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The Movie Success Predictor combines data science with an engaging user interface to create an educational game about movie success prediction. Users can:
- Guess whether a movie was a hit or flop based on its details
- Compare their predictions with a machine learning model
- Learn about the factors that influence movie success
- Filter movies by genre, country, and rating
- Track their prediction accuracy

## ✨ Features

### 🎮 Interactive Quiz Interface
- Beautiful, responsive movie cards with TMDB posters
- Real-time feedback on user predictions
- Visual effects for correct/incorrect guesses
- Timer-based gameplay for added challenge
- Score tracking and statistics

### 🎯 Filtering & Customization
- Filter movies by:
  - Genre
  - Country of origin
  - MPAA rating (certification)
- Adjustable game settings
- Premium UI with animations and transitions

### 📊 Machine Learning Integration
- Real-time predictions using Logistic Regression
- Model confidence scores
- Comparison between user and model predictions
- Educational insights into prediction factors

## 🏗 Technical Architecture

### Frontend (React + TypeScript + Vite)
- Modern React with TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for responsive styling
- Custom hooks for state management
- Component-based architecture

### Backend (Python + Flask)
- Flask REST API
- CORS support for local development
- Environment-based configuration
- Scikit-learn for ML predictions
- TMDB API integration for movie posters

### Machine Learning Pipeline
- Data collection via TMDB API
- Preprocessing and feature engineering
- Model training and evaluation
- Real-time prediction serving

## 🤖 Machine Learning Model

### Data Features
- Budget
- Runtime
- Release Year
- Vote Average
- Vote Count
- Certification (MPAA Rating)
- Genre
- Country

### Model Details
- Algorithm: Logistic Regression
- Accuracy: 70.47%
- Features: One-hot encoded categorical variables
- Training Data: 375,377 movies

### Success Definition
A movie is considered successful (Hit) if:
- Revenue >= Budget × 2
- Otherwise classified as a Flop

## 📊 Data Collection & Processing

### Data Collection (`scrape-movies.py`)
- Uses TMDB API for movie data
- Collects movies from 1873 to 2020
- Features include:
  - Basic movie information
  - Financial data (budget/revenue)
  - Ratings and popularity
  - Production details

### Preprocessing (`preprocessing.py`)
1. Data Cleaning
   - Removes duplicates
   - Handles missing values
   - Filters invalid entries

2. Feature Engineering
   - Creates success column
   - Extracts primary genre
   - Processes release dates
   - Standardizes country information

### Model Training (`classification.py`)
- Implements multiple algorithms:
  - Logistic Regression
  - KNN
  - Decision Trees
  - Random Forest
- Cross-validation for model selection
- Hyperparameter tuning
- Performance visualization

## 🚀 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- TMDB API Key

### Backend Setup
\`\`\`bash
# Clone the repository
git clone https://github.com/prashantkoirala465/Movie-Success-Predictor.git
cd Movie-Success-Predictor

# Set up Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your TMDB_API_KEY

# Start the backend server
cd backend
python app.py
\`\`\`

### Frontend Setup
\`\`\`bash
# Navigate to frontend directory
cd frontend-quiz-app

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 📡 API Reference

### GET /api/quiz/next-movie
Retrieves a random movie for prediction.

Query Parameters:
- \`genre\`: Filter by movie genre
- \`country\`: Filter by production country
- \`certification\`: Filter by MPAA rating

Response:
\`\`\`json
{
  "id": "string",
  "title": "string",
  "posterUrl": "string"
}
\`\`\`

### POST /api/quiz/submit-guess
Submit a prediction for a movie.

Request Body:
\`\`\`json
{
  "movieId": "string",
  "guess": "Hit" | "Flop"
}
\`\`\`

Response:
\`\`\`json
{
  "movieId": "string",
  "userGuess": "string",
  "prediction": "string",
  "actualResult": "string",
  "isCorrect": boolean,
  "feedbackMessage": "string"
}
\`\`\`

### GET /api/quiz/filter-options
Get available filter options.

Response:
\`\`\`json
{
  "genres": ["string"],
  "countries": ["string"],
  "certifications": ["string"]
}
\`\`\`

## 📁 Project Structure

\`\`\`
Movie-Success-Predictor/
├── backend/
│   ├── app.py                 # Flask server
│   ├── train_model.py         # Model training script
│   ├── data/                  # Dataset storage
│   └── models/               # Trained model files
├── frontend-quiz-app/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   └── assets/          # Static assets
│   └── public/              # Public assets
├── scrape-movies.py          # Data collection script
├── preprocessing.py          # Data preprocessing
├── classification.py         # Model training
└── README.md                # Project documentation
\`\`\`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Prashant Koirala
- Aaska Koirala
- Aishmita Yonzan

## 🙏 Acknowledgments

- TMDB API for movie data
- Scikit-learn for ML tools
- React and Vite communities
- All contributors and testers
