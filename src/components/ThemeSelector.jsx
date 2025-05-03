/**
 * ThemeSelector Component
 * A customizable toggle button for switching between light and dark themes
 * Provides different sizes and adapts to screen sizes with responsive design
 * Features animated 3D transition between sun and moon icons for visual appeal
 *
 * @param {string} className - Additional CSS classes for the container
 * @param {string} size - Size variant ("small", "medium", or "large")
 */
import { useAppContext } from "../context/AppContext"; // Import global context for theme state

/**
 * ThemeSelector Component
 * Renders a visually appealing toggle switch that changes the application theme
 * Implements accessibility features and responsive design across screen sizes
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes to apply to container
 * @param {string} props.size - Size variant of the toggle ("small", "medium", or "large")
 */
const ThemeSelector = ({ className = "", size = "medium" }) => {
  // Extract theme state and functions from global context
  const { theme, t, changeTheme } = useAppContext();

  /**
   * Toggle between light and dark themes
   * Calls the context function to update theme globally
   * This handles the theme switching business logic
   */
  const toggleTheme = () => {
    // Switch to opposite theme
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme); // Update theme through context
  };

  // Size variants for the toggle with responsive dimensions for different screen sizes
  // Each size has container dimensions, thumb dimensions, and thumb position calculations
  // These are organized by size variant (small/medium/large) and include responsive breakpoints
  const sizeClasses = {
    small: {
      container: "w-8 h-4 md:w-9 md:h-5 lg:w-10 lg:h-5", // Container dimensions (width/height)
      thumb: "w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4", // Toggle thumb dimensions
      thumbPosition:
        theme === "light"
          ? "translate-x-4 md:translate-x-4 lg:translate-x-5" // Light mode position (right)
          : "translate-x-0.5", // Dark mode position (left)
    },
    medium: {
      container: "w-10 h-5 md:w-11 md:h-6 lg:w-12 lg:h-6",
      thumb: "w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5",
      thumbPosition:
        theme === "light"
          ? "translate-x-5 md:translate-x-5 lg:translate-x-6"
          : "translate-x-0.5",
    },
    large: {
      container: "w-12 h-6 md:w-14 md:h-7 lg:w-14 lg:h-7",
      thumb: "w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6",
      thumbPosition:
        theme === "light"
          ? "translate-x-6 md:translate-x-7 lg:translate-x-7"
          : "translate-x-0.5",
    },
  };

  // Get the appropriate size classes based on the size prop
  // Falls back to medium size if an invalid size is provided
  const currentSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex items-center gap-2 md:gap-2.5 lg:gap-3 ${className}`}>
      {/* 
        Label with theme text or icon depending on screen size 
        Shows moon icon on mobile/tablet and full text on desktop
        Color changes based on current theme
      */}
      <span
        className={`uppercase text-xs md:text-sm lg:text-base font-bold tracking-wide ${
          theme === "dark" ? "text-[#D9D9D9]" : "text-[#4731D3]"
        }`}
      >
        {/* Show text label on desktop screens only */}
        <span className="hidden lg:inline">
          {theme === "light" ? t("darkMode") : t("lightMode")}
        </span>
        {/* Show moon icon on mobile/tablet screens only */}
        <span className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true" // Hide from screen readers as it's decorative
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </span>

      {/* 
        Toggle button component - the track/background part 
        Changes color based on current theme
        Has ARIA label for screen reader accessibility
      */}
      <button
        onClick={toggleTheme}
        className={`relative ${currentSize.container} ${
          theme === "dark" ? "bg-[#3A3A3A]" : "bg-[#8F88FF]"
        } rounded-full transition-colors duration-500 ease-in-out overflow-hidden`}
        aria-label={
          theme === "light" ? "Enable dark mode" : "Disable dark mode"
        } // Accessibility label
        role="switch" // Semantic role for screen readers
        aria-checked={theme === "dark"} // Indicates current state to screen readers
      >
        {/* 
          Toggle thumb with 3D flip animation 
          Uses CSS 3D transforms to create a flip effect between sun and moon
          The transform-style: preserve-3d enables 3D space for child elements
        */}
        <div
          className={`absolute ${currentSize.thumb} top-0.5 transition-all duration-500 ease-in-out transform ${currentSize.thumbPosition}`}
          style={{
            transformStyle: "preserve-3d", // Enables 3D space for child elements
          }}
        >
          {/* 
            Light mode circle (sun icon)
            Always present in the DOM but hidden/flipped in dark mode
            Uses backface-visibility: hidden to implement 3D card flip effect
          */}
          <div
            className="w-full h-full absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              backgroundColor: "#FFE86E", // Sunny yellow color
              borderRadius: "9999px",
              opacity: theme === "light" ? "1" : "0", // Fade out in dark mode
              transform:
                theme === "light" ? "rotateY(0deg)" : "rotateY(180deg)", // 3D flip
              backfaceVisibility: "hidden", // Hide when flipped (3D effect)
            }}
            aria-hidden="true" // Hide from screen readers as it's decorative
          />

          {/* 
            Dark mode moon (crescent shape)
            Created using two overlapping circles - one yellow and one dark
            Uses the same 3D flip technique but inverted rotation
          */}
          <div
            className="w-full h-full absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              transform:
                theme === "dark" ? "rotateY(0deg)" : "rotateY(-180deg)", // 3D flip (opposite direction)
              backfaceVisibility: "hidden", // Hide when flipped
              opacity: theme === "dark" ? "1" : "0", // Fade out in light mode
            }}
            aria-hidden="true" // Hide from screen readers as it's decorative
          >
            {/* Moon crescent effect created with two circles */}
            <div className="w-full h-full relative">
              {/* Full yellow circle as the base */}
              <div className="w-full h-full bg-[#FFE86E] rounded-full absolute"></div>
              {/* Dark circle offset to create crescent effect */}
              <div className="w-3/4 h-3/4 bg-[#3A3A3A] rounded-full absolute -right-1 top-1/2 transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeSelector;
