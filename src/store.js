const store = {
  state: {
    menuSelect:''
  },
  setMenuSelectAction (newValue) {
    // eslint-disable-next-line no-console
    console.log(newValue)
    this.state.menuSelect = newValue
    localStorage.setItem("menuSelect",this.state.menuSelect)
  },
  getMenuSelectAction () {
    const temp = localStorage.getItem("menuSelect")
    if(temp === null || temp == undefined){
      this.state.menuSelect = ''
      return this.state.menuSelect;
    }

    this.state.menuSelect = temp
    return this.state.menuSelect
  },
  clearMenuSelectAction () {
    localStorage.removeItem("menuSelect")
    this.state.menuSelect = ''
  }
}

export default store;