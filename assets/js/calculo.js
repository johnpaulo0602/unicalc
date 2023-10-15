// Função para calcular o ano de ingresso com base no semestre selecionado
function calcularAnoIngresso(semestreSelecionado) {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const anoIngresso = anoAtual - Math.floor(semestreSelecionado / 2);
  return anoIngresso;
}

// Evento de escuta para o inputSemestre !!!!!!!!!!!!!
inputSemestre.addEventListener('change', function () {
  const semestreSelecionado = parseInt(inputSemestre.value);
  if (!isNaN(semestreSelecionado)) {
    const anoIngresso = calcularAnoIngresso(semestreSelecionado);
    console.log(`Ano de ingresso para o semestre ${semestreSelecionado}: ${anoIngresso}`);
  }
});

// FUNÇÃO PARA CALCULAR A MENSALIDADE COM BOLSA
function calcularMensalidadeComBolsa() {
  // Obtenha o valor da mensalidade inserido pelo usuário
  const valorMensalidade = parseFloat(document.getElementById("inputValorMensalidade").value);

  // Obtenha a seleção do desconto da bolsa e seu valor
  const possuiBolsa = document.getElementById("inputBolsa").value;
  const descontoBolsa = parseFloat(document.getElementById("inputDescBolsa").value);

  // Valide o valor do desconto da bolsa
  if (descontoBolsa < 0 || descontoBolsa > 100) {
    alert("O valor do desconto da bolsa deve estar entre 0% e 100%.");
    return null; // Saia da função e retorne null se o desconto não for válido
  }

  // Calcule o valor com desconto da bolsa
  if (possuiBolsa === "sim") {
    const valorComBolsa = valorMensalidade - (valorMensalidade * (descontoBolsa / 100));
    document.getElementById("valorMensalidade").textContent = `R$ ${valorComBolsa.toFixed(2).replace('.', ',')}`;
    return valorComBolsa; // Retorne o valor com bolsa
  } else {
    // Se não possui bolsa, exiba o valor original da mensalidade
    document.getElementById("valorMensalidade").textContent = `R$ ${valorMensalidade.toFixed(2).replace('.', ',')}`;
    return valorMensalidade; // Retorne o valor original
  }
}

// Gráficos
var chart2, chart3, chart1;
function initChart() {
  // Gráficos valores pagos e a pagar
  var options2 = {
    series: [0, 0], // Valores iniciais
    labels: ['Valor Pago', 'Falta Pagar'],
    chart: {
      height: 350,
      type: 'donut',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    tooltip: {
      y: {
        formatter: function (value) {
          return `R$ ${value.toFixed(2).replace('.', ',')}`; // Formate o valor para Reais (R$)
        },
      },
    },
  };

  chart2 = new ApexCharts(document.querySelector("#chart-total-curso"), options2);
  chart2.render();

  // Gráfico valor da mensalidade por semestre
  var options3 = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      name: 'Mensalidade',
      data: []
    }],

    xaxis: {
      categories: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre', '7º Semestre', '8º Semestre', '9º Semestre', '10º Semestre'],
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `R$ ${value.toFixed(2).replace('.', ',')}`; // Formate o valor para Reais (R$)
        }
      },
    },
  }

  chart3 = new ApexCharts(document.querySelector("#chart-mensalidade-semestre"), options3);
  chart3.render();

  // Gráfico valor total por semestre
  var options1 = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      data: []
    }],
    xaxis: {
      categories: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre', '7º Semestre', '8º Semestre', '9º Semestre', '10º Semestre'],
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `R$ ${value.toFixed(2).replace('.', ',')}`; // Formate o valor para Reais (R$)
        }
      },
    },
  }

  chart1 = new ApexCharts(document.querySelector("#chart-total-semestre"), options1);
  chart1.render();
}

// Chamada para inicializar o gráfico
initChart();

function calcularMensalidades(semestreSelecionado) {
  const cursosESemestres = {
    "Administração": 8,
    "Ciências Contábeis": 8,
    "Direito": 10,
    "Enfermagem": 10,
    "Engenharia Civil": 10,
    "Farmácia": 10,
    "Medicina": 10,
    "Odontologia": 10,
    "Pedagogia": 8,
    "Fisioterapia": 10,
    "Veterinária": 10,
    "Educação Física": 8,
    "Análise e Desenvolvimento de Sistemas": 5,
    "Sistemas da Informação": 8,
    "Agronomia": 10,
    "Gestão de Recursos Humanos": 5,
    "Nutrição": 8,
    "Psicologia": 10
  };

  const taxaReajuste = parseFloat(document.getElementById('inputTxReajuste').value) / 100;
  const cursoSelecionado = document.getElementById("inputCurso").value;
  const quantidadeSemestres = cursosESemestres[cursoSelecionado];
  let mensalidadeAtual = calcularMensalidadeComBolsa();

  const mensalidadesSemestreArray = [];
  const mensalidadesMensalArray = [];
  let totalPago = 0;

  for (let semestre = 1; semestre <= quantidadeSemestres; semestre++) {
    // Calcula o valor da mensalidade (por mês) e multiplica por 6 para obter o valor do semestre
    const mensalidadeMensal = mensalidadeAtual;
    mensalidadesMensalArray.push(mensalidadeMensal);
    const mensalidadeSemestre = mensalidadeMensal * 6;
    mensalidadesSemestreArray.push(mensalidadeSemestre);

    // Atualize o valor total pago apenas se o semestre atual for menor ou igual ao semestre selecionado
    if (semestre <= semestreSelecionado) {
      totalPago += mensalidadeSemestre;
    }

    // Reajuste anual ao final de cada semestre par
    if (semestre % 2 === 0) {
      mensalidadeAtual = mensalidadeAtual * (1 + taxaReajuste);
    }
  }

  const valorTotalCurso = mensalidadesSemestreArray.reduce((total, mensalidade) => total + mensalidade, 0);
  const valorFaltaPagar = valorTotalCurso - totalPago;

  const seriesDataMensalidade = mensalidadesMensalArray.map(value => value.toFixed(2).replace('.', ','));
  const seriesDataSemestre = mensalidadesSemestreArray.map(value => value.toFixed(2).replace('.', ','));

  // Atualize os valores no gráfico
  if (chart2) {
    chart2.updateOptions({
      series: [totalPago, valorFaltaPagar]
    });
    // chart2.render();
  };

  // Atualize o gráfico de valor da mensalidade por semestre
  if (chart3) {
    chart3.updateOptions({
      series: [{
        name: 'Mensalidade',
        data: seriesDataMensalidade,
      }]
    });
    // chart3.render();
  }

  // Atualize o gráfico de valor total por semestre
  if (chart1) {
    chart1.updateOptions({
      series: [{
        name: 'Valor total do semestre',
        data: seriesDataSemestre,
      }]
    });
    // chart1.render();
  }

  document.getElementById('valorTotalCurso').textContent = `R$ ${valorTotalCurso.toFixed(2).replace('.', ',')}`;
  document.getElementById('valorPago').textContent = `R$ ${totalPago.toFixed(2).replace('.', ',')}`;
  document.getElementById('valorFaltaPagar').textContent = `R$ ${valorFaltaPagar.toFixed(2).replace('.', ',')}`;
  console.log(mensalidadesMensalArray); // Mensalidades individuais de cada semestre em meses
}

document.getElementById('calculoForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio do formulário

  // Obtenha o valor do semestre selecionado
  const semestreSelecionado = parseInt(inputSemestre.value);
  calcularMensalidades(semestreSelecionado);
  calcularMensalidadeComBolsa();

  // Torna a div "resultados" visível
  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.classList.remove('d-none');

  // Role a página até a div "resultados"
  resultadosDiv.scrollIntoView({ behavior: 'smooth' })
});