const useLogin = () => {
  const login = (token: string) => {
    localStorage.setItem("userData", JSON.stringify({ token }));
  };
  return { login };
};

export { useLogin };
