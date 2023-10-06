// Definição do objeto com a quantidade de semestres por curso
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

// Selecionar elementos do DOM
const inputSemestre = document.getElementById("inputSemestre");
const inputValor = document.getElementById("inputValorMensalidade");
const inputReajuste = document.getElementById("inputTxReajuste");
const inputDesconto = document.getElementById("inputTxJuros");

// Função para habilitar ou desabilitar o campo de seleção de semestre
function habilitarDesabilitarCampoSemestre(cursoSelecionado) {
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];
    inputSemestre.disabled = quantidadeSemestres === undefined;

    if (!inputSemestre.disabled) {
        atualizarOpcoesSemestre(quantidadeSemestres);
    }
}

// Função para atualizar as opções do campo de seleção de semestre
function atualizarOpcoesSemestre(quantidadeSemestres) {
    inputSemestre.innerHTML = "";
    for (let i = 1; i <= quantidadeSemestres; i++) {
        const option = document.createElement("option");
        option.value = i.toString();
        option.textContent = `${i}º Semestre`;
        inputSemestre.appendChild(option);
    }
}

// Função para calcular o ano de ingresso com base no semestre selecionado
function calcularAnoIngresso(semestreSelecionado) {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const anoIngresso = anoAtual - Math.floor(semestreSelecionado / 2);
    console.log(`Ano de ingresso para o semestre ${semestreSelecionado}: ${anoIngresso}`);
    return anoIngresso;
}

// Função para calcular e exibir os valores dos semestres
function calcularValorSemestre(valorInicialMensalidade, taxaReajuste, semestreSelecionado) {
    const cursoSelecionado = document.getElementById("inputCurso").value;
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];

    if (quantidadeSemestres === undefined) {
        console.error("Quantidade de semestres indefinida para o curso selecionado.");
        return;
    }

    const valoresSemestrais = [];

    for (let semestre = semestreSelecionado; semestre <= quantidadeSemestres; semestre++) {
        if (semestre % 2 !== 0 && semestre !== 1) {
            // Aplicar reajuste apenas nos semestres ímpares, exceto o primeiro
            valorInicialMensalidade *= (1 + taxaReajuste);
        }
        valoresSemestrais.push(valorInicialMensalidade);
    }

    exibirResultado(valoresSemestrais, semestreSelecionado);
}

// Função para exibir os resultados na página
function exibirResultado(valoresSemestrais, semestreSelecionado) {
    const resultadoDiv = document.getElementById("resultadoId");

    const resultadoHTML = `
        <h2>Valores Semestrais:</h2>
        <ul>${valoresSemestrais.map((valor, index) => `<li>${index + semestreSelecionado}º Semestre: R$ ${valor.toFixed(2)}</li>`).join('\n')}</ul>
    `;

    resultadoDiv.innerHTML = resultadoHTML;
}

// Função para obter os valores dos campos de entrada
function obterValoresInput() {
    const semestreSelecionado = parseInt(inputSemestre.value); // Obtém o valor do campo Semestre
    const valorInicialMensalidade = parseFloat(inputValor.value); // Obtém o valor do campo Mensalidade
    const taxaReajuste = parseFloat(inputReajuste.value) / 100; // Obtém o valor do campo Reajuste
    const desconto = parseFloat(inputDesconto.value); // Obtém o valor do campo Juros

    return { semestreSelecionado, valorInicialMensalidade, taxaReajuste, desconto };
}

// Evento de mudança no campo "Curso" para habilitar/desabilitar o campo de semestre
document.getElementById("inputCurso").addEventListener("change", function () {
    const cursoSelecionado = this.value;
    habilitarDesabilitarCampoSemestre(cursoSelecionado);
});

// Evento de clique no botão "Calcular" para calcular os valores dos semestres
document.getElementById("btnCalcular").addEventListener("click", function () {
    const { semestreSelecionado, valorInicialMensalidade, taxaReajuste, desconto } = obterValoresInput();
    calcularValorSemestre(valorInicialMensalidade, taxaReajuste, semestreSelecionado, desconto);
});
