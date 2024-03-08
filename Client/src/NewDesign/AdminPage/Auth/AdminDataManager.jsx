import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

export const saveAdminData = (data) => {
  localStorage.setItem("AdminData", JSON.stringify(data));
  // Set cookie with user data
  Cookies.set('AdminData', JSON.stringify(data), { expires: 7 }); // Expires in 7 days
};

export const clearAdminData = () => {
  localStorage.removeItem("AdminData");
  // Clear user data cookie
  Cookies.remove('AdminData');
};

export const getAdminData = () => {
  const adminDataCookie = Cookies.get('AdminData');
  if (adminDataCookie) {
    return JSON.parse(adminDataCookie);
  } else {
    return JSON.parse(localStorage.getItem("AdminData"));
  }
};
