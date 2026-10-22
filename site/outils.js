Chart.defaults.font.size = 14;
Chart.defaults.font.family = 'Montserrat';

// Transformer le texte CSV de data.js en une liste de lignes
function lireCsv(texte) {
    const lignes = texte.trim().split("\n");
    const noms = lignes[0].trim().split(",");
    const resultat = [];

    for (let i = 1; i < lignes.length; i++) {
        const valeurs = lignes[i].trim().split(",");
        const ligne = {};
        for (let j = 0; j < noms.length; j++) {
            ligne[noms[j]] = valeurs[j];
        }
        resultat.push(ligne);
    }
    return resultat;
}

// Les points {x: année, y: valeur} d'une colonne, pour un groupe donné
function points(lignes, colonneGroupe, groupe, colonne) {
    return lignes
        .filter(function (ligne) {
            return ligne[colonneGroupe] === groupe;
        })
        .map(function (ligne) {
            return { x: Number(ligne.annee), y: Number(ligne[colonne]) };
        })
        .sort(function (a, b) {
            return a.x - b.x;
        });
}

// Une courbe = trois séries : borne basse, borne haute (qui colore la zone
// jusqu'à la série précédente) et valeur estimée
// Une courbe = une seule série : la valeur estimée
function creerCourbe(lignes, colonneGroupe, groupe, nom, couleur) {
    return [
        {
            label: nom,
            data: points(lignes, colonneGroupe, groupe, "taux"),
            borderColor: couleur,
            backgroundColor: couleur
        }
    
    ];
}

// Les options communes à tous les graphiques en courbes
function creerOptions(titreY, anneeMin = 2000) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                min: anneeMin,
                max: 2024,
                ticks: {
                    stepSize: 5,
                    callback: function (valeur) {
                        return valeur;
                    }
                },
                title: {
                    display: true,
                    text: 'Année'
                }
            },
            y: {
                min: 0,
                ticks: {
                    stepSize: 10
                },
                title: {
                    display: true,
                    text: titreY
                }
            }
        }
    };
}