# Contributing to MesrAI Demo

## Pull Request Process

This repository uses **[mesr.ai](https://mesr.ai)** for automated AI-powered code review on every pull request.

### How it works

1. Fork the repository and create a feature branch from `develop`
2. Make your changes following the coding standards below
3. Open a pull request — **mesr.ai will automatically review your code**
4. Address any issues raised by the mesr.ai review
5. Get a human approval and merge

### Branch naming

```
feature/short-description
fix/bug-description
chore/task-description
infra/terraform-change
```

### Commit convention

```
feat: add user authentication endpoint
fix: correct database connection pool leak
chore: update dependencies
infra: add RDS read replica
docs: update API documentation
```

## Coding Standards

### Backend (Python)

- Format with **black** (`black .`)
- Lint with **ruff** (`ruff check .`)
- Type hints on all functions
- Tests for all new endpoints (`pytest tests/`)
- No hardcoded secrets — use environment variables or AWS Secrets Manager

### Frontend (TypeScript / React)

- Strict TypeScript — no `any` types
- Components in `src/components/`, pages in `src/pages/`
- Custom hooks in `src/hooks/`
- Run `npm run lint` and `npx tsc --noEmit` before committing

### Terraform

- Format with `terraform fmt -recursive`
- Validate with `terraform validate`
- All resources must have a `tags` block using `var.tags`
- No hardcoded AWS account IDs or region strings — use variables
- Sensitive outputs must be marked `sensitive = true`

## Local Development

```bash
# Start everything with Docker Compose
docker-compose up

# Backend only
cd backend && uvicorn app.main:app --reload

# Frontend only
cd frontend && npm run dev
```

## What mesr.ai reviews

When you open a PR, mesr.ai will analyze:

- **Code quality** — readability, structure, complexity
- **Security** — OWASP top 10, secrets exposure, IAM over-permissions
- **Performance** — N+1 queries, missing indexes, inefficient patterns
- **Best practices** — FastAPI patterns, React hooks rules, Terraform resource hygiene
- **Test coverage** — missing tests for changed code
