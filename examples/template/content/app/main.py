from fastapi import FastAPI

app = FastAPI(
    title="${{ values.name }}",
    description="${{ values.description }}",
    version="1.0.0",
)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "service": "${{ values.name }}",
        "status": "running",
        "environment": "${{ values.environment }}",
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "healthy",
        "service": "${{ values.name }}",
    }