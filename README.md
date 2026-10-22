# Tabac et alcool en France : évolution, inégalités et causes de la baisse

Projet data visualisation, réalisé en groupe.
Équipe : Ancelina, Heja et Cheryne 

Ce document répond aux questions du cahier des charges : quel sujet, quelle
problématique, quelles données, comment elles ont été nettoyées, comment l'équipe
s'est organisée, avec quelles technologies, et comment lire les graphiques.

---

## 1. Sujet et problématique

**Sujet.** La consommation de tabac et d'alcool en France : comment évolue-t-elle,
et pourquoi baisse-t-elle ?

**Problématique.** Comment évoluent le tabagisme et la consommation d'alcool en France,
et les mêmes régions et les mêmes publics sont-ils concernés ?

**Hypothèse de départ.** La consommation baisse, mais les écarts entre groupes persistent.

**Ce que les données montrent.**
- Le tabagisme quotidien passe de 29,4 % (2016) à 23,1 % (2023) chez les 18-75 ans
  (hommes : 33,0 % à 25,4 % ; femmes : 26,0 % à 20,9 %).
- En 2023, il est de 35,8 % chez les chômeurs, 25,2 % chez les actifs en emploi et
  17,2 % chez les étudiants. Il est de 28,9 % pour le tiers des revenus les plus faibles
  et de 17,3 % pour le tiers des revenus les plus élevés.
- Les écarts entre groupes persistent mais se réduisent : l'hypothèse est donc
  **partiellement confirmée**.
- Pour l'alcool, la part de personnes qui boivent tous les jours baisse dans toutes
  les régions de l'hexagone entre 2000 et 2021, chez les hommes comme chez les femmes.
- Entre régions, on ne démontre pas de lien entre tabac et alcool : le coefficient de
  corrélation est de 0,30 en 2021 et de -0,04 en 2000 [autres années : à compléter],
  alors qu'il faudrait au moins 0,58 avec 12 régions pour écarter le hasard.

---

## 2. Les données : sources et méthode de récupération

**Producteur principal : Santé publique France** (enquête Baromètre), via son portail
open data **Odissé**. Les fichiers ont été téléchargés au format CSV (onglet « Export »).
Les contours des régions viennent de **France GeoJSON**, d'après les données
de l'IGN. Le taux de chômage régional a été téléchargé sur le site de l'**Insee**
(taux de chômage localisés).

| Jeu de données | Années | Périmètre | Utilisé sur le site |
|---|---|---|---|
| Tabac : prévalence selon le sexe | 2000, 2005, 2010, 2014, 2015, 2016 à 2023 | national | oui |
| Tabac : prévalence selon la situation professionnelle | 12 années entre 2000 et 2023 | national | oui |
| Tabac : prévalence selon le revenu | 2000, 2005, 2010, 2014, 2016 à 2023 | national | oui |
| Tabac : consommation quotidienne par région | 2000, 2005, 2010, 2014, 2017, 2021 | 12 régions hexagonales | oui |
| Alcool : consommation quotidienne par région | 2000, 2005, 2010, 2014, 2017, 2021 | 12 régions hexagonales, + 4 régions d'outre-mer en 2021 | oui |
| Alcool : alcoolisation ponctuelle importante par région | 2005 à 2021 | idem | non |
| Tabac : inscriptions à Mois sans tabac par région | 2016 à 2025 | régions et outre-mer | non |
| Chômage : taux de chômage localisés (Insee) | séries trimestrielles | régions | non |

**Périmètre commun :** personnes de 18 à 75 ans, France hexagonale, taux standardisés
sur l'âge pour les données régionales. La Corse n'apparaît pas dans les fichiers
« tabac » et « alcool » par région.

---

## 3. Le nettoyage des données

Le nettoyage a été fait en **Python (pandas)**, avec des scripts qui lisent les fichiers
bruts (`brut/`) et écrivent les fichiers propres (`propre/`). 

### Opérations appliquées à tous les fichiers

| Opération | Pourquoi |
|---|---|
| Lecture en `utf-8-sig` (suppression du BOM) | Un caractère invisible était collé au nom de la colonne « Année » |
| Noms de colonnes raccourcis, en *snake_case* | Les noms d'origine faisaient 100 à 130 caractères (exemples : `api_mensuel_ic_inf`, `tabac_quotidien_taux`) |
| Arrondi des nombres | Suppression du bruit des décimales (7.000000000000001 devient 7.0) |
| Suppression des espaces en trop et des lignes identiques | Aucune ligne identique n'a été trouvée |
| Tri par année, puis par région ou par groupe | Ordre stable et lisible |

### Opérations propres à chaque fichier

| Fichier d'origine | Résultat | Modifications spécifiques |
|---|---|---|
| Alcool, alcoolisation ponctuelle importante | 196 lignes, 17 colonnes | Arrondi à 1 décimale. Colonne `cle_dupliquee` qui signale 8 lignes « Hommes » en double dans les régions d'outre-mer en 2021 (conservées) |
| Alcool, consommation quotidienne | 228 lignes, 9 colonnes | Arrondi à 1 décimale. Colonne `cle_dupliquee`, aucune ligne concernée |
| Tabac, consommation quotidienne (régions) | 216 lignes, 9 colonnes | Arrondi à 2 décimales. Colonne `cle_dupliquee`. Les 24 valeurs manquantes de 2021 sont conservées |
| Prévalence selon la situation professionnelle | 36 lignes, 5 colonnes | « Etudes » corrigé en « Études ». Arrondi à 2 décimales |
| Prévalence selon le revenu | 36 lignes, 7 colonnes | Libellés de revenu reconstruits : colonnes `tercile` (1, 2, 3) et `revenu` (Faible, Intermédiaire, Élevé), libellé d'origine conservé |
| Prévalence selon le sexe | 39 lignes, 5 colonnes | Arrondi à 2 décimales (le fichier mélangeait 2 et 5 décimales) |
| Mois sans tabac | 180 lignes, 5 colonnes | Colonnes réordonnées. Proportion arrondie à 6 décimales |
| Chômage Insee | 2 742 lignes, 5 colonnes, plus un fichier annuel de 695 lignes | Voir ci-dessous |

### Le cas du chômage Insee

- Lecture avec le séparateur `;` et les décimales à virgule, en sautant les 3 lignes de titre.
- Suppression de 76 colonnes vides à droite et de 4 lignes en bas (une vide, trois de notes Insee).
- Codes 01 à 04 convertis en entiers.
- Noms de régions harmonisés avec les autres fichiers (par exemple ILE-DE-FRANCE devient Île-de-France).
- Passage du format large (une colonne par trimestre) au format long (`annee`, `trimestre`, `taux_chomage`).
- Suppression des trimestres sans valeur (France hors Mayotte et outre-mer avant 2014).
- Un second fichier calcule la moyenne annuelle, avec la colonne `nb_trimestres` pour repérer
  l'année 2026, incomplète.

### Trois décisions importantes

- **Terciles de revenu.** Les libellés d'origine étaient faux : le rang du tercile augmentait
  avec l'année (« 1er tercile » en 2000, « 14e tercile » en 2023), ce qui est impossible. Seules
  les mentions « (faible) » et « (élevé) » étaient fiables : le tercile a été reconstruit à partir d'elles.
- **Valeurs manquantes.** Elles sont conservées vides, jamais remplacées par 0.
- **Jointure entre fichiers.** Elle se fait par le **code de région**, plus fiable que les noms.

---

## 4. Organisation de l'équipe

| Personne | Rôle principal |
|---|---|
| Ancelina| Nettoyage des fichiers « tabac » nationaux et du chômage,texte |
| Cheryne | Nettoyage des fichiers régionaux (alcool, tabac),texte |
| Heja | Site web : pages, graphiques |

Déroulement de la semaine :
- **Mardi** : choix du sujet, de la problématique et des sources, téléchargement des fichiers.
- **Mercredi** : nettoyage des données, début du site.
- **Jeudi** : pages Tabac, Alcool et Croisement, rédaction des textes, vérification, README, dépôt GitHub.
- **Vendredi** : oral



---

## 5. Technologies

| Outil | Usage |
|---|---|
| Python (pandas) | Nettoyage des données |
| HTML, CSS (flex) | Structure et mise en page du site |
| JavaScript | Lecture des données, calcul de la corrélation, construction des graphiques |
| Chart.js | Courbes, barres et nuage de points |
| D3.js | Cartes de France |
| Git et GitHub | Versionnage et rendu |

Les données nettoyées sont collées dans des fichiers `.js` (un navigateur ne peut pas lire un
CSV quand on ouvre la page par double-clic), ce qui permet d'ouvrir le site sans serveur.

---

## 6. Le site et ses graphiques

Trois pages, dans `site/` :

### Page Tabac (`index.html`)
Trois **courbes** sur la part de fumeurs quotidiens :
- selon le **sexe** (à partir de 2005) ;
- selon la **situation professionnelle** (chômage, travail, études) ;
- selon le **revenu** (trois niveaux, du plus clair au plus foncé).

*Pourquoi des courbes ?* On suit une évolution dans le temps. L'axe des années est
proportionnel, car les années ne sont pas régulières avant 2016.

### Page Alcool (`alcool.html`)
- Deux **cartes de France** (hommes et femmes) avec un menu pour choisir l'année (2000 à 2021).
  Les régions sont colorées par **classes de pourcentage**, du jaune au rouge foncé, avec une
  légende commune. Au survol, une bulle donne la valeur. Les régions d'outre-mer, sans contours
  sur la carte, sont de petites tuiles. La Corse est grise (pas de donnée).
- Des **barres superposées** par région : la barre claire donne la valeur en 2000, la barre foncée
  celle de 2021. La partie claire qui dépasse est ce qui a disparu.

*Pourquoi ces choix ?* Une carte montre la géographie d'un coup d'œil. Les classes de couleurs
rendent visibles les petites valeurs chez les femmes. Les barres superposées montrent la baisse
dans chaque région.

### Page Croisement (`croisement.html`)
- Un **nuage de points** : une région est un point, avec le tabac en horizontal et l'alcool en
  vertical (2021). Le **coefficient de corrélation r** est calculé et lu automatiquement : avec
  12 régions, il faut au moins 0,58 pour écarter le hasard.
- Une synthèse sur les **causes de la baisse** : mesures de 2016 (paquet neutre, forfait de
  remboursement des substituts, Mois sans tabac), hausses de prix de 2018 à 2020, pause liée au
  Covid-19, et pour l'alcool une baisse ancienne et régulière, sans mesure comparable.

### Choix de présentation
Une même couleur désigne le même groupe sur tout le site, sans rouge ni vert pour des groupes,
avec une palette lisible par les daltoniens. Les marges d'erreur ne sont pas tracées
(conseil du professeur) ; elles sont mentionnées dans les textes.

---

## 7. Résultats et conclusion

- Le tabagisme quotidien baisse nettement à partir de 2016, après dix ans de plateau.
  Cette baisse coïncide avec plusieurs mesures simultanées ; nos données ne permettent pas de
  dire laquelle a joué le plus.
- Les inégalités sociales persistent mais se réduisent : l'écart entre chômeurs et actifs
  passe d'environ 19 points (2016) à 11 points (2023).
- La baisse du tabac s'est interrompue entre 2019 et 2021, ce que Santé publique France relie
  possiblement à la crise du Covid-19.
- L'alcool baisse depuis les années 1960, de façon régulière, sans rupture comparable à celle du tabac.
- Entre régions, tabac et alcool ne suivent pas le même ordre : la corrélation n'est pas démontrée.
- Dans tous les cas, ce sont des **coïncidences**, pas des preuves de cause.

---

## 8. Limites

- Enquête déclarative et téléphonique : une sous-déclaration est possible.
- Taux standardisés sur l'âge, personnes de 18 à 75 ans uniquement.
- Corse absente des fichiers régionaux ; régions d'outre-mer disponibles seulement en 2021 pour l'alcool ;
  pas de ligne « France entière » pour l'alcool.
- Années irrégulières avant 2016 (2000, 2005, 2010, 2014).
- Rupture de méthode en 2024 (18-79 ans, outre-mer inclus) : les courbes s'arrêtent à 2023.
- Seulement 12 régions : une corrélation inférieure à environ 0,58 ne se distingue pas du hasard.
- Une corrélation entre régions ne dit rien sur les personnes.
- Les terciles de revenu sont relatifs à chaque année, pas des montants fixes.
- Les marges d'erreur sont larges pour le chômage : on lit la tendance, pas les petites variations.
- Coïncidence n'est pas causalité.

---

## 9. Ce qui n'a pas été fait

- Croisement entre le taux de chômage régional (Insee, nettoyé) et le tabagisme.
- Croisement avec le prix du paquet et le vapotage.
- Exploitation des fichiers « Mois sans tabac » et « alcoolisation ponctuelle importante »,
  téléchargés et nettoyés mais non utilisés sur le site.

---

## 10. Sources sur les causes de la baisse

- Santé publique France, 1 million de fumeurs quotidiens en moins entre 2016 et 2017 :
  https://www.santepubliquefrance.fr/presse/31-mai-baisse-historique-du-tabagisme-en-france
- Calendrier des hausses de prix du tabac (douanes) :
  https://form.douane.gouv.fr/sites/default/files/espacePresse/files/2017-09-A.Buzyn-et-G.Darmanin-modalites-hausses-des-prix.pdf
- C. Hill, impact de l'augmentation des prix sur la consommation de tabac :
  https://www.gustaveroussy.fr/sites/default/files/impact_prix_consommation_tabac_2026.pdf
- Santé publique France, l'interruption de la baisse du tabagisme se confirme en 2021 :
  https://www.santepubliquefrance.fr/presse/linterruption-de-la-baisse-de-la-prevalence-du-tabagisme-se-confirme-en-2021
- Le Quotidien du médecin, confinement et consommation :
  https://www.lequotidiendumedecin.fr/actus-medicales/sante-publique/confinement-un-quart-des-fumeurs-et-10-des-buveurs-ont-aggrave-leur-consommation-selon-spf
- La Revue du Praticien, alcool :
  https://www.larevuedupraticien.fr/article/mesusage-de-lalcool-la-sante-publique-ce-pot-de-terre-0
- Le Quotidien du médecin, Défi de janvier :
  https://www.lequotidiendumedecin.fr/specialites/addictologie/coup-denvoi-du-dry-january-sans-lappui-du-gouvernement

---

## 11. Structure du dépôt et lancement

```
brut/        fichiers CSV d'origine, jamais modifiés
propre/      fichiers nettoyés
site/        le site (pages, scripts, données)
gitiignore/   
```


**Ouvrir le site :** double-clic sur `site/index.html`. Une connexion internet est nécessaire
(Chart.js, D3.js et les polices sont chargés en ligne).

