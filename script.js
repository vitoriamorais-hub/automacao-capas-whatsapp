const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Carregamento das imagens base (Direto na raiz conforme seu print)
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
        clientLogo = new Image(); // Cria uma nova instância
        clientLogo.onload = function() {
            clientLogoLoaded = true;
            console.log("Logo do cliente carregada com sucesso!");
            // Opcional: chamar generateImage() automático aqui se quiser
        };
        clientLogo.src = event.target.result;
    };

    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
});

function generateImage() {
    // 1. Limpa tudo
    ctx.clearRect(0, 0, 500, 500);

    // 2. Desenha o Fundo
    ctx.drawImage(background, 0, 0, 500, 500);

    // 3. Desenha o Logo do Cliente (se estiver carregado)
    if (clientLogoLoaded) {
        const cSize = 220;
        const xCentrado = (500 - cSize) / 2;
        ctx.drawImage(clientLogo, xCentrado, 40, cSize, cSize);
    } else {
        alert("Por favor, selecione uma imagem de logo primeiro!");
        return;
    }

    // 4. Linha Divisória
    ctx.beginPath();
    ctx.moveTo(100, 310);
    ctx.lineTo(400, 310);
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 5. Desenha o Logo da Kikker
    const kWidth = 180;
    const kHeight = 70;
    const kX = (500 - kWidth) / 2;
    ctx.drawImage(kikkerLogo, kX, 350, kWidth, kHeight);

    // 6. Prepara o Download
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "inline-block";
    link.innerText = "Baixar Capa de Grupo";
}
