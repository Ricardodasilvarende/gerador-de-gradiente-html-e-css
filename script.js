// Captura de todos os elementos necessários do DOM
const preview = document.getElementById('preview');
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const typeSelect = document.getElementById('type');
const angleInput = document.getElementById('angle');
const angleValue = document.getElementById('angle-value');
const angleContainer = document.getElementById('angle-container');
const cssCode = document.getElementById('css-code');
const btnCopy = document.getElementById('btn-copy');

/**
 * Função responsável por ler as configurações atuais,
 * gerar a string de CSS correspondente e aplicá-la à tela.
 */
function updateGradient() {
    const c1 = color1.value;
    const c2 = color2.value;
    const type = typeSelect.value;
    let gradientString = '';

    if (type === 'linear') {
        // Exibe o controle de ângulo se o tipo for linear
        angleContainer.style.display = 'block';
        const angle = angleInput.value;
        angleValue.innerText = `${angle}°`;
        gradientString = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    } else {
        // Oculta o controle de ângulo se o tipo for radial
        angleContainer.style.display = 'none';
        gradientString = `radial-gradient(circle, ${c1}, ${c2})`;
    }

    // Aplica o estilo ao elemento de visualização
    preview.style.background = gradientString;

    // Atualiza a área de texto com a propriedade CSS completa
    cssCode.value = `background: ${gradientString};`;
}

/**
 * Copia o código CSS gerado para a área de transferência do sistema.
 */
function copyToClipboard() {
    cssCode.select();
    cssCode.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(cssCode.value)
        .then(() => {
            const originalText = btnCopy.innerText;
            btnCopy.innerText = 'Copiado!';
            btnCopy.style.backgroundColor = '#4ade80';

            setTimeout(() => {
                btnCopy.innerText = originalText;
                btnCopy.style.backgroundColor = '';
            }, 1500);
        })
        .catch(err => {
            console.error('Erro ao copiar código: ', err);
        });
}

// Adiciona os ouvintes de evento (Listeners)
color1.addEventListener('input', updateGradient);
color2.addEventListener('input', updateGradient);
typeSelect.addEventListener('change', updateGradient);
angleInput.addEventListener('input', updateGradient);
btnCopy.addEventListener('click', copyToClipboard);

// Executa o estado padrão inicial
updateGradient();
