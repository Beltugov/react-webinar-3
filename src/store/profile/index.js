import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      profile: null
    }
  }

  setProfile (profile = {}) {
    this.setState({
      ...this.getState(),
      profile: profile
    })
  }
}

export default ProfileState
