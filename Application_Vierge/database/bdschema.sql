/**************************************************************
	bdschema.sql
	Daniel Giao
  Guimfack Melvice Junior
**************************************************************/

DROP SCHEMA IF EXISTS kitRepas CASCADE;
CREATE SCHEMA kitRepas;

SET search_path = kitRepas;

-- Table : PlanRepas
CREATE TABLE IF NOT EXISTS kitRepas.PlanRepas (
	numeroplan			INTEGER			      NOT NULL,
	categorie				VARCHAR(30)	      NOT NULL,
	fréquence			  INTEGER		        NOT NULL,
	nbrpersonnes 		INTEGER		      	NOT NULL,
	nbrcalories		  INTEGER		      	NOT NULL,
	prix			      NUMERIC(6,3)			NOT NULL,
	PRIMARY KEY (numeroplan)
);
