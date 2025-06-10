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

        document.getElementById('status-load').innerHTML = `Загрузка завершена`;
        document.getElementById('result').innerHTML =
            result.link
                ? `${result.link}`
                : `Ошибка: ${result.error}`;
    } catch (error) {
        document.getElementById('result').innerHTML = `Ошибка: ${error.message}`;
    }
});