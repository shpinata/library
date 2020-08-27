const newBook = document.getElementById('newBook');
const conteiner = document.getElementById('conteiner');

function text(div, value) {
    div.style.fontWeight = 'bold';
    div.style.fontSize = '18px';
    div.innerText = value;
}

function newCard({ bookInfo, isCreated }) {
    const { urlBook = 'image/no-book3.jpg', nameBook, autorBook, strBook, chekBook } = bookInfo;

    const div = document.createElement("div");
    div.classList.add('div');
    conteiner.appendChild(div);

    const divImg = document.createElement("div");
    divImg.classList.add('divImg');
    div.appendChild(divImg); //создаем div для обложки/изображения
    let cover = new Image();
    cover.src = urlBook;
    divImg.appendChild(cover);

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

    del.addEventListener('click', function () { 
        conteiner.removeChild(div); //удаляем визуально карточку
        const index = search.findIndex(i => i.nameBook === nameBook); 
        /*
            находим индекс нужной нам карточки в массиве (т.е. необходимый объект),
            и сохраняем в переменную. Для этого делаем эрроу функцию, которая означает
            function (i) {return i.nameBook === nameBook;} - то есть. findIndex как цикл проходит 
            по каждому объекту в массиве, и когда находит совпадение по имени книги между 
            i.nameBook и nameBook (в текущем диве). Тем самым возвращает индекс массива на котором остановился.
        */
        search.splice(index, 1); // удаляем из массива найденный индекс и только его (1)
        const searchString = JSON.stringify(search); // переводим в текст
        localStorage.setItem('search', searchString); // сохнаяем мой массив под ключем 'search' 
    });

    const divNameBook = document.createElement("div");
    divNameBook.classList.add('infoBook');
    divInfo.appendChild(divNameBook);    //создаем div для названия книги

    const divAutorBook = document.createElement("div");
    divAutorBook.classList.add('infoBook');
    divInfo.appendChild(divAutorBook);    //создаем div для автора книги

    const divImgBook = document.createElement("div");
    divImgBook.classList.add('infoBook');
    divInfo.appendChild(divImgBook);    //создаем div для ссылки на обложку книги

    const divStrBook = document.createElement("div");
    divStrBook.classList.add('infoBook');
    divInfo.appendChild(divStrBook);       //создаем div для отслеживания прочитанных страниц книги

    const divPlace = document.createElement("div");
    divPlace.classList.add('divPlace');
    divInfo.appendChild(divPlace);
    const divPlaceText = document.createElement("div");
    divPlaceText.classList.add('divPlace2');
    divPlaceText.innerText = 'Прочитано:';
    divPlace.appendChild(divPlaceText);
    const divPlaceChek = document.createElement("div");
    divPlaceChek.classList.add('divPlace2');
    divPlace.appendChild(divPlaceChek);

    const divCreateBook = document.createElement("div");
    divCreateBook.classList.add('divCreateBook');
    divInfo.appendChild(divCreateBook);

    const chekImg = new Image(); // картинка галочки
    chekImg.src = 'image/checkmark.svg';
    chekImg.classList.add('iconChek');

    function change () {
        const edit = document.createElement('button'); //создаем кнопку изменить в памяти
        edit.classList.add('divIcon'); //присваиваем класс
        divDelOrChange.appendChild(edit); // добавляем кнопку изменить

        let changeImg = new Image(); // создаем новый элемент изображения для кнопки "изменить"
        changeImg.src = 'image/add.svg'; //указываем путь картинке для кнопки "изменить"
        changeImg.classList.add('icon'); // присваевам класс
        edit.appendChild(changeImg); //добавляем картинку к кнопке "изменить"

        edit.addEventListener('click', function () { //когда нажимаем кнопку "изменить"
            divNameBook.innerText = ''; // удаляем текст
            let nameChange = input('info', 'Название', divNameBook); // создаем строку
            nameChange.value = bookInfo.nameBook; // вставляем в строку старое значение текста

            divAutorBook.innerText = '';
            let autorChange = input('info', 'Автор', divAutorBook);
            autorChange.value = bookInfo.autorBook;

            let urlChage = input('info', 'Url обложки', divImgBook, 'text');
            if (bookInfo.urlBook != undefined){
                urlChage.value = bookInfo.urlBook;
            }else{
                urlChage.value = '';
            }
            divStrBook.innerText = '';
            let strChange = input('info', 'Количество страниц', divStrBook, 'number');
            strChange.value = bookInfo.strBook;

            let plase;

            if (bookInfo.chekBook == true){
                divPlaceChek.removeChild(chekImg);
                plase = input('inputRead', null, divPlaceChek, 'checkbox');
                plase.checked = true;
            }else{
                divPlaceText.innerText = 'Прочитано:';                
                plase = input('inputRead', null, divPlaceChek, 'checkbox');
                plase.checked = false;
            }

            const save = document.createElement("button"); // создаем в памяти кнопку сохранить
            save.classList.add('createBook'); // присваеваем класс
            save.innerText = 'Сохранить'; // вставляем текст в кнопку
            divCreateBook.appendChild(save); //добавляем эту кнопку

            divDelOrChange.removeChild(edit); // удаляем кнопку изменить

            save.addEventListener('click', function () { // при нажатии на кнопку "сохранить"
                text(divNameBook, nameChange.value);
                bookInfo.nameBook = nameChange.value;
                text(divAutorBook, autorChange.value);
                bookInfo.autorBook = autorChange.value;
                if (urlChage.value != '') {
                    bookInfo.urlBook = urlChage.value;
                    cover.src = bookInfo.urlBook;
                }
                text(divStrBook, strChange.value);
                bookInfo.strBook = strChange.value;

                if (plase.checked == true){
                    divPlaceChek.removeChild(plase);
                    divPlaceChek.appendChild(chekImg);
                    bookInfo.chekBook = true;
                }else{
                    divPlaceText.innerText = '';
                    divPlaceChek.innerText = '';
                    bookInfo.chekBook = false;
                }

                divCreateBook.removeChild(save);
                divImgBook.removeChild(urlChage);
                divDelOrChange.appendChild(edit);

                searchString = JSON.stringify(search);
                localStorage.setItem('search', searchString);
            });
        });
    }
 
    if (!isCreated) { //когда карточка новая
        const name = input('info', 'Название', divNameBook); //создаем поле для ввода названия пользователем
        const autor = input('info', 'Автор', divAutorBook);//создаем поле для ввода автора пользователем
        const image = input('info', 'Url обложки', divImgBook, 'text'); // создаем поле для ввода url обложки
        const str = input('info', 'Количество страниц', divStrBook, 'number');//создаем поле для ввода страниц
        const plase = input('inputRead', null, divPlaceChek, 'checkbox');

        const createBook = document.createElement("button");
        createBook.classList.add('createBook');
        createBook.innerText = 'Создать';
        divCreateBook.appendChild(createBook); //добавляем кнопку "создать"

        createBook.addEventListener('click', function () { //кнопка создать
            bookInfo.nameBook = name.value;
            text(divNameBook, name.value);
            bookInfo.autorBook = autor.value
            text(divAutorBook, autor.value);
            if (image.value != '') {
                bookInfo.urlBook = image.value; //сохраняем url в объект
                cover.src = bookInfo.urlBook; //вставляет обложку по url, при условии что строка не пустая
            } 
            bookInfo.strBook = str.value;
            text(divStrBook, str.value);
            if (plase.checked == true){
                divPlaceChek.removeChild(plase);
                divPlaceChek.appendChild(chekImg);
                bookInfo.chekBook = true;
            }else{
                divPlaceText.innerText = '';
                divPlaceChek.innerText = '';
                bookInfo.chekBook = false;
            }

            divCreateBook.removeChild(createBook); // удалить кнопку создать
            divImgBook.removeChild(image); // удалить div с вводом url

            change ();

            search.push(bookInfo);

            let searchString = JSON.stringify(search);
            localStorage.setItem('search', searchString);
        });
    }
    if (isCreated) { // отрисовка после перезагрузки
        text(divNameBook, nameBook);
        text(divAutorBook, autorBook);
        text(divStrBook, strBook);
        if (bookInfo.chekBook == true){
            divPlaceChek.appendChild(chekImg);
        }else{
            divPlaceText.innerText = '';
            divPlaceChek.innerText = '';           
        }

        change ();
    }
    return div;
}

let search = JSON.parse(localStorage.getItem('search'));

if (search === null) {
    search = [];
}

for (let i = 0; i < search.length; i++) {
    search[i].element = newCard({bookInfo: search[i], isCreated: true});
    /*
    создаем в объекте ключ element (он используется при фильтрации), для этого нужно из функции вытащить div
    для этого возвращаем его через return. в данном случае мы сделали аналогично этому коду: 

    const b = newCard({ 
        urlBook: search[a].urlBook, 
        nameBook: search[a].nameBook, 
        autorBook: search[a].autorBook, 
        isCreated: true 
    });
    b = search[a].element;
    */
}

newBook.addEventListener('click', function () {
    let bookInfo = { // объект для хранения промежуточных данных
        nameBook: '',
        autorBook: '',
        strBook: '',
        chekBook: ''
    };
    newCard({ bookInfo, isCreated: false });
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
    for (let i = 0; i < search.length; i++) {
        if (siteSearch.value != search[i].nameBook) {
            search[i].element.style.display = 'none';
        }
        if (siteSearch.value == '') {
            search[i].element.style.display = 'flex';
        }
    }
});

siteSearch.addEventListener('change', function () {
    if (siteSearch.value == ''){
        for (let i = 0; i < search.length; i++){
            search[i].element.style.display = 'flex';
        }
    }
});
