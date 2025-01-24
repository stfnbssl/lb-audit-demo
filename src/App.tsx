import React, {useState} from 'react';
import CheckList from './components/CheckList';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', height: '100vh' }}>
      <CheckList onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;