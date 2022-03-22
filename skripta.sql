SET IDENTITY_INSERT	[Ordinacija] ON;
INSERT INTO [Ordinacija] (ID,Naziv,Adresa)
VALUES
(1,'Dental studio','Kralja Petra 6'),
(2,'Osmeh','Bulevar oslobodjenja 22')
SET IDENTITY_INSERT [Ordinacija] OFF;

SET IDENTITY_INSERT	[Zubar] ON;
INSERT INTO [Zubar] (ID,Ime,Prezime,Godine,OrdinacijaID)
VALUES
(1,'Ivan','Stanković',31,1),
(2,'Sanja','Kovacević',51,1),
(3,'Miodrag','Ilić',47,1),
(4,'Saša','Perić',42,2),
(5,'Ivana','Savić',36,2),
(6,'Milica','Pešić',29,2)
SET IDENTITY_INSERT [Zubar] OFF;

SET IDENTITY_INSERT	[Usluga] ON;
INSERT INTO [Usluga] (ID,Tip,Cena)
VALUES
(1,'Stomatološki pregled',2000),
(2,'Rutinsko vađenje zuba',2500),
(3,'Hirurško vadjenje zuba',6000),
(4,'Komplikovano hirurško vađenje',10000),
(5,'Preprotetska korekcija tkiva',3000),
(6,'Operacija viličnih cista',12000),
(7,'Peskiranje zuba',3000),
(8,'Izbeljivanje zuba',15000),
(9,'Lečenje zuba',3000),
(10,'Uklanjanje kamenca na zubima',2500)
SET IDENTITY_INSERT [Usluga] OFF;

SET IDENTITY_INSERT	[Spoj] ON;
INSERT INTO [Spoj] (ID,UslugaID,ZubarID)
VALUES
(1,7,1),
(2,8,1),
(3,10,1),
(4,1,2),
(5,2,2),
(6,3,2),
(7,4,2),
(8,6,2),
(9,1,3),
(10,9,3),
(11,2,3),
(12,5,3),
(13,3,4),
(14,4,4),
(15,6,4),
(16,1,5),
(17,2,5),
(18,9,5),
(19,8,6),
(20,10,6)
SET IDENTITY_INSERT [Spoj] OFF;

SET IDENTITY_INSERT	[Termin] ON;
INSERT INTO [Termin] (ID,Vreme)
VALUES
(1,'2022-03-23 08:00:00.8940000'),
(2,'2022-03-23 09:00:00.8940000'),
(3,'2022-03-23 10:00:00.8940000'),
(4,'2022-03-23 11:00:00.8940000'),
(5,'2022-03-23 12:00:00.8940000'),
(6,'2022-03-23 13:00:00.8940000'),
(7,'2022-03-23 14:00:00.8940000'),
(8,'2022-03-23 15:00:00.8940000'),
(9,'2022-03-24 08:00:00.8940000'),
(10,'2022-03-24 09:00:00.8940000'),
(11,'2022-03-24 10:00:00.8940000'),
(12,'2022-03-24 11:00:00.8940000'),
(13,'2022-03-24 12:00:00.8940000'),
(14,'2022-03-24 13:00:00.8940000'),
(15,'2022-03-24 14:00:00.8940000'),
(16,'2022-03-24 15:00:00.8940000'),
(17,'2022-03-25 08:00:00.8940000'),
(18,'2022-03-25 09:00:00.8940000'),
(19,'2022-03-25 10:00:00.8940000'),
(20,'2022-03-25 11:00:00.8940000'),
(21,'2022-03-25 12:00:00.8940000'),
(22,'2022-03-25 13:00:00.8940000'),
(23,'2022-03-25 14:00:00.8940000'),
(24,'2022-03-25 15:00:00.8940000')
SET IDENTITY_INSERT [Termin] OFF;

