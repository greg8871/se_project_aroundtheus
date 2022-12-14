class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
export default Section;
