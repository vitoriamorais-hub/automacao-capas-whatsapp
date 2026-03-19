const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// CONFIGURAÇÃO DE TAMANHOS (A Kikker maior que o cliente)
const MAX_KIKKER_SIZE = 250; 
const MAX_CLIENT_SIZE = 180; 

// Imagens base
const background = new Image();
background.src = "background.png"; 

const kikkerLogo = new Image();
kikkerLogo.src = "logo-kikker.png"; 

let clientLogo = new Image();
let clientLogoLoaded = false;

document.getElementById("upload").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        clientLogo = new Image();
        clientLogo.onload = function() {
            clientLogoLoaded = true;
        };
        clientLogo.src = event.target.result;
    };
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
});

function generateImage() {
    if (!clientLogoLoaded) {
        alert("Por favor, selecione o logo do cliente primeiro!");
        return;
    }

    ctx.clearRect(0, 0, 500, 500);

    // 1. Desenha o Fundo
    ctx.drawImage(background, 0, 0, 500, 500);

    // 2. Desenha o Logo KIKKER (MAIOR - TOPO)
    const ratioK = Math.min(MAX_KIKKER_SIZE / kikkerLogo.width, MAX_KIKKER_SIZE / kikkerLogo.height);
    const kw = kikkerLogo.width * ratioK;
    const kh = kikkerLogo.height * ratioK;
    ctx.drawImage(kikkerLogo, (500 - kw) / 2, 60, kw, kh);

    // 3. Linha Divisória
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.lineTo(350, 200);
    ctx.strokeStyle = "rgba(204, 204, 204, 0.6)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. Desenha o Logo do CLIENTE (MENOR - BASE)
    const ratioC = Math.min(MAX_CLIENT_SIZE / clientLogo.width, MAX_CLIENT_SIZE / clientLogo.height);
    const cw = clientLogo.width * ratioC;
    const ch = clientLogo.height * ratioC;
    // Centralizado e posicionado abaixo da linha
    ctx.drawImage(clientLogo, (500 - cw) / 2, 260, cw, ch);

    // 5. Download
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "inline-block";
    link.innerText = "3. Baixar Capa de Grupo";
}
