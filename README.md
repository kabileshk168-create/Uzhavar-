# UZHAVAR+ (AgriNext) 🌾🚜

> **Speak. Learn. Grow. Sell.**
> AI-powered agricultural intelligence, market price decision support, and digital companion for farmers. Built with React 19, TypeScript, Vite, Tailwind CSS, Express, and Google Gemini API.

---

## 🌟 Overview

**UZHAVAR+ / AgriNext** is an agricultural platform designed to bridge the gap between farmers and real-time market opportunities. It provides:

- 📱 **AgriNext Mobile Experience (All 8 Core Screens)**:
  1. **Welcome & Splash**: Brand identity, mission, and quick entry.
  2. **Home Dashboard**: Farmer overview, predicted prices, mandi benchmarks, and quick actions.
  3. **Price Prediction**: Multi-horizon forecasting (7 days, 1 month, 3 months) with interactive SVG visualizers and trend insights.
  4. **Market Trends**: Category filtering across vegetables, fruits, and grains with percentage movements and sparklines.
  5. **Weather & Irrigation Advisory**: Hyperlocal metrics (temperature, humidity, wind, rainfall) and agronomic tips.
  6. **Crop Advisory**: Growth stage task manager with actionable agronomic practices.
  7. **Price Alerts**: Configurable alerts for price surges, drops, or volatility with persistent storage.
  8. **Farmer Profile**: Farm management, saved commodities, and language preferences.
- 🎙️ **Voice AI Assistant**: Real-time voice interaction in Tamil and English with instant intent classification, recent voice commands history, and quick re-run capabilities.
- 🌾 **Full Desktop & Mobile Support**: Responsive layouts, interactive device previews, and multi-view artboards.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide Icons, Recharts
- **Backend / API**: Express 4, Node.js (ESM / TypeScript with `tsx` & `esbuild`)
- **AI Integration**: `@google/genai` (Google Gemini 2.5/Flash API)
- **State & Storage**: Client-side reactive state and `localStorage` caching for instant offline-friendly access

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher (v20+ recommended)
- **npm**: v9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
cd <YOUR_REPOSITORY>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Set your Gemini API key (optional for UI preview, required for live AI responses):

```env
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
```

> Get an API key for free at [Google AI Studio](https://aistudio.google.com/).

### 4. Run Development Server

```bash
npm run dev
```

The app will start at `http://localhost:3000`.

---

## 📦 Build & Production

### Production Build

```bash
npm run build
```

This bundles both the Vite client into `dist/` and compiles the Node backend into `dist/server.cjs`.

### Start Production Server

```bash
npm start
```

---

## 🚀 Deploying to Netlify

This project is pre-configured for one-click deployment on Netlify with full SPA redirect support and automated builds.

### Method 1: Git Integration (Recommended)
1. Push your code to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20`
5. (Optional) In **Site settings** > **Environment variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
6. Click **Deploy Site**.

### Method 2: Netlify CLI
1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy to Netlify:
   ```bash
   netlify deploy --prod --dir=dist
   ```

*Note: The included `public/_redirects` and `netlify.toml` ensure client-side routing works seamlessly without 404 errors on page refreshes.*

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── agrinext/          # AgriNext 8-screen mobile application suite
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── HomeScreenAgri.tsx
│   │   │   ├── PricePredictionScreen.tsx
│   │   │   ├── MarketTrendsScreen.tsx
│   │   │   ├── WeatherScreen.tsx
│   │   │   ├── CropAdvisoryScreen.tsx
│   │   │   ├── SetPriceAlertScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   ├── AgriNextDeviceView.tsx
│   │   │   └── AgriNextData.ts
│   │   ├── VoiceListeningModal.tsx  # Voice assistant with Recent Commands
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── services/              # AI and voice processing services
│   ├── types.ts               # Core TypeScript definitions
│   ├── App.tsx
│   └── main.tsx
├── server.ts                  # Express server + Vite middleware
├── metadata.json              # Application metadata & permissions
├── package.json
└── vite.config.ts
```

---

## 📄 License

This project is licensed under the MIT License.
