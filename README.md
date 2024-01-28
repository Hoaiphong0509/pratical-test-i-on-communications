# PRATICAL-TEST I-ON Communications

## Introduction

This project is a practical test for a junior position, aiming to create a flexible web application for presenting quick content advertising through drag and drop components. The application has two main sites: Admin (for management) and Consumer (for presentation).

## Tech Stack

- ReactJS
- Vite
- React Router DOM
- Tailwind CSS
- React DND (Drag and Drop)
- react-draft-wysiwyg & draft-js

## Prerequisites

Make sure you have Node.js installed (version >=18) before running the project.

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository_url]
2. Clone the repository:
   ```bash
   cd [project_folder]
3. Install dependencies:
   ```bash
   npm install
4. Rolling
   ```bash
   npm run dev

## Project structure
```plaintext
/project-root
├── public              # Static resource
├── src                 # main source
│   ├── assets          # Internal resource 
│   ├── components      # General components
│   │   ├── ui          # Base components
│   │   └── views	    # Components of views
│   ├── constants       # Constant files
│   ├── context         # State managements with context
│   ├── hooks           # Custom hooks
│   ├── utils           # Utilities function
│   ├── views           # Pages, containers
│   ├── App.jsx         # App setup
│   ├── index.css       # Css entry
│   └── main.jsx        # React entry
├── .eslintrc.cjs       # eslint config
├── .gitignore          # Ignore file for git
├── index.html          # Entry file for the web
├── jsconfig.json       # Project Javascript configuration file
├── package.json       
├── package-lock.json      
├── postcss.config.js   # PostCss configuration file
├── README.md           
├── tailwind.config.js  # TailwindCSS configuration file
└── vite.config.js      # Config file for vite
```