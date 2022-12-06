/**************************************************************
	TP4_Livraison.sql
	Daniel Giao
  Guimfack Melvice Junior
**************************************************************/

DROP SCHEMA IF EXISTS livraisonKitRepas CASCADE;
CREATE SCHEMA livraisonKitRepas;

SET search_path = livraisonKitRepas;

-- Table : Fournisseur
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Fournisseur (
	numerofournisseur 	INTEGER 		 NOT NULL,
	nomfournisseur 			VARCHAR(30),
	adressefournisseur 	VARCHAR(50)  NOT NULL,
	PRIMARY KEY (numerofournisseur)
);

-- Table : PlanRepas
CREATE TABLE IF NOT EXISTS livraisonKitRepas.PlanRepas (
	numeroplan			   INTEGER			      NOT NULL,
	categorie					 VARCHAR(30)	      NOT NULL,
	frequence			     VARCHAR(30)		    NOT NULL, 
	nbrpersonnes 			 INTEGER		      	NOT NULL CHECK (nbrpersonnes > 0),
	numerofournisseur  INTEGER						NOT NULL,
	nbrcalories		     INTEGER            CHECK (nbrcalories > 0),
	prix			         NUMERIC			      CHECK (prix > 0),
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numerofournisseur) REFERENCES livraisonKitRepas.Fournisseur (numerofournisseur) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table : Client 
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Client (
	numeroClient					INTEGER			      NOT NULL,
	nomClient							VARCHAR(30)	      NOT NULL,
	prenomClient			  	VARCHAR(30)		    NOT NULL, 
	adresseCourrielClient VARCHAR(40),
	rueClient		         	VARCHAR(20),
	villeClient		    		VARCHAR(20),
	codePostalClient		  VARCHAR(10),
	PRIMARY KEY (numeroClient)
);

-- Table : Telephone 
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Telephone (
	numeroTelephone			VARCHAR(15)			      NOT NULL,
	numeroClient				INTEGER			      		NOT NULL,
	PRIMARY KEY (numeroTelephone, numeroClient),
	FOREIGN KEY (numeroClient) REFERENCES livraisonKitRepas.Client (numeroClient) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Table : Abonner
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Abonner (
	duree 					INTEGER 	NOT NULL,
	numeroplan 			INTEGER 	not NULL,
	numeroclient 		INTEGER 	NOT NULL,
	PRIMARY KEY (numeroplan, numeroclient),
	FOREIGN KEY (numeroclient) REFERENCES livraisonKitRepas.Client (numeroclient) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Planrepas(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
); 

-- Table : Kitrepas
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Kitrepas (
	numerokitrepas 		INTEGER 			NOT NULL,
	numeroplan 				INTEGER 			NOT NULL,
	description 			VARCHAR(50) 	NOT NULL,
	PRIMARY KEY (numerokitrepas),
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Planrepas(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table : Ingredient
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Ingredient (
	numeroingredient 		INTEGER 			NOT NULL,
	nomingredient 			VARCHAR(30) 	NOT NULL,
	paysingredient			VARCHAR(30),
	PRIMARY KEY (numeroingredient)
);

-- Table : Contenir
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Contenir (
	numerokitrepas 		INTEGER 			NOT NULL,
	numeroingredient  INTEGER 			NOT NULL,
	PRIMARY KEY (numerokitrepas, numeroingredient),
	FOREIGN KEY (numerokitrepas) REFERENCES livraisonKitRepas.Kitrepas(numerokitrepas) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (numeroingredient) REFERENCES livraisonKitRepas.Ingredient(numeroingredient) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Table : Etape
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Etape (
	numerokitrepas 						INTEGER 			NOT NULL,
	descriptionetape 					VARCHAR(50) 	NOT NULL,
	dureeetape 								TIME(0)				NOT NULL,
	numerokitrepasetrecompose INTEGER 			NOT NULL,
	PRIMARY KEY (numerokitrepas),
	FOREIGN KEY (numerokitrepas) REFERENCES livraisonKitRepas.Kitrepas(numerokitrepas) ON UPDATE CASCADE  ON DELETE RESTRICT
);

-- Table : Famille
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Famille (
	numeroplan 				INTEGER,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Planrepas(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table : Facile
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Facile (
	numerokitrepas 		INTEGER,
	numeroplan 				INTEGER,
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Famille(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table : Rapide
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Rapide (
	numeroplan 				INTEGER,
	tempsdepreparation TIME(0),
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Famille(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table : Végétarien
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Vegetarien (
	numeroplan 				INTEGER,
	typederepas 			VARCHAR(30),
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Planrepas(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table Péscétarien
CREATE TABLE IF NOT EXISTS livraisonKitRepas.Pescetarien (
	numeroplan 				INTEGER,
	typedepoisson			VARCHAR(30),
	PRIMARY KEY (numeroplan),
	FOREIGN KEY (numeroplan) REFERENCES livraisonKitRepas.Planrepas(numeroplan) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Table Image
CREATE TABLE livraisonKitRepas.Image (
	numeroimage 	 INTEGER,
	numerokitrepas INTEGER,
	PRIMARY KEY (numeroimage),
	FOREIGN KEY (numerokitrepas) REFERENCES livraisonKitRepas.Kitrepas(numerokitrepas) ON UPDATE CASCADE  ON DELETE RESTRICT
); 

-- Insertion des rangée

--Fournisseur START
INSERT INTO livraisonKitRepas.Fournisseur VALUES(16456, 'A&W Transport','USA');
INSERT INTO livraisonKitRepas.Fournisseur VALUES(65165, 'AB INC','CANADA');
INSERT INTO livraisonKitRepas.Fournisseur VALUES(68454, '123 HOLA','MEXICO');
--Fournisseur END

-- PlanRepas START
INSERT INTO livraisonKitRepas.PlanRepas VALUES (1,'Végétarien','Hebdomadaire',4,16456,1015,120.25);
INSERT INTO livraisonKitRepas.PlanRepas VALUES (2, 'Famille','Mensuel', 5,65165,950,145.99);
INSERT INTO livraisonKitRepas.PlanRepas VALUES (3, 'Pescétarien','Hebdomadaire',3,68454,870,109.50);
-- PlanRepas END

-- Client START
INSERT INTO livraisonKitRepas.Client VALUES (1,'Dupuis','Dan','DupuisDan@gmail.com','Lafontaine', 'Montreal', 'H6f 4t9');
INSERT INTO livraisonKitRepas.Client VALUES (2,'Fre','Luc','Luc@gmail.com','St-Laurent', 'Montreal', 'H6t 4z3');
INSERT INTO livraisonKitRepas.Client VALUES (3,'Mad','Jessy','Mad@gmail.com','Decelle', 'Laval', 'H3k 3t9');
-- Client END

-- Telephone START
INSERT INTO livraisonKitRepas.Telephone VALUES ('438011122', 1);
INSERT INTO livraisonKitRepas.Telephone VALUES ('514083444', 2);
INSERT INTO livraisonKitRepas.Telephone VALUES ('564505666', 3);
-- Telephone END

-- Abonner START
INSERT INTO livraisonKitRepas.Abonner VALUES(125, 1,1);
INSERT INTO livraisonKitRepas.Abonner VALUES(92, 2,2);
INSERT INTO livraisonKitRepas.Abonner VALUES(45, 3,3);
-- Abonner END

-- KitRepas START
INSERT INTO livraisonKitRepas.KitRepas VALUES (1, 1, 'salade végétarienne');
INSERT INTO livraisonKitRepas.KitRepas VALUES (2, 2, 'Happy meals format famille');
INSERT INTO livraisonKitRepas.KitRepas VALUES (3, 3, 'Saumon fumée');
-- KitRepas END

-- Ingredient START
INSERT INTO livraisonKitRepas.Ingredient VALUES (1, 'poivron', 'USA');
INSERT INTO livraisonKitRepas.Ingredient VALUES (2, 'salade', 'ITALY');
INSERT INTO livraisonKitRepas.Ingredient VALUES (3, 'tomate', 'MEXICO');
-- Ingredient END

-- Contenir START
INSERT INTO livraisonKitRepas.Contenir VALUES (1, 1);
INSERT INTO livraisonKitRepas.Contenir VALUES (2, 2);
INSERT INTO livraisonKitRepas.Contenir VALUES (3, 3);
-- Contenir END

-- Etape START
INSERT INTO livraisonKitRepas.Etape VALUES (1, 'Mettre le poivron dans la poele', '00:01:45',1);
INSERT INTO livraisonKitRepas.Etape VALUES (2, 'Mettre la salade dans la poele','00:01:30',2);
INSERT INTO livraisonKitRepas.Etape VALUES (3, 'Mettre la tomate dans la poele', '00:01:00',3);
-- Etape END

-- Famille START
INSERT INTO livraisonKitRepas.Famille VALUES (1);
INSERT INTO livraisonKitRepas.Famille VALUES (2);
INSERT INTO livraisonKitRepas.Famille VALUES (3);
-- Famille END

-- Facile START
INSERT INTO livraisonKitRepas.Facile VALUES (1, 1);
INSERT INTO livraisonKitRepas.Facile VALUES (2, 2);
INSERT INTO livraisonKitRepas.Facile VALUES (3, 3);
-- Facile END

-- Rapide START
INSERT INTO livraisonKitRepas.Rapide VALUES (1, '00:30:45');
INSERT INTO livraisonKitRepas.Rapide VALUES (2, '00:45:45');
INSERT INTO livraisonKitRepas.Rapide VALUES (3, '01:00:45');
-- Rapide END

-- Vegetarien START
INSERT INTO livraisonKitRepas.Vegetarien VALUES (1,'salade');
INSERT INTO livraisonKitRepas.Vegetarien VALUES (2,'salade de fruits');
INSERT INTO livraisonKitRepas.Vegetarien VALUES (3,'salade style italien');
-- Vegetarien END

-- Pescetarien START
INSERT INTO livraisonKitRepas.Pescetarien VALUES (1,'saumon');
INSERT INTO livraisonKitRepas.Pescetarien VALUES (2,'truite');
INSERT INTO livraisonKitRepas.Pescetarien VALUES (3,'Omble chevalier');
-- Pescetarien END

-- Image START
INSERT INTO livraisonKitRepas.Image VALUES (1,1);
INSERT INTO livraisonKitRepas.Image VALUES (2,2);
INSERT INTO livraisonKitRepas.Image VALUES (3,3);
-- Image END
