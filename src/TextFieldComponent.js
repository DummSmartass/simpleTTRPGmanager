class TextFieldComponent {
  constructor(labelText) {
    this.labelText = labelText;
    this.element = this.createTextField();
  }

  createTextField() {
    const container = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = this.labelText + ': ';
    const input = document.createElement('input');
    input.type = 'text';
    container.appendChild(label);
    container.appendChild(input);
    return container;
  }
}
