# AZ1600 Platform Engineering Developer Portal
A Backstage-based Internal Developer Platform demonstrating software catalog management, developer self-service, golden paths, service ownership, and cloud-native platform engineering practices.

![Backstage](https://img.shields.io/badge/Platform-Backstage-blue)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)
![Kubernetes](https://img.shields.io/badge/Runtime-Kubernetes-blue)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange)
![Terraform](https://img.shields.io/badge/IaC-Terraform-purple)

## Overview

The **AZ1600 Platform Engineering Developer Portal** is an Internal Developer Platform (IDP) built using **Backstage**.

The platform provides developers with a centralized experience for:

- Discovering software services
- Managing ownership and metadata
- Accessing technical documentation
- Creating new applications through self-service workflows
- Understanding platform architecture and dependencies
- Integrating cloud-native development practices

The goal of this platform is to improve developer experience, standardize engineering workflows, and reduce operational complexity through automation.

---

# Platform Capabilities

## Software Catalog

The Backstage Software Catalog provides a centralized inventory of:

- Applications
- Services
- APIs
- Infrastructure resources
- Platform components
- Ownership metadata

Developers can discover services, understand dependencies, and identify responsible teams.

---

## Developer Self-Service

The platform includes automated software creation workflows using Backstage Scaffolder.

Developers can:

- Generate production-ready services
- Create repositories automatically
- Register applications in Backstage
- Apply standardized engineering practices

The golden path workflow includes:

- Application source generation
- Repository creation
- Catalog registration
- Documentation setup
- Ownership assignment

---

## Kubernetes Platform Integration

The platform is designed for Kubernetes-based workloads.

Capabilities include:

- Kubernetes resource visibility
- Cloud-native service management
- Environment awareness
- Deployment workflow integration

Target infrastructure:

- Amazon Elastic Kubernetes Service (EKS)
- Terraform-managed infrastructure
- Kubernetes workloads

---

## Technical Documentation

Documentation is powered by Backstage TechDocs.

Each service can include:

- Architecture documentation
- Development instructions
- Operational guides
- Deployment information
- Ownership details

---

# Architecture

The AZ1600 Developer Platform follows a modern Internal Developer Platform architecture.

```
Developers
     |
     |
Backstage Developer Portal
     |
     |
 --------------------------------
 |              |               |
Catalog      TechDocs      Scaffolder
 |              |               |
Services     Documentation   Templates
 |
 |
Kubernetes / Cloud Infrastructure
```

---

# Technology Stack

| Area | Technology |
|---|---|
| Developer Portal | Backstage |
| Frontend | React + TypeScript |
| Backend | Node.js |
| Database | SQLite |
| Documentation | TechDocs |
| Templates | Backstage Scaffolder |
| Cloud Platform | AWS |
| Container Platform | Kubernetes |
| Infrastructure as Code | Terraform |
| Source Control | GitHub |
| Observability | Prometheus / Grafana |
| Deployment | Kubernetes / GitOps Ready |

---

# Repository Structure

```
.
├── packages/
│   ├── app/              # Backstage frontend application
│   └── backend/          # Backstage backend services
│
├── examples/
│   ├── catalog entities
│   └── software templates
│
├── docs/
│   ├── backstage-homepage.png
│   ├── catalog-overview.png
│   ├── catalog-architecture.png
│   ├── entity-page.png
│   └── scaffolder-success.png
│
├── app-config.yaml
├── catalog-info.yaml
├── package.json
└── yarn.lock
```

---

# Running Locally

## Requirements

Install:

- Node.js
- Yarn
- Docker
- Git

---

## Install Dependencies

```bash
yarn install
```

---

## Start Backstage

Run:

```bash
yarn dev
```

The application will start:

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:7007
```

---

# Software Catalog

The catalog contains platform components including:

- AZ1600 Developer Platform
- Observability Platform
- Terraform EKS Platform
- GitOps Platform

Each entity provides:

- Ownership information
- Lifecycle status
- Dependencies
- API relationships
- Architecture visualization

---

# Developer Workflow

A typical developer workflow:

```
Developer
    |
    |
Backstage Portal
    |
    |
Create Service Template
    |
    |
Generate Repository
    |
    |
Register Component
    |
    |
Deploy Application
```

---

# Platform Screenshots

## Backstage Homepage

![Backstage Homepage](docs/backstage-homepage.png)


---

## Software Catalog

![Catalog Overview](docs/catalog-overview.png)


---

## Catalog Architecture Graph

![Catalog Architecture](docs/catalog-architecture.png)


---

## Entity Management

![Entity Page](docs/entity-page.png)


---

## Self-Service Software Creation

![Scaffolder Success](docs/scaffolder-success.png)

---

# Future Roadmap

Planned platform improvements:

## Kubernetes Production Integration

- Connect real AWS EKS clusters
- Enable workload visibility
- Add deployment information

## GitOps Integration

- ArgoCD integration
- Automated deployment workflows
- Environment promotion

## CI/CD Automation

- GitHub Actions templates
- Security scanning
- Automated testing pipelines

## Platform Governance

- Role-based access control
- Service ownership policies
- Compliance automation

## Observability

- Prometheus integration
- Grafana dashboards
- Application health monitoring

---

# Engineering Principles

The AZ1600 Platform Engineering Developer Portal follows:

- Golden path engineering
- Automation first
- Self-service workflows
- Infrastructure as Code
- Developer experience optimization
- Cloud-native architecture

---

# License

Internal Platform Engineering Project.

Built for improving developer productivity and engineering standards.


---

# 👨‍💻 Author

**Olawale Azeez**

Cloud Engineer | Platform Engineer | AWS Solutions Architect

Focused on Platform Engineering, Internal Developer Platforms, Kubernetes, Cloud Infrastructure, and Developer Experience.

🌐 Portfolio: [Olawale Azeez Portfolio](https://az1600.github.io)

💻 GitHub: [AZ1600](https://github.com/AZ1600)

---
