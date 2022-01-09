export default class Section {
  constructor({renderer}, containerSelector) {

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    const card = this._renderer(element);
    this._container.append(card);
  }

  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }
}
