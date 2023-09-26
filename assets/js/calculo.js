const cursosESemestres = {
    administração: 8,
    "arquitetura-e-urbanismo": 10,
    "ciências-contábeis": 8,
    direito: 10,
    enfermagem: 8,
    "engenharia-civil": 10,
    farmácia: 8,
    medicina: 12,
    odontologia: 10,
    pedagogia: 8
};

// Selecione o elemento do campo de seleção de semestre
const inputSemestre = document.getElementById("inputSemestre");

// Desabilite o campo de seleção de semestre por padrão
inputSemestre.disabled = true;

// Evento de mudança no campo "Curso"
document.getElementById("inputCurso").addEventListener("change", function () {
    const cursoSelecionado = this.value;

    // Obtenha a quantidade de semestres para o curso selecionado
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];

    // Habilitar ou desabilitar o campo de seleção de semestre com base no curso selecionado
    inputSemestre.disabled = quantidadeSemestres === undefined;

    if (!inputSemestre.disabled) {
        // Se o curso selecionado tiver uma quantidade de semestres definida, atualize as opções do campo de seleção de semestre
        inputSemestre.innerHTML = ""; // Limpe as opções existentes

        // Crie as opções de semestre com base na quantidade de semestres
        for (let i = 1; i <= quantidadeSemestres; i++) {
            const option = document.createElement("option");
            option.value = i.toString();
            option.textContent = `${i}º Semestre`;
            inputSemestre.appendChild(option);
        }
    }
});

// Função para calcular o ano de ingresso com base no semestre selecionado
function calcularAnoIngresso(semestreSelecionado) {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    // Obtenha a quantidade de semestres do curso selecionado
    const cursoSelecionado = document.getElementById("inputCurso").value;
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];

    // Calcule o ano de ingresso
    const anoIngresso = anoAtual - Math.floor(semestreSelecionado / 2);

    console.log(`Ano de ingresso para o semestre ${semestreSelecionado}: ${anoIngresso}`);
    return anoIngresso;
}

// Obtendo o valor da mensalidade
const inputValor = document.getElementById("inputValorMensalidade");

// Obtendo a porcentagem do reajuste
const inputReajuste = document.getElementById("inputTxReajuste");

// Evento de clique no botão "Calcular"
document.getElementById("btnCalcular").addEventListener("click", function () {
    const semestreSelecionado = parseInt(inputSemestre.value);
    const valorInicialMensalidade = parseFloat(inputValor.value);
    const taxaReajuste = parseFloat(inputReajuste.value) / 100; // Convertemos a porcentagem para decimal
    calcularValorSemestre(valorInicialMensalidade, taxaReajuste, semestreSelecionado);
});

// Função para calcular o valor de cada semestre com a taxa de reajuste
function calcularValorSemestre(valorInicialMensalidade, taxaReajuste, semestreSelecionado) {
    const cursoSelecionado = document.getElementById("inputCurso").value;
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];

    // Verifique se a quantidade de semestres está definida para o curso selecionado
    if (quantidadeSemestres === undefined) {
        console.error("Quantidade de semestres indefinida para o curso selecionado.");
        return;
    }

    // Calcule o valor de cada semestre com o reajuste
    const valorSemestral = [];

    for (let semestre = 1; semestre <= quantidadeSemestres; semestre++) {
        valorInicialMensalidade *= (1 + taxaReajuste);
        valorSemestral.push(valorInicialMensalidade);
    }

    // Exiba o resultado na página
    exibirResultado(valorSemestral);

    // Exiba o resultado em um alert
    const resultadoAlert = valorSemestral.map((valor, index) => `${index + 1}º Semestre: R$ ${valor.toFixed(2)}`).join('\n');
    alert("Valores Semestrais:\n" + resultadoAlert);
}

// Função para exibir o resultado na página
function exibirResultado(valoresSemestrais) {
    const resultadoDiv = document.getElementById("resultadoId");

    // Crie uma string para exibir o resultado
    const resultadoHTML = `
        <h2>Valores Semestrais:</h2>
        <ul>${valoresSemestrais.map((valor, index) => `<li>${index + 1}º Semestre: R$ ${valor.toFixed(2)}</li>`).join('')}</ul>
    `;

    // Atualize o conteúdo da div com o resultado
    resultadoDiv.innerHTML = resultadoHTML;
}
