document.getElementById('cityForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cityInput = document.getElementById('cityInput').value.trim();

    if (!cityInput) {
        document.getElementById('result').textContent = 'Пожалуйста, введите город';
        return;
    }

    try {
        const encodedCity = encodeURIComponent(cityInput);
        const url = `http://localhost:3000/weather?city=${encodedCity}`;

        const statusElement = document.getElementById('status-load');
        const resultElement = document.getElementById('result');

        statusElement.textContent = 'Загрузка...';
        resultElement.textContent = '';

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();

        resultElement.textContent = `Погода в ${cityInput}`;
        statusElement.textContent = 'Загрузка завершена';


        const ctx = document.getElementById('temperatureChart').getContext('2d');

        // Уничтожаем предыдущий график
        if (window.temperatureChart instanceof Chart) {
            window.temperatureChart.destroy();
        }

        // Создаем новый график
        window.temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.metioData.time,
                datasets: [{
                    label: 'Температура',
                    data: data.metioData.temperature,
                    borderColor: 'rgb(5,144,239)',
                    backgroundColor: 'rgba(0,160,255,0.29)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });


    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('result').textContent = `Ошибка: ${error.message}`;
        document.getElementById('status-load').textContent = '';

        if (window.temperatureChart instanceof Chart) {
            window.temperatureChart.destroy();
        }
    }
});

