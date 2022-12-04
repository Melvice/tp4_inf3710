/**************************************************************
	bdschema.sql
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
