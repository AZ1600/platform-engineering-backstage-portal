import { readFile } from 'node:fs/promises';
import { parseAllDocuments } from 'yaml';

const catalogFiles = [
  'examples/platform-org.yaml',
  'examples/platform-catalog.yaml',
  'examples/template/template.yaml',
];

const allowedKinds = new Set([
  'API',
  'Component',
  'Domain',
  'Group',
  'Resource',
  'System',
  'Template',
  'User',
]);

const entities = [];
const entityRefs = new Map();

function fail(message) {
  console.error(`Catalog validation failed: ${message}`);
  process.exitCode = 1;
}

function refFor(entity) {
  const kind = entity.kind.toLowerCase();
  const namespace = entity.metadata.namespace ?? 'default';

  return `${kind}:${namespace}/${entity.metadata.name}`;
}

function normalizeRef(value, defaultKind) {
  if (value.includes(':')) {
    const [kind, rest] = value.split(':', 2);

    if (rest.includes('/')) {
      return `${kind.toLowerCase()}:${rest}`;
    }

    return `${kind.toLowerCase()}:default/${rest}`;
  }

  return `${defaultKind.toLowerCase()}:default/${value}`;
}

for (const file of catalogFiles) {
  const source = await readFile(file, 'utf8');
  const documents = parseAllDocuments(source);

  documents.forEach((document, index) => {
    if (document.errors.length > 0) {
      for (const error of document.errors) {
        fail(`${file} document ${index + 1}: ${error.message}`);
      }

      return;
    }

    const entity = document.toJS();

    if (!entity) {
      return;
    }

    if (typeof entity !== 'object') {
      fail(`${file} document ${index + 1} is not an object`);
      return;
    }

    if (!entity.apiVersion) {
      fail(`${file} document ${index + 1} has no apiVersion`);
    }

    if (!entity.kind) {
      fail(`${file} document ${index + 1} has no kind`);
      return;
    }

    if (!allowedKinds.has(entity.kind)) {
      fail(
        `${file} document ${index + 1} uses unsupported kind "${entity.kind}"`,
      );
    }

    if (!entity.metadata?.name) {
      fail(`${file} document ${index + 1} has no metadata.name`);
      return;
    }

    const ref = refFor(entity);

    if (entityRefs.has(ref)) {
      fail(`${ref} is declared more than once`);
      return;
    }

    entityRefs.set(ref, file);

    entities.push({
      file,
      ref,
      entity,
    });
  });
}

function requireReference(source, value, defaultKind, field) {
  if (!value) {
    return;
  }

  const target = normalizeRef(value, defaultKind);

  if (!entityRefs.has(target)) {
    fail(`${source} ${field} references missing entity ${target}`);
  }
}

function requireReferences(source, values, defaultKind, field) {
  if (!Array.isArray(values)) {
    return;
  }

  for (const value of values) {
    requireReference(source, value, defaultKind, field);
  }
}

for (const { ref, entity } of entities) {
  const spec = entity.spec ?? {};

  if (spec.owner) {
    const ownerRef = spec.owner.includes(':')
      ? normalizeRef(spec.owner, 'Group')
      : `group:default/${spec.owner}`;

    if (!entityRefs.has(ownerRef)) {
      fail(`${ref} spec.owner references missing entity ${ownerRef}`);
    }
  }

  requireReference(ref, spec.domain, 'Domain', 'spec.domain');

  requireReference(ref, spec.system, 'System', 'spec.system');

  requireReferences(ref, spec.providesApis, 'API', 'spec.providesApis');

  requireReferences(ref, spec.consumesApis, 'API', 'spec.consumesApis');

  requireReferences(ref, spec.memberOf, 'Group', 'spec.memberOf');

  if (Array.isArray(spec.dependsOn)) {
    for (const dependency of spec.dependsOn) {
      if (!dependency.includes(':')) {
        fail(
          `${ref} spec.dependsOn must use a typed entity reference: ${dependency}`,
        );
        continue;
      }

      const target = normalizeRef(dependency, 'Component');

      if (!entityRefs.has(target)) {
        fail(`${ref} spec.dependsOn references missing entity ${target}`);
      }
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `Catalog validation passed: ${entities.length} entities across ${catalogFiles.length} files.`,
);
