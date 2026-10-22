// Graph 8 : tabac et alcool par région en 2021, nuage de points

// L'année étudiée : la plus récente, commune à tous les fichiers (à changer ici pour tester une autre)
const anneeCroisement = "2021";

const lignesTabacRegion = lireCsv(csvTabacRegion);
const lignesAlcoolRegion = lireCsv(csvAlcoolQuotidien);

// 1. Le taux "Hommes et Femmes" d'une région, pour l'année étudiée (null si la case est vide)
function tauxTotal(lignes, colonne, codeRegion) {
    const ligne = lignes.find(function (l) {
        return Number(l.region_code) === Number(codeRegion)
            && l.annee === anneeCroisement
            && l.sexe === "Hommes et Femmes";
    });
    if (!ligne || ligne[colonne] === "") {
        return null;
    }
    return Number(ligne[colonne]);
}

// 2. La liste des régions (code et nom), prise dans le fichier du tabac
const regionsCroisement = [];
lignesTabacRegion.forEach(function (ligne) {
    const dejaLa = regionsCroisement.some(function (region) {
        return Number(region.code) === Number(ligne.region_code);
    });
    if (!dejaLa) {
        regionsCroisement.push({ code: ligne.region_code, nom: ligne.region });
    }
});

// 3. Un point par région : x = tabac, y = alcool
const pointsCroisement = [];
regionsCroisement.forEach(function (region) {
    const tabac = tauxTotal(lignesTabacRegion, "tabac_quotidien_taux", region.code);
    const alcool = tauxTotal(lignesAlcoolRegion, "alcool_quotidien_taux", region.code);
    if (tabac !== null && alcool !== null) {
        pointsCroisement.push({ x: tabac, y: alcool, region: region.nom });
    }
});

// 4. Les moyennes, la covariance et les variances (utilisées par la corrélation et la droite)
function statistiques(liste) {
    let sommeX = 0;
    let sommeY = 0;
    liste.forEach(function (p) {
        sommeX += p.x;
        sommeY += p.y;
    });
    const moyenneX = sommeX / liste.length;
    const moyenneY = sommeY / liste.length;

    let covariance = 0;
    let varianceX = 0;
    let varianceY = 0;
    liste.forEach(function (p) {
        covariance += (p.x - moyenneX) * (p.y - moyenneY);
        varianceX += (p.x - moyenneX) * (p.x - moyenneX);
        varianceY += (p.y - moyenneY) * (p.y - moyenneY);
    });
    return { moyenneX, moyenneY, covariance, varianceX, varianceY };
}

// 5. Le coefficient de corrélation r : entre -1 et 1
function correlation(liste) {
    const s = statistiques(liste);
    return s.covariance / Math.sqrt(s.varianceX * s.varianceY);
}

// 6. La droite de tendance : deux points, un à gauche et un à droite du nuage
function droiteTendance(liste) {
    const s = statistiques(liste);
    const pente = s.covariance / s.varianceX;
    const ordonnee = s.moyenneY - pente * s.moyenneX;
    let petit = liste[0].x;
    let grand = liste[0].x;
    liste.forEach(function (p) {
        petit = Math.min(petit, p.x);
        grand = Math.max(grand, p.x);
    });
    return [
        { x: petit, y: pente * petit + ordonnee },
        { x: grand, y: pente * grand + ordonnee }
    ];
}

// 7. La phrase qui lit r (avec 12 régions, il faut |r| d'au moins 0,58 pour écarter le hasard)
const seuilCorrelation = 0.58;
const r = correlation(pointsCroisement);
const valeurR = r.toFixed(2).replace(".", ",");
let lecture;
if (Math.abs(r) >= seuilCorrelation) {
    lecture = r > 0
        ? "relation positive : les régions où l'on fume davantage sont aussi celles où l'on boit davantage."
        : "relation négative : les régions où l'on fume davantage sont celles où l'on boit moins.";
} else {
    lecture = "pas de relation démontrable : avec seulement " + pointsCroisement.length
        + " régions, on ne peut pas la distinguer du hasard.";
}
document.getElementById("lectureCorrelation").innerHTML =
    "<strong>Corrélation r = " + valeurR + "</strong> en " + anneeCroisement
    + " (" + pointsCroisement.length + " régions) : " + lecture;

// 8. Le graphique : les points des régions et la droite de tendance
new Chart(document.getElementById('tabacAlcool'), {
    type: 'scatter',
    data: {
        datasets: [
            {
                label: 'Régions',
                data: pointsCroisement,
                backgroundColor: '#444444',
                pointRadius: 6
            },
            {
                label: 'Droite de tendance',
                type: 'line',
                data: droiteTendance(pointsCroisement),
                borderColor: '#888888',
                borderDash: [6, 4],
                borderWidth: 1.5,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: { display: true, text: "Fumeurs quotidiens en " + anneeCroisement + " (%)" }
            },
            y: {
                title: { display: true, text: "Boivent tous les jours en " + anneeCroisement + " (%)" }
            }
        },
        plugins: {
            tooltip: {
                filter: function (item) {
                    return item.dataset.label === 'Régions';
                },
                callbacks: {
                    label: function (item) {
                        const p = item.raw;
                        return p.region + " : " + p.x.toFixed(1) + " % fument, " + p.y.toFixed(1) + " % boivent";
                    }
                }
            }
        }
    }
});