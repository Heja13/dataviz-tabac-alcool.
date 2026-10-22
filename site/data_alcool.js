const csvAlcoolQuotidien = `
annee,region,sexe,alcool_quotidien_taux,alcool_quotidien_ic_inf,alcool_quotidien_ic_sup,alcool_quotidien_diff_reg,region_code,cle_dupliquee
2000,Auvergne et Rhône-Alpes,Femmes,12.3,9.9,15.2,B,84,False
2000,Auvergne et Rhône-Alpes,Hommes,31.6,27.4,36.1,B,84,False
2000,Auvergne et Rhône-Alpes,Hommes et Femmes,21.7,19.2,24.4,B,84,False
2000,Bourgogne et Franche-Comté,Femmes,9.6,6.6,13.9,B,27,False
2000,Bourgogne et Franche-Comté,Hommes,27.4,22.0,33.7,B,27,False
2000,Bourgogne et Franche-Comté,Hommes et Femmes,18.3,15.1,22.0,B,27,False
2000,Bretagne,Femmes,10.1,7.2,14.1,B,53,False
2000,Bretagne,Hommes,31.8,26.1,38.2,B,53,False
2000,Bretagne,Hommes et Femmes,20.7,17.4,24.5,B,53,False
2000,Centre-Val de Loire,Femmes,11.0,7.5,16.0,B,24,False
2000,Centre-Val de Loire,Hommes,28.5,22.5,35.4,B,24,False
2000,Centre-Val de Loire,Hommes et Femmes,19.6,15.9,23.8,B,24,False
2000,Grand Est,Femmes,10.2,7.7,13.4,B,44,False
2000,Grand Est,Hommes,32.3,27.6,37.3,B,44,False
2000,Grand Est,Hommes et Femmes,21.0,18.2,24.0,B,44,False
2000,Hauts-de-France,Femmes,11.4,8.9,14.6,B,32,False
2000,Hauts-de-France,Hommes,31.3,26.8,36.2,B,32,False
2000,Hauts-de-France,Hommes et Femmes,21.1,18.5,24.1,B,32,False
2000,Normandie,Femmes,8.2,5.6,11.7,A,28,False
2000,Normandie,Hommes,23.5,18.3,29.6,A,28,False
2000,Normandie,Hommes et Femmes,15.7,12.7,19.2,A,28,False
2000,Nouvelle Aquitaine,Femmes,14.0,11.4,17.1,B,75,False
2000,Nouvelle Aquitaine,Hommes,39.3,34.5,44.3,C,75,False
2000,Nouvelle Aquitaine,Hommes et Femmes,26.4,23.5,29.5,C,75,False
2000,Occitanie,Femmes,15.6,12.4,19.3,C,76,False
2000,Occitanie,Hommes,37.6,32.6,42.9,C,76,False
2000,Occitanie,Hommes et Femmes,26.3,23.3,29.6,C,76,False
2000,Pays de la Loire,Femmes,11.9,9.0,15.7,B,52,False
2000,Pays de la Loire,Hommes,32.7,27.1,38.8,B,52,False
2000,Pays de la Loire,Hommes et Femmes,22.0,18.7,25.7,B,52,False
2000,Provence-Alpes-Côte d'Azur,Femmes,9.6,7.0,13.0,B,93,False
2000,Provence-Alpes-Côte d'Azur,Hommes,28.5,23.8,33.8,B,93,False
2000,Provence-Alpes-Côte d'Azur,Hommes et Femmes,18.8,16.1,21.9,B,93,False
2000,Île-de-France,Femmes,16.3,13.6,19.4,C,11,False
2000,Île-de-France,Hommes,28.7,24.7,33.1,B,11,False
2000,Île-de-France,Hommes et Femmes,22.4,19.9,25.0,B,11,False
2005,Auvergne et Rhône-Alpes,Femmes,7.7,6.5,9.2,B,84,False
2005,Auvergne et Rhône-Alpes,Hommes,24.0,21.5,26.7,B,84,False
2005,Auvergne et Rhône-Alpes,Hommes et Femmes,15.7,14.3,17.3,B,84,False
2005,Bourgogne et Franche-Comté,Femmes,5.8,4.2,7.9,A,27,False
2005,Bourgogne et Franche-Comté,Hommes,21.5,18.0,25.5,B,27,False
2005,Bourgogne et Franche-Comté,Hommes et Femmes,13.5,11.5,15.7,B,27,False
2005,Bretagne,Femmes,7.6,6.0,9.6,B,53,False
2005,Bretagne,Hommes,20.7,17.7,24.1,B,53,False
2005,Bretagne,Hommes et Femmes,14.1,12.3,16.0,B,53,False
2005,Centre-Val de Loire,Femmes,6.7,4.7,9.3,B,24,False
2005,Centre-Val de Loire,Hommes,21.5,17.3,26.4,B,24,False
2005,Centre-Val de Loire,Hommes et Femmes,13.9,11.5,16.7,B,24,False
2005,Grand Est,Femmes,8.1,6.4,10.1,B,44,False
2005,Grand Est,Hommes,23.2,20.0,26.6,B,44,False
2005,Grand Est,Hommes et Femmes,15.5,13.6,17.5,B,44,False
2005,Hauts-de-France,Femmes,8.2,6.6,10.2,B,32,False
2005,Hauts-de-France,Hommes,25.4,22.4,28.7,B,32,False
2005,Hauts-de-France,Hommes et Femmes,16.7,14.9,18.6,B,32,False
2005,Normandie,Femmes,5.3,3.5,7.9,A,28,False
2005,Normandie,Hommes,19.8,15.9,24.4,B,28,False
2005,Normandie,Hommes et Femmes,12.4,10.2,15.0,A,28,False
2005,Nouvelle Aquitaine,Femmes,8.7,7.2,10.5,B,75,False
2005,Nouvelle Aquitaine,Hommes,24.0,21.3,26.9,B,75,False
2005,Nouvelle Aquitaine,Hommes et Femmes,16.2,14.6,17.9,B,75,False
2005,Occitanie,Femmes,9.8,8.3,11.5,C,76,False
2005,Occitanie,Hommes,28.2,25.3,31.3,C,76,False
2005,Occitanie,Hommes et Femmes,18.8,17.1,20.6,C,76,False
2005,Pays de la Loire,Femmes,6.7,5.1,8.8,B,52,False
2005,Pays de la Loire,Hommes,22.5,19.0,26.3,B,52,False
2005,Pays de la Loire,Hommes et Femmes,14.4,12.5,16.6,B,52,False
2005,Provence-Alpes-Côte d'Azur,Femmes,10.2,8.5,12.2,C,93,False
2005,Provence-Alpes-Côte d'Azur,Hommes,20.9,18.1,23.9,B,93,False
2005,Provence-Alpes-Côte d'Azur,Hommes et Femmes,15.5,13.8,17.3,B,93,False
2005,Île-de-France,Femmes,7.7,6.4,9.2,B,11,False
2005,Île-de-France,Hommes,19.7,17.2,22.5,A,11,False
2005,Île-de-France,Hommes et Femmes,13.6,12.1,15.2,A,11,False
2010,Auvergne et Rhône-Alpes,Femmes,5.8,4.7,7.1,B,84,False
2010,Auvergne et Rhône-Alpes,Hommes,17.0,14.8,19.4,B,84,False
2010,Auvergne et Rhône-Alpes,Hommes et Femmes,11.2,10.0,12.6,B,84,False
2010,Bourgogne et Franche-Comté,Femmes,3.9,2.6,6.0,B,27,False
2010,Bourgogne et Franche-Comté,Hommes,15.6,12.5,19.4,B,27,False
2010,Bourgogne et Franche-Comté,Hommes et Femmes,9.6,7.9,11.7,B,27,False
2010,Bretagne,Femmes,5.4,4.0,7.2,B,53,False
2010,Bretagne,Hommes,17.4,14.3,20.9,B,53,False
2010,Bretagne,Hommes et Femmes,11.2,9.5,13.2,B,53,False
2010,Centre-Val de Loire,Femmes,4.2,2.6,6.8,B,24,False
2010,Centre-Val de Loire,Hommes,15.2,11.6,19.6,B,24,False
2010,Centre-Val de Loire,Hommes et Femmes,9.5,7.5,12.0,B,24,False
2010,Grand Est,Femmes,4.0,3.0,5.2,A,44,False
2010,Grand Est,Hommes,14.1,12.0,16.5,B,44,False
2010,Grand Est,Hommes et Femmes,8.9,7.7,10.2,A,44,False
2010,Hauts-de-France,Femmes,5.1,3.9,6.7,B,32,False
2010,Hauts-de-France,Hommes,17.7,15.3,20.5,B,32,False
2010,Hauts-de-France,Hommes et Femmes,11.2,9.8,12.8,B,32,False
2010,Normandie,Femmes,5.1,3.6,7.2,B,28,False
2010,Normandie,Hommes,12.6,9.9,16.0,A,28,False
2010,Normandie,Hommes et Femmes,8.8,7.2,10.7,A,28,False
2010,Nouvelle Aquitaine,Femmes,5.6,4.4,7.0,B,75,False
2010,Nouvelle Aquitaine,Hommes,19.4,16.9,22.1,C,75,False
2010,Nouvelle Aquitaine,Hommes et Femmes,12.3,10.9,13.8,C,75,False
2010,Occitanie,Femmes,8.7,7.1,10.5,C,76,False
2010,Occitanie,Hommes,21.2,18.5,24.1,C,76,False
2010,Occitanie,Hommes et Femmes,14.7,13.2,16.4,C,76,False
2010,Pays de la Loire,Femmes,5.9,4.2,8.2,B,52,False
2010,Pays de la Loire,Hommes,20.4,17.1,24.0,C,52,False
2010,Pays de la Loire,Hommes et Femmes,12.9,11.1,15.1,C,52,False
2010,Provence-Alpes-Côte d'Azur,Femmes,6.6,5.1,8.5,B,93,False
2010,Provence-Alpes-Côte d'Azur,Hommes,16.7,14.0,20.0,B,93,False
2010,Provence-Alpes-Côte d'Azur,Hommes et Femmes,11.5,9.9,13.4,B,93,False
2010,Île-de-France,Femmes,5.5,4.5,6.8,B,11,False
2010,Île-de-France,Hommes,12.9,11.1,14.9,A,11,False
2010,Île-de-France,Hommes et Femmes,9.1,8.1,10.3,A,11,False
2014,Auvergne et Rhône-Alpes,Femmes,4.9,3.5,7.0,B,84,False
2014,Auvergne et Rhône-Alpes,Hommes,12.6,10.4,15.2,B,84,False
2014,Auvergne et Rhône-Alpes,Hommes et Femmes,8.7,7.3,10.3,B,84,False
2014,Bourgogne et Franche-Comté,Femmes,4.9,3.0,8.1,B,27,False
2014,Bourgogne et Franche-Comté,Hommes,14.5,10.5,19.7,B,27,False
2014,Bourgogne et Franche-Comté,Hommes et Femmes,9.6,7.3,12.5,B,27,False
2014,Bretagne,Femmes,4.5,2.8,7.0,B,53,False
2014,Bretagne,Hommes,13.5,10.0,18.0,B,53,False
2014,Bretagne,Hommes et Femmes,8.8,6.8,11.4,B,53,False
2014,Centre-Val de Loire,Femmes,7.0,4.2,11.4,B,24,False
2014,Centre-Val de Loire,Hommes,16.6,12.0,22.5,B,24,False
2014,Centre-Val de Loire,Hommes et Femmes,11.7,8.9,15.2,B,24,False
2014,Grand Est,Femmes,4.5,2.7,7.3,B,44,False
2014,Grand Est,Hommes,16.6,13.1,20.9,B,44,False
2014,Grand Est,Hommes et Femmes,10.4,8.3,12.8,B,44,False
2014,Hauts-de-France,Femmes,4.6,3.0,7.0,B,32,False
2014,Hauts-de-France,Hommes,15.6,12.3,19.6,B,32,False
2014,Hauts-de-France,Hommes et Femmes,10.0,8.1,12.2,B,32,False
2014,Normandie,Femmes,2.3,1.3,3.8,A,28,False
2014,Normandie,Hommes,12.8,9.3,17.3,B,28,False
2014,Normandie,Hommes et Femmes,7.4,5.6,9.7,B,28,False
2014,Nouvelle Aquitaine,Femmes,5.6,4.1,7.7,B,75,False
2014,Nouvelle Aquitaine,Hommes,13.9,11.3,17.0,B,75,False
2014,Nouvelle Aquitaine,Hommes et Femmes,9.6,8.1,11.5,B,75,False
2014,Occitanie,Femmes,7.0,5.1,9.5,C,76,False
2014,Occitanie,Hommes,17.9,14.4,22.0,C,76,False
2014,Occitanie,Hommes et Femmes,12.3,10.2,14.7,C,76,False
2014,Pays de la Loire,Femmes,3.3,2.0,5.5,B,52,False
2014,Pays de la Loire,Hommes,15.0,11.3,19.8,B,52,False
2014,Pays de la Loire,Hommes et Femmes,9.0,7.0,11.6,B,52,False
2014,Provence-Alpes-Côte d'Azur,Femmes,5.8,4.1,8.0,B,93,False
2014,Provence-Alpes-Côte d'Azur,Hommes,15.7,12.5,19.6,B,93,False
2014,Provence-Alpes-Côte d'Azur,Hommes et Femmes,10.6,8.7,12.8,B,93,False
2014,Île-de-France,Femmes,4.7,3.5,6.3,B,11,False
2014,Île-de-France,Hommes,10.0,8.2,12.2,A,11,False
2014,Île-de-France,Hommes et Femmes,7.3,6.1,8.6,A,11,False
2017,Auvergne et Rhône-Alpes,Femmes,5.3,4.3,6.6,B,84,False
2017,Auvergne et Rhône-Alpes,Hommes,14.8,12.8,17.1,B,84,False
2017,Auvergne et Rhône-Alpes,Hommes et Femmes,9.9,8.8,11.2,B,84,False
2017,Bourgogne et Franche-Comté,Femmes,5.5,3.5,8.5,B,27,False
2017,Bourgogne et Franche-Comté,Hommes,12.4,9.7,15.8,B,27,False
2017,Bourgogne et Franche-Comté,Hommes et Femmes,8.9,7.1,11.0,B,27,False
2017,Bretagne,Femmes,3.6,2.5,5.1,A,53,False
2017,Bretagne,Hommes,18.3,15.0,22.1,B,53,False
2017,Bretagne,Hommes et Femmes,10.7,8.9,12.8,B,53,False
2017,Centre-Val de Loire,Femmes,4.7,3.0,7.3,B,24,False
2017,Centre-Val de Loire,Hommes,16.2,12.4,20.8,B,24,False
2017,Centre-Val de Loire,Hommes et Femmes,10.3,8.2,12.9,B,24,False
2017,Grand Est,Femmes,5.7,4.3,7.5,B,44,False
2017,Grand Est,Hommes,15.5,13.0,18.3,B,44,False
2017,Grand Est,Hommes et Femmes,10.4,9.0,12.1,B,44,False
2017,Hauts-de-France,Femmes,5.6,4.2,7.5,B,32,False
2017,Hauts-de-France,Hommes,17.7,15.0,20.8,B,32,False
2017,Hauts-de-France,Hommes et Femmes,11.5,9.9,13.3,C,32,False
2017,Normandie,Femmes,3.1,2.0,4.9,A,28,False
2017,Normandie,Hommes,12.9,9.8,16.8,B,28,False
2017,Normandie,Hommes et Femmes,7.9,6.2,10.0,A,28,False
2017,Nouvelle Aquitaine,Femmes,6.0,4.8,7.6,B,75,False
2017,Nouvelle Aquitaine,Hommes,19.0,16.3,22.0,C,75,False
2017,Nouvelle Aquitaine,Hommes et Femmes,12.3,10.8,14.0,C,75,False
2017,Occitanie,Femmes,6.6,5.2,8.2,C,76,False
2017,Occitanie,Hommes,18.9,16.2,21.8,C,76,False
2017,Occitanie,Hommes et Femmes,12.5,11.0,14.2,C,76,False
2017,Pays de la Loire,Femmes,3.1,2.1,4.5,A,52,False
2017,Pays de la Loire,Hommes,13.5,10.9,16.6,B,52,False
2017,Pays de la Loire,Hommes et Femmes,8.1,6.7,9.8,A,52,False
2017,Provence-Alpes-Côte d'Azur,Femmes,6.4,5.0,8.2,B,93,False
2017,Provence-Alpes-Côte d'Azur,Hommes,17.0,14.0,20.4,B,93,False
2017,Provence-Alpes-Côte d'Azur,Hommes et Femmes,11.5,9.9,13.5,B,93,False
2017,Île-de-France,Femmes,4.2,3.3,5.1,A,11,False
2017,Île-de-France,Hommes,10.2,8.7,12.0,A,11,False
2017,Île-de-France,Hommes et Femmes,7.1,6.2,8.1,A,11,False
2021,Auvergne et Rhône-Alpes,Femmes,4.6,3.4,6.0,B,84,False
2021,Auvergne et Rhône-Alpes,Hommes,11.9,9.8,14.2,B,84,False
2021,Auvergne et Rhône-Alpes,Hommes et Femmes,8.1,6.9,9.4,B,84,False
2021,Bourgogne et Franche-Comté,Femmes,2.3,1.0,4.6,B,27,False
2021,Bourgogne et Franche-Comté,Hommes,11.5,8.4,15.2,B,27,False
2021,Bourgogne et Franche-Comté,Hommes et Femmes,6.8,5.1,8.8,B,27,False
2021,Bretagne,Femmes,3.5,2.2,5.3,B,53,False
2021,Bretagne,Hommes,11.8,8.6,15.7,B,53,False
2021,Bretagne,Hommes et Femmes,7.6,5.8,9.6,B,53,False
2021,Centre-Val de Loire,Femmes,3.9,2.0,6.8,B,24,False
2021,Centre-Val de Loire,Hommes,11.6,8.3,15.8,B,24,False
2021,Centre-Val de Loire,Hommes et Femmes,7.7,5.7,10.1,B,24,False
2021,Grand Est,Femmes,2.5,1.5,3.9,B,44,False
2021,Grand Est,Hommes,14.1,11.1,17.5,B,44,False
2021,Grand Est,Hommes et Femmes,8.1,6.5,10.0,B,44,False
2021,Guadeloupe,Femmes,1.6,0.6,3.2,A,1,False
2021,Guadeloupe,Hommes,8.3,6.0,11.1,A,1,False
2021,Guadeloupe,Hommes et Femmes,4.8,3.6,6.3,A,1,False
2021,Guyane,Femmes,1.6,0.5,3.8,B,3,False
2021,Guyane,Hommes,9.0,6.2,12.7,B,3,False
2021,Guyane,Hommes et Femmes,5.2,3.7,7.3,A,3,False
2021,Hauts-de-France,Femmes,3.0,1.8,4.8,B,32,False
2021,Hauts-de-France,Hommes,11.1,8.7,14.0,B,32,False
2021,Hauts-de-France,Hommes et Femmes,7.0,5.6,8.6,B,32,False
2021,Martinique,Femmes,1.5,0.8,2.5,A,2,False
2021,Martinique,Hommes,7.0,4.9,9.6,A,2,False
2021,Martinique,Hommes et Femmes,4.2,3.1,5.5,A,2,False
2021,Normandie,Femmes,2.4,1.2,4.3,B,28,False
2021,Normandie,Hommes,13.0,9.1,17.8,B,28,False
2021,Normandie,Hommes et Femmes,7.5,5.5,10.1,B,28,False
2021,Nouvelle Aquitaine,Femmes,5.1,3.6,7.0,C,75,False
2021,Nouvelle Aquitaine,Hommes,14.4,11.9,17.2,B,75,False
2021,Nouvelle Aquitaine,Hommes et Femmes,9.6,8.2,11.2,C,75,False
2021,Occitanie,Femmes,5.4,3.9,7.4,C,76,False
2021,Occitanie,Hommes,16.3,13.4,19.6,C,76,False
2021,Occitanie,Hommes et Femmes,10.7,9.1,12.6,C,76,False
2021,Pays de la Loire,Femmes,4.3,2.6,6.6,B,52,False
2021,Pays de la Loire,Hommes,15.4,11.8,19.7,B,52,False
2021,Pays de la Loire,Hommes et Femmes,9.7,7.6,12.0,B,52,False
2021,Provence-Alpes-Côte d'Azur,Femmes,4.5,3.0,6.4,B,93,False
2021,Provence-Alpes-Côte d'Azur,Hommes,13.3,10.5,16.5,B,93,False
2021,Provence-Alpes-Côte d'Azur,Hommes et Femmes,8.8,7.2,10.6,B,93,False
2021,Réunion,Femmes,3.0,1.9,4.6,B,4,False
2021,Réunion,Hommes,7.8,5.8,10.3,A,4,False
2021,Réunion,Hommes et Femmes,5.4,4.2,6.7,A,4,False
2021,Île-de-France,Femmes,3.1,2.1,4.4,B,11,False
2021,Île-de-France,Hommes,9.3,7.6,11.4,A,11,False
2021,Île-de-France,Hommes et Femmes,6.1,5.1,7.3,A,11,False

`;