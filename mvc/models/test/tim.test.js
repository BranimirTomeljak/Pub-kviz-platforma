const db = require("../../models");
const crypto = require("crypto");
const Tim = db.Tim;

describe("Tim model", () => {
  test("Tim model is defined", () => {
    expect(Tim).toBeDefined();
  });

  test("Can create a new Tim instance", async () => {
    const newTim = {
      naziv: `${crypto.randomBytes(10).toString('hex')}`,
    };

    await Tim.create(newTim);

    const foundTim = await Tim.findOne({
      where: { naziv: newTim.naziv },
    });

    expect(foundTim.naziv).toEqual(newTim.naziv);
  });
});