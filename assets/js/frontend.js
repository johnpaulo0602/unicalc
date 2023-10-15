// ==========> FUNÇÃO PARA CARREGAR OS CURSOS DO ARQUIVO CURSOS.JSON <========== //

function carregarCursos() {
  fetch('assets/js/cursos.json')
    .then(response => response.json())
    .then(data => {
      const cursosSelect = document.getElementById('inputCurso');
      cursosSelect.innerHTML = '<option value="" selected>Selecione seu curso...</option>';
      data.cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.nome;
        option.textContent = curso.nome;
        cursosSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar dados dos cursos 1:', error);
    });
}

// função para carregar os cursos quando a página for carregada
window.addEventListener('load', carregarCursos);



// ==========> FUNÇÃO PARA HABILITAR O CAMPO DE SELEÇÃO DE SEMESTRE COM BASE NO CURSO ESCOLHIDO <========== //

function habilitarSemestreComBaseNoCurso() {
  const cursoSelecionado = document.getElementById('inputCurso').value;
  const semestreSelect = document.getElementById('inputSemestre');

  // Obter a quantidade de semestres com base no curso escolhido
  fetch('assets/js/cursos.json')
    .then(response => response.json())
    .then(data => {
      const curso = data.cursos.find(c => c.nome === cursoSelecionado);
      if (curso) {
        semestreSelect.disabled = false;
        semestreSelect.innerHTML = '<option value="" selected>Selecione...</option>';
        for (let i = 1; i <= curso.semestres; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = i + 'º';
          semestreSelect.appendChild(option);
        }
      } else {
        // se o curso não estiver na lista, mantém o campo desabilitado com a opção padrão
        semestreSelect.disabled = true;
        semestreSelect.innerHTML = '<option selected>Selecione seu curso primeiro...</option>';
      }
    })
    .catch(error => {
      console.error('Erro ao carregar dados dos cursos 2:', error);
    });
}

// sempre que alterar o input do curso vai ser chamada a função para habilitar o semestre
document.getElementById('inputCurso').addEventListener('change', habilitarSemestreComBaseNoCurso);



// ==========> FUNÇÃO PARA HABILITAR OU DESABILITAR AS OPÇÕES DE BOLSA <========== //

function controlarCamposDeBolsa() {
  const possuiBolsa = document.getElementById('inputBolsa').value;
  const modalidadeBolsa = document.getElementById('inputModalidadeBolsa');
  const txJuros = document.getElementById('inputDescBolsa');

  // se "Não possui bolsa" foi selecionado, desabilite os campos de bolsa
  if (possuiBolsa === 'nao') {
    modalidadeBolsa.disabled = true;
    txJuros.disabled = true;
  } else {
    // caso contrário, habilite os campos
    modalidadeBolsa.disabled = false;
    txJuros.disabled = false;
  }
}

// evento para quando alterar o select do input bolsa chamar a função para habilitar/desbilitar
document.getElementById('inputBolsa').addEventListener('change', controlarCamposDeBolsa);

