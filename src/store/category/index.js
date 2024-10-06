import StoreModule from "../module";

class CategoryState extends StoreModule {
  initState() {
    return {
      categories: []
    }

  }

  async getCategoryList() {
    const response = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    const json = await response.json()

    this.setState({
      ...this.getState(),
      categories: json.result.items
    })
  }


}

export default CategoryState
