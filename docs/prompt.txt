# Initial Development Prompt

This prompt was used to guide the development of the application, including:
- Core breathing session tracking functionality
- Scoring algorithm implementation
- UI/UX design decisions
- Technical architecture choices

The prompt served as a foundational document that outlined the vision and requirements for the project.

Momma's Little Helper" Breathing App

## CONTEXT
Create a polished, performance-optimized meditation tracking application called "Momma's Little Helper" using modern React or Next.js, focusing on mastery of slow, controlled breathing techniques. The app measures breathing performance with a sophisticated scoring algorithm that rewards users who achieve fewer breaths per minute (ultimate goal: 1 breath per minute with the ideal 20-20-20 pattern of inhale-hold-exhale).

## AUDIENCE
- Primary user: A mother learning Kundalini breathing techniques
- Secondary users: Anyone interested in meditation, breath control, or stress reduction
- Skill level: Accessible to beginners but sophisticated enough for advanced practitioners

## REQUEST
Design a responsive React/Next.js application with the following:

1. *Technology Stack:*
   - Frontend: React.js or Next.js (preferred for better SEO and performance)
   - State Management: React Context API or Redux Toolkit (for complex state)
   - Styling: Styled Components, Tailwind CSS, or Chakra UI
   - Animations: Framer Motion for fluid, physics-based animations
   - Data Persistence: localStorage with custom hooks
   - Build/Deployment: Vercel or Netlify for static site generation

2. *Core Functionality:*
   - Breathing session recorder with React-based timer implementation
   - React-controlled inhale/exhale button components
   - Component-based results dashboard with detailed metrics
   - Custom hooks for local storage interaction
   - Context-based user preferences and history management

3. *User Experience:*
   - SVG/Canvas-based animated breathing guide with React spring physics
   - Declarative animation patterns for visual feedback
   - Custom hook for device vibration/haptic feedback
   - React-based audio management for ambient sounds
   - Session recording using immutable state patterns

4. *Performance Considerations:*
   - Code splitting for faster initial load
   - React.memo() for expensive render components
   - useCallback/useMemo for optimized event handlers
   - Lazy loading for secondary features
   - Service worker registration for offline capabilities

## STYLE
Implement a modern React component architecture with these design principles:
- Utilize CSS-in-JS or utility-based styling (Tailwind) for component scoping
- Implement theme provider pattern for consistent styling and dark/light mode
- Create reusable animation components using Framer Motion
- Use React portals for modals and overlays
- Implement proper a11y patterns with React-Aria or similar

## EXEMPLARY QUALITY INDICATORS
- *Component Architecture:* Clean separation of concerns, reusable components
- *Custom Hooks:* Well-designed hooks for timer, storage, breathing detection
- *State Management:* Appropriate use of local vs. global state
- *Performance:* Optimized render cycles, no unnecessary re-renders
- *Code Quality:* TypeScript typing (optional but preferred), consistent patterns

## STRUCTURE
1. *Component Hierarchy*
   - <App /> - Root component with router
   - <BreathingSession /> - Core session management
   - <BreathingControls /> - Button interface
   - <BreathingVisualizer /> - Animated guide
   - <ResultsDashboard /> - Post-session analysis
   - <HistoryView /> - Past sessions and leaderboard

2. *Custom Hooks*
   - useBreathingSession - Core session state management
   - useBreathingScore - Algorithm implementation
   - useSessionStorage - Persistent data management
   - useBreathingAnimation - Animation control
   - useAudioFeedback - Sound management

3. *Contexts*
   - BreathingSessionContext - Active session data
   - UserPreferencesContext - Settings/preferences
   - HistoryContext - Past sessions management

## SPECIFICS
- *Algorithm Implementation:* Create a custom React hook that implements the exact scoring algorithm:

javascript
// useBreathingScore.js
export function useBreathingScore() {
  // This implementation can be called at the end of a session to calculate score
  const calculateScore = useCallback((startTime, inhaleTimestamps, exhaleTimestamps, stopTime) => {
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
      score = 10 - (deviation * 0.5); // Small penalty for going below 1
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
  }, []);

  return { calculateScore };
}


- *Session Management Hook:*
javascript
// useBreathingSession.js
export function useBreathingSession() {
  const [sessionState, setSessionState] = useState({
    isActive: false,
    startTime: null,
    inhaleTimestamps: [],
    exhaleTimestamps: [],
    stopTime: null
  });

  // Methods to control session
  const startSession = useCallback(() => {
    setSessionState({
      isActive: true,
      startTime: Date.now(),
      inhaleTimestamps: [],
      exhaleTimestamps: [],
      stopTime: null
    });
  }, []);

  const recordInhale = useCallback(() => {
    if (!sessionState.isActive) return;
    
    setSessionState(prev => ({
      ...prev,
      inhaleTimestamps: [...prev.inhaleTimestamps, Date.now()]
    }));
  }, [sessionState.isActive]);

  const recordExhale = useCallback(() => {
    if (!sessionState.isActive) return;
    
    setSessionState(prev => ({
      ...prev,
      exhaleTimestamps: [...prev.exhaleTimestamps, Date.now()]
    }));
  }, [sessionState.isActive]);

  const stopSession = useCallback(() => {
    if (!sessionState.isActive) return;
    
    setSessionState(prev => ({
      ...prev,
      isActive: false,
      stopTime: Date.now()
    }));
  }, [sessionState.isActive]);

  return {
    sessionState,
    startSession,
    recordInhale,
    recordExhale,
    stopSession
  };
}


- *Feature Details:*
  - Use responsive design patterns for all components
  - Implement React.lazy for code splitting non-critical components
  - Use Framer Motion for breathing visualization
  - Implement proper error boundaries and loading states
  - Include TypeScript interfaces for all props and state

## ADVANTAGES OF REACT/NEXT.JS APPROACH
1. *Performance Benefits:*
   - Optimized rendering with virtual DOM diffing
   - Code splitting for faster initial page load
   - Static site generation with Next.js for optimal performance

2. *Development Advantages:*
   - Component reusability for consistent UI elements
   - Easier state management through React hooks and context
   - Better maintainability with modular code structure
   - TypeScript support for type safety and better autocomplete

3. *User Experience Improvements:*
   - Smoother transitions between screens (no full page reloads)
   - More sophisticated animations with dedicated libraries
   - Consistent state management across the application
   - Better offline capabilities with service workers

4. *Future-Proofing:*
   - Easy to extend with new features later
   - Well-supported ecosystem and community
   - Simple to deploy to modern hosting platforms
   - Progressive enhancement capability

## DELIVER
A complete React/Next.js application with properly structured components, custom hooks, and contexts. All code should follow React best practices with proper separation of concerns. The application should be deployable to Vercel or Netlify with minimal configuration. Include a README with setup instructions and detail of architectural decisions.