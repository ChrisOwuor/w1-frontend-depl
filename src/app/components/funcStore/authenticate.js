/**
 * 
 * @returns 
 */
export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const tk = localStorage.getItem("tk");
    if (tk) {
      const tokenData = JSON.parse(atob(tk.split('.')[1])); // Decoding the JWT token payload
      const tokenExpiration = tokenData.exp * 1000; // Expiration time in milliseconds

      // Checking if the current time is before the token expiration time
      if (tokenExpiration > Date.now()) {
        return true; // User is logged in
      }
    }
  }
  return false; // User is not logged in or token is expired
}
