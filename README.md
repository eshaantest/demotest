# 🚀 MesrAI Demo Repository

A full-stack demo application with Python (FastAPI) backend, React frontend, and AWS infrastructure managed with Terraform modules.

> **Purpose:** This repository is set up to demonstrate [mesr.ai](https://mesr.ai) AI-powered code review on pull requests.

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        AWS Cloud                         │
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────────────┐  │
│   │CloudFront│───▶│  S3      │    │   ECS Fargate    │  │
│   │   CDN    │    │ (React)  │    │  (FastAPI App)   │  │
│   └──────────┘    └──────────┘    └────────┬─────────┘  │
│                                            │             │
│   ┌──────────────────────────────────────┐ │             │
│   │               VPC                    │ │             │
│   │  ┌──────────┐    ┌────────────────┐  │ │             │
│   │  │ Public   │    │  Private       │  │ │             │
│   │  │ Subnets  │    │  Subnets       │◀─┘ │             │
│   │  │  (ALB)   │    │  (ECS + RDS)  │    │             │
│   │  └──────────┘    └────────────────┘    │             │
│   └──────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

## 🗂️ Project Structure

```
mesrai-demo-repo/
├── backend/                  # Python FastAPI application
│   ├── app/
│   │   ├── api/              # Route handlers
│   │   ├── models/           # SQLAlchemy models
│   │   ├── services/         # Business logic
│   │   └── core/             # Config, security, DB
│   ├── tests/                # Pytest test suite
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── Dockerfile
│   └── package.json
├── infra/                    # Terraform IaC
│   ├── modules/
│   │   ├── vpc/              # VPC + subnets + routing
│   │   ├── ecs/              # ECS Fargate cluster + service
│   │   ├── rds/              # Aurora PostgreSQL
│   │   └── s3/               # S3 + CloudFront
│   └── envs/
│       ├── dev/
│       └── prod/
└── .github/
    └── workflows/            # CI/CD pipelines
```

## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Backend     | Python 3.12, FastAPI, SQLAlchemy  |
| Database    | PostgreSQL (AWS Aurora Serverless) |
| Frontend    | React 18, Vite, TailwindCSS       |
| Infra       | Terraform 1.7+, AWS               |
| CI/CD       | GitHub Actions                    |
| Container   | Docker, AWS ECS Fargate           |

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 20+
- Docker
- Terraform 1.7+
- AWS CLI configured

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Infrastructure
```bash
cd infra/envs/dev
terraform init
terraform plan
terraform apply
```

## 🤖 mesr.ai Code Review

This repo is connected to [mesr.ai](https://mesr.ai) for automated AI code review on every pull request.

When you open a PR, mesr.ai will automatically:
- Review code quality and best practices
- Identify potential bugs and security issues
- Suggest improvements and optimizations
- Check Terraform best practices and AWS security

## 📄 License

MIT
