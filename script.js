const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Carregamento dos assets (confirme se os nomes no GitHub estão iguais)
const background = new Image();
background.src = "background.png";

const kikkerLogo = new Image();
kikkerLogo.src = "logo-kikker.png";

let clientLogo = new Image();
let clientLogoLoaded = false;

// Evento que "escuta" quando você escolhe o arquivo
const uploadInput = document.getElementById("upload");

if (uploadInput) {
    uploadInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            clientLogo = new Image();
            clientLogo.onload = function() {
                clientLogoLoaded = true;
                console.log("Logo do cliente carregada com sucesso!");
                // Opcional: desenha um preview básico ou alerta
                alert("Logo carregada! Agora clique em 'Gerar Capa'.");
            };
            clientLogo.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
} else {
    console.error("ERRO: Não encontrei o input com id='upload' no seu HTML");
}

function generateImage() {
    if (!clientLogoLoaded) {
        alert("Por favor, selecione a imagem do cliente primeiro no botão 'Escolher Arquivo'.");
        return;
    }

    // Limpa o canvas (500x500)
    ctx.clearRect(0, 0, 500, 500);

    // 1. Desenha o Fundo
    ctx.drawImage(background, 0, 0, 500, 500);

    // 2. Desenha o Logo do Cliente (Centralizado na parte superior)
    const cSize = 220;
    const xCentrado = (500 - cSize) / 2;
    ctx.drawImage(clientLogo, xCentrado, 50, cSize, cSize);

    // 3. Desenha a Linha Decorativa
    ctx.beginPath();
    ctx.moveTo(100, 310);
    ctx.lineTo(400, 310);
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 4. Desenha o Logo da Kikker (Embaixo)
    const kWidth = 180;
    const kHeight = 70;
    const kX = (500 - kWidth) / 2;
    ctx.drawImage(kikkerLogo, kX, 350, kWidth, kHeight);

    // 5. Ativa o Download
    const downloadBtn = document.getElementById("download");
    if (downloadBtn) {
        downloadBtn.href = canvas.toDataURL("image/png");
        downloadBtn.style.display = "inline-block";
        downloadBtn.innerText = "Clique aqui para Baixar";
    }
}
