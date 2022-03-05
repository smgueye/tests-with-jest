export default class Model {

  constructor(options) {
    const data = options.data || [];
    delete options.data;

    this.$collection = [];
    this.$options = Object.assign({ pk: 'id' }, options);


    if (data.length) this.record(data);
  }

  all() {
    return this.$collection.map(entry => Object.assign({}, entry));
  }

  record(data) {
    const pk = this.$options.pk;
    const mappedData = data.map(entry => ({
      ...entry,
      [pk]: entry[pk] || Date.now()
    }))
    this.$collection.push(...mappedData)
  }

  find(key) {
    const entry = this.$collection.find(entry => entry[this.$options.pk] === key);
    return entry
      ? Object.assign({}, entry)
      : null;
  }

  update(key, data) {
    const index = this.$collection.findIndex(entry => entry[this.$options.pk] === key);

    if (index < 0) return false;

    this.$collection.splice(index, 1, Object.assign(this.$collection[index], data));
  }
}
