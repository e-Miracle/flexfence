# Expo App with API and WebSocket Integration

This is a React Native application built with Expo, featuring both REST API and WebSocket communication capabilities.

## Project Structure

```
src/
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable UI components
├── constants/      # App-wide constants and configuration
├── hooks/          # Custom React hooks
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # API and WebSocket services
├── store/          # Redux store configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and helpers
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Features

- TypeScript support
- React Navigation for routing
- Axios for API communication
- Socket.IO for real-time communication
- Redux Toolkit for state management
- Safe area handling
- Modern folder structure

## Development

This project uses:
- Expo
- React Navigation
- Axios
- Socket.IO
- Redux Toolkit
- TypeScript

## Configuration

Before running the app, make sure to update the following configuration files:
- `src/services/api.ts`: Set your API base URL
- `src/services/socket.ts`: Set your WebSocket URL 