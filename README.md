# 📞 WhatsApp-API

A Node.js-based REST API that allows users to connect their own WhatsApp accounts (via QR code scan) and send messages, images, and media using their personal numbers — ideal for e-commerce notifications, chat automations, and integrations.

---

## 🚀 Features

- 🔐 Secure API with user-based WhatsApp sessions
- 📷 QR Code authentication for each WhatsApp account
- 💬 Send text messages, images, and media
- 🧠 Session management (no need to scan QR every time)
- 🗃️ File upload support with captions
- 🛠️ Simple API endpoints ready for integration
- 🧩 Supports multiple users (multi-instance capable)

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **whatsapp-web.js** for WhatsApp integration
- **Multer** for file uploads
- **qrcode-terminal** for local QR display
- **mime-types** for correct media support

---

## 🔧 Installation

1. **Clone the project**
```bash
git clone https://github.com/ydxj/Whatsapp-api.git
cd Whatsapp-api
