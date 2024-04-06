const sql_create_korisnik = `CREATE TABLE Korisnik
(
  id INT NOT NULL,
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
  id INT NOT NULL,
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
  id INT NOT NULL,
  naziv VARCHAR NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (naziv)
);`;

const sql_create_lokal = `CREATE TABLE Lokal
(
  id INT NOT NULL,
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
  id INT NOT NULL,
  naziv VARCHAR NOT NULL,
  maxBrojTimova INT NOT NULL,
  maxVelicinaTima INT NOT NULL,
  datum DATE NOT NULL,
  trajanje INT NOT NULL,
  brojKrugova INT NOT NULL,
  status INT NOT NULL,
  idOrganizatora INT NOT NULL,
  idLokala INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idOrganizatora) REFERENCES Organizator(id),
  FOREIGN KEY (idLokala) REFERENCES Lokal(id)
);`;

const sql_create_tim = `CREATE TABLE Tim
(
  id INT NOT NULL,
  naziv VARCHAR NOT NULL,
  PRIMARY KEY (id)
);`;

const sql_create_zapis = `CREATE TABLE Zapis
(
  id INT NOT NULL,
  redniBrojKruga INT NOT NULL,
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

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

const sql_insert_korisnik = `INSERT INTO Korisnik (id, email)
VALUES
  (1, 'user1@example.com'),
  (2, 'user2@example.com'),
  (3, 'user3@example.com'),
  (4, 'user4@example.com'),
  (5, 'user5@example.com'),
  (6, 'user6@example.com'),
  (7, 'user7@example.com'),
  (8, 'user8@example.com'),
  (9, 'user9@example.com'),
  (10, 'user10@example.com'),
  (11, 'user11@example.com'),
  (12, 'user12@example.com'),
  (13, 'user13@example.com'),
  (14, 'user14@example.com'),
  (15, 'user15@example.com');
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

const sql_insert_liga = `INSERT INTO Liga (id, naziv, status, pocetniDatum, krajnjiDatum, idOrganizatora)
VALUES
  (1, 'Liga A', 1, '2024-04-01', '2024-06-30', 11),
  (2, 'Liga B', 1, '2024-05-01', '2024-07-31', 12),
  (3, 'Liga C', 1, '2024-06-01', '2024-08-31', 13),
  (4, 'Liga D', 1, '2024-07-01', '2024-09-30', 14),
  (5, 'Liga E', 1, '2024-08-01', '2024-10-31', 15);
`;

const sql_insert_kategorija = `INSERT INTO Kategorija (id, naziv)
VALUES
  (1, 'Sports'),
  (2, 'Science'),
  (3, 'History'),
  (4, 'Art'),
  (5, 'Music');
`;

const sql_insert_lokal = `INSERT INTO Lokal (id, adresa, grad, naziv, kapacitet, idVlasnikaLokala)
VALUES
  (1, 'Main Street 123', 'Zagreb', 'Trivia Bar', 50, 6),
  (2, 'Square Avenue 456', 'Split', 'Quiz Cafe', 30, 7),
  (3, 'Park Road 789', 'Rijeka', 'Brainy Pub', 40, 8),
  (4, 'Beach Boulevard 101', 'Zadar', 'Quizzical Lounge', 60, 9),
  (5, 'River Lane 202', 'Osijek', 'Intellectual Inn', 35, 10);
`;

const sql_insert_kviz = `INSERT INTO Kviz (id, naziv, maxBrojTimova, maxVelicinaTima, datum, trajanje, brojKrugova, status, idOrganizatora, idLokala)
VALUES
  (1, 'Trivia Night', 10, 6, '2024-04-15', 120, 5, 1, 11, 1),
  (2, 'Brain Teasers', 8, 4, '2024-05-10', 90, 4, 1, 12, 2),
  (3, 'Music Mania', 12, 5, '2024-06-20', 150, 6, 1, 13, 3),
  (4, 'History Buffs', 6, 3, '2024-07-05', 75, 3, 1, 14, 4),
  (5, 'Art Enthusiasts', 10, 5, '2024-08-12', 100, 4, 1, 15, 5);
`;

const sql_insert_tim = `INSERT INTO Tim (id, naziv)
VALUES
  (1, 'Team Alpha'),
  (2, 'Quizmasters'),
  (3, 'Brainiacs'),
  (4, 'Trivia Titans'),
  (5, 'Knowledge Knights');
`;

const sql_insert_zapis = `INSERT INTO Zapis (id, redniBrojKruga, idTima)
VALUES
  (1, 1, 1),
  (2, 1, 2),
  (3, 1, 3),
  (4, 1, 4),
  (5, 1, 5);
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
  (5, 5);
`;

const sql_insert_pregledava = `INSERT INTO pregledava (idNatjecatelja, idZapisa)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);
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
];

module.exports = {
  table_names: table_names,
  tables: tables,
  table_data: table_data,
};
