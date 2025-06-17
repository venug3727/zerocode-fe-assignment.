# AI Chat Application

A modern, responsive chat application powered by Google's Gemini AI, built with React and TypeScript.

## Features

- 🤖 Integration with Google's Gemini AI for intelligent responses
- 🌓 Dark/Light mode support
- 📱 Responsive design for mobile and desktop
- 💬 Real-time chat interface with typing animations
- 📝 Message history and export functionality
- 🎨 Modern UI with smooth animations
- 🔍 Quick prompt templates
- 📱 Mobile-friendly sidebar navigation

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Generative AI SDK
- Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Cloud API key for Gemini AI

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google API key:
```
VITE_GOOGLE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Demo Credentials

For testing purposes, you can use the following demo credentials:

- **API Key**: `AIzaSyDummyKey123456789` (This is a dummy key for demonstration)
- **Note**: Replace with your actual Google API key for production use

## Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   └── PromptTemplates.tsx
│   └── layout/
│       └── Sidebar.tsx
├── hooks/
│   └── useChat.ts
├── utils/
│   └── chatExport.ts
└── App.tsx
```

## Features in Detail

### Chat Interface
- Real-time message updates
- Typing indicators
- Message history navigation
- Export chat functionality
- Quick prompt templates

### Sidebar
- Collapsible design
- Mobile-responsive
- Chat history
- New chat creation
- Export options

### Theme Support
- Automatic dark/light mode detection
- Smooth theme transitions
- Consistent styling across components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Framer Motion for the smooth animations
- Tailwind CSS for the styling framework 