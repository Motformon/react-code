
export const clearLocalStorage = (exclude?: string[]) => {
  const exl = exclude?.length ? exclude : [];

  const allExclude: string[] = [
    ...exl,
  ];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) || '';

    if (allExclude.indexOf(key) === -1) {
      localStorage.removeItem(key);
    }
  }
};

export const setItemLS = (name: string, value: string) => {
  try {
    localStorage.setItem(name, value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    clearLocalStorage([]);
  }
};