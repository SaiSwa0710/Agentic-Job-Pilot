# 🚀 DataEngineer-Apply-Agent

An autonomous **Agentic AI** system designed to discover high-intent Data Engineering job opportunities and intelligently navigate application portals. By leveraging Large Language Models (LLMs) as a reasoning engine, this agent bypasses the limitations of traditional, brittle automation to interact with web elements dynamically.

## 🧠 Project Context & Architecture

This project is a sophisticated implementation of an autonomous agentic loop. Instead of relying on hardcoded CSS selectors—which break when a website updates—it uses a "Sense-Think-Act" cycle to interpret web pages like a human.



### The Core Pillars:
* **Neural Discovery (Exa AI):** Uses neural embeddings to find direct application links from platforms like Lever, Greenhouse, and Workday, ensuring high-intent leads.
* **Managed Infrastructure (Browserbase):** Provides a cloud-based, stealthy browser environment to execute tasks without being flagged as a bot.
* **Cognitive Reasoning (Gemini 2.5 Flash):** Acts as the "brain," using multimodal capabilities to understand form fields and required actions in real-time.
* **Autonomous Interaction (Stagehand):** An AI-wrapped automation framework that translates natural language instructions into physical browser actions.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js (ES Modules)
* **Reasoning Engine:** Google Gemini 2.5 Flash
* **Search:** Exa AI
* **Automation:** Stagehand v3
* **Browser Host:** Browserbase
* **Validation:** Zod (for structured data extraction)

---

## 📋 Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v20+ recommended)
* API Keys for **Exa**, **Browserbase**, and **Google AI Studio**

### 2. Installation
```bash
git clone [https://github.com/saiswapnesh/DataEngineer-Apply-Agent.git](https://github.com/saiswapnesh/DataEngineer-Apply-Agent.git)
cd DataEngineer-Apply-Agent
npm install

```

### 3. Configuration

Create a `.env` file in the root directory:

```env
EXA_API_KEY=your_exa_key
BROWSERBASE_API_KEY=your_browserbase_key
BROWSERBASE_PROJECT_ID=your_project_id
GOOGLE_API_KEY=your_gemini_key

```

### 4. Usage

```bash
node app.js

```

---

## 🛣️ Project Roadmap

To evolve this agent into a production-grade career assistant, the following features are planned:

### Phase 1: Intelligent Matching (Short-term)

* **Resume-to-JD Analysis:** Implement a "Pre-check" step where the agent compares the extracted job requirements against the user's resume PDF using a dedicated LLM prompt to score the match before applying.
* **Custom Cover Letter Generation:** Dynamically generate a personalized cover letter for each application based on the extracted job description.

### Phase 2: Enhanced Autonomy (Medium-term)

* **OTP/MFA Handling:** Integrate a secondary notification loop to handle one-time passwords for sites requiring candidate login.
* **Multi-Job Batching:** Expand the agent to loop through all results found by Exa, applying to multiple jobs in a single execution.

### Phase 3: Analytics & Persistence (Long-term)

* **Application Tracking Database:** Integrate a lightweight database (like Supabase or SQLite) to log every job applied to, the date, and the application URL to prevent duplicate applications.
* **Dashboard UI:** Create a simple frontend to visualize the agent's progress and review forms before the final "Submit" click.

---

## ⚖️ Safety & Ethics

This tool is built for educational purposes and to assist with the candidate's personal job search.

* **Review Mode:** The `submit` action is commented out by default to ensure the user reviews all information before submission.
* **Respectful Crawling:** The agent includes delays to mimic human behavior and avoid overwhelming target servers.
