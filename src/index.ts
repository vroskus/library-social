// Global Types
import type {
  Axios,
} from 'axios';

// Helpers
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

// Mocks
import {
  facebookMock,
  googleMock,
} from './mocks';

// Types
import type {
  $Config as Config,
  $FacebookPayload,
  $GooglePayload,
} from './types';

export type $Config = Config;

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

  async authenticateFacebook(params: {
    token: string;
  }): Promise<$FacebookPayload> {
    const url = 'https://graph.facebook.com/v9.0/me';
    const request = {
      params: {
        access_token: params.token,
        fields: 'name,email,picture',
      },
    };
    const response = await this.connection.get(
      url,
      request,
    );

    return response.data;
  }

  async authenticateGoogle(params: {
    token: string;
  }): Promise<$GooglePayload> {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const request = {
      params: {
        access_token: params.token,
      },
    };
    const response = await this.connection.get(
      url,
      request,
    );

    return response.data;
  }
}

export default Social;
