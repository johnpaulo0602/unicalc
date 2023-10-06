const { inputSemestres } = require("./domElements");
const { cursosESemestres } = require("./CursosESemestre")

// Função para habilitar ou desabilitar o campo de seleção de semestre
function habilitarDesabilitarCampoSemestre(cursoSelecionado) {
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];
    inputSemestres.disabled = quantidadeSemestres === undefined;

    if (!inputSemestres.disabled) {
        atualizarOpcoesSemestre(quantidadeSemestres);
    }
}

// Função para atualizar as opções do campo de seleção de semestre
function atualizarOpcoesSemestre(quantidadeSemestres) {
    inputSemestres.innerHTML = "";
    for (let i = 1; i <= quantidadeSemestres; i++) {
        const option = document.createElement("option");
        option.value = i.toString();
        option.textContent = `${i}º Semestre`;
        inputSemestres.appendChild(option);
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
    const semestreSelecionado = parseInt(inputSemestres.value); // Obtém o valor do campo Semestre
    const valorInicialMensalidade = parseFloat(inputValor.value); // Obtém o valor do campo Mensalidade
    const taxaReajuste = parseFloat(inputReajuste.value) / 100; // Obtém o valor do campo Reajuste
    const desconto = parseFloat(inputDesconto.value); // Obtém o valor do campo Juros

    return { semestreSelecionado, valorInicialMensalidade, taxaReajuste, desconto };
}

// Função para calcular o valor por semestre
function calcularValorPorSemestre(mensalidade, taxaReajuste, semestreSelecionado) {
    let valorPorSemestre = mensalidade;

    for (let i = 1; i < semestreSelecionado; i++) {
        valorPorSemestre += valorPorSemestre * (taxaReajuste / 100);
    }

    return valorPorSemestre;
}

// Função para calcular o valor total do curso
function calcularValorTotalCurso(mensalidade, taxaReajuste, semestreSelecionado, quantidadeSemestres) {
    let valorTotal = 0;

    for (let i = semestreSelecionado; i <= quantidadeSemestres; i++) {
        valorTotal += mensalidade;
        mensalidade += mensalidade * (taxaReajuste / 100);
    }

    return valorTotal;
}

// Função para calcular os valores
function calcularValores() {
    // Obtenha os valores inseridos pelo usuário
    const valorMensalidade = parseFloat(document.getElementById("inputValorMensalidade").value);
    const taxaReajuste = parseFloat(document.getElementById("inputTxReajuste").value);
    const semestreSelecionado = parseInt(document.getElementById("inputSemestre").value);
    const cursoSelecionado = document.getElementById("inputCurso").value;
    const possuiBolsa = document.getElementById("inputBolsa").value;
    const desconto = parseFloat(document.getElementById("inputTxJuros").value);
    const aceitouTermos = document.getElementById("gridCheck").checked;

    // Verifique se o usuário aceitou os termos e condições
    if (!aceitouTermos) {
        alert("Por favor, aceite os termos e condições para calcular.");
        return;
    }

    // Obtenha a quantidade de semestres para o curso selecionado
    const quantidadeSemestres = cursosESemestres[cursoSelecionado];

    // Calcule o valor total do curso e o valor por semestre
    const valorPorSemestre = calcularValorPorSemestre(valorMensalidade, taxaReajuste, semestreSelecionado);
    const valorTotal = calcularValorTotalCurso(valorMensalidade, taxaReajuste, semestreSelecionado, quantidadeSemestres);

    for (let i = semestreSelecionado; i <= quantidadeSemestres; i++) {
        valorTotal += valorMensalidade;
        valorPorSemestre += valorMensalidade;

        // Aplicar a taxa de reajuste se necessário
        if (i < quantidadeSemestres) {
            valorMensalidade += valorMensalidade * (taxaReajuste / 100);
        }
    }

    // Aplicar desconto se o usuário tiver uma bolsa
    if (possuiBolsa === "sim") {
        valorPorSemestre -= (valorPorSemestre * desconto) / 100;
    }

    // Exiba os resultados na página
    document.getElementById("valorPorSemestre").textContent = `Valor por Semestre: R$ ${valorPorSemestre.toFixed(2)}`;
    document.getElementById("valorTotalCurso").textContent = `Valor Total do Curso: R$ ${valorTotal.toFixed(2)}`;
}

// Evento de clique no botão "Calcular"
document.getElementById("calcularButton").addEventListener("click", function () {
    calcularValores();
});
