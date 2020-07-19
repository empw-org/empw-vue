const api = {
  BASE_URI: "https://api-empw.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  async post(endpoint: string, body: any) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "post",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
  async get(endpoint: string) {
    return await fetch(this.BASE_URI + endpoint);
  },
  async delete(endpoint: string) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "delete",
    });
  },
  async put(endpoint: string, body: any) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "put",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
  async patch(endpoint: string, body: any) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "patch",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
};

export default {
  async signup(body: any) {
    return await api.post("/users/signup", body);
  },
  async verify(body: any) {
    return await api.post("/users/verify", body);
  },
  async contactUs(body: any) {
    return await api.post("/contact_us", body);
  },
  async changePassword(body: any) {
    return await api.patch("/users/password", body);
  },
};