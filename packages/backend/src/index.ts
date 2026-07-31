import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// Catalog
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// Kubernetes
backend.add(import('@backstage/plugin-kubernetes-backend'));

// Scaffolder
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(
  import('@backstage/plugin-scaffolder-backend-module-notifications'),
);

// TechDocs
backend.add(import('@backstage/plugin-techdocs-backend'));

// Auth
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(
  import('@backstage/plugin-auth-backend-module-guest-provider'),
);

// Permissions
backend.add(import('@backstage/plugin-permission-backend'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// Search
backend.add(import('@backstage/plugin-search-backend'));
backend.add(import('@backstage/plugin-search-backend-module-pg'));
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// Notifications
backend.add(import('@backstage/plugin-notifications-backend'));
backend.add(import('@backstage/plugin-signals-backend'));

// MCP
backend.add(import('@backstage/plugin-mcp-actions-backend'));


backend.start();