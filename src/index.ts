// Global Types
import type {
  Axios,
} from 'axios';
import type {
  $Schema,
} from '@vroskus/library-validator';

// Helpers
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import {
  validateResponse,
  Validator,
} from '@vroskus/library-validator';

// Mocks
import {
  facebookMock,
  googleMock,
} from './mocks';

// Types
import type {
  $FacebookPayload,
  $GooglePayload,
  $SocialPayload,
  $Config as Config,
} from './types';

export * from './types';

// Schemas
const socialPayloadSchema: $Schema = () => Validator.object().keys({
  Email: Validator.string().required(),
  EmailVerified: Validator.boolean().required(),
  Name: Validator.string().required(),
  PictureUrl: Validator.string().allow(null),
  Uid: Validator.string().required(),
});

class Social<C extends Config> {
  connection: Axios;

  constructor({
    mock,
    timeout,
  }: C) {
    if (mock === true) {
      this.#setupMock();
    }

    // Connection setup
    this.connection = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout,
    });
  }

  // eslint-disable-next-line
  #setupMock(): void {
    const mock = new AxiosMockAdapter(axios);

    mock.onGet('https://graph.facebook.com/v9.0/me').reply(() => {
      const responseBody: $FacebookPayload = facebookMock;

      return [200, responseBody];
    });

    mock.onGet(/https:\/\/www.googleapis.com\/oauth2\/v2\/userinfo/).reply(() => {
      const responseBody: $GooglePayload = googleMock;

      return [200, responseBody];
    });
  }

  async authenticateFacebook(token: string): Promise<$SocialPayload> {
    const url = 'https://graph.facebook.com/v9.0/me';
    const request = {
      params: {
        access_token: token,
        fields: 'name,email,picture',
      },
    };
    const response = await this.connection.get<$FacebookPayload>(
      url,
      request,
    );

    const output = {
      Email: response.data.email,
      EmailVerified: true,
      Name: response.data.name,
      PictureUrl: response.data.picture ? response.data.picture.data.url : null,
      Uid: String(response.data.id),
    };

    const validOutput: $SocialPayload = validateResponse(
      output,
      socialPayloadSchema,
    );

    return validOutput;
  }

  async authenticateGoogle(token: string): Promise<$SocialPayload> {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const request = {
      params: {
        access_token: token,
      },
    };
    const response = await this.connection.get<$GooglePayload>(
      url,
      request,
    );

    const output = {
      Email: response.data.email,
      EmailVerified: response.data.verified_email,
      Name: response.data.name,
      PictureUrl: response.data.picture,
      Uid: String(response.data.id),
    };

    const validOutput: $SocialPayload = validateResponse(
      output,
      socialPayloadSchema,
    );

    return validOutput;
  }
}

export default Social;
