import { SSM } from 'aws-sdk';
import _ from 'lodash';
import { loadFindParameters } from '../src/findParameters';

test('find all parameters', async () => {
  let describeParametersMock = jest.fn();
  let getParametersMock = jest.fn();

  let findParameters = loadFindParameters({
    ssm: <SSM>(<any>{
      describeParameters: describeParametersMock,
      getParameters: getParametersMock,
    }),
  });

  let allParameterInfos: SSM.ParameterMetadata[] = [
    { Name: 'test1', KeyId: 'test1_id' },
    { Name: 'test2', KeyId: 'test2_id' },
  ];
  describeParametersMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<SSM.DescribeParametersResult>({
          Parameters: allParameterInfos,
        });
      },
    };
  });

  let allParameters: SSM.Parameter[] = [
    { Name: 'test1', Value: 'test1_value' },
    { Name: 'test2', Value: 'test2_value' },
    { Name: 'test3', Value: 'test3_value' },
  ];

  let expectedParameters = allParameters.filter((parameter) =>
    allParameterInfos.map((info) => info.Name).includes(parameter.Name)
  );

  getParametersMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<SSM.GetParametersResult>({
          Parameters: expectedParameters,
        });
      },
    };
  });

  let parameters = await findParameters();

  expect(describeParametersMock).toHaveBeenCalledTimes(1);
  expect(parameters).toEqual(expectedParameters);
});

test('find some parameters', async () => {
  let describeParametersMock = jest.fn();
  let getParametersMock = jest.fn();

  let findParameters = loadFindParameters({
    ssm: <SSM>(<any>{
      describeParameters: describeParametersMock,
      getParameters: getParametersMock,
    }),
  });

  let allParameterInfos: SSM.ParameterMetadata[] = [
    { Name: 'test1', KeyId: 'test1_id' },
    { Name: 'test2', KeyId: 'test2_id' },
    { Name: 'test3', KeyId: 'test3_id' },
    { Name: 'test5', KeyId: 'test5_id' },
  ];
  describeParametersMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<SSM.DescribeParametersResult>({
          Parameters: allParameterInfos,
        });
      },
    };
  });

  let parameterNames = ['test3', 'test2'];

  let expectedParameters = allParameterInfos.filter((parameter) =>
    parameterNames.includes(parameter.Name)
  );

  getParametersMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<SSM.GetParametersResult>({
          Parameters: expectedParameters,
        });
      },
    };
  });

  let parameters = await findParameters(parameterNames);

  expect(describeParametersMock).toHaveBeenCalledTimes(1);
  expect(parameters).toEqual(expectedParameters);
});

test('find all parameters with next token 1', async () => {
  await testPaging(1);
});

test('find all parameters with next token 2', async () => {
  await testPaging(2);
});

test('find all parameters with next token 3', async () => {
  await testPaging(3);
});

test('find all parameters with next token 4', async () => {
  await testPaging(4);
});

test('find all parameters with next token 5', async () => {
  await testPaging(5);
});

test('find all parameters with next token 6', async () => {
  await testPaging(6);
});

test('find all parameters with next token 7', async () => {
  await testPaging(7);
});

async function testPaging(parametersCount: number) {
  let describeParametersMock = jest.fn();
  let getParametersMock = jest.fn();

  let findParameters = loadFindParameters({
    ssm: <SSM>(<any>{
      describeParameters: describeParametersMock,
      getParameters: getParametersMock,
    }),
  });

  let allParameterInfos: SSM.ParameterMetadata[] = _.take(
    [
      { Name: 'test1', KeyId: 'test1_id' },
      { Name: 'test2', KeyId: 'test2_id' },
      { Name: 'test3', KeyId: 'test3_id' },
      { Name: 'test5', KeyId: 'test5_id' },
      { Name: 'test6', KeyId: 'test6_id' },
      { Name: 'test7', KeyId: 'test7_id' },
    ],
    parametersCount
  );

  let pageSize = 3;

  describeParametersMock.mockImplementation(
    (options: SSM.DescribeParametersRequest) => {
      let startIndex = options.NextToken ? parseInt(options.NextToken) : 0;
      let endIndex = startIndex + pageSize;
      let nextToken =
        endIndex < allParameterInfos.length ? endIndex : undefined;

      return {
        promise: () => {
          return Promise.resolve<SSM.DescribeParametersResult>({
            Parameters: allParameterInfos.slice(startIndex, endIndex),
            NextToken: nextToken ? nextToken.toString() : undefined,
          });
        },
      };
    }
  );

  let expectedParameters = allParameterInfos.filter((parameter) =>
    allParameterInfos.map((info) => info.Name).includes(parameter.Name)
  );

  getParametersMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<SSM.GetParametersResult>({
          Parameters: expectedParameters,
        });
      },
    };
  });

  let parameters = await findParameters();

  expect(describeParametersMock).toHaveBeenCalledTimes(
    Math.ceil(allParameterInfos.length / pageSize)
  );
  expect(parameters).toEqual(expectedParameters);
}
