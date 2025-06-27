# NomadPal 🌍✈️

**Your Trusted Travel Companion** - A real-time, app-based Backpacker Concierge + Trust Layer where travelers can connect with verified locals and fellow adventurers.

## 🎯 The Problem

Backpackers and long-term travelers often face these pain points:
- Don't know which hostel, tour, or transit option is actually worth it or safe
- Local recommendations are scattered across outdated blog posts or Facebook groups
- Want spontaneous plans, not over-curated tours
- Don't know who to trust when it comes to guides, local drivers, or even other travelers

## 💡 The Solution

NomadPal is a comprehensive platform that combines:
- **Real-time community feed** for travel questions and recommendations
- **Trust layer** with verified profiles and reputation systems
- **AI concierge** for personalized travel planning
- **Local service marketplace** with verified guides and providers

## ✨ Key Features

### 🏠 Home Page
- Hero section showcasing the platform's value proposition
- Feature highlights and trust statistics
- Recent community activity preview
- Call-to-action sections

### 📱 Travel Feed
- Social media-style feed for travel-related posts
- Filter by post type (questions, offers, requests, reviews)
- Real-time posting and commenting system
- Location-based content filtering

### 🛡️ Trust Network
- Verified user profiles with trust ratings
- Badge system for achievements and expertise
- Community reviews and ratings
- Safety guidelines and best practices

### 🤖 AI Concierge
- Chat-based travel planning assistant
- Quick action buttons for common requests
- Service recommendations and booking
- Travel tips and local insights

### 👤 User Profiles
- Comprehensive user profiles with travel history
- Trust scores and verification badges
- Trip planning and booking management
- Review and rating system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nomadpal
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod validation

## 📱 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation and header
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── FeedPage.tsx    # Social feed
│   ├── TrustPage.tsx   # Trust network
│   ├── ConciergePage.tsx # AI concierge
│   └── ProfilePage.tsx # User profiles
├── context/            # React context for state management
│   └── NomadContext.tsx
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## 🎨 Design System

The app uses a consistent design system with:
- **Colors**: Blue primary (#2563eb), with supporting grays and accent colors
- **Typography**: System fonts with clear hierarchy
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable, accessible components

## 🔒 Trust & Safety

- Identity verification system
- Community-driven reviews and ratings
- AI-powered scam detection
- Safety guidelines and reporting system
- Verified local guides and service providers

## 💰 Business Model

- Freemium access to the platform
- Commission from verified local services
- Premium AI concierge features
- Optional travel insurance partnerships
- Affiliate partnerships with trusted providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the backpacker community's need for trusted travel connections
- Built with modern web technologies for optimal user experience
- Designed with accessibility and safety in mind

---

**NomadPal** - Connecting travelers with trusted locals, one adventure at a time! 🌟
