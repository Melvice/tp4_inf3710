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
	numéroplan			INTEGER			      NOT NULL,
	catégorie				VARCHAR(30)	      NOT NULL,
	fréquence			  INTEGER		        NOT NULL,
	nbrpersonnes 		INTEGER		      	NOT NULL,
	nbrcalories		  INTEGER		      	NOT NULL,
	prix			      NUMERIC(6,2)			NOT NULL,
	PRIMARY KEY (numéroplan)
);
