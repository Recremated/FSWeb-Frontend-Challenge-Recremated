/**
 * Main App component that composes all sections of the portfolio website
 * Serves as the root component for the application layout
 */
import Hero from "./components/Hero"; // Hero section component (landing page)
import Profile from "./components/Profile"; // Profile/About Me section component
import Projects from "./components/Projects"; // Projects showcase section component
import Contact from "./components/Contact"; // Contact section component
import TechStack from "./components/TechStack"; // Technical skills section component

function App() {
  return (
    <div className="bg-white dark:bg-[var(--background-color)] text-[var(--text-color)] min-h-screen min-w-[362px] overflow-x-hidden">
      {/* Container div with theme-aware styling and minimum dimensions */}
      <Hero /> {/* Landing section with introduction */}
      <TechStack /> {/* Section displaying technical skills */}
      <Profile /> {/* About me/biography section */}
      <Projects /> {/* Portfolio projects section */}
      <Contact /> {/* Contact information section */}
    </div>
  );
}

export default App;
