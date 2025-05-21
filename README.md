

[Component: internetSearch]

# SimpleBreathScore

![SimpleBreathScore Logo](public/assets/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Netlify Status](https://api.netlify.com/api/v1/badges/34e01670-6d2a-48c8-9a11-7322c5df595b/deploy-status)](https://app.netlify.com/sites/simplebreathscore-com/deploys)

> A modern breathing meditation tracker that helps you master the "One Minute Breath" technique from Kundalini Yoga – breathe better, live better.

## ✨ Live Demo

[SimpleBreathScore.com](https://simplebreathscore.com)

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [The One Minute Breath](#the-one-minute-breath)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Scoring Algorithm](#scoring-algorithm)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🧘 About the Project

SimpleBreathScore is an open-source application designed to help users master the art of slow, controlled breathing. Originally created as a tool to help with Kundalini Yoga's "One Minute Breath" technique, the app provides real-time feedback and scoring to guide users toward optimal breathing patterns for meditation, stress reduction, and overall wellness.

Unlike many meditation apps that focus only on guided sessions, SimpleBreathScore uses a sophisticated algorithm to analyze your breathing patterns and provide a precise score (0.00-10.00) that reflects your mastery of slow, controlled breathing.

### Origin Story

This project was born out of personal practice with Kundalini Yoga's breathing techniques. The creator's mother was learning the One Minute Breath technique but had no way to track her progress objectively. SimpleBreathScore was created to fill this gap, providing precise metrics on breathing performance and progress over time.

## 🌟 Key Features

- **Breathing Session Recorder**: Capture inhale/exhale patterns with precision timing
- **Real-time Feedback**: Visual cues guide your breathing practice
- **Detailed Session Analytics**: Comprehensive metrics after each session
- **Breathing Score (0.00-10.00)**: Scientific scoring based on breathing rate and consistency
- **Progress Tracking**: Monitor improvement over time with session history
- **Offline Capability**: Practice anywhere with full offline functionality
- **Responsive Design**: Works on all devices from mobile to desktop
- **Open Source**: Community-driven development and customization

## 🌬️ The One Minute Breath

The One Minute Breath is a powerful Kundalini Yoga technique where one complete breath cycle takes a full minute:

- **Inhale** for 20 seconds
- **Hold** for 20 seconds
- **Exhale** for 20 seconds

This creates a rhythm of just one breath per minute—far below the average person's 12-16 breaths per minute.

### Benefits According to Tradition & Science

- Calms the mind and reduces anxiety
- Balances the nervous system
- Improves oxygen utilization
- Enhances mental clarity
- Reduces stress hormones
- Improves heart rate variability
- Strengthens respiratory muscles

### Progression Path

- **Beginner**: 6-12 breaths per minute
- **Intermediate**: 4-6 breaths per minute
- **Advanced**: 1-4 breaths per minute
- **Master**: 1 breath per minute

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) with React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API
- **Data Persistence**: localStorage with custom hooks
- **Deployment**: Netlify/Vercel
- **Typography**: Google Fonts (Inter, DM Serif Display)

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fcavalcantirj/simplebreathscore.com.git
   cd simplebreathscore
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Usage

### Starting a Session

1. Tap the "Start Session" button when you're ready to begin.
2. Find a comfortable position where you can remain undisturbed.
3. Press the "Inhale" button at the exact moment you begin breathing in.
4. Press the "Exhale" button when you start breathing out.
5. When you're ready to finish, press the "Stop" button.

### Understanding Your Results

After each session, you'll see:

- **Overall Score** (0.00-10.00)
- **Breaths Per Minute** (key performance metric)
- **Session Duration** (total meditation time)
- **Average Breath Cycle** (average length of complete breaths)
- **Detailed Timeline** (exact record of your breathing pattern)

### Tips for Best Results

- Focus on reducing your breathing rate below 6 breaths per minute
- Advanced practitioners aim for less than 4 breaths per minute
- Perfect scores come from reaching approximately 1 breath per minute
- There's no rigid pattern you must follow—your natural rhythm is what matters

## 🧮 Scoring Algorithm

The scoring algorithm is at the heart of SimpleBreathScore. It evaluates your breathing session based primarily on breaths per minute (BPM), with additional factors for consistency and session length.

```javascript
function calculateBreathingScore(startTime, inhaleTimestamps, exhaleTimestamps, stopTime) {
    // Core measurements
    const sessionDurationMinutes = (stopTime - startTime) / (1000 * 60);
    const breathCount = inhaleTimestamps.length;
    
    // Calculate breaths per minute (primary metric)
    const breathsPerMinute = breathCount / sessionDurationMinutes;
    
    // Base score calculation (granular with decimals)
    let score;
    
    if (breathsPerMinute <= 1) {
        // 1 BPM or less (perfect): Score range 9.50 - 10.00
        const deviation = Math.abs(1 - breathsPerMinute);
        score = 10 - (deviation * 0.5); 
    } 
    else if (breathsPerMinute <= 4) {
        // Between 1-4 BPM: Score range 7.00 - 9.49
        score = 9.5 - ((breathsPerMinute - 1) * (2.5/3));
    } 
    else if (breathsPerMinute <= 6) {
        // Between 4-6 BPM: Score range 5.00 - 6.99
        score = 7 - ((breathsPerMinute - 4) * (2/2));
    } 
    else if (breathsPerMinute <= 12) {
        // Between 6-12 BPM: Score range 0.01 - 4.99
        score = 5 - ((breathsPerMinute - 6) * (5/6));
    } 
    else {
        // More than 12 BPM: Score is 0
        score = 0;
    }
    
    // Secondary adjustments for session length
    const durationBonus = Math.min(0.49, sessionDurationMinutes / 60);
    
    // For very good scores (7+), apply consistency adjustment
    let consistencyAdjustment = 0;
    if (score >= 7 && breathCount > 3) {
        // Calculate intervals between inhales
        const intervals = [];
        for (let i = 0; i < inhaleTimestamps.length - 1; i++) {
            intervals.push(inhaleTimestamps[i+1] - inhaleTimestamps[i]);
        }
        
        // Calculate stats
        const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
        const stdDev = Math.sqrt(intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length);
        const cv = stdDev / avgInterval;
        
        // Apply adjustment (-0.25 to +0.25)
        consistencyAdjustment = 0.25 - (cv * 0.5);
        consistencyAdjustment = Math.max(-0.25, Math.min(0.25, consistencyAdjustment));
    }
    
    // Final score with all adjustments
    const finalScore = Math.max(0, Math.min(10, score + durationBonus + consistencyAdjustment));
    
    // Return score with 2 decimal places
    return parseFloat(finalScore.toFixed(2));
}
```

### Score Ranges and Meanings

- **9.50-10.00**: Mastery (approximately 1 BPM)
- **7.00-9.49**: Advanced (1-4 BPM)
- **5.00-6.99**: Intermediate (4-6 BPM)
- **0.01-4.99**: Beginner (6-12 BPM)
- **0.00**: Needs practice (>12 BPM)

## 👥 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

### Ways to Contribute

- **Code**: Implement new features or fix bugs
- **Documentation**: Improve or correct the documentation
- **Design**: Enhance UI/UX or create assets
- **Testing**: Help discover and fix issues
- **Feedback**: Share your experience using the app
- **Translation**: Help make the app accessible in different languages

## 🗺️ Roadmap

- [x] Core breathing session tracking
- [x] Detailed analytics and scoring
- [x] Session history
- [ ] Guided breathing sessions
- [ ] Breath visualization enhancements
- [ ] Audio feedback options
- [ ] Social sharing of results
- [ ] Export/import capability
- [ ] Dark/light theme toggle
- [ ] Multiple language support
- [ ] Accessibility improvements

See the [open issues](https://github.com/fcavalcantirj/simplebreathscore.com/issues) for a list of proposed features and known issues.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgements

- [Kundalini Yoga tradition](https://en.wikipedia.org/wiki/Kundalini_yoga) for the One Minute Breath technique
- All our open-source [contributors](https://github.com/fcavalcantirj/simplebreathscore.com/graphs/contributors)
- The breathing research community for advancing our understanding of respiration benefits
- [OpenAI](https://openai.com) for assisting with development
- [Vercel](https://vercel.com) for hosting
- [GitHub](https://github.com) for collaboration tools

---

<p align="center">
  Made with ❤️ for better breathing
</p>

<p align="center">
  <a href="mailto:contact@simplebreathscore.com">Contact</a>
</p>