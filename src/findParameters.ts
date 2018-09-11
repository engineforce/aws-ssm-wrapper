import { SSM } from 'aws-sdk';
import filter from 'lodash/filter';
import _ from 'lodash';

export interface IFindParameters {
  (parameterNames?: string[]): Promise<SSM.Parameter[]>;
}

interface ILoadFindParametersOptions {
  ssm: SSM;
}

export function loadFindParameters(
  options: ILoadFindParametersOptions
): IFindParameters {
  return async function(parameterNames: string[]) {
    let parameterMetaInfos = await _findParameterMetaInfos(
      options,
      parameterNames
    );
    return _getParameters(options, parameterMetaInfos.map((meta) => meta.Name));
  };
}

async function _findParameterMetaInfos(
  options: ILoadFindParametersOptions,
  parameterNames?: string[],
  nextToken?
) {
  let result = await options.ssm
    .describeParameters({
      NextToken: nextToken,
    })
    .promise();

  let parameters = result.Parameters;
  if (parameterNames) {
    parameters = filter(parameters, (parameter) =>
      parameterNames.includes(parameter.Name)
    );
  }

  if (result.NextToken) {
    parameters = [
      ...parameters,
      ...(await _findParameterMetaInfos(
        options,
        parameterNames,
        result.NextToken
      )),
    ];
  }

  return parameters;
}

// AWS Constraint: Member must have length less than or equal to 10
const MAX_PARAMETERS = 10;
async function _getParameters(
  options: ILoadFindParametersOptions,
  names: string[]
) {
  var namesToTake = _.take(names, MAX_PARAMETERS);
  var namesRemaining = _.takeRight(names, names.length - MAX_PARAMETERS);

  let result = await options.ssm
    .getParameters({
      Names: namesToTake,
      WithDecryption: true,
    })
    .promise();

  let parameters = result.Parameters;

  if (namesRemaining.length > 0) {
    parameters = [
      ...parameters,
      ...(await _getParameters(options, namesRemaining)),
    ];
  }

  return parameters;
}
