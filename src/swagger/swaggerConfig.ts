import { INestApplication } from '@nestjs/common';
import 'dotenv/config';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';

const loadSwaggerConfig = async () => {
  const path = resolve(__dirname, '../../doc/api.yaml');
  const content = await readFile(path, 'utf-8');
  return parse(content);
};

export const setupSwagger = async (app: INestApplication) => {
  const config = await loadSwaggerConfig();
  SwaggerModule.setup('doc', app, config);
};
