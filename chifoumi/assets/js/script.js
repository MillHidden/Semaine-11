var jeu_selection = document.getElementById("jeu__selection"); //div contenant la sélection des différents jeux
var jeu_choisi = document.getElementsByName("jeu__selection-radio"); //radio box de choix des jeux
var action_jouer = document.getElementById("jeu__selection-button"); //button d'action de joueur

var jeu_visuel = document.getElementById("jeu__visuel"); // div contenant le visuel du jeu, caché par défaut

var choix = []; //tableau regroupant les élements choisis pour le jeu
var jeu = -1; //choix du jeu

action_jouer.addEventListener ("click", nouvellePartie); //on écoute le bouton du choix du jeu

function nouvellePartie () {
    /* On affiche le visuel du jeu, et on cache le menu de sélection*/    
    if (jeu_visuel.classList.contains("hidden")) { 
        jeu_visuel.classList.remove("hidden"); 
        jeu_selection.classList.add("hidden"); 
    }
    /* on regarde quel est le jeu sélectionné */
    for (var i = 0; i < jeu_choisi.length; i++) {
        if (jeu_choisi[i].checked) {
            jeu = i;
        }
    }
    /* on insére le code différent selon le jeu*/
    insererCode();
    /* on récupère les éléments du jeu*/ 
    lancer = document.getElementById("lancer");
    reload = document.getElementById("reload");
    fight_content = document.getElementById('fight__content');
    fight_img = document.getElementById('fight__img');
    fight_nom = document.getElementById('fight__nom');
    fight_vainqueur = document.getElementById('fight__vainqueur');
    fight_result = document.getElementById('fight__result');
    imgjoueur = document.getElementById('fight__joueur');
    imgordi = document.getElementById('fight__ordi');
    result = document.getElementById('result'); 
    gagnant = document.getElementById('gagnant');
    winrate = document.getElementById('winrate');
    nbgagnes = document.getElementById('nbgagnes');
    nbdefaites = document.getElementById('nbdefaites');
    nbegalites = document.getElementById('nbegalites');
    selection = choix[0]; // mémoire de l'élément actif sélectionné
    choix_joueur = 0; //mémoire du choix du joueur
    /* on écoute les boutons de combat et de retour au choix du jeu */
    lancer.addEventListener("click", fighting); 
    reload.addEventListener("click", reloading);
    /* on regarde si on clic sur une des images */
    for (var i = 0 ; i< choix.length; i++) {
        choix[i].addEventListener("click", ecouteImage); 
    }
    /* on supprime l'écoute sur le bouton de lancement de jeu */
    action_jouer.removeEventListener('click', nouvellePartie); 
}

function ecouteImage (e) {
        /* on fixe les images à leur place autour de l'image centrale, on n'écoute plus le passage de la souris sur l'image centrale*/
    if (!place) {
        modifDispo();
        choix[0].removeEventListener("mouseout", resetDispo);
        place = true;
    }
    /* on rend active l'image cliquée*/
    selection.classList.remove("active"); 
    selection = e.target; 
    e.target.classList.add("active");
    /* on cache le combat*/
    if (!fight_img.classList.contains("hidden")) {
        fight_img.classList.add("hidden");
    }
    if (!fight_nom.classList.contains("hidden")) {
        fight_nom.classList.add("hidden"); 
    }
}
            
function fighting () {
    /*on stock le choix de l'utilisateur dans la variable choix_joueur*/
    switch (selection.getAttribute("alt")) { 
        case "Choix général" :
            choix_joueur = 0;
            break;
        case "Pierre" :
            choix_joueur = 1;
            break;
        case "Feuille" :
            choix_joueur = 2;
            break;
        case "Ciseaux" :
            choix_joueur = 3;
            break;
        case "Lezard" :
            choix_joueur = 4;
            break;
        case "Spock" :
            choix_joueur = 5;
            break;
    }
    /*si le joueur a choisi l'image centrale, on lui affiche une erreur*/
    if (choix_joueur === 0) {
        alert("choisissez votre arme !");
    }
    else {
        var ordi = choixOrdi(); //l'ordinateur choisit son arme
        /* on affiche les images des armes du joueur et de l'ordinateur*/
        imgjoueur.setAttribute("src", choix[choix_joueur].getAttribute("src"));
        imgjoueur.setAttribute("alt", choix[choix_joueur].getAttribute("alt"));
        imgordi.setAttribute("src", choix[ordi].getAttribute("src"));
        imgordi.setAttribute("alt", choix[ordi].getAttribute("alt"));
        /* on rend visible les résultats*/
        if (fight_img.classList.contains("hidden")) {
            fight_img.classList.remove("hidden");
        }
        if (fight_nom.classList.contains("hidden")) {
            fight_nom.classList.remove("hidden"); 
        }
        if (fight_vainqueur.classList.contains("hidden")) {
            fight_vainqueur.classList.remove("hidden");
        }
        if (result.classList.contains("hidden")) {
            result.classList.remove("hidden");
        }
        /* si le joueur et l'ordinateur ont choisi la même arme, c'est égalité*/
        if (choix_joueur == ordi) {
           gagnant.innerHTML = "EGALITE";
           nbegalites.innerHTML ++;
        }
        /* sinon, il faut trouver le vainqueur*/
        else {
            trouverGagnant (choix_joueur, ordi);
            /* on affiche le winrate*/
            winrate.innerHTML = 100 * parseFloat(nbgagnes.innerHTML) /(parseFloat(nbgagnes.innerHTML) + parseFloat(nbdefaites.innerHTML));
        }
    }
    une_fois = true;
}

function reloading () {
    /* on réinitialise tous les compteurs */
    nbegalites.innerHTML = 0;
    nbgagnes.innerHTML = 0;
    nbdefaites.innerHTML = 0;
    winrate.innerHTML = 0;
    jeu = -1;
    selection.classList.remove("active");
    /* on cache on cache le visuel du jeu et on affiche la sélection des jeux*/
    jeu_visuel.classList.add("hidden");
    jeu_selection.classList.remove("hidden");
    /*On ferme l'écoute du bouton de combat*/
    lancer.removeEventListener("clic", fighting); 
    /*on ferme l'écoute sur toutes les images*/
    for (var i = 0 ; i < choix.length; i++) {
        choix[i].removeEventListener("click", ecouteImage); 
        choix_util.removeChild(choix[i]);
    }
    choix[0].removeEventListener("mouseover", modifDispo);
    choix[0].removeEventListener("mouseout", resetDispo);
    /* on efface le contenu des images de choix*/
    choix = [];
    /* on active l'écoute du bouton de choix du jeu*/
    action_jouer.addEventListener ("click", nouvellePartie); 
}

function choixOrdi () {
    /* si on est dans le jeu0, il y a 3 choix possibles*/
    if (jeu === 0) {
        return Math.floor(Math.random() * 3 + 1);
    }
    /* si on est dans le jeu1, il y a 5 choix possibles*/
    else if (jeu === 1) {
        return Math.floor(Math.random() * 5 + 1 );
    }
}
    
function trouverGagnant (joueur, ordi) { //le choix du gagnant varie selon le jeu et les règles propres à chaque jeu
    if (jeu == 0) {
        switch (joueur) {
        case 1:
            if (ordi == 2){afficherGagnant(0);} else {afficherGagnant(1);}
            break;
        case 2:
            if (ordi == 3){afficherGagnant(0);} else{afficherGagnant(1);}
            break;
        case 3:
            if (ordi == 1) {afficherGagnant(0);} else{afficherGagnant(1);}
            break;
        }
    }
    if (jeu == 1) {
        switch (joueur) {
        case 1:
            if (ordi == 1 || ordi == 5) {afficherGagnant(0);} else {afficherGagnant(1);}
            break;
        case 2:
            if (ordi == 3 || ordi == 4) {afficherGagnant(0);} else {afficherGagnant(1);}
            break;
        case 3:
            if (ordi == 1 || ordi == 5) {afficherGagnant(0);} else {afficherGagnant(1);}
            break;
        case 4:
            if (ordi == 1 || ordi == 3) {afficherGagnant(0);} else {afficherGagnant(1);}
            break;
        case 5:
            if (ordi == 2 || ordi == 4) {afficherGagnant(0);} else {afficherGagnant(1);}
            break;
        }        
    }
}

function afficherGagnant (vainqueur) {
    /* si l'ordinateur gagne, on affiche l'ordinateur comme gagnant et le nombre de défaites augmente de 1 */
    if (vainqueur == 0) {
        gagnant.innerHTML = "ORDINATEUR";
        nbdefaites.innerHTML++;
    }
    /* si le joueur gagne, on affiche le joueur comme gagnant et le nombre de victoires augmente de 1 */
    else if (vainqueur == 1) {
        gagnant.innerHTML = "VOUS";
        nbgagnes.innerHTML++;    
    }
}