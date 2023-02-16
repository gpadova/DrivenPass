export type ApplicationError = {
    name: string;
    message: string;
  };

export type SignUp = {
    email: string;
    password: string;
}

export type Credential = {
  title: string;
  url: string;
  username: string;
  password: string;
}

export type Wifi = {
  title: string;
  network: string;
  password: string;
  userId?: number
}