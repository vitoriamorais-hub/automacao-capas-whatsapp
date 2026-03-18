// Referências aos elementos HTML
const clientLogoInput = document.getElementById('clientLogo');
const fileNameSpan = document.getElementById('fileName');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('canvasPreview');
const ctx = canvas.getContext('2d');

// Definições de tamanho
const CANVAS_SIZE = 500;

// Caminhos para as imagens fixas na pasta assets
const BACKGROUND_SRC = 'assets/background.png';
const KIKKER_LOGO_SRC = 'assets/logo-kikker.png';

// Variáveis para armazenar as imagens carregadas
let backgroundImg = null;
let kikkerLogoImg = null;
let clientLogoImg = null;

// Função para carregar uma imagem e retornar uma Promessa
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Importante para evitar problemas de CORS no GitHub Pages
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(`Erro ao carregar imagem: ${src}`);
        img.src = src;
    });
}

// Inicialização: Carrega o fundo e o logo da Kikker
async function init() {
    try {
        backgroundImg = await loadImage(BACKGROUND_SRC);
        kikkerLogoImg = await loadImage(KIKKER_LOGO_SRC);
        drawBackgroundAndKikker();
        console.log("Imagens base carregadas com sucesso.");
    } catch (error) {
        console.error(error);
        alert("Erro crítico: Não foi possível carregar as imagens de base. Verifique a pasta 'assets'.");
    }
}

// Desenha o fundo e o logo da Kikker no topo
function drawBackgroundAndKikker() {
    // 1. Limpa o canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // 2. Desenha o Background (500x500px)
    if (backgroundImg) {
        ctx.drawImage(backgroundImg, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // 3. Desenha o Logo da Kikker (Top, Centralizado)
    if (kikkerLogoImg) {
        // Define um tamanho máximo para o logo da Kikker (ex: 200px de largura)
        const maxWidth = 200;
        const scaleFactor = maxWidth / kikkerLogoImg.width;
        const finalWidth = maxWidth;
        const finalHeight = kikkerLogoImg.height * scaleFactor;

        // Posição: Centralizado horizontalmente (x), 40px do topo (y)
        const xPos = (CANVAS_SIZE - finalWidth) / 2;
        const yPos = 40; // 40px de margem do topo

        ctx.drawImage(kikkerLogoImg, xPos, yPos, finalWidth, finalHeight);
    }
}

// Função auxiliar para calcular dimensões mantendo a proporção
function getScaledDimensions(img, maxW, maxH) {
    let width = img.width;
    let height = img.height;

    if (width > maxW) {
        height *= maxW / width;
        width = maxW;
    }

    if (height > maxH) {
        width *= maxH / height;
        height = maxH;
    }

    return { width, height };
}

// Evento: Quando um arquivo de logo do cliente é selecionado
clientLogoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
        
        // Ativa o botão de gerar
        generateBtn.disabled = false;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                clientLogoImg = img;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        fileNameSpan.textContent = "Nenhum arquivo selecionado";
        generateBtn.disabled = true;
        clientLogoImg = null;
    }
});

// Evento: Botão 'Gerar Capa'
generateBtn.addEventListener('click', () => {
    if (!clientLogoImg) {
        alert("Por favor, selecione primeiro o logo do cliente.");
        return;
    }

    // Recarrega fundo e Kikker para garantir que a imagem não se acumule
    drawBackgroundAndKikker();

    // Define a área para o logo do cliente (inferior)
    const maxWidth = 350; // Largura máxima do logo do cliente
    const maxHeight = 200; // Altura máxima do logo do cliente

    // Calcula dimensões escaladas proporcionalmente
    const scaled = getScaledDimensions(clientLogoImg, maxWidth, maxHeight);

    // Posição: Centralizado horizontalmente (x), 260px do topo (y)
    // Isso posiciona o logo do cliente abaixo do centro do canvas
    const xPos = (CANVAS_SIZE - scaled.width) / 2;
    const yPos = 260; 

    // Desenha o logo do cliente
    ctx.drawImage(clientLogoImg, xPos, yPos, scaled.width, scaled.height);

    // Mostra o botão de download
    downloadBtn.style.display = 'block';
});

// Evento: Botão 'Baixar Capa'
downloadBtn.addEventListener('click', () => {
    // Converte o canvas para um link de download de imagem PNG
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'capa-whatsapp-kikker.png'; // Nome padrão do arquivo baixado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Inicia a aplicação
init();
