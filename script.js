const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Configurações de Tamanho Máximo para evitar distorção
const MAX_LOGO_SIZE = 200; 

// Carregando as imagens base do seu GitHub
const background = new Image();
background.src = "background.png"; 

const kikkerLogo = new Image();
kikkerLogo.src = "logo-kikker.png"; 

let clientLogo = new Image();
let clientLogoLoaded = false;

// Evento de Upload
document.getElementById("upload").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        clientLogo = new Image();
        clientLogo.onload = function() {
            clientLogoLoaded = true;
            console.log("Logo do cliente carregada com sucesso!");
        };
        clientLogo.src = event.target.result;
    };
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
});

function generateImage() {
    if (!clientLogoLoaded) {
        alert("Por favor, selecione primeiro o arquivo do logo do cliente!");
        return;
    }

    // Limpa o canvas antes de desenhar
    ctx.clearRect(0, 0, 500, 500);

    // 1. DESENHA O FUNDO (BACKGROUND)
    ctx.drawImage(background, 0, 0, 500, 500);

    // 2. DESENHA O LOGO KIKKER (TOPO) - Com cálculo de proporção
    const ratioK = Math.min(MAX_LOGO_SIZE / kikkerLogo.width, (MAX_LOGO_SIZE - 100) / kikkerLogo.height);
    const kw = kikkerLogo.width * ratioK;
    const kh = kikkerLogo.height * ratioK;
    const kx = (500 - kw) / 2;
    const ky = 60; // Posição Y no topo
    ctx.drawImage(kikkerLogo, kx, ky, kw, kh);

    // 3. LINHA DIVISÓRIA
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.lineTo(350, 200);
    ctx.strokeStyle = "rgba(204, 204, 204, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. DESENHA O LOGO DO CLIENTE (BASE) - Com cálculo de proporção
    // Usamos o mesmo MAX_LOGO_SIZE para que fiquem equilibrados
    const ratioC = Math.min(MAX_LOGO_SIZE / clientLogo.width, MAX_LOGO_SIZE / clientLogo.height);
    const cw = clientLogo.width * ratioC;
    const ch = clientLogo.height * ratioC;
    const cx = (500 - cw) / 2;
    const cy = 250; // Posição Y na parte de baixo
    ctx.drawImage(clientLogo, cx, cy, cw, ch);

    // 5. LIBERA O DOWNLOAD
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "inline-block";
}
