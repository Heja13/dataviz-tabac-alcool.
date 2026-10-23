const lignesAlcool = lireCsv(csvAlcoolQuotidien);

// Les classes de pourcentage et leurs couleurs (du jaune au rouge foncé)
const seuils = [2, 4, 6, 10, 15, 25];
const couleurs = d3.schemeYlOrRd[7];
const etiquettes = ["moins de 2 %", "2 à 4 %", "4 à 6 %", "6 à 10 %", "10 à 15 %", "15 à 25 %", "25 % et plus"];
const echelle = d3.scaleThreshold().domain(seuils).range(couleurs);

// Les outre-mer n'ont pas de contours sur la carte : on les affiche en petites tuiles
const outreMer = [
    { code: 1, nom: "Guadeloupe" },
    { code: 2, nom: "Martinique" },
    { code: 3, nom: "Guyane" },
    { code: 4, nom: "La Réunion" }
];

// Les années présentes dans le fichier, dans l'ordre
const annees = [];
lignesAlcool.forEach(function (ligne) {
    if (!annees.includes(ligne.annee)) {
        annees.push(ligne.annee);
    }
});
annees.sort();

// Le taux d'une région (par son code) pour une année et un sexe, null si la case est vide
function valeur(codeRegion, annee, sexe) {
    const ligne = lignesAlcool.find(function (l) {
        return Number(l.region_code) === Number(codeRegion)
            && l.annee === annee
            && l.sexe === sexe;
    });
    if (!ligne || ligne.alcool_quotidien_taux === "") {
        return null;
    }
    return Number(ligne.alcool_quotidien_taux);
}

// Projection : transforme les coordonnées (longitude, latitude) en points de l'écran
const largeur = 500;
const hauteur = 520;
const projection = d3.geoConicConformal()
    .parallels([44, 49])
    .rotate([-3, 0])
    .fitSize([largeur, hauteur], regionsGeo);
const trace = d3.geoPath(projection);

// L'infobulle affichée au survol
const infobulle = d3.select("#infobulle");

function montrerInfobulle(event, texte) {
    infobulle
        .style("display", "block")
        .style("left", (event.pageX + 12) + "px")
        .style("top", (event.pageY + 12) + "px")
        .text(texte);
}

function cacherInfobulle() {
    infobulle.style("display", "none");
}

// Construire une carte et renvoyer la fonction qui la met à jour pour une année
function creerCarte(idConteneur, sexe) {
    const conteneur = d3.select("#" + idConteneur);

    // La carte : un dessin SVG avec une forme par région
    const svg = conteneur.append("svg")
        .attr("viewBox", "0 0 " + largeur + " " + hauteur);

    const regionsSvg = svg.selectAll("path")
        .data(regionsGeo.features)
        .join("path")
        .attr("d", trace)
        .attr("class", "region");

    // Les tuiles des outre-mer
    const tuiles = conteneur.append("div")
        .attr("class", "outremer")
        .selectAll("div")
        .data(outreMer)
        .join("div")
        .attr("class", "tuile");

    function mettreAJour(annee) {
        regionsSvg
            .attr("fill", function (d) {
                const v = valeur(d.properties.code, annee, sexe);
                return v === null ? "#EEEEEE" : echelle(v);
            })
            .on("mousemove", function (event, d) {
                const v = valeur(d.properties.code, annee, sexe);
                const texte = v === null ? "donnée non disponible" : v.toFixed(1) + " %";
                montrerInfobulle(event, d.properties.nom + " : " + texte);
            })
            .on("mouseleave", cacherInfobulle);

        tuiles
            .style("background-color", function (d) {
                const v = valeur(d.code, annee, sexe);
                return v === null ? "#EEEEEE" : echelle(v);
            })
            .style("color", function (d) {
                const v = valeur(d.code, annee, sexe);
                return v !== null && v >= 10 ? "white" : "#222222";
            })
            .html(function (d) {
                const v = valeur(d.code, annee, sexe);
                return "<strong>" + d.nom + "</strong><span>"
                    + (v === null ? "–" : v.toFixed(1) + " %") + "</span>";
            });
    }

    return mettreAJour;
}

// La légende, commune aux deux cartes : une case de couleur par classe
let htmlLegende = "";
couleurs.forEach(function (couleur, i) {
    htmlLegende += '<span class="classe"><i style="background-color: ' + couleur + '"></i>'
        + etiquettes[i] + "</span>";
});
htmlLegende += '<span class="classe"><i style="background-color: #EEEEEE"></i>pas de donnée</span>';
document.getElementById("legende").innerHTML = htmlLegende;

// Le menu des années
const selecteur = document.getElementById("choixAnnee");
annees.forEach(function (annee) {
    const option = document.createElement("option");
    option.value = annee;
    option.textContent = annee;
    selecteur.appendChild(option);
});
selecteur.value = annees[annees.length - 1];

// Graph 4 : alcool quotidien par région, deux cartes (hommes et femmes)
const majCarteHommes = creerCarte("carteHommes", "Hommes");
const majCarteFemmes = creerCarte("carteFemmes", "Femmes");

function afficherAnnee(annee) {
    majCarteHommes(annee);
    majCarteFemmes(annee);
}

selecteur.addEventListener("change", function () {
    afficherAnnee(selecteur.value);
});

afficherAnnee(selecteur.value);

// Graph 5 : alcool quotidien en 2000 et en 2021 par région, barres superposées

// 1. Les années à comparer et l'échelle commune (à adapter si vous changez les années)
const anneeAvant = "2000";
const anneeApres = "2021";
const maxAxe = 40;

// 2. Un nom plus court pour l'axe
const nomsCourts = {
    "Provence-Alpes-Côte d'Azur": "PACA",
    "Auvergne-Rhône-Alpes": "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté": "Bourgogne-Fr.-Comté"
};

// 3. Les régions qui ont une valeur aux deux années (hexagone, hors Corse)
const regionsBaisse = [];
regionsGeo.features.forEach(function (region) {
    const code = region.properties.code;
    if (valeur(code, anneeAvant, "Hommes") !== null && valeur(code, anneeApres, "Hommes") !== null) {
        regionsBaisse.push(region);
    }
});

// 4. On les classe : la plus forte baisse chez les hommes en premier
function baisse(region) {
    const code = region.properties.code;
    return valeur(code, anneeAvant, "Hommes") - valeur(code, anneeApres, "Hommes");
}
regionsBaisse.sort(function (a, b) {
    return baisse(b) - baisse(a);
});

// 5. Les noms des régions, dans cet ordre
const noms = [];
regionsBaisse.forEach(function (region) {
    noms.push(nomsCourts[region.properties.nom] || region.properties.nom);
});

// 6. Les valeurs d'une année pour un sexe, dans le même ordre
function valeursDe(sexe, annee) {
    const liste = [];
    regionsBaisse.forEach(function (region) {
        liste.push(valeur(region.properties.code, annee, sexe));
    });
    return liste;
}

