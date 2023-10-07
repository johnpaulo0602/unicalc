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

// Evento de mudança no campo "Semestre"
document.getElementById("inputSemestre").addEventListener("change", function () {
    const semestreSelecionado = parseInt(this.value);
    calcularAnoIngresso(semestreSelecionado);
});

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
        Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: 'Por favor, aceite os termos e condições para calcular.'
        });
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
