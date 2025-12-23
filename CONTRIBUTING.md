# Contributing to The Digital Junk Drawer 

First off, thank you for considering contributing! This project is built on the idea that every app—no matter how small or "useless"—deserves a home.

## How to add your App or Game

To keep the drawer organized, please follow these steps:

### 1. Prepare your files
You only need two things:
* **Your App:** A single `.html` file (CSS and JS should be internal to the HTML or hosted via CDN).
* **A Thumbnail:** A `.png` or `.jpg` image (keep it around 400x300px).

### 2. The Workflow
1.  **Fork** this repository to your own GitHub account.
2.  **Upload** your HTML file into the `HTMLs/` folder.
3.  **Upload** your image into the `Images/` folder.
4.  **Edit `index.html`**: Find the `<section class="appsSection">` and add your app block:
    ```html
    <a href="HTMLs/yourFileName.html" class="item">
      <img src="Images/yourImageName.png" alt="Your App Name">
    </a>
    ```
5.  **Submit a Pull Request (PR)**: Describe what your app does!

### 3. Guidelines
* No malicious scripts or trackers.
* Ensure the UI looks decent on mobile.
* Keep file names simple (e.g., `myCoolGame.html`).

I will review your PR as soon as possible.