/**************************************************************
	requetes.sql
	Daniel Giao
  Guimfack Melvice Junior
**************************************************************/

--4.1: 
SELECT numéroclient, nomclient FROM Client  WHERE numéroclient 
IN (SELECT numéroclient FROM Abonner WHERE numéroplan IN ( SELECT numéroplan FROM Planrepas WHERE prix BETWEEN 20 AND 40 )). 

--4.2
SELECT numéroplan FROM Planrepas  WHERE numérofournisseur 
IN ( SELECT  numérofournisseur FROM Fournisseur WHERE numérofournisseur < >  ‘ QC Transport’ ) 

--4.3
SELECT numéroplan FROM Famille WHERE numéroplan 
IN ( SELECT numéroplan FROM PlanRepas Where catégorie = ‘cétogène’ )

--4.4
SELECT COUNT(DISTINCT numérofournisseur) FROM Fournisseur WHERE nomfournisseur IS NULL;

--4.5
SELECT f1.nomfournisseur FROM Fournisseur f1, Fournisseur f2 
WHERE f1.numérofournisseur IN (SELECT numérofournisseur FROM Planrepas 
          GROUP BY (numérofournisseur)  HAVING SUM(prix) > 
          (SELECT SUM(prix) FROM Planrepas p1  
          WHERE p1.numérofournisseur = f2.numérofournisseur 
          AND f2.nomfournisseur = 'A&W Transport'))

--4.6
SELECT f.nomfournisseur, f.adressefournisseur , SUM (prix) AS prix_total 
FROM Fournisseur f, Planrepas p WHERE f.numérofournisseur = p.numérofournisseur  
GROUP BY nomfournisseur, adressefournisseur  ORDER BY prix_total DESC LIMIT 2;

--4.7 
SELECT COUNT (numérokitrepas) FROM Kitrepas WHERE NOT IN  
 (SELECT k.numéroKitrepas  FROM Kitrepas k , PLanrepas p, Fournisseur f
 WHERE k.numéroplan = p.numéroplan AND 
p.numérofournisseur = f.numérofournisseur )

--4.8
SELECT numéroclient, nomclient,  prénomclient 
FROM Client , Fournisseur   WHERE prénomclient 
NOT LIKE ‘[aeuioAEUIO]%’ AND villeclient = adressefournisseur 
AND nomfournisseur = ‘Benjamin’ ORDER by nomclient ASC

--4.9
SELECT paysingrédient , COUNT (numéroingredient) as nombreingredient 
FROM Ingredient WHERE paysingrédient NOT LIKE  ‘%g__’  
GROUP BY paysingrédient ORDER BY paysingrédient DESC;

--4.10
CREATE OR REPLACE VIEW V_fournisseur AS  SELECT 
    p.categorie AS V_catégorie,
    f.adressefournisseur AS V_adresse,
    SUM(p.prix) AS V_tot FROM
    Fournisseur f, Planrepas p WHERE
    f.numerofournisseur = p.numerofournisseur AND
    p.categorie LIKE '%e%' AND
    p.categorie LIKE '%o__'
GROUP BY
    f.numerofournisseur, p.categorie 
    HAVING SUM(p.prix) > 12500 
    ORDER BY p.categorie ASC , V_tot DESC;

