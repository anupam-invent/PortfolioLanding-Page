# 💻 Anupam Chakraborty | Software Quality Assurance (SQA) Engineer Portfolio

[![Host](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?style=flat-square&logo=github)](https://anupaminvent.qd.je/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Welcome to the official repository of the personal portfolio website for **Anupam Chakraborty**, a Software Quality Assurance (SQA) Engineer. Built with pure modern web technologies, this portfolio serves as a live demonstration of software engineering standards, clean code practices, accessibility integration, and QA-focused interactive design.

🔗 **Live Portfolio:** [https://anupaminvent.qd.je/](https://anupaminvent.qd.je/)

---

## 🚀 Key Features

### 🛠️ SQA-First Interactive Visuals
* **Live Test Suite Terminal Mockup:** An elegant hero component presenting a mock `test_suite_execution.log` detailing automatic regression sweeps, schema validations, and JMeter-based load tests.
* **Structured SQA Workflow Timeline:** A responsive, step-by-step pipeline illustrating Anupam's professional QA lifecycle—from analyzing spec requirements and test case design to defect reporting in Jira and regression releases.
* **Filterable & Rich Skill Competencies:** Clearly organized modules highlighting technical capabilities in manual testing, automation, API validation, performance, databases, and version control.

### ⚡ Modern Frontend Architecture
* **Pure Static Implementation:** Built entirely with semantic **HTML5**, modern **CSS3** (custom properties, flexbox/grid layouts), and optimized **Vanilla JavaScript**. No heavy frameworks, bundlers, or compilation steps required—ensuring blazing-fast page speeds.
* **Smooth Animation & Scroll Engine:** Powered by the lightweight **Intersection Observer API** for seamless scroll-reveal transitions, custom active-state navigation indicators, and dynamic header sticky states.
* **Custom Interactive Pointer Dynamics:** Interactive smart cursor trail tracking the user's viewport with contextual state reactions (hover, click, form focus) using `requestAnimationFrame` for stutter-free rendering.

### ♿ Accessibility (A11y) & Performance Oriented
* **Fully Responsive UI:** Designed with a mobile-first philosophy to ensure pixel-perfect presentation across mobile, tablet, and widescreen viewports.
* **Accessible Coding Practices:** Built-in keyboard accessibility skip-links (`Skip to content`), proper focus management, ARIA landmark roles, and structural text sizing.
* **Prefers-Reduced-Motion Compatible:** Detects and respects system-level accessibility settings, gracefully bypassing animations and custom cursor effects for users with motion sensitivity.
* **Form Redirection:** Integrated client-side contact form verification that launches the mail application pre-filled with structured subject/body context via dynamic `mailto:` parameters.

---

## 📂 Project Structure

The project has been structured systematically with a focus on separation of concerns:

```text
portfolio/
├── .git/                  # Git repository configurations
├── assets/
│   └── images/
│       ├── favicon.ico    # Website tab icon
│       └── profile.jpg    # Professional profile photograph of Anupam
├── css/
│   └── style.css          # Modern typography, variables, responsive design, & animations
├── js/
│   └── script.js          # Intersection Observer, custom cursor logic, and forms
├── CNAME                  # Custom GitHub Pages domain pointer (anupaminvent.qd.je)
├── index.html             # Main document semantic markup containing SEO/OpenGraph meta tags
└── README.md              # Project documentation and engineering guide
```

---

## 🛠️ Showcase of SQA Skills & Tools

Within the portfolio, Anupam’s professional competencies are explicitly showcased. Here is the technical stack represented:

| SQA Category | Tools, Libraries & Methodologies |
| :--- | :--- |
| **Manual Testing** | Test Case Design, Bug Reporting, Regression Analysis, Exploratory Testing |
| **Automation** | Selenium WebDriver, Python |
| **API Validation** | Postman |
| **Performance Testing** | Apache JMeter, Locust |
| **Project Tracking** | Jira |
| **Database Systems** | MySQL |
| **Version Control** | Git & GitHub |

---

## 🌟 Featured Projects

The portfolio showcases several of Anupam’s distinct development & testing projects:

1. **AI Image Classifier** 
   * **Stack:** Python, TensorFlow, Streamlit, Convolutional Neural Networks (CNN)
   * **Description:** A deep learning web application that classifies uploaded images as either "Cat" or "Dog".
   * **Code:** [GitHub Repository](https://github.com/anupam-invent/Image-Classifier)

2. **Secure Password Generator**
   * **Stack:** HTML5, CSS3, Pure JavaScript
   * **Description:** A client-side secure password builder running entirely in-browser to prevent server-side intercepts.
   * **Code:** [GitHub Repository](https://github.com/anupam-invent/password_generator)

3. **Travel Landing Page**
   * **Stack:** HTML5, CSS3, Responsive Web Design
   * **Description:** A highly polished, responsive web layout highlighting modern landing page visual components.
   * **Code:** [GitHub Repository](https://github.com/anupam-invent/Travel-Landing-Page)

---

## 🎓 Academic Credentials & Certifications

* **B.Sc. in Computer Science & Engineering (CSE)**
  * *Institution:* Bangladesh University of Business and Technology (BUBT)
  * *Passing Year:* 2026
  * *Academic Merit:* CGPA: 3.23 / 4.00
* **Diploma in Engineering**
  * *Institution:* Ahsanullah Institute of Technical and Vocational Education and Training (AITVET)
  * *Passing Year:* 2022
  * *Academic Merit:* GPA: 3.69 / 4.00
* **Full Stack Software Quality Assurance (SQA) Certification** (2026) — *IT Training BD*
* **Python for Everybody Specialization** (2023) — *Coursera / University of Michigan*

---

## 💻 Local Setup & Execution Guide

Since this portfolio is built with lightweight vanilla technologies, running and previewing it locally is extremely simple.

### Method 1: Direct File Launch
Simply double-click the `index.html` file in your system's file explorer. It will open instantly in your default web browser.

### Method 2: Python Local Server
If you want to simulate a production-grade web server environment (highly recommended for verifying absolute URLs and assets):
1. Open a terminal/command prompt inside the root `portfolio` directory.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to: `http://localhost:8000`

### Method 3: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Click the **Go Live** button in the bottom right corner of the status bar.

---

## 🌐 Deployment

The site is configured for continuous deployment on **GitHub Pages**.
* **Deployment Mechanism:** It serves static files automatically from the `main` branch.
* **Custom Domain Mapping:** The domain `anupaminvent.qd.je` is bound using the custom CNAME configuration file included in the repository root and managed via DNS host records pointing to GitHub Pages servers.

---

## ✉️ Get In Touch

Anupam Chakraborty is actively seeking professional opportunities as an SQA Engineer. Let's connect!

* **Email:** [anupaminvent@gmail.com](mailto:anupaminvent@gmail.com)
* **Phone:** [+8801686657464](tel:+8801686657464)
* **LinkedIn:** [linkedin.com/in/sqa-anupamchakraborty](https://www.linkedin.com/in/sqa-anupamchakraborty/)
* **GitHub Profile:** [github.com/sqa-anupamchakraborty](https://github.com/sqa-anupamchakraborty/)
