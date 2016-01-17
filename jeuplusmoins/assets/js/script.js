var nb_a_trouver = 0;
var trouve = true;
var nb_essai = 0;

var lancer = document.getElementById('lancer');
var rep = document.getElementById('affichage__ordi');
var prop = document.getElementById('prop');



    function choisir() {
        nb_a_trouver = Math.floor(Math.random() * 100);
    }

        lancer.addEventListener('click',
            function() {
                 if (trouve) {
                     choisir();
                     rep.innerHTML = "J'ai choisi le prix, à vous de le retrouver ";
                     trouve = false;
                     lancer.innerHTML = "Tester un nombre";
                     nb_essai = 0;
                 }
                 else {
                    nb_essai++;
                    if (nb_a_trouver == prop.value) {
                        rep.innerHTML = "Vous avez trouvé en : " + nb_essai + " essais. Félicitation !";
                        trouve = true;
                        lancer.innerHTML = "Refaire une partie";
                    }
                    else if (nb_a_trouver > prop.value) {
                        rep.innerHTML = "J'ai choisi un nombre plus grand";
                    }
                    else {
                        rep.innerHTML = "J'ai choisi un nombre plus petit";
                    }
                 }
            }, false);