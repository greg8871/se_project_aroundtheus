class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._itmes.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.apppend(element);
  }
}
export default Section;
