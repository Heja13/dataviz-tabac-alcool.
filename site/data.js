const csvTabacSexe = `
annee,sexe,taux,ic_inf,ic_sup
2000,Femmes,26.39,25.17,27.65
2000,Hommes,33.73,32.24,35.23
2000,Hommes et Femmes,29.97,29.01,30.95
2005,Femmes,23.2,22.4,24.02
2005,Hommes,32.01,30.98,33.05
2005,Hommes et Femmes,27.51,26.86,28.17
2010,Femmes,26.56,25.67,27.46
2010,Hommes,33.08,32.06,34.12
2010,Hommes et Femmes,29.73,29.05,30.41
2014,Femmes,24.43,23.21,25.68
2014,Hommes,32.91,31.5,34.34
2014,Hommes et Femmes,28.55,27.62,29.49
2015,Femmes,25.8,23.29,28.44
2015,Hommes,33.09,30.03,36.27
2015,Hommes et Femmes,29.37,27.37,31.42
2016,Femmes,26.0,24.72,27.32
2016,Hommes,32.99,31.54,34.47
2016,Hommes et Femmes,29.4,28.43,30.39
2017,Femmes,24.2,23.28,25.15
2017,Hommes,29.82,28.77,30.88
2017,Hommes et Femmes,26.94,26.24,27.65
2018,Femmes,22.88,21.33,24.48
2018,Hommes,28.16,26.44,29.92
2018,Hommes et Femmes,25.45,24.29,26.63
2019,Femmes,20.67,19.2,22.2
2019,Hommes,27.49,25.78,29.25
2019,Hommes et Femmes,23.98,22.85,25.14
2020,Femmes,21.96,20.65,23.3
2020,Hommes,29.15,27.65,30.68
2020,Hommes et Femmes,25.45,24.46,26.47
2021,Femmes,22.95,21.91,24.02
2021,Hommes,27.79,26.66,28.94
2021,Hommes et Femmes,25.3,24.53,26.08
2022,Femmes,21.73,19.25,24.37
2022,Hommes,27.39,24.44,30.49
2022,Hommes et Femmes,24.48,22.55,26.49
2023,Femmes,20.93,19.76,22.15
2023,Hommes,25.43,24.15,26.75
2023,Hommes et Femmes,23.12,22.25,24.01

`;const csvTabacPro = ` annee,situation_pro,taux,ic_inf,ic_sup
2000,Chômage,40.71,36.51,45.01
2000,Travail,34.14,32.84,35.46
2000,Études,40.08,36.3,43.94
2005,Chômage,43.95,41.41,46.51
2005,Travail,31.31,30.41,32.22
2005,Études,29.11,26.85,31.46
2010,Chômage,50.87,47.98,53.74
2010,Travail,33.41,32.51,34.32
2010,Études,28.98,26.26,31.82
2014,Chômage,48.16,44.54,51.8
2014,Travail,30.33,29.13,31.55
2014,Études,25.64,22.35,29.16
2016,Chômage,49.7,45.96,53.44
2016,Travail,30.75,29.49,32.04
2016,Études,28.33,25.09,31.75
2017,Chômage,43.51,40.66,46.39
2017,Travail,29.06,28.11,30.01
2017,Études,23.77,21.33,26.35
2018,Chômage,39.94,34.89,45.15
2018,Travail,28.02,26.47,29.6
2018,Études,19.47,15.46,24.02
2019,Chômage,42.75,37.2,48.43
2019,Travail,25.27,23.81,26.76
2019,Études,21.34,17.31,25.83
2020,Chômage,43.93,39.72,48.21
2020,Travail,27.08,25.76,28.44
2020,Études,23.18,19.66,27.01
2021,Chômage,45.66,42.31,49.04
2021,Travail,26.62,25.6,27.66
2021,Études,19.66,17.18,22.32
2022,Chômage,42.26,32.18,52.84
2022,Travail,26.06,23.52,28.73
2022,Études,19.15,13.3,26.2
2023,Chômage,35.77,31.53,40.19
2023,Travail,25.19,24.04,26.38
2023,Études,17.18,14.7,19.9
`;

const csvTabacRevenu = `
annee,tercile,revenu,taux,ic_inf,ic_sup,revenu_libelle_original
2000,1,Faible,31.44,29.57,33.36,1er tercile (faible)
2000,2,Intermédiaire,31.01,29.34,32.72,2e tercile
2000,3,Élevé,28.28,26.69,29.92,3e tercile (élevé)
2005,1,Faible,32.48,31.13,33.85,2e tercile (faible)
2005,2,Intermédiaire,26.82,25.69,27.97,3e tercile
2005,3,Élevé,24.65,23.55,25.78,4e tercile (élevé)
2010,1,Faible,36.42,35.04,37.82,3e tercile (faible)
2010,2,Intermédiaire,29.68,28.6,30.76,4e tercile
2010,3,Élevé,23.38,22.3,24.5,5e tercile (élevé)
2014,1,Faible,37.02,34.99,39.09,4e tercile (faible)
2014,2,Intermédiaire,27.98,26.45,29.54,5e tercile
2014,3,Élevé,21.81,20.51,23.14,6e tercile (élevé)
2016,1,Faible,38.75,36.76,40.77,5e tercile (faible)
2016,2,Intermédiaire,28.51,26.84,30.21,6e tercile
2016,3,Élevé,21.05,19.78,22.36,7e tercile (élevé)
2017,1,Faible,33.96,32.6,35.35,6e tercile (faible)
2017,2,Intermédiaire,26.38,25.2,27.58,7e tercile
2017,3,Élevé,19.46,18.42,20.53,8e tercile (élevé)
2018,1,Faible,32.57,30.09,35.13,7e tercile (faible)
2018,2,Intermédiaire,24.75,22.86,26.72,8e tercile
2018,3,Élevé,21.14,19.22,23.15,9e tercile (élevé)
2019,1,Faible,29.78,27.42,32.23,8e tercile (faible)
2019,2,Intermédiaire,23.67,21.79,25.64,9e tercile
2019,3,Élevé,18.21,16.53,19.99,10e tercile (élevé)
2020,1,Faible,33.29,31.18,35.45,9e tercile (faible)
2020,2,Intermédiaire,25.24,23.5,27.04,10e tercile
2020,3,Élevé,18.0,16.61,19.46,11e tercile (élevé)
2021,1,Faible,32.31,30.81,33.84,10e tercile (faible)
2021,2,Intermédiaire,25.72,24.36,27.11,11e tercile
2021,3,Élevé,16.98,15.93,18.08,12e tercile (élevé)
2022,1,Faible,33.55,29.16,38.17,11e tercile (faible)
2022,2,Intermédiaire,20.9,17.84,24.22,12e tercile
2022,3,Élevé,21.4,18.07,25.03,13e tercile (élevé)
2023,1,Faible,28.91,27.07,30.8,12e tercile (faible)
2023,2,Intermédiaire,23.9,22.33,25.53,13e tercile
2023,3,Élevé,17.32,16.1,18.59,14e tercile (élevé)

`;