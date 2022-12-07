class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  renderItems(items) {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
export default Section;
