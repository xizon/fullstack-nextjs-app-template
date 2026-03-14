'use client'

import { createContext, useContext, useEffect, useReducer } from 'react';
import useLocalStorage from '@/utils/hooks/useLocalStorage';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

interface ThemeContextValue extends ThemeState {
  setTheme: (theme: Theme) => void;
}

const initialThemeState: ThemeState = {
  theme: 'light',
};

const handlers: Record<string, (state: ThemeState, action: { type: string; payload?: { theme: Theme } }) => ThemeState> = {
  SET_THEME: (state, action) => {
    return {
      ...state,
      theme: action.payload!.theme,
    };
  },
};

const reducer = (state: ThemeState, action: { type: string; payload?: { theme: Theme } }): ThemeState =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const ThemeContext = createContext<ThemeContextValue>({
  ...initialThemeState,
  setTheme: () => {},
});

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [storedTheme, setStoredTheme] = useLocalStorage('SITE_DATA_THEME', '');
  const [state, dispatch] = useReducer(reducer, initialThemeState);

  useEffect(() => {
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initial: Theme = storedTheme === 'dark' || storedTheme === 'light'
      ? (storedTheme as Theme)
      : prefersDark
        ? 'dark'
        : 'light';

    dispatch({ type: 'SET_THEME', payload: { theme: initial } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', state.theme);
    }
  }, [state.theme]);

  const setTheme = (theme: Theme) => {
    setStoredTheme(theme);
    dispatch({ type: 'SET_THEME', payload: { theme } });
  };

  return (
    <ThemeContext.Provider value={{ ...state, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);

export default ThemeContext;
