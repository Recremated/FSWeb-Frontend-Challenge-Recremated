import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import TechStack from "./components/TechStack";
import { useAppContext } from "./context/AppContext";

function App() {
  const { t } = useAppContext();

  return (
    <div className="bg-white dark:bg-[var(--background-color)] text-[var(--text-color)] min-h-screen min-w-[362px] overflow-x-hidden">
      <Hero />
      <div className="py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          {t("skills")}
        </h2>
        <TechStack />
      </div>
      <Profile />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
