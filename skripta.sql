

SET IDENTITY_INSERT	[Usluga] ON;
INSERT INTO [Usluga] (ID,Tip)
VALUES
(1,'Stomatološki pregled'),
(2,'Rutinsko vađenje zuba'),
(3,'Hiruško vadjenje zuba'),
(4,'Komplikovano hiruško vađenje'),
(5,'Preprotetska korekcija tkiva'),
(6,'Operacija viličnih cista'),
(7,'Peskiranje zuba'),
(8,'Izbeljivanje zuba'),
(9,'Lečenje zuba'),
(10,'Uklanjanje kamenca na zubima')
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

