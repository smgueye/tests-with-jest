import Model from './model';


// Helper to not update all code.
function createModel(data = [], options = {}) {
  return new Model({ ...options, data })
}

test("new works", () => {
  expect(createModel()).toBeInstanceOf(Model);
});


test("model structure", () => {
  expect(createModel()).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    $options: expect.objectContaining({
      pk: 'id'
    }),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
  }));
});

describe("Customization", () => {
  test("We can customize primary Key", () => {
    const model = createModel([], {
      pk: 'id'
    });
    expect(model.$options.pk).toBe('id');
  });
})

describe("record", () => {
  const heroes = [{ id: 1, name: "Ali Ibn Abi Talib" }, { name: "Khalid Ibn Walid" }]

  test("Can add data to the collection", () => {
    const model = createModel();
    model.record(heroes);
    expect(model.$collection).toEqual([
      heroes[0],
      {
        id: expect.any(Number),
        name: heroes[1].name
      }
    ]);
  });

  test("Gets called when data is passed to model", () => {
    const spy = jest.spyOn(Model.prototype, 'record');
    const model = createModel(heroes);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  })
})

describe("all", () => {
  const heroes = [{ name: "Ali Ibn Abi Talib" }, { name: "Khalid Ibn Walid" }]

  test("Returns empty data model", () => {
    const model = createModel([]);
    expect(model.all()).toEqual([]);
  });

  test("Return data model", () => {
    const model = createModel(heroes);
    expect(model.all().length).toBe(2);
  });

  test("Original data stays intact", () => {
    const model = createModel(heroes);
    const data = model.all();
    expect(data[0].name).toBe("Ali Ibn Abi Talib");
    expect(data[1].name).toBe("Khalid Ibn Walid");
  })
});

describe("find", () => {
  const heroes = [{ id: 1, name: "Ali Ibn Abi Talib" }, { id: 2, name: "Khalid Ibn Walid" }];

  test("Returns NULL if not find", () => {
    const model = createModel(heroes);
    expect(model.find(10)).toBe(null);
  });

  test("Returns a matching entry", () => {
    const model = createModel(heroes);
    expect(model.find(1)).toEqual(heroes[0]);
  })
})


describe("update", () => {
  const indicators = [
    { id: 1, name: "Nombre d'organisation de la societe civil (OSC) recevant une aide du gouvernement des etats-unis." },
    { id: 2, name: "Nombre de requete de service générées par les citoyens par le biais de la plateforme SEN-BRIDGE" }
  ]

  let model;

  beforeEach(() => {
    model = createModel(indicators);
  });

  test("An entry by id", () => {
    model.update(1, { name: "Nombre d'organisations de la societe civil (OSC) recevant une aide du gouvernement des etats-unis." });
    expect(model.find(1).name).toBe("Nombre d'organisations de la societe civil (OSC) recevant une aide du gouvernement des etats-unis.")
  });

  test("Extend and entry by id", () => {
    model.update(1, { year: 2017 })
    expect(model.find(1)).toEqual(expect.objectContaining({
      id: 1,
      name: indicators[0].name,
      year: 2017
    }));
  });

  test("Return false if no entry matches", () => {
    expect(model.update(10, { name: "N/A" })).toBe(false);
  })
})