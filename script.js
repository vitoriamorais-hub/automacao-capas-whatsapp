const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Carregando imagens base
const background = new Image();
background.src = "background.png"; 

const kikkerLogo = new Image();
kikkerLogo.src = "logo-kikker.png"; 

let clientLogo = new Image();
let clientLogoLoaded = false;

// Monitora o upload
document.getElementById("upload").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        clientLogo = new Image();
        clientLogo.onload = function() {
            clientLogoLoaded = true;
            console.log("Logo do cliente carregada!");
        };
        clientLogo.src = event.target.result;
    };
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
});

function generateImage() {
    if (!clientLogoLoaded) {
        alert("Por favor, selecione uma imagem primeiro!");
        return;
    }

    // Limpa o canvas
    ctx.clearRect(0, 0, 500, 500);

    // 1. Fundo
    ctx.drawImage(background, 0, 0, 500, 500);

    // 2. Logo do Cliente (centralizado em cima)
    const cSize = 220;
    ctx.drawImage(clientLogo, (500 - cSize) / 2, 50, cSize, cSize);

    // 3. Linha
    ctx.beginPath();
    ctx.moveTo(100, 310);
    ctx.lineTo(400, 310);
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 4. Logo Kikker (centralizado embaixo)
    const kWidth = 180;
    const kHeight = 70;
    ctx.drawImage(kikkerLogo, (500 - kWidth) / 2, 350, kWidth, kHeight);

    // 5. Libera o download
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "inline-block";
}
