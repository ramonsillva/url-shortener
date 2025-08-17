document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');

    window.shortenURL = async () => {
        const url = urlInput.value;

        if (!url) {
            resultDiv.innerHTML = '<p class="text-red-500">Please enter a URL.</p>';
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
                resultDiv.innerHTML = `<p class="text-green-500">Shortened URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>`;
            } else {
                resultDiv.innerHTML = `<p class="text-red-500">${data.message}</p>`;
            }
        } catch (error) {
            resultDiv.innerHTML = '<p class="text-red-500">An error occurred while shortening the URL.</p>';
        }
    };
});