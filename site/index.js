const lignesSexe = lireCsv(csvTabacSexe);
const lignesPro = lireCsv(csvTabacPro);
const lignesRevenu = lireCsv(csvTabacRevenu);

// Graph 1 : tabagisme quotidien selon le sexe, line chart
const courbesHommes = creerCourbe(lignesSexe, "sexe", "Hommes", "Hommes", "#0072B2");
const courbesFemmes = creerCourbe(lignesSexe, "sexe", "Femmes", "Femmes", "#E69F00");

new Chart(document.getElementById('tabacParSexe'), {
    type: 'line',
    data: {
        datasets: courbesHommes.concat(courbesFemmes)
    },
    options: creerOptions('Fumeurs quotidiens (%)', 2005)
});

// Graph 2 : tabagisme quotidien selon la situation professionnelle, line chart
const courbesChomage = creerCourbe(lignesPro, "situation_pro", "Chômage", "Chômage", "#AA4499");
const courbesTravail = creerCourbe(lignesPro, "situation_pro", "Travail", "Travail", "#44AA99");
const courbesEtudes = creerCourbe(lignesPro, "situation_pro", "Études", "Études", "#999933");

new Chart(document.getElementById('tabacParSituation'), {
    type: 'line',
    data: {
        datasets: courbesChomage.concat(courbesTravail, courbesEtudes)
    },
    options: creerOptions('Fumeurs quotidiens (%)',)
});

// Graph 3 : tabagisme quotidien selon le revenu, line chart
// Trois niveaux ordonnés : un seul ton, du clair (faible) au foncé (élevé)
const courbesRevenuFaible = creerCourbe(lignesRevenu, "tercile", "1", "Revenu faible", "#9E9E9E");
const courbesRevenuMoyen = creerCourbe(lignesRevenu, "tercile", "2", "Revenu intermédiaire", "#616161");
const courbesRevenuEleve = creerCourbe(lignesRevenu, "tercile", "3", "Revenu élevé", "#212121");

new Chart(document.getElementById('tabacParRevenu'), {
    type: 'line',
    data: {
        datasets: courbesRevenuFaible.concat(courbesRevenuMoyen, courbesRevenuEleve)
    },
    options: creerOptions('Fumeurs quotidiens (%)')
});