# ${{ values.name }}

${{ values.description }}

## Overview

This service was generated through the AZ1600 Developer Platform using the production-ready FastAPI golden path.

## Runtime

- Runtime: Python FastAPI
- Environment: `${{ values.environment }}`
- Owner: `${{ values.owner }}`
- Monitoring enabled: `${{ values.enableMonitoring }}`

## Local development

Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the service:

```bash
uvicorn app.main:app --reload
```

Open the service:

```text
http://localhost:8000
```

Health endpoint:

```text
http://localhost:8000/health
```

## Tests

Run the automated tests:

```bash
pytest
```

## Docker

Build the Docker image:

```bash
docker build -t ${{ values.name }} .
```

Run the Docker container:

```bash
docker run --rm -p 8000:8000 ${{ values.name }}
```

## Kubernetes

Deploy the service to Kubernetes:

```bash
kubectl apply -f kubernetes/
```

## Generated capabilities

This repository includes:

- FastAPI application source
- health-check endpoint
- automated tests
- Docker support
- GitHub Actions CI
- Kubernetes Deployment and Service
- Backstage catalogue registration
- TechDocs documentation