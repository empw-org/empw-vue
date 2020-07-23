const api = {
  BASE_URI: "https://api-empw.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
  async post(endpoint: string, body: any) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
  async get(endpoint: string) {
    return await fetch(this.BASE_URI + endpoint);
  },
  async delete(endpoint: string) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "DELETE",
    });
  },
  async put(endpoint: string, body: any) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
  async patch(endpoint: string, body: any) {
    return await fetch(this.BASE_URI + endpoint, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  },
};

export default {
  users: {
    async login(body: any) {
      return await api.post("/users/login", body);
    },
    async signup(body: any) {
      return await api.post("/users/signup", body);
    },
    async verify(body: any) {
      return await api.patch("/users/verify", body);
    },
    async changePassword(body: any) {
      return await api.patch("/users/password", body);
    },
    async resetPassword(body: any) {
      return await api.post("/users/reset-password", body);
    },
  },
  companies: {
    async login(body: any) {
      return await api.post("/companies/login", body);
    },
    async signup(body: any) {
      return await api.post("/companies/signup", body);
    },
  },
  async contactUs(body: any) {
    return await api.post("/contact_us", body);
  },
};
