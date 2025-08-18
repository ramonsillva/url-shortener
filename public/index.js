document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');

    window.shortenURL = async () => {
        const url = urlInput.value;

        if (!url) {
            // Mensagem de erro para URL vazia, alinhada com o design preto e branco
            resultDiv.innerHTML = '<p class="text-gray-600 font-semibold">Por favor, insira uma URL.</p>';
            return;
        }

        try {
            const response = await fetch('/api/urls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (response.ok) {
                // Mensagem de sucesso em preto para combinar com o design
                resultDiv.innerHTML = `<p class="text-black font-semibold">URL Encurtada: <a href="${data.shortUrl}" target="_blank" class="underline hover:no-underline">${data.shortUrl}</a></p>`;
            } else {
                // Mensagem de erro em cinza para manter a elegância
                resultDiv.innerHTML = `<p class="text-gray-600 font-semibold">${data.message}</p>`;
            }
        } catch (error) {
            // Mensagem de erro geral também em cinza
            resultDiv.innerHTML = '<p class="text-gray-600 font-semibold">Ocorreu um erro ao encurtar a URL. Tente novamente.</p>';
        }
    };
});