export default function Logout(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}