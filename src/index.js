const newBook = document.getElementById('newBook');
const conteiner = document.getElementById('conteiner');

let search = [];

newBook.addEventListener('click', function () {
    let bookInfo = { // объект для хранения промежуточных данных
        nameBook: '',
        autorBook: '',
        urlBook: ''
    };

    const div = document.createElement("div");
    div.classList.add('div');
    conteiner.appendChild(div); // создаем div для карточки книги

    bookInfo.element = div;

    const divImg = document.createElement("div");
    divImg.classList.add('divImg');
    div.appendChild(divImg); //создаем div для обложки/изображения
    let cover = new Image();
    cover.src = 'image/no-book3.jpg';
    divImg.appendChild(cover); //вставляем базовую картинку на место для обложки 

    const divInfo = document.createElement("div");
    divInfo.classList.add('divInfo');
    div.appendChild(divInfo); //создаем div для вывода основной информации о книге

    const divDelOrChange = document.createElement('div');
    divDelOrChange.classList.add('divDelOrChange');
    divInfo.appendChild(divDelOrChange); //создаем div для кнопок "удалить" и "изменить"

    const del = document.createElement('button');
    del.classList.add('divIcon');
    const delImg = new Image();
    delImg.src = 'image/delete.svg';
    delImg.classList.add('icon');
    divDelOrChange.appendChild(del); //создаем кнопку "удалить"
    del.appendChild(delImg); // создаем иконку для кнопки "удалить"

    const divNameBook = document.createElement("div");
    divNameBook.classList.add('infoBook');
    divInfo.appendChild(divNameBook);    //создаем div для названия книги
    let name = input('info', 'Название', divNameBook); //создаем поле для ввода названия пользователем

    const divAutorBook = document.createElement("div");
    divAutorBook.classList.add('infoBook');
    divInfo.appendChild(divAutorBook);    //создаем div для автора книги
    let autor = input('info', 'Автор', divAutorBook);//создаем поле для ввода автора пользователем

    const divImgBook = document.createElement("div");
    divImgBook.classList.add('infoBook');
    divInfo.appendChild(divImgBook);    //создаем div для ссылки на обложку книги
    const image = input('info', 'Url обложки', divImgBook, 'text'); // создаем поле для ввода url обложки

    const divStrBook = document.createElement("div");
    divStrBook.classList.add('infoBook');
    divInfo.appendChild(divStrBook);       //создаем div для отслеживания прочитанных страниц книги
    input('info', 'Прочитано страниц', divStrBook, 'number');//создаем поле для ввода страниц

    const divPlace = document.createElement("divPlace");
    divPlace.classList.add('divPlace');
    divPlace.innerText = 'Прочитано:';
    divInfo.appendChild(divPlace);
    input('inputRead', null, divPlace, 'checkbox');

    const createBook = document.createElement("button");
    createBook.classList.add('createBook');
    createBook.innerText = 'Создать';
    divInfo.appendChild(createBook); //добавляем кнопку "создать"

    createBook.addEventListener('click', function () { //кнопка создать
        text(name, autor);
        if (image.value != '') {
            bookInfo.urlBook = image.value; //сохраняем url в объект
            cover.src = bookInfo.urlBook; //вставляет обложку по url, при условии что стока не пустая
        }
        divInfo.removeChild(createBook); // удалить кнопку создать
        divImgBook.removeChild(image); // удалить div с вводом url

        const edit = document.createElement('button'); //создаем кнопку изменить в памяти
        edit.classList.add('divIcon'); //присваиваем класс
        divDelOrChange.appendChild(edit); // добавляем кнопку изменить

        let changeImg = new Image(); // создаем новый элемент изображения для кнопки "изменить"
        changeImg.src = 'image/add.svg'; //указываем путь картинке для кнопки "изменить"
        changeImg.classList.add('icon'); // присваевам класс
        edit.appendChild(changeImg); //добавляем картинку к кнопке "изменить"

        search.push(bookInfo);

        edit.addEventListener('click', function () { //когда нажимаем кнопку "изменить"
            divNameBook.innerText = ''; // удаляем текст
            let nameChange = input('info', 'Название', divNameBook); // создаем строку
            nameChange.value = bookInfo.nameBook; // вставляем в строку старое значение текста

            divAutorBook.innerText = '';
            let autorChange = input('info', 'Автор', divAutorBook);
            autorChange.value = bookInfo.autorBook;

            let urlChage = input('info', 'Url обложки', divImgBook, 'text');
            urlChage.value = bookInfo.urlBook;

            const save = document.createElement("button"); // создаем в памяти кнопку сохранить
            save.classList.add('createBook'); // присваеваем класс
            save.innerText = 'Сохранить'; // вставляем текст в кнопку
            divInfo.appendChild(save); //добавляем эту кнопку

            divDelOrChange.removeChild(edit); // удаляем кнопку изменить

            save.addEventListener('click', function () { // при нажатии на кнопку "сохранить"
                text(nameChange, autorChange);
                if (urlChage.value != '') {
                    bookInfo.urlBook = urlChage.value;
                    cover.src = bookInfo.urlBook;
                }
                divInfo.removeChild(save);
                divImgBook.removeChild(urlChage);
                divDelOrChange.appendChild(edit);
            });
        });

    });
    del.addEventListener('click', function () {
        conteiner.removeChild(div);
    });
    function text(name, auter) {
        divNameBook.style.fontWeight = 'bold';
        divNameBook.style.fontSize = '25px';
        bookInfo.nameBook = name.value;
        divNameBook.innerText = bookInfo.nameBook;

        divAutorBook.style.fontStyle = 'italic';
        divAutorBook.style.fontSize = '20px';
        bookInfo.autorBook = auter.value;
        divAutorBook.innerText = bookInfo.autorBook;
    }
});

function input(className, placeholder, place, type) {
    const inputInfo = document.createElement('input');
    inputInfo.classList.add(className);
    inputInfo.type = type;
    place.appendChild(inputInfo);
    inputInfo.placeholder = placeholder;
    return inputInfo;
}

const siteSearch = document.getElementById("site-search");
const buttonSearch = document.getElementById("button-search");

buttonSearch.addEventListener('click', function () {
    for (let i = 0; i < search.length; i++){
        if (siteSearch.value != search[i].nameBook){
            search[i].element.style.display = 'none';
        }
        if (siteSearch.value == ''){
            search[i].element.style.display = 'flex';
        }
    }
});


