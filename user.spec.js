import User from "./user";

describe('User', () => {
  test('name should return full name', () => {
    const user = new User({ name: "Seydina Mouhamed Gueye", email: "smg@smgueye.io" });
    expect(user.info).toBe("Seydina Mouhamed Gueye")
  })

  /*const result = {
    value: new Date()
  }
  expect(result).toEqual({
    value: expect.any(Number)
  })*/
})