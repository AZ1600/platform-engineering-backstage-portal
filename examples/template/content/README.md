# AZ1600 Platform Engineering Developer Portal

A portfolio-grade Internal Developer Platform built with [Backstage](https://backstage.io/) to centralize software discovery, ownership, documentation, developer self-service, platform architecture, and Kubernetes integration.

The project demonstrates how a platform engineering team can provide developers with a single interface for discovering services, understanding dependencies, creating production-ready applications, and accessing shared platform capabilities.

---

## Project Overview

The AZ1600 Platform Engineering Developer Portal provides a centralized experience for:

- Discovering services, APIs, systems, and infrastructure resources
- Tracking software ownership and lifecycle information
- Visualizing platform relationships and dependencies
- Creating production-ready services through self-service templates
- Automatically publishing generated services to GitHub
- Registering newly created services in the Backstage catalog
- Providing technical documentation through TechDocs
- Preparing application and infrastructure visibility through Kubernetes integration

The project is designed as a practical demonstration of Internal Developer Platform and developer experience principles.

---

## Key Features

### Custom Developer Portal Home

The Backstage Home plugin provides a customizable landing page containing:

- Platform engineering toolkit links
- Starred catalog entities
- Quick access to important platform services

### Software Catalog

The catalog models the organization’s platform ecosystem using:

- Domains
- Systems
- Components
- APIs
- Resources
- Users and groups
- Ownership relationships
- Service dependencies

### Platform Architecture Graph

The Backstage Catalog Graph visualizes relationships between:

- Platform Engineering domain
- Internal Developer Platform system
- Developer portal
- GitOps and Argo CD services
- Observability services
- Terraform and EKS infrastructure
- GitHub, Kubernetes, and monitoring APIs
- Prometheus, Grafana, and Amazon EKS resources

### Developer Self-Service

The production-ready software template allows a developer to provide application details and automatically:

1. Generate service files
2. Create a GitHub repository
3. Register the service in Backstage
4. Notify the service owner

### Production-Ready FastAPI Golden Path

Generated service repositories include:

- FastAPI application source
- Health-check endpoint
- Automated tests
- Dockerfile
- GitHub Actions CI workflow
- Kubernetes Deployment and Service manifests
- Backstage `catalog-info.yaml`
- TechDocs documentation
- Local development instructions

### GitHub Integration

GitHub integration supports:

- Repository creation
- Source-code publishing
- Catalog registration
- GitHub Actions workflows
- Repository links from Backstage

### Kubernetes Integration

The Backstage Kubernetes frontend and backend plugins are installed.

The application includes configuration for connecting to an Amazon EKS cluster. Live workload visibility requires:

- Valid AWS credentials
- A real EKS cluster endpoint
- Appropriate EKS and Kubernetes permissions

---

## Screenshots

### Developer Portal Home

A customizable homepage providing quick access to platform documentation and important catalog entities.

![AZ1600 Developer Portal Home](docs/backstage-homepage.png)

---

### Software Catalog

The catalog centralizes platform services, ownership, lifecycle information, systems, descriptions, and technology metadata.

![AZ1600 Software Catalog](docs/catalog-overview.png)

---

### Service Entity and Dependencies

The entity page displays ownership, consumed APIs, infrastructure dependencies, metadata, and catalog relationships.

![AZ1600 Developer Platform Entity](docs/entity-page.png)

---

### Platform Catalog Architecture

The catalog graph visualizes relationships between the platform domain, services, APIs, and infrastructure resources.

![Platform Catalog Architecture](docs/catalog-architecture.png)

---

### Developer Self-Service Workflow

The production-ready template successfully generates service files, creates a GitHub repository, registers the service in Backstage, and sends an ownership notification.

![Successful Software Template Execution](docs/scaffolder-success.png)

---

## Platform Architecture

```text
                              Developers
                                   │
                                   ▼
                 AZ1600 Platform Engineering Portal
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
   Software Catalog        Software Templates          TechDocs
          │                        │                        │
          │                        ▼                        │
          │               Generate New Service             │
          │                        │                        │
          │             ┌──────────┼──────────┐             │
          │             ▼          ▼          ▼             │
          │          Source      Docker    Kubernetes       │
          │             │          │          │             │
          └─────────────┴──────────┼──────────┴─────────────┘
                                   │
                                   ▼
                              GitHub Repository
                                   │
                                   ▼
                          Backstage Registration
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
         GitOps Platform     Observability        Amazon EKS
           Argo CD          Grafana/Prometheus     Kubernetes
```

---

## Catalog Model

The catalog is organized around the following structure:

```text
Platform Engineering Domain
└── Internal Developer Platform System
    ├── AZ1600 Developer Platform
    ├── CI/CD Platform
    ├── GitOps Argo CD Platform
    ├── Observability Platform
    ├── Security Engineering Platform
    └── Terraform EKS Platform
```

The catalog also includes shared APIs and resources such as:

```text
APIs
├── GitHub API
├── Kubernetes API
└── Monitoring API

Resources
├── Amazon EKS Cluster
├── Grafana
└── Prometheus
```

---

## Software Template Workflow

The production-ready service template collects:

- Service name
- Service description
- Owner
- Runtime
- Deployment environment
- Monitoring preference
- GitHub repository destination

Backstage then performs the following workflow:

```text
Developer submits template
          │
          ▼
Generate application files
          │
          ▼
Create GitHub repository
          │
          ▼
Push generated source code
          │
          ▼
Register catalog-info.yaml
          │
          ▼
Service appears in Backstage
          │
          ▼
Notify service owner
```

---

## Technologies Used

### Developer Portal

- Backstage
- TypeScript
- React
- Node.js
- Yarn

### Platform and Infrastructure

- Docker
- Kubernetes
- Amazon EKS
- Terraform
- Argo CD

### Automation and Integration

- GitHub
- GitHub Actions
- Backstage Scaffolder
- Backstage Software Catalog

### Documentation and Observability

- Backstage TechDocs
- MkDocs
- Prometheus
- Grafana

---

## Repository Structure

```text
.
├── docs/
│   ├── backstage-homepage.png
│   ├── catalog-architecture.png
│   ├── catalog-overview.png
│   ├── entity-page.png
│   └── scaffolder-success.png
│
├── examples/
│   ├── platform-org.yaml
│   ├── platform-catalog.yaml
│   └── template/
│       ├── template.yaml
│       └── content/
│           ├── .github/workflows/
│           ├── app/
│           ├── docs/
│           ├── kubernetes/
│           ├── tests/
│           ├── catalog-info.yaml
│           ├── Dockerfile
│           ├── mkdocs.yml
│           ├── README.md
│           └── requirements.txt
│
├── packages/
│   ├── app/
│   └── backend/
│
├── app-config.yaml
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

Install the following tools:

- Node.js
- Yarn
- Git
- Docker
- AWS CLI for optional EKS integration
- `kubectl` for optional Kubernetes access

### Clone the Repository

```bash
git clone https://github.com/AZ1600/platform-engineering-backstage-portal.git
cd platform-engineering-backstage-portal/backstage-portal
```

### Install Dependencies

```bash
yarn install
```

### Configure GitHub Authentication

Create a GitHub personal access token with the permissions required to create repositories and publish source code.

Export the token in your terminal:

```bash
export GITHUB_TOKEN="your-github-token"
```

Never commit the token to Git or place the real value directly inside `app-config.yaml`.

### Validate the Project

```bash
yarn tsc
yarn backstage-cli repo lint
```

### Start Backstage

```bash
yarn start
```

Open:

```text
http://localhost:3000
```

Select the Guest sign-in option for local development.

---

## Kubernetes and Amazon EKS Setup

Kubernetes integration is optional for running the portal locally.

To connect a real EKS cluster, first confirm that the AWS CLI is authenticated:

```bash
aws sts get-caller-identity
```

List available clusters:

```bash
aws eks list-clusters
```

Retrieve the cluster endpoint:

```bash
aws eks describe-cluster \
  --name YOUR_CLUSTER_NAME \
  --query "cluster.endpoint" \
  --output text
```

Replace the placeholder endpoint in:

```text
app-config.yaml
```

with the returned EKS endpoint.

The AWS identity must also have permission to describe the cluster and access Kubernetes resources.

---

## Skills Demonstrated

### Platform Engineering

- Internal Developer Platform design
- Developer self-service
- Golden-path implementation
- Service catalog management
- Platform governance
- Developer experience optimization

### Cloud and Kubernetes

- Amazon EKS integration
- Kubernetes application manifests
- Docker containerization
- Terraform infrastructure modeling
- GitOps architecture

### DevOps and Automation

- GitHub repository automation
- CI workflow generation
- Software template development
- Catalog registration automation
- Service ownership notifications

### Software Architecture

- Domain and system modeling
- API relationship modeling
- Infrastructure dependency mapping
- Service ownership tracking
- Platform architecture visualization

---

## Project Outcomes

This project demonstrates the ability to:

- Build and customize an Internal Developer Platform
- Centralize software and infrastructure information
- Model platform ownership and dependencies
- Automate service creation through reusable golden paths
- Integrate Backstage with GitHub
- Generate production-ready application repositories
- Improve developer discoverability and self-service
- Prepare Kubernetes and EKS workload visibility
- Document platform architecture through catalog relationships

---

## Current Status

Completed:

- Backstage frontend and backend setup
- AZ1600 branding
- Customizable Home dashboard
- Software catalog
- Organization and ownership entities
- Platform architecture graph
- GitHub integration
- Production-ready FastAPI template
- Automated GitHub repository creation
- Automatic Backstage catalog registration
- Service-owner notification
- Kubernetes frontend and backend plugin installation

In progress:

- Live Amazon EKS authentication
- Kubernetes workload visibility
- Expanded TechDocs content
- Additional homepage widgets

---

## Roadmap

Planned improvements include:

- Connect Backstage to a live Amazon EKS cluster
- Display Kubernetes workloads and deployment health
- Add Argo CD deployment visibility
- Integrate Grafana dashboards
- Add Prometheus service metrics
- Improve TechDocs coverage
- Add security and compliance templates
- Add cost visibility dashboards
- Add scorecards and software maturity checks
- Introduce production authentication and authorization

---

## Why This Project Matters

Modern engineering teams often work across many disconnected tools, repositories, infrastructure platforms, and documentation systems.

An Internal Developer Platform provides a consistent interface over those tools.

This project demonstrates how Backstage can act as a central platform layer for:

- Visibility
- Ownership
- Governance
- Documentation
- Automation
- Developer self-service
- Platform standardization

The result is a more discoverable and consistent developer experience.

---

## Author

**Olawale Azeez**

Cloud Engineer | Platform Engineer | AWS Solutions Architect

Focused on:

- Platform Engineering
- Internal Developer Platforms
- Amazon Web Services
- Kubernetes
- Infrastructure as Code
- Developer Experience
- Cloud and DevOps automation

GitHub: [AZ1600](https://github.com/AZ1600)