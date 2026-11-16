import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const TEMPLATE_FILE = new URL(
  '../examples/template/template.yaml',
  import.meta.url,
);

export function validateGoldenPathTemplate(source) {
  const document = parseDocument(source, { uniqueKeys: true });

  if (document.errors.length > 0) {
    return document.errors.map(
      error => `Invalid template YAML: ${error.message}`,
    );
  }

  const template = document.toJS();
  const errors = [];

  if (template?.kind !== 'Template') {
    errors.push('The golden path must define a Backstage Template.');
  }

  const parameterGroups = template?.spec?.parameters;
  const repositoryGroups = Array.isArray(parameterGroups)
    ? parameterGroups.filter(group => group?.properties?.repoUrl)
    : [];

  if (repositoryGroups.length !== 1) {
    errors.push('Exactly one repository destination parameter is required.');
  } else {
    const repositoryGroup = repositoryGroups[0];
    const repoUrl = repositoryGroup.properties.repoUrl;
    const allowedHosts = repoUrl['ui:options']?.allowedHosts;

    if (!repositoryGroup.required?.includes('repoUrl')) {
      errors.push('The repository destination must be required.');
    }

    if (
      !Array.isArray(allowedHosts) ||
      allowedHosts.length !== 1 ||
      allowedHosts[0] !== 'github.com'
    ) {
      errors.push('Repository selection must allow only github.com.');
    }
  }

  const steps = template?.spec?.steps;
  const publishers = Array.isArray(steps)
    ? steps.filter(step => step?.action === 'publish:github')
    : [];

  if (publishers.length !== 1) {
    errors.push('Exactly one publish:github step is required.');
  } else {
    const input = publishers[0].input;

    if (input?.repoVisibility !== 'private') {
      errors.push('GitHub repositories must be private by default.');
    }

    if (input?.repoUrl !== '${{ parameters.repoUrl }}') {
      errors.push('The publish destination must use parameters.repoUrl.');
    }
  }

  return errors;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const errors = validateGoldenPathTemplate(
    readFileSync(TEMPLATE_FILE, 'utf8'),
  );

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`FAIL: ${error}`);
    }
    process.exitCode = 1;
  } else {
    console.log('PASS: Golden path creates private GitHub repositories.');
  }
}
