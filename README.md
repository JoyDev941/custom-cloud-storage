# 🌿 NR — Nature Reserve Cloud Storage

> A self-hosted cloud storage solution built for businesses who want full control over their data — without the recurring cost of Google Drive or iCloud.

---

## What is NR?

NR is a private cloud storage platform that runs on your own hardware. It gives businesses and individuals a secure, accessible, and cost-effective alternative to third-party cloud storage services.

Instead of paying monthly per user for storage you don't own, NR turns any Ubuntu server into a personal cloud — accessible from anywhere in the world.

---

## Why I Built This

Most businesses rely on Google Drive, Dropbox, or iCloud for file storage. These services come with:
- **Recurring monthly costs** per user
- **Third-party data ownership** — your files live on someone else's servers
- **Storage limits** tied to subscription tiers

NR eliminates all three. Storage becomes a one-time hardware cost, files stay on your own server, and access is available on any network via Cloudflare Tunnel — no port forwarding required.

---

## Features

- 🔐 **User Authentication** — secure JWT token-based login with sliding expiry
- 👥 **Multi-user Support** — each user gets their own isolated storage area
- 📁 **File Browser** — view your files and folders in a clean web interface
- ⬆️ **Upload** — upload files directly from your browser
- ⬇️ **Download** — download files securely with one click
- 🗑️ **Delete** — remove files from your storage
- 🌐 **Network Accessible** — accessible from any device on your network
- 🔒 **Secure by Design** — obfuscated folder structure, token-protected endpoints

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

---

## How It Works

1. Users register and are assigned a private, isolated storage area on the server
2. Login returns a JWT token that authenticates every subsequent request
3. The token carries the user's identity and current directory — the backend resolves file paths securely
4. Files are served and received through authenticated API endpoints
5. The entire system runs on a local Ubuntu server, exposed to the internet via Cloudflare Tunnel

---

## Project Status

🚧 **Actively in development** — core functionality complete, deployment and additional features in progress.

**Completed:**
- ✅ User registration and authentication
- ✅ JWT token management with sliding expiry
- ✅ File upload, download, and delete
- ✅ Multi-user isolated storage
- ✅ File type detection and icons
- ✅ Responsive web interface

**In Progress:**
- ⬜ Subfolder navigation
- ⬜ Cloudflare Tunnel deployment
- ⬜ Docker containerisation
- ⬜ systemd service configuration

---

## About the Developer

This project was built as part of my journey into DevOps engineering. Every component — from the FastAPI backend to the React frontend to the networking layer — was designed, built, and debugged independently.

I built NR to demonstrate real-world DevOps skills: deploying services on Linux, managing authentication, handling file systems, and exposing applications securely to the internet.

---

*Built with 🌿 by Joynal Abedin Abdul
