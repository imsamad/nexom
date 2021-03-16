export const addToken = (value) => {
  localStorage.setItem("remainderToken", value);
};
export const removeToken = () => localStorage.removeItem("remainderToken");
