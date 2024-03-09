export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex?.test(email);
};

export const isValidPassword = (password: string) => {
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passRegex?.test(password);
};

export const transformArrayToStringById = (array: { id: number }[]) => {
  return array?.map((item: { id: number }) => item.id).join("|");
};

export const transformArrayToStringByName = (array: { name: number }[]) => {
  return array?.map((item: { name: number }) => item.name).join("|");
};

export const isFiltersEmpty = <T extends Record<string, any>>(
  filters: T
): Partial<T> => {
  const filteredValues: Partial<T> = {};
  for (const key in filters) {
    const value = filters[key];
    if (value !== "" && value !== null && value !== undefined) {
      filteredValues[key] = value;
    }
  }
  return filteredValues;
};

export function isEmptyObject(obj: {}) {
  if (obj) {
    return Object?.keys(obj)?.length === 0;
  } else return {};
}
