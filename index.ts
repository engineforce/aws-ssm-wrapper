import aws from 'aws-sdk';
import { loadFindParameters } from './src/findParameters';
import { loadPutParameters } from './src/putParameters';

const ssm = new aws.SSM({
  region: process.env.AWS_DEFAULT_REGION,
});

export const findParameters = loadFindParameters({ ssm });
export const putParameters = loadPutParameters({ ssm, findParameters });

export * from './src/putParameters';
export * from './src/findParameters';
