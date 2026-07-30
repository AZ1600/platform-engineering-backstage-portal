# ${{ values.name }}

${{ values.description }}

## Service information

- Owner: `${{ values.owner }}`
- Runtime: `${{ values.runtime }}`
- Environment: `${{ values.environment }}`
- Monitoring enabled: `${{ values.enableMonitoring }}`

## Endpoints

| Endpoint | Purpose |
|---|---|
| `/` | Returns basic service information |
| `/health` | Reports application health |

## Generated capabilities

This repository includes:

- FastAPI application source
- automated tests
- Docker support
- GitHub Actions CI
- Kubernetes Deployment
- Kubernetes Service
- Backstage catalogue registration
- TechDocs documentation