import Social from '../src';

import {
  facebookMock,
  googleMock,
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
        const params = {
          token: 'random-string',
        };
        const data = await service.authenticateFacebook(params);

        expect(data).toMatchObject(facebookMock);
      },
    );

    it(
      'shoud get GOOGLE auth data',
      async () => {
        const params = {
          token: 'random-string',
        };
        const data = await service.authenticateGoogle(params);

        expect(data).toMatchObject(googleMock);
      },
    );
  },
);
