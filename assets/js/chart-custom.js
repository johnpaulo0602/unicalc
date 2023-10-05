
// gráfico de linha simulando o aumento da mensalidade ao longo do tempo
function createLineChart() {
    var semestreAno = ["1º/2021", "2º/2021", "1º/2022", "2º/2022", "1º/2023"];
    var valoresMensalidade = [1000, 1050, 1100, 1155, 1213];
    var ctx = document.getElementById('graf1').getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: semestreAno, // Mês/Ano no eixo x
            datasets: [{
                label: 'Valor da Mensalidade',
                data: valoresMensalidade, // Valor da Mensalidade no eixo y
                borderColor: 'blue', // Cor da linha
                fill: false // Não preencher a área abaixo da linha
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor da Mensalidade'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Mês/Ano'
                    }
                }
            }
        }
    });
}

// Gráfico de donuts Valor total pago e valor do curso
function createDoughnutChart() {

    // Dados simulados para o gráfico de Doughnut
    const categories = ["Total do Curso", "Valor Pago"];
    const valores = [5000, 2500];

    const canvas = document.getElementById('graf2');

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: valores,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Comparação de Pagamento'
                }
            }
        }
    });
}

// funções para criar os gráficos quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    createLineChart();
    createDoughnutChart();
});