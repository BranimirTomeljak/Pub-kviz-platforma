const db = require("../../models");
const crypto = require("crypto");
const Korisnik = db.Korisnik;
const Organizator = db.Organizator;

describe("Organizator model", () => {
  test("Organizator model is defined", () => {
    expect(Organizator).toBeDefined();
  });

  test("Can create a new Organizator instance", async () => {
    const newKorisnik = {
      email: `${crypto.randomBytes(10).toString('hex')}@example.com`,
    };

    const korisnik = await Korisnik.create(newKorisnik);

    const newOrganizator = {
      id: korisnik.id,
    };

    await Organizator.create(newOrganizator);

    const foundOrganizator = await Organizator.findOne({
      where: { id: newOrganizator.id },
    });

    expect(foundOrganizator.id).toEqual(newOrganizator.id);
  });
});