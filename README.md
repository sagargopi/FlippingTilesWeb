# Flipping Tiles Web Application

This project is a web-based version of the classic "Flipping Tiles" memory game, converted from Java Swing to a full-stack web application using Java Spring Boot for the backend and React for the frontend.

## Project Structure

- `backend/`: Java Spring Boot backend (REST API, MySQL)
- `frontend/`: React frontend (game UI)

## Features
- Memory matching game with a grid of emoji tiles
- Player score tracking and leaderboard
- Persistent scores stored in MySQL database
- REST API for submitting and retrieving scores

---

## Setup Instructions

### 1. Backend (Spring Boot)

#### Prerequisites
- Java 17 or newer
- Maven
- MySQL server running with a database named `flipping_tiles` (user: `user`, password: `password` by default)

#### Steps
```sh
cd backend
mvn clean install
mvn spring-boot:run
```
- The backend will run on [http://localhost:8080](http://localhost:8080)

### 2. Frontend (React)

#### Prerequisites
- Node.js (v16+ recommended)
- npm

#### Steps
```sh
cd frontend
npm install
npm start
```
- The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## How to Play
1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Flip tiles to match pairs of emoji symbols.
3. When you win, enter your name and submit your score.
4. After submitting, you can start a new game.

---

## Uploading to GitHub
1. Create a new repository on GitHub.
2. In the project root, run:
   ```sh
   git init
   git add .
   git commit -m "Initial commit: Flipping Tiles Web App"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. (Optional) Add a `.gitignore` file to exclude `node_modules`, `build`, and other unnecessary files.

---

## Customization
- To change the emoji set, edit the `SYMBOLS` array in `frontend/src/App.js`.
- To adjust the grid size, modify the `GRID_SIZE` constant in `frontend/src/App.js` (default is 4).

---

## Troubleshooting
- If you get Maven or npm errors, check that all prerequisites are installed and environment variables are set.
- If ports 8080 or 3000 are in use, stop other services or change the port in the respective configuration files.

---

## License
MIT
