// Types
import type {
  $FacebookPayload,
  $GooglePayload,
  $SocialPayload,
} from './types';

const id = '123';
const name = 'user';
const email = 'user@email.com';
const picture = 'http://picture.url';

export const facebookMock: $FacebookPayload = {
  email,
  id,
  name,
  picture: {
    data: {
      url: picture,
    },
  },
};

export const googleMock: $GooglePayload = {
  email,
  family_name: 'Lastname',
  given_name: 'Firstname',
  hd: 'hd',
  id,
  locale: 'en',
  name,
  picture,
  verified_email: true,
};

export const socialPayloadMock: $SocialPayload = {
  Email: email,
  EmailVerified: true,
  Name: name,
  PictureUrl: picture,
  Uid: id,
};
