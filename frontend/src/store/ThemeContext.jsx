import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);


  useEffect(()=>{
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){
      setDarkMode(storedTheme==='dark')
    }
    else{
      setDarkMode(false)
    }
  },[])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme','dark')
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme','light')
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
