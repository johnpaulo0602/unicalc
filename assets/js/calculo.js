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