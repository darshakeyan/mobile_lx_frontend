export type UserAuthentication = {
  email: string;
  password: string;
};

export type UserDetailAuthentication = {
  name: string;
  email: string;
  password: string;
};

export type MovieFilters = {
  withKeywords?: string;
  withOriginalLanguage?: string;
  withGenres?: string;
  certification?: string;
};
