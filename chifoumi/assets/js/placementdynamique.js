var dispo = [];
var nb = 0; //nombre de choix d'armes du jeu
var pos_centrale = {top : 2, left : 4};

function insererCode() {
    /* On récupère les éléments actifs du jeu*/
    choix_util = document.getElementById("choix_util");
    if (jeu === 0) {
        nb = 4; //il y aura 4 images dans le jeu (3 + centrale)
    }
    else if (jeu === 1) {
        nb = 6; // il y aura 6 images dans le jeu (5 + centrale)
    }
    /* on créé autant d'images que nécessaire et on les insère dans le code html dans la div choix_util*/
    for (var i = 0; i < nb; i++) {
        creerImage (i);
    }
    
    if (jeu === 0) {
        /* On définit les positions finales des trois images autour de l'image centrale */
        dispo[1] = {top : "0px", left: choix[0].offsetLeft + "px"};
        dispo[2] = {top : (choix[0].offsetTop + 125) + "px", left : (choix[0].offsetLeft - 216) + "px"};
        dispo[3] = {top : (choix[0].offsetTop + 125) + "px", left : (choix[0].offsetLeft + 216) + "px"};
    }
    if (jeu === 1) { 
        /* On place les cinq images autour de l'image centrale */
        dispo [1] = {top : (choix[0].offsetTop + 202) + "px", left: (choix[0].offsetLeft - 147) + "px"};
        dispo [2] = {top : (choix[0].offsetTop + 202) + "px", left: (choix[0].offsetLeft + 147) + "px"}
        dispo [3] = {top : (choix[0].offsetTop - 77) + "px", left : (choix[0].offsetLeft + 238) + "px"};
        dispo [4] = {top : (choix[0].offsetTop - 77) + "px", left: (choix[0].offsetLeft - 238) + "px"};
        dispo [5] = {top : "0px", left: choix[0].style.left};
    }
    /* on reset le placement des images sans animations*/
    resetDispo ();
    anim (false, 1);
    place = false;
}

function creerImage (num) {
    /* on créé un élement html de classe image */
    choix[num] = document.createElement("IMG");
    /* on ajoute les classes css communes*/
    choix[num].setAttribute("class", "img-derriere img-circle img-style choix__img-style");
    
    /*selon l'image, on ajoute l'id, le chemin de l'image et le nom alt */
    switch (num) {
        case 0:
            /* si l'on a créé l'image de choix, elle n'est pas circulaire et elle est devant*/
            choix[0].setAttribute("class", "img-devant img-style choix__img-style");
            choix[0].setAttribute("id", "choix__general");
            if (!bazinga) {
                 choix[0].setAttribute("src", "assets/img/bazinga.png");
            }
             else {
                choix[0].setAttribute("src", "assets/img/choix" + jeu + ".png");
             }
            choix[0].setAttribute("alt", "Choix général");
            choix[0].setAttribute("style", "top: 260px; left: 50%; background: white;");
            break;
        case 1:
            choix[1].setAttribute("id", "choix__pierre");
            choix[1].setAttribute("src","assets/img/Rock.png");
            choix[1].setAttribute("alt", "Pierre");
            break;
        case 2:
            choix[2].setAttribute("id", "choix__feuille");
            choix[2].setAttribute("src", "assets/img/Paper.png");
            choix[2].setAttribute("alt", "Feuille");
            break;
        case 3:
            choix[3].setAttribute("id", "choix__ciseaux");
            choix[3].setAttribute("src","assets/img/Cisors.png");
            choix[3].setAttribute("alt", "Ciseaux");
            break;
        case 4:
            choix[4].setAttribute("id", "choix__lezard");
            choix[4].setAttribute("src","assets/img/Lizard.png");
            choix[4].setAttribute("alt", "Lezard");
            break;
        case 5:
            choix[5].setAttribute("id", "choix__spock");
            choix[5].setAttribute("src", "assets/img/Spock.png");
            choix[5].setAttribute("alt", "Spock");
            break;
    }
    choix_util.appendChild(choix[num]);
}

function modifDispo () {
    /* on place les images à leur position finale*/
    for (var i = 1; i < nb; i++) {    
        choix[i].setAttribute("style", "top : " + dispo[i].top + ";left : " + dispo[i].left +";");
    }
    /* on anime le placement des images */
    anim(false, 2);
    anim(true, 1); 
    /*on regarde si on sort la souris sur l'image centrale et on n'écoute plus l'entrée sur l'image centrale*/
    choix[0].addEventListener("mouseout", resetDispo); //on regarde si on passe la souris sur l'image de choix
    choix[0].removeEventListener("mouseover", modifDispo);
}

function resetDispo () {
    /* on place les images à leur position initiale qui est celle de l'image centrale*/
    for (var i = 1; i < nb; i++) {
        choix[i].setAttribute("style", "top : " + choix[0].style.top + ";left : " + choix[0].style.left + ";");
    }
    anim(false, 1);
    anim(true, 2);
    /*on regarde si on entre la souris sur l'image centrale et on n'écoute plus la sortie de l'image centrale*/
    choix[0].addEventListener("mouseover", modifDispo); 
    choix[0].removeEventListener("mouseout", resetDispo);  
}

function anim (bool, numAnim) {
    /* si on doit animer le placement des images*/
    if (bool === true) {
        for (var i = 1; i < nb; i++) {
            if (!choix[i].classList.contains("animation" + numAnim)) {
                choix[i].classList.add("animation" + numAnim);
            }
        }
    }
    /* si on ne doit pas animer le placement des images*/
    else {
        for (var i = 1; i < nb; i++) {
            if (choix[i].classList.contains("animation1")) {
                choix[i].classList.remove("animation1");
            }
            if (choix[i].classList.contains("animation2")) {
                choix[i].classList.remove("animation2");
            }
        }
    }
}