# V.A.P.O.R — Vulnerabilities • Analysis • Practice • Operations • Research
VAPOR is a custom, high-intensity cybersecurity practice platform designed to simulate realistic Web Application &amp; Infrastructure vulnerabilities.

VAPOR bridges the gap between:

* Clean, structured labs (easy)
* Real-world bug bounty targets (chaotic & noisy)
* Failure-based learning
* Bug chain simulations
* Realistic attacker workflows

Every challenge is crafted to mimic **actual production bugs**, not artificial classroom examples.

---

# Features

### Mental Modeling Driven Labs

Each challenge starts from a conceptual model → then becomes a fully coded, exploitable lab.

### 100 Mental Modeling Challenges

The platform contains **all 100 preserved challenges**, categorized according to **OWASP Top 10 (2021)**.

### Bug Chain Simulations

Cross-endpoint data leaks, blind → visible read chains, auth bypass chains, business logic chaining, and more.

### Real-World Difficulty

Noisy logs, mixed frameworks, inconsistent code, legacy endpoints—just like real applications.

### 5 Labs Per Day Workflow

VAPOR is optimized for **continuous rapid skill progression**.

### Custom Vulnerable Components

* Misconfigured auth modules
* Prototype pollution entry points
* Header confusion flows
* Hidden admin panels
* Server-side race conditions
* Token misvalidations
* Cache poisoning
* Blind XXE pivots
  …and more.

### Bug Bounty Hunter Focus

Built specifically for training toward consistent **$100k+ earning potential**.

---

# 📁 Project Structure

```
VAPOR/
│
├── labs/
│   ├── A01-Injection/
│   ├── A02-Cryptographic-Failures/
│   ├── A03-Access-Control/
│   └── ... all OWASP categories
│
├── challenges/
│   └── 100-Mental-Modeling-Challenges.md
│
├── docker/
│   ├── nginx/
│   ├── vulnerable-app/
│   └── database/
│
├── scripts/
│   ├── generate-lab.sh
│   └── reset-lab.sh
│
├── docs/
│   ├── API-Docs.md
│   ├── Lab-Authoring-Guide.md
│   └── Bug-Chaining-Playbook.md
│
└── README.md
```

---

#  Installation

## 1️ Prerequisites

* **Docker** ≥ 24.0
* **Docker Compose** ≥ 2.20
* **Git**
* Any browser (Chrome recommended)

## 2️ Clone the Repository

```bash
git clone https://github.com/<your-username>/VAPOR.git
cd VAPOR
```

## 3️ Start the Platform

```bash
docker compose up --build
```

This launches:

* Vulnerable Web Apps
* API Endpoints
* Nginx reverse proxy
* Database (MySQL/Postgres depending on lab)
* Background cronjobs used for Race Condition labs
* Auth modules
* Internal Admin Panel (hidden)

## 4️ Visit the Platform

```
http://localhost:7777
```

Each challenge lives under its own path, e.g.:

```
/a03/access-control/lab01
/a08/ssrf/lab05
/a06/vulnerable-flows/lab09
```

---

# Creating New Labs

VAPOR supports automated lab generation:

```bash
./scripts/generate-lab.sh "Name of Challenge"
```

This automatically:

* Copies a base vulnerable template
* Inserts challenge metadata
* Creates Docker service
* Hooks it into Nginx
* Generates README + exploitation steps
* Enables local logging for analysis

---

# Documentation

### Architecture

See `docs/Architecture.md`

### Lab Authoring Guide

See `docs/Lab-Authoring-Guide.md` for creating new Mental Model labs.

### Bug Chaining Playbook

The heart of real-world pentesting.
Inside `docs/Bug-Chaining-Playbook.md`.

---

# Challenge Categories (OWASP 2021)

* A01: Broken Access Control
* A02: Cryptographic Failures
* A03: Injection
* A04: Insecure Design
* A05: Security Misconfiguration
* A06: Vulnerable Components
* A07: Identification & Authentication Failures
* A08: Software & Data Integrity Failures
* A09: Security Logging & Monitoring Failures
* A10: Server-Side Request Forgery (SSRF)


# Daily Workflow Example

```
→ Pick a Mental Modeling Challenge
→ Convert into a VAPOR lab (auto or manual)
→ Exploit it fully
→ Analyze logs, backend code, headers, tokens
→ Create bug chain variants
→ Store learnings in Obsidian
→ Study a matching real-world BBR case
```

---

# Example Lab: Access Control Bypass

```
/labs/A01-Injection/Challenge-03/
│
├── app.js
├── database.sql
├── exploit-notes.md
└── Dockerfile
```

Each lab also includes:

* Hidden admin routes
* Multiple failure points
* Imperfect sanitization
* Partial fixes
* Logging for forensic replay

---

