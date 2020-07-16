const api = {
  BASE_URI: "https://api-empw.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  async post(endpoint, body) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "post",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
  async get(endpoint) {
    return await fetch(this.BASE_URI + endpoint);
  },
  async delete(endpoint) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "delete",
    });
  },
  async put(endpoint) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "put",
    });
  },
  async patch(endpoint) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "patch",
    });
  },
};

export default {
  async signup(body) {
    return await api.post("/users/signup", body);
  },
  async verify(body) {
    return await api.post("/users/verify", body);
  },
  async contactUs(body) {
    return await api.post("/contact_us", body);
  },
  async changePassword(body) {
    return await api.patch("/users/password", body);
  },
};
