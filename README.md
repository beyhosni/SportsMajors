# SportsMajors MVP (Phase 1)

Platforme B2B/B2C pour les étudiants-athlètes internationaux (F-1 / OPT).

## Architecture
Modular Monolith (Java/Spring Boot 3) + Next.js 14.

## Modules Backend
- **identity-service**: Auth & Security (JWT HttpOnly)
- **candidate-service**: Student-Athlete Profiles
- **employer-service**: Organization Profiles
- **job-service**: Job Board & Filters
- **application-service**: Recruitment tracking
- **document-service**: CV Upload (S3/LocalStack)
- **api-gateway**: Routing & Header enrichment

## Démarrage rapide (Local)

### Prérequis
- Docker & Docker Compose
- Java 17+ (pour build local)
- Node.js 20+

### Lancement via Docker
```bash
docker-compose up --build
```

### URLs
- **Frontend**: `http://localhost:3000`
- **API Gateway**: `http://localhost:8080`
- **S3 (LocalStack)**: `http://localhost:4566`

## Tests
Pour chaque module backend:
```bash
mvn test
```

## Sécurité
- JWT stocké dans un cookie HttpOnly.
- Bridge Gateway -> Services via le header `X-User-Id`.
- RBAC implémenté côté Backend.

## Auteur
SportsMajors Dev Team
