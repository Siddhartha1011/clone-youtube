# GITHUB link

https://github.com/Siddhartha1011/clone-youtube

# YouTube Clone (MERN Stack)

A full-stack YouTube clone built with **MongoDB**, **Express**, **React**, and **Node.js**. Users can browse videos, sign in, create channels, upload and manage videos, watch with like/dislike, and add, edit, and delete comments.

## Features

- **Home page**: Header, toggle sidebar, category filters (All, Gaming, Entertainment, Sports, etc.), search by title, grid of video thumbnails with title, channel name, and views
- **User authentication**: Register and login with username, email, and password; JWT-based auth; sign-in button in header; username shown when logged in
- **Video player page**: Video player, title, description, channel name, like/dislike (persisted), comment section with add, edit, and delete (stored in MongoDB)
- **Channel page**: Create a channel (when signed in), list channel videos, and for your own channel: add, edit, and delete videos
- **Responsive layout**: Usable across mobile, tablet, and desktop

## Tech Stack

- **Frontend**: React (Vite), React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens)

## Project structure

```
youtube-clone-mern/
├── backend/          # Express API
│   ├── config/       # DB connection
│   ├── controllers/
│   ├── middlewares/  # JWT protect
│   ├── models/       # User, Channel, Video, Comment
│   ├── routes/
│   ├── scripts/      # seed.js
│   └── server.js
├── frontend/         # React (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── context/  # AuthContext
│   │   ├── pages/
│   │   ├── services/ # api, auth, video, comment, channel
│   │   └── styles/
│   └── vite.config.js
└── README.md
```

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Backend

1. Go to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/` with:

   ```
   PORT=3500
   MONGO_URI=mongodb://localhost:27017/youtube-clone
   JWT_SECRET=your-secret-key-change-in-production
   ```

   For MongoDB Atlas, set `MONGO_URI` to your connection string.

3. Seed the database (creates sample users, channels, and videos):

   ```bash
   npm run seed
   ```

   Default seed users: `seed@example.com` / `password123`, `demo@example.com` / `password123`.

4. Start the server:

   ```bash
   npm run dev
   ```

   API runs at `http://localhost:3500`.

### Frontend

1. In another terminal, go to the frontend folder and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

   App runs at `http://localhost:5173`.

## Usage

1. **Browse**: Open the home page to see videos. Use the search bar and category filters.
2. **Sign in**: Click “Sign in” in the header, then register (or login with an existing account).
3. **Watch**: Click a video to open the player. Like/dislike (when signed in) and add/edit/delete comments (when signed in).
4. **Channel**: Click “My channel” in the sidebar when signed in. Create a channel if you don’t have one, then add videos (title, thumbnail URL, video URL, category). Edit or delete your videos from the channel page.
5. **Other channels**: Click a channel name on a video to open that channel’s page (read-only unless it’s yours).

## API overview

- `POST /api/auth/register` – Register (username, email, password)
- `POST /api/auth/login` – Login (email, password), returns JWT
- `GET /api/videos` – List videos (query: `category`, `search`)
- `GET /api/videos/:id` – Get one video (increments views)
- `POST /api/videos` – Create video (protected)
- `PUT /api/videos/:id` – Update video (owner only)
- `DELETE /api/videos/:id` – Delete video (owner only)
- `POST /api/videos/:id/like`, `POST /api/videos/:id/dislike` – Like/dislike (protected)
- `GET /api/channels/me` – Get current user’s channel (protected)
- `POST /api/channels` – Create channel (protected)
- `GET /api/channels/:id` – Get channel by id
- `GET /api/channels/:id/videos` – Get channel’s videos
- `GET /api/comments/:videoId` – Get comments for a video
- `POST /api/comments/:videoId` – Add comment (protected)
- `PUT /api/comments/:commentId` – Update comment (owner only)
- `DELETE /api/comments/:commentId` – Delete comment (owner only)

Protected routes require header: `Authorization: Bearer <token>`.

## Notes

- Use **ES modules** (import/export). No CommonJS.
- Frontend is built with **Vite**, not Create React App.
- For evaluators: run `npm run seed` in `backend` to populate sample data.
- Ensure `.env` is set (especially `MONGO_URI` and `JWT_SECRET`) before running backend or seed.
