import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

export const saveUserData = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  // Set cookie with user data
  Cookies.set('userData', JSON.stringify(data), { expires: 7 }); // Expires in 7 days
};

export const clearUserData = () => {
  localStorage.removeItem("userData");
  // Clear user data cookie
  Cookies.remove('userData');
};

export const getUserData = () => {
  const userDataCookie = Cookies.get('userData');
  if (userDataCookie) {
    return JSON.parse(userDataCookie);
  } else {
    return JSON.parse(localStorage.getItem("userData"));
  }
};
