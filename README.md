# Project 2 - MediTrack

## Overview

### Author
**Helly Niteshbhai Diyora**
diyora.h@northeastern.edu

**Lili Mei Ye** meiye.l@northeastern.edu

### Class Information

- [CS5610 Web Development](https://johnguerra.co/classes/webDevelopment_online_spring_2026/index.html)
- Spring 2026
- Northeastern University

### Links
- [MediTrack](https://meditrack-80q6.onrender.com/)
- [Design Document](/docs/design-document.pdf)
- [Video Demonstration](https://youtu.be/kZP0StNv1qU?feature=shared)
- [Google Slides](/docs/slides.pdf)

## Project Objective

MediTrack is a simple web application that helps individuals and families manage medications and prescription refills.

The goal of the application is to:

- Keep a clear list of medications
- Track whether medications were taken
- Save refill history
- Help users avoid missed or duplicate doses

This project demonstrates a full-stack application built using:

- Node.js
- Express
- MongoDB
- Vanilla JavaScript
- HTML5 + CSS3

## Features

### Medication Management

- Add medications with dosage, schedule and notes
- Mark medications as taken / undo taken
- Delete medications
- Edit existing medications
- View taken date

### Refill Tracking

- Add refill entries with medication name, quantity, pharmacy, and date
- View refill history in a paginated table
- Edit existing refill records
- Delete records no longer needed

## Screenshots

### Homepage

![Homepage](screenshots/Homepage.png)

### Medications Page

![Medications](screenshots/Medication-page.png)

### Refill Records Page

![Refill Records](screenshots/Refill-page.png)

## Project Structure

```
MediTrack/
├── frontend/                    # Frontend files
│   ├── css/                     # Stylesheets
│   │   ├── base.css             # Shared styles and design tokens
│   │   ├── home.css             # Home page styles
│   │   ├── medications.css      # Medications page styles
│   │   └── refillrecords.css    # Refill records page styles
│   ├── js/                      # Client-side JavaScript
│   │   ├── api.js               # Shared API helper functions
│   │   ├── medications.js       # Medications page logic
│   │   └── refillrecords.js     # Refill records page logic
│   ├── index.html               # Home page
│   ├── medications.html         # Medications page
│   └── refillrecords.html       # Refill records page
├── src/                         # Backend files
│   ├── modules/
│   │   └── mongodb-connect.js   # MongoDB connection module
│   ├── routes/
│   │   ├── medicationsRouter.js # Medications API routes
│   │   └── refillsRouter.js     # Refill records API routes
│   ├── index.js                 # Express server entry point
│   └── seed.js                  # Database seeding script
├── .env                         # Environment variables (not in repo)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── package.json                 # Dependencies and scripts
├── LICENSE                      # MIT License
└── README.md                    # This file
```

## How to Run the Project

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/myinglin2333/MediTrack.git
   cd MediTrack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory (use `.env.example` as a reference)

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Seed the database** (inserts 1,000 medications and 1,000 refill records)

   ```bash
   npm run seed
   ```

5. **Start the server**

   ```bash
   npm start
   ```

6. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000)

## Work Distribution

- **Helly Niteshbhai Diyora** — Refill Records (backend routes, frontend page, CSS, seed data)
- **Lili Mei Ye** — Medications (backend routes, frontend page, CSS, seed data)


## License

This project is licensed under the **MIT License**.

See the [MIT License](LICENSE) file for details.