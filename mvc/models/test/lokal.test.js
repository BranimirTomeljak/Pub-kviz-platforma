const db = require("../../models");
const Lokal = db.Lokal;

describe("Lokal model", () => {
  test("Lokal model is defined", () => {
    expect(Lokal).toBeDefined();
  });

  test("Can create a new Lokal instance", async () => {
    const newLokal = {
      adresa: "Test Street 123",
      grad: "Test City",
      naziv: "Test Lokal",
      kapacitet: 100,
      idvlasnikalokala: 6,
    };

    await Lokal.create(newLokal);

    const foundLokal = await Lokal.findOne({
      where: { naziv: newLokal.naziv },
    });

    expect(foundLokal.adresa).toEqual(newLokal.adresa);
    expect(foundLokal.grad).toEqual(newLokal.grad);
    expect(foundLokal.naziv).toEqual(newLokal.naziv);
    expect(foundLokal.kapacitet).toEqual(newLokal.kapacitet);
    expect(foundLokal.idvlasnikalokala).toEqual(newLokal.idvlasnikalokala);
  });
});