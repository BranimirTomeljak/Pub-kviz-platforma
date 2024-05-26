const db = require("..");
const Kviz = db.Kviz;

describe("Kviz model", () => {
  test("Kviz model is defined", () => {
    expect(Kviz).toBeDefined();
  });

  test("Can create a new Kviz instance", async () => {
    const newKviz = {
      naziv: "Test Kviz",
      opis: "This is a test kviz",
      maxbrojtimova: 5,
      maxvelicinatima: 4,
      datum: new Date(),
      trajanje: 60,
      brojkrugova: 3,
      status: 1,
    };

    await Kviz.create(newKviz);

    const foundKviz = await Kviz.findOne({
      where: { naziv: newKviz.naziv },
    });

    expect(foundKviz.naziv).toEqual(newKviz.naziv);
    expect(foundKviz.opis).toEqual(newKviz.opis);
    expect(foundKviz.maxbrojtimova).toEqual(newKviz.maxbrojtimova);
    expect(foundKviz.maxvelicinatima).toEqual(newKviz.maxvelicinatima);
    expect(foundKviz.trajanje).toEqual(newKviz.trajanje);
    expect(foundKviz.brojkrugova).toEqual(newKviz.brojkrugova);
    expect(foundKviz.status).toEqual(newKviz.status);
  });
});