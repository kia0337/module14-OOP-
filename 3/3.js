// Задание 3.
// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.

function makeRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Onload: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result)
            }
        }
    };

    xhr.onerror = function () {
        console.log('Error:', xhr.status);
    };

    xhr.send();
};

const btn = document.querySelector('button');
const result = document.querySelector('.result');

function showResult(apiData) {
    let cards = '';
    apiData.forEach(cat => {
        const cardBlock = `
            <div class="card">
                <img class="card-image" src="https://cataas.com/cat/${cat._id}">
                <p>${cat.owner === "null"?"No owner":cat.owner}</p>
            </div>
        `;
        
        cards += cardBlock;
    });

    result.innerHTML = cards;
}

btn.addEventListener('click', () => {
    const value = document.querySelector('input').value;
    if (value < 1 || value > 10) {
        result.innerHTML = "<p>число вне диапазона от 1 до 10</p>";
    } else {
        url = `https://cataas.com/api/cats?tags=cute&limit=${value}`;
        makeRequest(url, showResult)
    }
})

