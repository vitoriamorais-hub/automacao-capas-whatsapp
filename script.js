const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Carregando as imagens (Certifique-se que os nomes no GitHub estão iguais)
const background = new Image();
background.src = "background.png"; 

const kikkerLogo = new Image();
kikkerLogo.src = "logo-kikker.png"; 

let clientLogo = new Image();
let clientLogoLoaded = false;

// Monitora o upload do logo do cliente
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
        alert("Por favor, selecione uma imagem do cliente primeiro!");
        return;
    }

    // Limpa o canvas 500x500
    ctx.clearRect(0, 0, 500, 500);

    // 1. DESENHA O FUNDO
    ctx.drawImage(background, 0, 0, 500, 500);

    // 2. LOGO DA KIKKER NO TOPO
    const kWidth = 160; // Tamanho um pouco menor para o topo
    const kHeight = 60;
    const kX = (500 - kWidth) / 2;
    ctx.drawImage(kikkerLogo, kX, 60, kWidth, kHeight);

    // 3. LINHA DIVISÓRIA (abaixo da Kikker)
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(350, 150);
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 4. LOGO DO CLIENTE NA BASE
    // Aumentamos o tamanho para 260px para destacar bem o cliente
    const cSize = 260;
    const cX = (500 - cSize) / 2;
    const cY = 180; // Posição vertical começando após a linha
    ctx.drawImage(clientLogo, cX, cY, cSize, cSize);

    // 5. ATIVA O BOTÃO DE DOWNLOAD
    const link = document.getElementById("download");
    link.href = canvas.toDataURL("image/png");
    link.style.display = "inline-block";
    link.innerText = "3. Baixar Capa de Grupo";
}
