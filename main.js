window.onload = function () {
    fetchDataWithInterval("4h");
};

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

function fetchDataWithInterval(interval) {
    const apiUrl = `${corsProxyUrl}https://api.mexc.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=8`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            const seriesData = data.map(item => ({
                x: item[0],
                y: item[4]
            }));

            const series = [{
                name: "BTCUSDT",
                data: seriesData
            }];

            const options = {
                chart: {
                    type: 'area',
                    background: '#252525',
                    height: 350,
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    },
                },
                theme: {
                    mode: 'dark',
                    palette: 'palette1',
                    monochrome: {
                        enabled: true,
                        color: '#255aee',
                        shadeTo: 'dark',
                        shadeIntensity: 0.65
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                series: series,
                xaxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                            colors: '#888888',
                        },
                        datetimeFormatter: {
                            hour: "HH:mm"
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#888888',
                        },
                    }
                },
                tooltip: {
                    enabled: false
                },
                fill: {
                    colors: ['#6ECCAF'],
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.7,
                        opacityTo: 0.2,
                        stops: [0, 90, 100]
                    },
                },
                grid: {
                    show: true,
                    borderColor: '#2b2b2b',
                    strokeDashArray: 0,
                    position: 'back',
                },
                stroke: {
                    show: true,
                    curve: "smooth",
                    lineCap: 'butt',
                    colors: ['#A6F0C6'],
                    width: 1,
                    dashArray: 0,
                },
            };

            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        })
        .catch(error => {
            console.error("API request failed:", error);
        });
}

