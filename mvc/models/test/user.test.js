const db = require("..");
const crypto = require("crypto");
const Korisnik = db.Korisnik;

describe("Korisnik model", () => {
  test("Korisnik model is defined", () => {
    expect(Korisnik).toBeDefined();
  });

  test("Can create a new Korisnik instance", async () => {
    const newKorisnik = {
      email: `${crypto.randomBytes(10).toString('hex')}@example.com`,
    };

    await Korisnik.create(newKorisnik);

    const foundKorisnik = await Korisnik.findOne({
      where: { email: newKorisnik.email },
    });

    expect(foundKorisnik.email).toEqual(newKorisnik.email);
  });
});