function copyToClipboard() {
    const link = document.getElementById("result").innerText;

    navigator.clipboard.writeText(link).then(() => {
        alert("Ссылка скопирована!")
    })

}


document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    // formData.append('originalName', fileInput.files[0].name);

    try {
        const response = await fetch('http://localhost:3000/upload-file', {
            method: 'POST',
            body: formData
        });

        document.getElementById('status-load').innerHTML = `Загрузка...`;
        const result = await response.json();
        console.log(result);

        document.getElementById('status-load').innerHTML = `Загрузка завершена, можете кликнуть на ссылку, 
        чтобы скопировать`;
        document.getElementById('result').innerHTML =
            result.link
                ? `${result.link}`
                : `Ошибка: ${result.error}`;




        const ctx = document.getElementById('statistics').getContext('2d');

        // Уничтожаем предыдущий график
        if (window.statistics instanceof Chart) {
            window.statistics.destroy();
        }

        // Создаем новый график
        window.statistics = new Chart(ctx, {
            type: 'line',
            data: {
                labels: result.statistics.time,
                datasets: [{
                    label: 'Температура',
                    data: result.statistics.count,
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
        document.getElementById('result').innerHTML = `Ошибка: ${error.message}`;
    }
});