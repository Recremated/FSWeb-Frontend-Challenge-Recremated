import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import TechStack from "./components/TechStack";

function App() {
  return (
    <div className="bg-white dark:bg-[var(--background-color)] text-[var(--text-color)] min-h-screen min-w-[362px] overflow-x-hidden">
      <Hero />
      <TechStack />
      <Profile />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
