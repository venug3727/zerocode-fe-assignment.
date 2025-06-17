import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      icon={theme === 'light' ? Moon : Sun}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    />
  );
};