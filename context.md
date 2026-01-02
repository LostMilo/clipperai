# ViralClip.ai + Whop OW Engine - Product Context & Recipe (RCP)

## 1. Product Overview
ViralClip.ai is a comprehensive content automation platform designed for arbitrage marketers and creators. It bridges the gap between finding profitable opportunities (on Whop) and marketing them (via viral short-form content).

## 2. Core Modules

### A. The "Real" Clipper
- **Input:** YouTube Long-form URL.
- **Validation:** Uses YouTube oEmbed API to validate video existence and fetch real metadata (Title, Thumbnail, Author) without requiring a heavy backend.
- **Analysis:** Uses Google Gemini 2.5/3.0 to analyze transcripts (simulated in frontend-only mode, capable of real injection) for viral hooks.
- **Output:** Virality-scored clips with reasoning.

### B. Connection Hub
- **Purpose:** Centralized OAuth/API management.
- **Supported Platforms:** 
  - YouTube (Shorts)
  - TikTok
  - Instagram (Reels)
  - Snapchat (Spotlight)
  - Whop (Affiliate/Seller Dashboard)
- **Status:** Tracks authentication state (Connected/Disconnected).

### C. Whop OW (Opportunity Watcher) Engine
- **Function:** "Scours" the Whop marketplace for high-converting, trending digital products.
- **Auto-Pilot Mode:** 
  1. Identifies a trending deal.
  2. Locates a relevant YouTube video review or tutorial for that niche.
  3. Automatically runs the Clipper on that video.
  4. Queues the clip for distribution with affiliate links.

## 3. Tech Stack Recipe
- **Frontend:** React 19, TailwindCSS, Lucide React (Icons).
- **AI Core:** Google Gemini API (via `@google/genai` SDK).
- **State Management:** React Context / Local State.
- **Data Simulation:** Service layers mock the backend scraping logic (due to browser CORS/Security limitations for raw video scraping).

## 4. User Flow
1. **Connect Accounts:** User links social media and Whop accounts.
2. **Choose Mode:**
   - *Manual:* Paste a YouTube link -> Analyze -> Edit -> Post.
   - *Auto-Pilot:* Turn on Whop Engine -> System finds deals -> System creates clips -> User approves/auto-posts.
3. **Distribution:** Simultaneous multi-platform upload.

## 5. Future Backend Requirements (For Production)
- **FFmpeg Layer:** To physically cut and render the video bytes.
- **YouTube Data API / Scraping Service:** To fetch actual captions/transcripts.
- **Official Social APIs:** For real publishing tokens.
