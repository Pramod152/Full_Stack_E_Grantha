export const saveAdminData = (data) => {
    localStorage.setItem("adminData", JSON.stringify(data));
};

export const clearAdminData = () => {
    localStorage.removeItem("adminData");
};

export const getAdminData = () => {
    return JSON.parse(localStorage.getItem("adminData"));
};