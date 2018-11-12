// file.entity.

class File {
  constructor({ data, name, type }) {
    this.data = data;
    this.name = name;
    this.type = type;
  }

  trace() {
    return `{ name: ${this.name}, type: ${JSON.stringify(this.type)}, length: ${this.data.length / 1000} KBytes }`;
  }
}

module.exports = File;
