export default class Model {

  constructor(data = []) {
    this.$collection = [];

    if (data.length)
      this.record(data);
  }

  all() {
    return this.$collection.map(entry => Object.assign({}, entry));
  }

  record(data) {
    const pk = 'id';
    const mappedData = data.map(entry => ({
      ...entry,
      [pk]: entry[pk] || Date.now()
    }))
    this.$collection.push(...mappedData)
  }

  find(key) {
    const pk = 'id';
    const entry = this.$collection.find(entry => entry[pk] === key);
    return entry
      ? Object.assign({}, entry)
      : null;
  }

  update(key, data) {
    const pk = 'id';
    const index = this.$collection.findIndex(entry => entry[pk] === key);

    if (index < 0) return false;

    this.$collection.splice(index, 1, Object.assign(this.$collection[index], data));
  }
}
