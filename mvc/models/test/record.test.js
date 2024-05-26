const db = require("..");
const Zapis = db.Zapis;

describe("Zapis model", () => {
  test("Zapis model is defined", () => {
    expect(Zapis).toBeDefined();
  });

  test("Can create a new Zapis instance", async () => {
    const newZapis = {
      rednibrojkruga: Math.floor(Math.random() * 1000) + 1,
      brojbodova: 10,
      idtima: 1,
    };

    await Zapis.create(newZapis);

    const foundZapis = await Zapis.findOne({
      where: { idtima: newZapis.idtima, rednibrojkruga: newZapis.rednibrojkruga },
    });

    expect(foundZapis.rednibrojkruga).toEqual(newZapis.rednibrojkruga);
    expect(foundZapis.brojbodova).toEqual(newZapis.brojbodova);
    expect(foundZapis.idtima).toEqual(newZapis.idtima);
  });
});