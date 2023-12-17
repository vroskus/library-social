import Social from '../src';

import {
  socialPayloadMock,
} from '../src/mocks';

describe(
  'Social',
  () => {
    const service = new Social({
      mock: true,
      timeout: 0,
    });

    it(
      'shoud get FACEBOOK auth data',
      async () => {
        const token = 'random-string';
        const data = await service.authenticateFacebook(token);

        expect(data).toMatchObject(socialPayloadMock);
      },
    );

    it(
      'shoud get GOOGLE auth data',
      async () => {
        const token = 'random-string';
        const data = await service.authenticateGoogle(token);

        expect(data).toMatchObject(socialPayloadMock);
      },
    );
  },
);
