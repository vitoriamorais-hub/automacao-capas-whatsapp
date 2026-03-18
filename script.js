const clientLogoInput = document.getElementById('clientLogo');
const fileNameSpan = document.getElementById('fileName');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('canvasPreview');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = 500;

// Teste de caminhos (Verifique se os nomes no seu computador estão IDÊNTICOS a estes)
const BACKGROUND_SRC = 'assets/background.png';
const KIKKER_LOGO_SRC = 'assets/logo-kikker.png';

let backgroundImg = null;
let kikkerLogoImg = null;
let clientLogoImg = null;

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Não encontrei: ${src}`);
        img.src = src;
    });
}

async function init() {
    try {
        // Tenta carregar as imagens
        backgroundImg = await loadImage(BACKGROUND_SRC);
        kikkerLogoImg = await loadImage(KIKKER_LOGO_SRC);
        drawEverything(); 
        console.log("Sucesso: Background e Logo Kikker carregados.");
    } catch (error) {
        console.error(error);
        alert("ERRO DE ARQUIVO: Verifique se dentro da pasta 'assets' os nomes estão exatamente: background.png e logo-kikker.png (tudo minúsculo).");
    }
}

function drawEverything() {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 1. Fundo
    if (backgroundImg) {
        ctx.drawImage(backgroundImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else {
        // Se o fundo falhar, desenha um cinza claro para não ficar invisível
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // 2. Logo Kikker (Topo)
    if (kikkerLogoImg) {
        const maxWidth = 300; 
        const scale = maxWidth / kikkerLogoImg.width;
        const w = maxWidth;
        const h = kikkerLogoImg.height * scale;
        ctx.drawImage(kikkerLogoImg, (CANVAS_SIZE - w) / 2, 60, w, h);
    }

    // 3. Logo Cliente (Baixo)
    if (clientLogoImg) {
        const maxWidth = 350;
        const maxHeight = 150;
        let w = clientLogoImg.width;
        let h = clientLogoImg.height;

        const ratio = Math.min(maxWidth / w, maxHeight / h);
        w *= ratio;
        h *= ratio;

        ctx.drawImage(clientLogoImg, (CANVAS_SIZE - w) / 2, 280, w, h);
    }
}

clientLogoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
        generateBtn.disabled = false;
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => { clientLogoImg = img; };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

generateBtn.addEventListener('click', () => {
    drawEverything();
    downloadBtn.style.display = 'block';
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'capa-grupo-whatsapp.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

init();
