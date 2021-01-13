let canvas = document.getElementById("snake");
let contexto = canvas.getContext("2d");
let box = 32;
let imagemBackground = new Image();
imagemBackground.src = 'img/continents-28616_640.png';
let ambulancia = [];
ambulancia[0] = {
    x: 1 * box,
    y: 1 * box
}
let direcao = "right";
let virus = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criaBg() {
    contexto.fillStyle = "mintcream";
    contexto.fillRect(0, 0, 16 * box, 16 * box);
    contexto.drawImage(imagemBackground, 0, 0);
}

function criarAmbulancia() {
    for (i = 0; i < ambulancia.length; i++) {
        contexto.fillStyle = "firebrick";
        contexto.font = '32px FontAwesome';
        contexto.fillText('\uf0f9', ambulancia[i].x, ambulancia[i].y);
    }
}

function desenharVirus() {
    contexto.fillStyle = "forestgreen";
    contexto.font= '32px FontAwesome';
    contexto.fillText('\ue074', virus.x, virus.y);
}

document.addEventListener('keydown', atualizar);

function atualizar(event) {
    if (event.keyCode == 65 && direcao != "right") direcao = "left";
    if (event.keyCode == 87 && direcao != "down") direcao = "up";
    if (event.keyCode == 68 && direcao != "left") direcao = "right";
    if (event.keyCode == 83 && direcao != "up") direcao = "down";
}

function iniciarJogo() {
    if (ambulancia[0].x > 15 * box && direcao == "right") ambulancia[0].x = 0;
    if (ambulancia[0].x < 0 && direcao == "left") ambulancia[0].x = 16 * box;
    if (ambulancia[0].y > 15 * box && direcao == "down") ambulancia[0].y = 0;
    if (ambulancia[0].y < 0 && direcao == "up") ambulancia[0].y = 16 * box;

    for (i = 1; i < ambulancia.length; i++) {
        if (ambulancia[0].x == ambulancia[i].x && ambulancia[0].y == ambulancia[i].y) {
            clearInterval(jogo);
            alert("Os hospitais lotaram :(")
        }
    }

    criaBg();
    criarAmbulancia();
    desenharVirus();

    let ambulanciaX = ambulancia[0].x;
    let ambulanciaY = ambulancia[0].y;

    if (direcao == "right") ambulanciaX += box;
    if (direcao == "left") ambulanciaX -=box;
    if (direcao == "up") ambulanciaY -= box;
    if (direcao == "down") ambulanciaY +=box;

    if (ambulanciaX != virus.x || ambulanciaY != virus.y) {
        ambulancia.pop();
    }
    else {
        virus.x = Math.floor(Math.random() * 15 + 1) * box;
        virus.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let novoInicioAmbulancia = {
        x: ambulanciaX,
        y: ambulanciaY
    }

    ambulancia.unshift(novoInicioAmbulancia);
}

let jogo = setInterval(iniciarJogo, 100);