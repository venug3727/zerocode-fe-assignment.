import React from 'react';
import { PromptTemplate } from '../../types';
import { Button } from '../ui/Button';
import { Lightbulb, Code, BookOpen, HelpCircle } from 'lucide-react';

interface PromptTemplatesProps {
  onSelectTemplate: (prompt: string) => void;
}

const promptTemplates: PromptTemplate[] = [
  {
    id: '1',
    title: 'Explain Like I\'m 5',
    prompt: 'Can you explain this in simple terms that a 5-year-old would understand?',
    category: 'learning'
  },
  {
    id: '2',
    title: 'Code Review',
    prompt: 'Please review this code and suggest improvements for better performance and readability.',
    category: 'coding'
  },
  {
    id: '3',
    title: 'Creative Writing',
    prompt: 'Help me write a creative story about',
    category: 'creative'
  },
  {
    id: '4',
    title: 'Problem Solving',
    prompt: 'I need help solving this problem step by step:',
    category: 'problem-solving'
  },
  {
    id: '5',
    title: 'Summary',
    prompt: 'Please provide a concise summary of the following:',
    category: 'learning'
  },
  {
    id: '6',
    title: 'Pros and Cons',
    prompt: 'What are the pros and cons of',
    category: 'analysis'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'coding':
      return Code;
    case 'learning':
      return BookOpen;
    case 'creative':
      return Lightbulb;
    default:
      return HelpCircle;
  }
};

export const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Quick Prompts
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {promptTemplates.map((template) => {
          const Icon = getCategoryIcon(template.category);
          return (
            <Button
              key={template.id}
              variant="outline"
              size="sm"
              icon={Icon}
              iconPosition="left"
              onClick={() => onSelectTemplate(template.prompt)}
              className="text-left justify-start h-auto py-2 px-3"
            >
              <span className="text-xs">{template.title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};