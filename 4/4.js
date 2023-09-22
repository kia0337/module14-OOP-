// Задание 4

// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.

// https://cataas.com/cat?h=300&w=200


const btn = document.querySelector("button");
const input1 = document.querySelector(".width");
const input2 = document.querySelector(".height");
const result = document.querySelector(".result");

let request = (value1, value2) => fetch(`https://cataas.com/cat?h=${value1}&w=${value2}`)
    .then((response) => {
        return response;
    })
    .then(data => data.url)
    .catch(() => {
        console.log("error");
    });



btn.addEventListener("click",async() =>{
    val1 = Number(input1.value);
    val2 = Number(input2.value);
    if (val1 < 100 || val1 > 300 || isNaN(val1) || val2 < 100 || val2 > 300 || isNaN(val2)) {
        result.textContent = 'одно из чисел вне диапазона от 100 до 300';
    } else {
        const requestResult = await request(val1, val2);
        image = document.createElement('img');
        image.src = requestResult;
        result.append(image);
    };
});
