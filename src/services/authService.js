import axios from "axios";

const API_URL =  "https://hoodwink.medkomtek.net/api"

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/auth/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return axios.post(API_URL + "/register", {
      email,
      password
    });
  }

  getAccessToken() {
    return JSON.parse(localStorage.getItem('token'));;
  }
}

export default new AuthService();