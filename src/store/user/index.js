import StoreModule from "../module";

class UserState extends StoreModule {
  initState() {
    const token = localStorage.getItem("Token")
    if (token !== null) this.check()
    return {
      data: null,
      error: null
    }
  }

  async login(login, password) {
    try {
      const response = await fetch('api/v1/users/sign', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          "login": login,
          "password": password
        })
      })

      const json = await response.json()

      if (!json.error) {
        localStorage.setItem("Token", json.result.token)
        this.setState({
          ...this.getState(),
          data: json.result.user,
          error: null
        })
      } else {
        this.setState({
          ...this.getState(),
          data: null,
          error: json.error
        })
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        data: null
      })
    }
  }

  async check() {
    try {
      const token = localStorage.getItem("Token")
      const response = await fetch('api/v1/users/self?fields=*', {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-type": "application/json"
        },
      })
      const json = await response.json()

      if (!json.error) this.setState({
        ...this.getState(),
        data: json.result
      })
    } catch (e) {
      this.setState({
        ...this.getState(),
        data: null
      })
    }
  }

  async logout() {
    try {
      const token = localStorage.getItem("Token")
      await fetch("api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "X-Token": token
        },
      })
    } catch (e) {
      console.log(e)
    } finally {
      localStorage.removeItem("Token")
      this.setState({
        ...this.getState(),
        data: null
      })
    }
  }
}

export default UserState
