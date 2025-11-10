# MindAble

A Therabot AI API -powered mental health support platform designed for individuals with disabilities.

## Features

- **AI Chat Interface** - Real-time conversational support with natural language understanding
- **Voice Input/Output** - Accessible speech recognition and text-to-speech capabilities
- **Conversation History** - Persistent chat sessions stored locally
- **Auto-Speak Mode** - Optional automatic reading of AI responses
- **Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **Accessible UI** - Built with accessibility standards in mind

## Technology Stack

- Therabot AI API
- React 18
- Tailwind CSS
- Lucide React Icons
- Firebase

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd project
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root directory with the following:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_THERA_API_KEY=your_thera_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Usage

- Click the chat icon to start a conversation
- Type or use voice input to communicate
- Toggle auto-speak for automatic response narration
- Your conversation history is automatically saved

## License

All rights reserved.
