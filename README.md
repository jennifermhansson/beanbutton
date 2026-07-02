Coffee Button☕

Bean Button is a fun side project built to explore and learn more about full-stack development. The application allows users to track coffee brews in real time, celebrate fellow brewers with kudos, and see the most recent coffee makers.

This is version 2.0 of the project — a full rebuild with a TypeScript frontend and a C# backend.

🚀 Tech Stack
React + TypeScript - used for building the UI (Vite)
C# / .NET 9 Web API - Backend REST API
PostgreSQL - Stores brew data
Entity Framework Core - Database access and migrations
SignalR - Pushes real-time updates to connected clients
Docker & Docker Compose - Containerizes and runs the whole stack
Nginx - Reverse proxy and TLS (production)
Miro - Used for planning, workflow mapping and feature brainstorming (Kanban-style task tracking)

👩‍💻 Contributors
Jennifer Hansson @jennifermhansson
Moises Leon	@Moooshooo

📌 Project Overview
Purpose: Side project to deepen our understanding of React, TypeScript, C#/.NET, component structure, state management, real-time communication, and containerized deployment
Focused on clean code, modular components, and experimenting with new features like a real-time backend and kudos interaction
We used Miro to organize tasks, set priorities, and visualize the workflow from idea to implementation

✨ Features
✔ Add your name and log a coffee brew
✔ Display recent brewers
✔ Give "kudos" to other brewers
✔ Timestamps for each brew
✔ Responsive styling
✔ Real-time updates via SignalR

🛠 Installation & Setup
The whole stack runs with Docker Compose, so you don't need Node, .NET, or PostgreSQL installed locally — just Docker.

Clone the repo
git clone https://github.com/jennifermhansson/beanbutton.git
cd beanbutton

Create your environment file
cp .env.example .env
# then edit .env and set a strong POSTGRES_PASSWORD

Start the stack
docker compose up --build

The frontend runs at http://localhost:5173 and the backend API at http://localhost:5000.

🌐 Production Deployment
Production runs behind Nginx with HTTPS via Let's Encrypt, using docker-compose.prod.yml. See init-letsencrypt.sh for the one-time certificate bootstrap.

✅ Future Improvements (v3 ideas)
User authentication
Sound or visual effects when brewing is submitted
Animated confetti or achievements
Dark mode / custom themes
Dashboard with brewing statistics

📜 License
This project is currently for learning purposes and has no official license.
Feel free to explore, fork, and get inspired.
