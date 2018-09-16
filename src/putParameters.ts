import { SSM } from 'aws-sdk';
import filter from 'lodash/filter';
import _ from 'lodash';
import { asyncMap } from '@engineforce/async-lib';
import { IFindParameters } from './findParameters';

export interface IPutParameters {
  (input: IPutParameterInput): Promise<void>;
}

export interface ILoadPutParametersOptions {
  ssm: SSM;
  findParameters: IFindParameters;
}

export interface IPutParameterInput {
  parameters: IPutParameterInfo[];
  kmsKeyId?: string;
  dryRun?: boolean;
}

export interface IPutParameterInfo {
  key: string;
  type: 'String' | 'StringList' | 'SecureString';
  value: string;
  description?: string;
}

export function loadPutParameters(
  options: ILoadPutParametersOptions
): IPutParameters {
  return async function(input) {
    return _putParameters(options, input);
  };
}

// AWS Constraint: Member must have length less than or equal to 10

async function _putParameters(
  options: ILoadPutParametersOptions,
  input: IPutParameterInput
) {
  const oldParameters = _.keyBy(
    await options.findParameters(input.parameters.map((p) => p.key)),
    'Name'
  );

  await asyncMap(input.parameters, async (parameter) => {
    const oldParameter = oldParameters[parameter.key];
    if (oldParameter == undefined || oldParameter.Value !== parameter.value) {
      console.log(
        'Update parameter:',
        _.extend({}, parameter, {
          oldValue: oldParameter ? oldParameter.Value : undefined,
        })
      );

      if (!input.dryRun) {
        if (parameter.value != undefined) {
          return await options.ssm
            .putParameter({
              Name: parameter.key,
              Type: parameter.type,
              Value: parameter.value,
              KeyId: input.kmsKeyId,
              Overwrite: true,
              Description: parameter.description,
            })
            .promise();
        } else if (oldParameter != undefined) {
          await options.ssm
            .deleteParameter({
              Name: parameter.key,
            })
            .promise();
        }
      }
    }

    return undefined;
  });
}
