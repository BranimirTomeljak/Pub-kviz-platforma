const sql_create_korisnik = `CREATE TABLE Korisnik
(
  id SERIAL,
  email VARCHAR NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (email)
);`;

const sql_create_natjecatelj = `CREATE TABLE Natjecatelj
(
  id INT NOT NULL,
  grad VARCHAR NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Korisnik(id)
);`;

const sql_create_vlasniklokala = `CREATE TABLE VlasnikLokala
(
  id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Korisnik(id)
);`;

const sql_create_organizator = `CREATE TABLE Organizator
(
  id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES Korisnik(id)
);`;

const sql_create_liga = `CREATE TABLE Liga
(
  id SERIAL,
  naziv VARCHAR NOT NULL,
  status INT NOT NULL,
  pocetniDatum DATE NOT NULL,
  krajnjiDatum DATE NOT NULL,
  idOrganizatora INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idOrganizatora) REFERENCES Organizator(id)
);`;

const sql_create_kategorija = `CREATE TABLE Kategorija
(
  id SERIAL,
  naziv VARCHAR NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (naziv)
);`;

const sql_create_lokal = `CREATE TABLE Lokal
(
  id SERIAL,
  adresa VARCHAR NOT NULL,
  grad VARCHAR NOT NULL,
  naziv VARCHAR NOT NULL,
  kapacitet INT NOT NULL,
  idVlasnikaLokala INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idVlasnikaLokala) REFERENCES VlasnikLokala(id)
);`;

const sql_create_kviz = `CREATE TABLE Kviz
(
  id SERIAL,
  naziv VARCHAR NOT NULL,
  opis VARCHAR NOT NULL,
  maxBrojTimova INT NOT NULL,
  maxVelicinaTima INT NOT NULL,
  datum DATE NOT NULL,
  trajanje INT NOT NULL,
  brojKrugova INT NOT NULL,
  status INT NOT NULL,
  PRIMARY KEY (id)
);`;

const sql_create_tim = `CREATE TABLE Tim
(
  id SERIAL,
  naziv VARCHAR NOT NULL,
  PRIMARY KEY (id)
);`;

const sql_create_zapis = `CREATE TABLE Zapis
(
  id SERIAL,
  redniBrojKruga INT NOT NULL,
  brojBodova INT NOT NULL,
  idTima INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idTima) REFERENCES Tim(id)
);`;

const sql_create_clan = `CREATE TABLE clan
(
  idNatjecatelja INT NOT NULL,
  idTima INT NOT NULL,
  PRIMARY KEY (idNatjecatelja, idTima),
  FOREIGN KEY (idNatjecatelja) REFERENCES Natjecatelj(id),
  FOREIGN KEY (idTima) REFERENCES Tim(id)
);`;

const sql_create_interes = `CREATE TABLE interes
(
  idNatjecatelja INT NOT NULL,
  idKategorije INT NOT NULL,
  PRIMARY KEY (idNatjecatelja, idKategorije),
  FOREIGN KEY (idNatjecatelja) REFERENCES Natjecatelj(id),
  FOREIGN KEY (idKategorije) REFERENCES Kategorija(id)
);`;

const sql_create_natjecese = `CREATE TABLE natjeceSe
(
  idTima INT NOT NULL,
  idLige INT NOT NULL,
  PRIMARY KEY (idTima, idLige),
  FOREIGN KEY (idTima) REFERENCES Tim(id),
  FOREIGN KEY (idLige) REFERENCES Liga(id)
);`;

const sql_create_kategorijakviza = `CREATE TABLE kategorijaKviza
(
  idKategorije INT NOT NULL,
  idKviza INT NOT NULL,
  PRIMARY KEY (idKategorije, idKviza),
  FOREIGN KEY (idKategorije) REFERENCES Kategorija(id),
  FOREIGN KEY (idKviza) REFERENCES Kviz(id)
);`;

const sql_create_pripada = `CREATE TABLE pripada
(
  idZapisa INT NOT NULL,
  idKviza INT NOT NULL,
  PRIMARY KEY (idZapisa, idKviza),
  FOREIGN KEY (idZapisa) REFERENCES Zapis(id),
  FOREIGN KEY (idKviza) REFERENCES Kviz(id)
);`;

const sql_create_pregledava = `CREATE TABLE pregledava
(
  idNatjecatelja INT NOT NULL,
  idZapisa INT NOT NULL,
  PRIMARY KEY (idNatjecatelja, idZapisa),
  FOREIGN KEY (idNatjecatelja) REFERENCES Natjecatelj(id),
  FOREIGN KEY (idZapisa) REFERENCES Zapis(id)
);`;

const sql_create_odrzavanjeKviza = `CREATE TABLE odrzavanjeKviza
(
  idKviza INT NOT NULL,
  idOrganizatora INT NOT NULL,
  idLokala INT NOT NULL,
  PRIMARY KEY (idKviza, idOrganizatora, idLokala),
  FOREIGN KEY (idKviza) REFERENCES Kviz(id),
  FOREIGN KEY (idOrganizatora) REFERENCES Organizator(id),
  FOREIGN KEY (idLokala) REFERENCES Lokal(id)
);`;

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

const sql_insert_korisnik = `INSERT INTO Korisnik (email)
VALUES
  ('user1@example.com'),
  ('user2@example.com'),
  ('user3@example.com'),
  ('user4@example.com'),
  ('user5@example.com'),
  ('user6@example.com'),
  ('user7@example.com'),
  ('user8@example.com'),
  ('user9@example.com'),
  ('user10@example.com'),
  ('user11@example.com'),
  ('user12@example.com'),
  ('user13@example.com'),
  ('user14@example.com'),
  ('user15@example.com');
`;

const sql_insert_natjecatelj = `INSERT INTO Natjecatelj (id, grad)
VALUES
  (1, 'Zagreb'),
  (2, 'Split'),
  (3, 'Rijeka'),
  (4, 'Osijek'),
  (5, 'Zadar');
`;

const sql_insert_vlasniklokala = `INSERT INTO VlasnikLokala (id)
VALUES
  (6),
  (7),
  (8),
  (9),
  (10);
`;

const sql_insert_organizator = `INSERT INTO Organizator (id)
VALUES
  (11),
  (12),
  (13),
  (14),
  (15);
`;

const sql_insert_liga = `INSERT INTO Liga (naziv, status, pocetniDatum, krajnjiDatum, idOrganizatora)
VALUES
  ('Liga A', 1, '2024-04-01', '2024-06-30', 11),
  ('Liga B', 1, '2024-05-01', '2024-07-31', 12),
  ('Liga C', 1, '2024-06-01', '2024-08-31', 13),
  ('Liga D', 1, '2024-07-01', '2024-09-30', 14),
  ('Liga E', 1, '2024-08-01', '2024-10-31', 15);
`;

const sql_insert_kategorija = `INSERT INTO Kategorija (naziv)
VALUES
  ('Sports'),
  ('Science'),
  ('History'),
  ('Art'),
  ('Music');
`;

const sql_insert_lokal = `INSERT INTO Lokal (adresa, grad, naziv, kapacitet, idVlasnikaLokala)
VALUES
  ('Main Street 123', 'Zagreb', 'Trivia Bar', 50, 6),
  ('Square Avenue 456', 'Split', 'Quiz Cafe', 30, 7),
  ('Park Road 789', 'Rijeka', 'Brainy Pub', 40, 8),
  ('Beach Boulevard 101', 'Zadar', 'Quizzical Lounge', 60, 9),
  ('River Lane 202', 'Osijek', 'Intellectual Inn', 35, 10);
`;

const sql_insert_kviz = `INSERT INTO Kviz (naziv, opis, maxBrojTimova, maxVelicinaTima, datum, trajanje, brojKrugova, status)
VALUES
  ('Trivia Night', 'blabla opis 1', 10, 6, '2024-04-15', 120, 5, 1),
  ('Brain Teasers', 'blabla opis 2', 8, 4, '2024-05-10', 90, 4, 1),
  ('Music Mania', 'blabla opis 3', 12, 5, '2024-06-20', 150, 6, 1),
  ('History Buffs', 'blabla opis 4', 6, 3, '2024-07-05', 75, 3, 1),
  ('Art Enthusiasts', 'blabla opis 5', 10, 5, '2024-08-12', 100, 4, 1);
`;

const sql_insert_tim = `INSERT INTO Tim (naziv)
VALUES
  ('Team Alpha'),
  ('Quizmasters'),
  ('Brainiacs'),
  ('Trivia Titans'),
  ('Knowledge Knights');
`;

const sql_insert_zapis = `INSERT INTO Zapis (redniBrojKruga, brojBodova, idTima)
VALUES
  (1, 5, 1),
  (1, 6, 2),
  (1, 7, 3),
  (1, 8, 4),
  (1, 9, 5),
  (1, 5, 1);
`;

const sql_insert_clan = `INSERT INTO clan (idNatjecatelja, idTima)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);
`;

const sql_insert_interes = `INSERT INTO interes (idNatjecatelja, idKategorije)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);
`;

const sql_insert_natjecese = `INSERT INTO natjeceSe (idTima, idLige)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);
`;

const sql_insert_kategorijakviza = `INSERT INTO kategorijaKviza (idKategorije, idKviza)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);
`;

const sql_insert_pripada = `INSERT INTO pripada (idZapisa, idKviza)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 1);
`;

const sql_insert_pregledava = `INSERT INTO pregledava (idNatjecatelja, idZapisa)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);
`;

const sql_insert_odrzavanjeKviza = `INSERT INTO odrzavanjeKviza (idKviza, idOrganizatora, idLokala)
VALUES
  (1, 11, 1),
  (2, 12, 2),
  (3, 13, 3),
  (4, 14, 4),
  (5, 15, 5);
`;

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

const table_names = [
  "Korisnik",
  "Natjecatelj",
  "VlasnikLokala",
  "Organizator",
  "Liga",
  "Kategorija",
  "Lokal",
  "Kviz",
  "Tim",
  "Zapis",
  "clan",
  "interes",
  "natjeceSe",
  "kategorijaKviza",
  "pripada",
  "pregledava",
  "odrzavanjeKviza"
];

const tables = [
  sql_create_korisnik,
  sql_create_natjecatelj,
  sql_create_vlasniklokala,
  sql_create_organizator,
  sql_create_liga,
  sql_create_kategorija,
  sql_create_lokal,
  sql_create_kviz,
  sql_create_tim,
  sql_create_zapis,
  sql_create_clan,
  sql_create_interes,
  sql_create_natjecese,
  sql_create_kategorijakviza,
  sql_create_pripada,
  sql_create_pregledava,
  sql_create_odrzavanjeKviza
];

const table_data = [
  sql_insert_korisnik,
  sql_insert_natjecatelj,
  sql_insert_vlasniklokala,
  sql_insert_organizator,
  sql_insert_liga,
  sql_insert_kategorija,
  sql_insert_lokal,
  sql_insert_kviz,
  sql_insert_tim,
  sql_insert_zapis,
  sql_insert_clan,
  sql_insert_interes,
  sql_insert_natjecese,
  sql_insert_kategorijakviza,
  sql_insert_pripada,
  sql_insert_pregledava,
  sql_insert_odrzavanjeKviza
];

module.exports = {
  table_names: table_names,
  tables: tables,
  table_data: table_data,
};
