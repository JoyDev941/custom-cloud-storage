# 🌿 NR — Nature Reserve Cloud Storage

> A self-hosted cloud storage solution built for businesses who want full control over their data — without the recurring cost of Google Drive or iCloud.

---

## What is NR?

NR is a private cloud storage platform that runs on your own hardware. It gives businesses and individuals a secure, accessible, and cost-effective alternative to third-party cloud storage services.

Instead of paying monthly per user for storage you don't own, NR turns any Ubuntu server into a personal cloud — accessible from anywhere in the world via Cloudflare Tunnel.

---

## Why I Built This

Most businesses rely on Google Drive, Dropbox, or iCloud for file storage. These services come with:
- **Recurring monthly costs** per user
- **Third-party data ownership** — your files live on someone else's servers
- **Storage limits** tied to subscription tiers
- **Data privacy concerns** — sensitive business data on external servers

NR eliminates all of these. Storage becomes a one-time hardware cost, files stay on your own server, and access is available on any network — no port forwarding required.

---

## Features

### Core Features (Currently Implemented)
- 🔐 **User Authentication** — secure JWT token-based login with sliding expiry
- 👥 **Multi-user Support** — each user gets their own isolated storage area
- 📁 **File Browser** — view your files with type-based icons in a clean web interface
- ⬆️ **Upload** — upload files directly from your browser
- ⬇️ **Download** — download files securely with one click
- 🗑️ **Delete** — remove files from your storage
- 🌐 **Network Accessible** — accessible from any device on your network (Cloudflare Tunnel coming soon)
- 🔒 **Secure by Design** — obfuscated folder structure, token-protected endpoints

### Future Features (Planned Roadmap)
- 🔍 **Smart File Search** — find files across your storage with full-text search
- 💬 **Local Network Messaging** — communicate securely with other users on the same server (no external messaging)
- 🔗 **Share Tokens** — generate secure share links for specific files or folders
- 📅 **Calendar & Organization** — tag files, organize by projects, timeline view
- 📊 **Activity Logs** — track file access, uploads, deletions with timestamps
- 🏠 **Home Dashboard** — recently accessed files, activity feed, quick stats
- 🗂️ **Soft Delete (Bin)** — files move to bin before permanent deletion, auto-purge after 30 days
- 📈 **Storage Quota** — visual display of storage usage and limits per user
- 📂 **Folder Navigation** — create and navigate nested folders
- 👥 **User Permissions** — granular access control (view-only, edit, admin)
- 🔔 **Notifications** — alerts for file access, storage limits, shared files

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| Frontend | React, TypeScript, Vite |
| Authentication | JWT Tokens |
| Networking | Cloudflare Tunnel |
| Server OS | Ubuntu (headless) |
| Container | Docker (planned) |
| Service Manager | systemd (planned) |

---

## How It Works

1. Users register and are assigned a private, isolated storage area on the server
2. Login returns a JWT token that authenticates every subsequent request
3. The token carries the user's identity and current directory — the backend resolves file paths securely
4. Files are served and received through authenticated API endpoints
5. The entire system runs on a local Ubuntu server, exposed to the internet via Cloudflare Tunnel

---

## Architecture

```
┌─────────────────────────────────────┐
│         Web Browser (React)         │
│  - File Browser UI                  │
│  - Upload/Download Interface        │
│  - User Dashboard                   │
└──────────────┬──────────────────────┘
               │ HTTPS
               │
┌──────────────▼──────────────────────┐
│   Cloudflare Tunnel                 │
│   (Secure public gateway)           │
└──────────────┬──────────────────────┘
               │ Local Network
               │
┌──────────────▼──────────────────────┐
│    FastAPI Backend (Port 52026)     │
│  - JWT Authentication               │
│  - File Operations (CRUD)           │
│  - User Management                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    PostgreSQL Database              │
│  - User Credentials                 │
│  - File Metadata                    │
│  - Activity Logs                    │
└─────────────────────────────────────┘

File Storage: /root/{username}/Prefix/UserCave/
```

---

## Project Status

🚧 **Active Development** — MVP complete, deployment and advanced features in progress.

### Completed ✅
- User registration and authentication
- JWT token management with sliding expiry
- File upload, download, and delete
- Multi-user isolated storage
- File type detection and emoji icons
- Responsive web interface
- Secure file path resolution
- CORS security configuration

### In Progress ⬜
- Cloudflare Tunnel deployment
- systemd service configuration
- Docker containerisation
- Code refactoring (routes, services separation)

### Planned 📋
- Subfolder navigation
- File search functionality
- Local network messaging
- Share token generation
- Calendar & organization
- Activity logging
- Soft delete (Bin)
- Storage quota display
- User permissions system

---

## Deployment

### Requirements
- Ubuntu Server (18.04+)
- Python 3.8+
- PostgreSQL
- Node.js 16+
- Cloudflare Account (free tier)

### Quick Start (Manual)

1. **Backend Setup**
```bash
cd Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 52026 --reload
```

2. **Frontend Setup**
```bash
cd Frontend
npm install
npm run dev
```

3. **Database Setup**
```bash
sudo -u postgres createdb nr_cloud
# Update connection string in backend config
```

### Coming Soon: Docker
Single command deployment with all services containerised:
```bash
docker compose up
```

---

## About the Developer

This project was built as part of my journey into DevOps engineering. Every component — from the FastAPI backend to the React frontend to the networking layer — was designed, built, and debugged independently.

I built NR to demonstrate real-world DevOps skills:
- Deploying services on Linux headless servers
- Managing authentication and security
- Handling file systems and storage
- Exposing applications securely to the internet
- Writing clean, maintainable code
- Thinking about product vision and scalability

---

## Future Vision

NR is designed to grow from a simple file storage solution into a **comprehensive self-hosted business communication and collaboration platform**. The roadmap includes messaging, file organization, activity tracking, and permission management — all while keeping data completely on-premise.

The goal is to provide businesses with a viable alternative to SaaS solutions like Slack, Teams, and Google Workspace — but self-hosted, privacy-first, and affordable.

---

*Built with 🌿 by Joynal Abedin Abdul*
*Last updated: June 2026*
