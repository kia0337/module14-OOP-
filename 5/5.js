// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).


const btn = document.querySelector("button");
const input1 = document.querySelector(".page");
const input2 = document.querySelector(".limit");
const result = document.querySelector(".result");


//При перезагрузке
document.addEventListener("DOMContentLoaded",() => {
    memoryItem = localStorage.getItem("lastResponse")
    memoryItem === true?showResult(JSON.parse(memoryItem)):"faulse"
})

// Вывод ошибки
function showEror (messege){
    element = document.createElement("p");
    element.textContent = messege;
    result.append(element);
};

// Запрос

const useRequest = async (page, limit) => {
    const url = `https://cataas.com/api/cats?skip=${page}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch {
        console.log('error');
    }
};

//Результат

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
};

btn.addEventListener('click', async () => {
    const page = Number(input1.value);
    const limit = Number(input2.value);
    const pageError = isNaN(page) || page < 1 || page > 10;
    const limitError = isNaN(limit) || limit < 1 || limit > 10;

    if (pageError) {
        showEror('Номер страницы вне диапазона от 1 до 10');
    }
    if (pageError) {
        showEror('Лимит вне диапазона от 1 до 10');
    }
    if (pageError && limitError) {
        showEror('Номер страницы и лимит вне диапазона от 1 до 10');
    }
    if (!pageError && !limitError) {
        const requestResult = await useRequest(page, limit);
        localStorage.setItem('lastResponse', JSON.stringify(requestResult));
        showResult(requestResult);
    }
})

// skip работает не правильно. я думаю из за кривого бэка на сайте. Использовал этот сайт потому не хочется светить свой API толкен

