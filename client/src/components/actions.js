export const LoginSuccess = (user) => ({
  type: "Login_Success",
  payload: user,
});

export const Logout = () => ({
  type: "Logout",
});
