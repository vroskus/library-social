export type $Config = {
  mock?: boolean;
  timeout: number;
};

export type $FacebookPayload = {
  email: string;
  id: string;
  name: string;
  picture?: {
    data: {
      url: string;
    };
  };
};

export type $GooglePayload = {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
};
