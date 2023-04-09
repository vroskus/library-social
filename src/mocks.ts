// Types
import type {
  $FacebookPayload,
  $GooglePayload,
} from './types';

export const facebookMock: $FacebookPayload = {
  email: 'user@facebook.com',
  id: '123',
  name: 'facebook-user',
};

export const googleMock: $GooglePayload = {
  email: 'user@google.com',
  family_name: 'Lastname',
  given_name: 'Firstname',
  hd: 'hd',
  id: '123',
  locale: 'en',
  name: 'google-user',
  picture: 'http://picture.url',
  verified_email: true,
};
