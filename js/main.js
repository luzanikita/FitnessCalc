click();
// page1();
page2();

function click() {
    // Выбор страницы в навбаре

    document.getElementById('profile').onclick = function(){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        this.classList.add('selected');
        document.getElementById('page2').style.display = 'none';
        document.getElementById('page1').style.display = 'block';
    }

    document.getElementById('diet').onclick = function(){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        this.classList.add('selected');
        document.getElementById('page2').style.display = 'block';
        document.getElementById('page1').style.display = 'none';
    }
}

function refreshList() {
    var count = 0;
    for (var i = 0; i < 4; i++) {
        var sum = 0;
        for (var j = 0; j < document.getElementsByClassName('list')[i].children.length; j++) {
            sum += parseInt(document.getElementsByClassName('list')[i].children[j].children[1].textContent);
        }
        if (sum == 0) { 
            document.getElementsByClassName('period')[i].style.display = 'none';
            count++;
        }
        else {
            document.getElementsByClassName('period')[i].style.display = 'block';
            document.getElementsByClassName('head')[i].children[1].children[0].textContent = sum + ' кКал';
        }
    }
    if (count == 4) 
        document.getElementById('empty').style.display = 'block';
    else
        document.getElementById('empty').style.display = 'none';
}

// Создание элемента
function createItem(nameText, gramm) {
    var item = document.createElement('div');
    item.className = 'row item';

    var col8 = document.createElement('div');
    col8.className = 'col-8';
    item.appendChild(col8);

    var space = document.createElement('span');
    space.textContent = '&nbsp&nbsp&nbsp&nbsp';
    col8.appendChild(space);

    var name = document.createElement('span');
    name.textContent = nameText + ' (' + gramm + ' г)';
    col8.appendChild(name);

    var col3 = document.createElement('div');
    col3.className = 'col-3';
    item.appendChild(col3);

    var energy = document.createElement('span');
    energy.className = 'float-right';
    energy.textContent = 3 * parseInt(gramm);
    col3.appendChild(energy);

    var col1 = document.createElement('div');
    col1.className = 'col-1';
    item.appendChild(col1);

    return item;
}

function page2() {
    refreshList();

    // Нажатие на плюсик

    var options = false;

    function closePlus() {
        if (options) {
            document.getElementById('plus').style.transform = 'rotate(0deg)';
            document.getElementById('food').style.display = 'none';
            document.getElementById('sport').style.display = 'none';
            document.getElementById('food_label').style.display = 'none';
            document.getElementById('sport_label').style.display = 'none';
            options = !options;
        }
    }

    document.getElementById('any').onclick = function() {
       closePlus();
    }

    document.getElementById('add').onclick = function() {
        if (!options) {
            document.getElementById('plus').style.transform = 'rotate(135deg)';
            document.getElementById('food').style.display = 'block';
            document.getElementById('sport').style.display = 'block';
            document.getElementById('food_label').style.display = 'block';
            document.getElementById('sport_label').style.display = 'block';
            options = !options;
        }
        else {
            closePlus();
        }
    }
    
    // Добавить еду

    // document.getElementById('food').onclick = function() {
    //     closePlus();
    //     document.getElementById('shadow').style.display = 'block';
    //     document.getElementById('add_food').style.display = 'block';
    //     document.getElementById('add-cancel').onclick = function() {
    //         document.getElementById('shadow').style.display = 'none';
    //         document.getElementById('add_food').style.display = 'none';
    //     }
    //     document.getElementById('add-ok').onclick = function() {
    //         var period = ['Завтрак', 'Обед', 'Ужин'];

    //         if (document.getElementById('food_search').value in 
    //             ['Банан', 'Гречневая каша', 'Куриное филе', 'Яблоко']
    //             && document.getElementById('food_weight').value > 0) {
    //                 var item = createItem(document.getElementById('food_search').value,
    //                     document.getElementById('food_weight').value);
    //                 document.getElementsByClassName('list')
    //                     [time.indexOf(document.getElementById(document.getElementById('period-select').value))]
    //                     .appendChild(item);
    //         }

    //         refreshList();
    //         document.getElementById('shadow').style.display = 'none';
    //         document.getElementById('add_food').style.display = 'none';
    //     }
    // }

    // Скрыть раскрыть список по клику на заголовок (Завтрак, Обед, ...)

    document.getElementsByClassName('head')[0].onclick = function() {
        if (document.getElementsByClassName('list')[0].style.display != 'none')
            document.getElementsByClassName('list')[0].style.display = 'none';
        else
            document.getElementsByClassName('list')[0].style.display = 'block';
    }

    document.getElementsByClassName('head')[1].onclick = function() {
        if (document.getElementsByClassName('list')[1].style.display != 'none')
            document.getElementsByClassName('list')[1].style.display = 'none';
        else
            document.getElementsByClassName('list')[1].style.display = 'block';
    }

    document.getElementsByClassName('head')[2].onclick = function() {
        if (document.getElementsByClassName('list')[2].style.display != 'none')
            document.getElementsByClassName('list')[2].style.display = 'none';
        else
            document.getElementsByClassName('list')[2].style.display = 'block';
    }

    document.getElementsByClassName('head')[3].onclick = function() {
        if (document.getElementsByClassName('list')[3].style.display != 'none')
            document.getElementsByClassName('list')[3].style.display = 'none';
        else
            document.getElementsByClassName('list')[3].style.display = 'block';
    }

    document.getElementById('shadow').onclick = function() {
        document.getElementById('shadow').style.display = 'none';
        for (var i = 0; i < document.getElementsByClassName('extra').length; i++)
            document.getElementsByClassName('extra')[i].style.display = 'none';
    }

    // При клике на элементы списка появление окна взаимодейсствия (Редактировать/Удалить)

    var selected;
    for (var i = 0; i < document.getElementsByClassName('item').length; i++) {
        document.getElementsByClassName('item')[i].onclick = function() {
            selected = this;
            document.getElementById('shadow').style.display = 'block';
            document.getElementsByClassName('extra')[0].style.display = 'block';
            document.getElementsByClassName('extra')[0].children[0].children[0].textContent = 
                this.children[0].children[1].textContent
        }
    }

    // Удалить элемент

    document.getElementById('delete').onclick = function() {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('confirm').style.display = 'block';
        document.getElementById('delete-ok').onclick = function() {
            document.getElementById('confirm').style.display = 'none';
            document.getElementById('shadow').style.display = 'none';
            selected.remove();
            refreshList() 
        }
        document.getElementById('delete-cancel').onclick = function() {
            document.getElementById('confirm').style.display = 'none';
            document.getElementById('shadow').style.display = 'none';
        } 
    }
}