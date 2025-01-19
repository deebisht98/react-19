import { createContext, useState, use } from "react";

// Create a context for the theme

const ThemeContext = createContext();

// Theme provider to manage and provide the current theme

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Initial theme is 'light'

  // Toggle between 'light' and 'dark' themes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Component using use() to consume the theme context

const ThemedCard = () => {
  // use() API combined with useContext to directly access the ThemeContext value

  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#1B1D25" }}>
      {/* Dynamic styling based on the current theme */}

      <h1 style={{ color: theme === "light" ? "text-gray-800" : "text-white" }}>
        Themed Card
      </h1>

      <p style={{ color: theme === "light" ? "text-gray-800" : "text-white" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque
        libero. Nullam mattis metus a sapien tempor, sit amet mollis est
        facilisis. Phasellus nec turpis nec dui venenatis vestibulum. Sed
        dapibus dapibus justo, at rhoncus risus malesuada vel. Proin eget leo id
        mi ullamcorper rhoncus.
      </p>

      {/* Button to toggle theme */}

      <button
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
    </div>
  );
};

// Main component rendering the theme provider and themed card

const Theme = () => {
  return (
    <ThemeProvider>
      <ThemedCard />
    </ThemeProvider>
  );
};

export default Theme;
