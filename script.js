const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "background.png"; 

const kikkerLogo = new Image();
kikkerLogo.src = "logo-kikker.png"; 

let clientLogo = new Image();

document.getElementById("upload").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        clientLogo.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

function generateImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha Background
    ctx.drawImage(background, 0, 0, 500, 500);

    // Desenha Logo Cliente (ajustado para o centro)
    if (clientLogo.src) {
        const cSize = 220;
        ctx.drawImage(clientLogo, (500 - cSize) / 2, 40, cSize, cSize);
    }

    // Linha
    ctx.beginPath();
    ctx.moveTo(100, 310);
    ctx.lineTo(400, 310);
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Desenha Logo Kikker
    const kWidth = 180;
    const kHeight = 70;
    ctx.drawImage(kikkerLogo, (500 - kWidth) / 2, 350, kWidth, kHeight);

    // Botão Download
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "inline-block";
}
