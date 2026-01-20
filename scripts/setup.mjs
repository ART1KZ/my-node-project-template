import { access, copyFile } from 'node:fs/promises';
import { constants } from 'node:fs';

const envFile = '.env';
const envExampleFile = '.env.example';

const fileExists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const syncEnv = async () => {
  const hasEnv = await fileExists(envFile);
  if (hasEnv) {
    console.warn('[setup] .env already exists, skipped');
    return;
  }

  const hasEnvExample = await fileExists(envExampleFile);
  if (!hasEnvExample) {
    console.warn('[setup] .env.example not found, skipped');
    return;
  }

  await copyFile(envExampleFile, envFile);
  console.warn('[setup] created .env from .env.example');
};

await syncEnv();
