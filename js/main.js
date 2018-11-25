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

    // При клике на элементы списка появление окна взаимодейсствия (Редактировать/Удалить)

    var selected;
    for (var i = 0; i < document.getElementsByClassName('item').length; i++) {
        document.getElementsByClassName('item')[i].onclick = function() {
            selected = this;
            document.getElementById('shadow').style.display = 'block';
            document.getElementsByClassName('extra')[0].style.display = 'block';
            document.getElementsByClassName('extra')[0].children[0].children[0].textContent = 
                this.children[0].children[1].textContent;
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
            document.getElementsByClassName('head')[i].children[1].children[0].textContent = 
                parseInt(document.getElementsByClassName('head')[i].children[1].children[0].textContent) -
                parseInt(selected.children[1].children[0].textContent);
            refreshList();
        }
        document.getElementById('delete-cancel').onclick = function() {
            document.getElementById('confirm').style.display = 'none';
            document.getElementById('shadow').style.display = 'none';
        } 
    }

    // Изменить еду

    document.getElementById('edit').onclick = function() {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('shadow').style.display = 'block';
        document.getElementById('edit_food').style.display = 'block';


        document.getElementById('edit-add-ok').onclick = function() {
            document.getElementById('edit_food_error').style.display = 'none';

            var foodList = ['Банан', 'Гречневая каша', 'Куриное филе', 'Яблоко'];
            if (foodList.indexOf(document.getElementById('edit_food_search').value) >= 0) {
                if (document.getElementById('edit_food_weight').value > 0) {
                    selected.children[0].children[1].textContent =
                        document.getElementById('edit_food_search').value + 
                        ' (' + document.getElementById('edit_food_weight').value + ' г)';
                    
                    selected.children[1].children[0].textContent =
                        3 * parseInt(document.getElementById('edit_food_weight').value) + ' \u00A0';
                    
                    
                    document.getElementById('edit_food_search').value = '';
                    document.getElementById('edit_food_weight').value = '';
                    refreshList();
                    document.getElementById('shadow').style.display = 'none';
                    document.getElementById('edit_food').style.display = 'none';
                    document.getElementById('edit_food_error').style.display = 'none';
                }
                else {
                    document.getElementById('edit_food_error').style.display = 'block';
                    document.getElementById('edit_food_error').children[1].textContent = 'Вес должен быть больше 0';
                }
            }
            else {
                document.getElementById('edit_food_error').style.display = 'block';
                document.getElementById('edit_food_error').children[1].textContent = 'Выберите существующий элемент';                
            }
        }

        document.getElementById('edit-add-cancel').onclick = function() {
            document.getElementById('edit_food_search').value = '';
            document.getElementById('edit_food_weight').value = '';
            document.getElementById('shadow').style.display = 'none';
            document.getElementById('edit_food').style.display = 'none';
            document.getElementById('edit_food_error').style.display = 'none';
        }
    }

    kkal();
}

// Создание элемента

function createItem(nameText, gramm, sport) {
    var item = document.createElement('div');
    item.className = 'row item';

    var col8 = document.createElement('div');
    col8.className = 'col-8';
    item.appendChild(col8);

    var space = document.createElement('span');
    space.textContent = '\u00A0\u00A0\u00A0\u00A0\u00A0';
    col8.appendChild(space);

    var name = document.createElement('span');
    if (sport)
        name.textContent = nameText + ' (' + gramm + ' мин.)';
    else 
        name.textContent = nameText + ' (' + gramm + ' г)';

    col8.appendChild(name);

    var col3 = document.createElement('div');
    col3.className = 'col-3';
    item.appendChild(col3);

    var energy = document.createElement('span');
    energy.className = 'float-right';
    if (sport)
        energy.textContent = -3 * parseInt(gramm) + ' \u00A0';
    else
        energy.textContent = 3 * parseInt(gramm) + ' \u00A0';

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

    document.getElementById('food').onclick = function() {
        closePlus();
        document.getElementById('shadow').style.display = 'block';
        document.getElementById('add_food').style.display = 'block';

        document.getElementById('add-ok').onclick = function() {
            document.getElementById('add_food_error').style.display = 'none';

            var periods = ['Завтрак', 'Обед', 'Ужин'];
            var foodList = ['Банан', 'Гречневая каша', 'Куриное филе', 'Яблоко'];
            if (foodList.indexOf(document.getElementById('food_search').value) >= 0) {
                if (document.getElementById('food_weight').value > 0) {
                    var item = createItem(document.getElementById('food_search').value,
                        document.getElementById('food_weight').value, false);
                    document.getElementsByClassName('list')
                        [periods.indexOf(document.getElementById('period-select').value)]
                        .appendChild(item);
                    
                    document.getElementById('food_search').value = '';
                    document.getElementById('food_weight').value = '';
                    document.getElementById('period-select').value = 'Завтрак';
                    refreshList();
                    document.getElementById('shadow').style.display = 'none';
                    document.getElementById('add_food').style.display = 'none';
                    document.getElementById('add_food_error').style.display = 'none';
                }
                else {
                    document.getElementById('add_food_error').style.display = 'block';
                    document.getElementById('add_food_error').children[1].textContent = 'Вес должен быть больше 0';
                }
            }
            else {
                document.getElementById('add_food_error').style.display = 'block';
                document.getElementById('add_food_error').children[1].textContent = 'Выберите существующий элемент';                
            }
        }

        document.getElementById('add-cancel').onclick = function() {
            document.getElementById('food_search').value = '';
            document.getElementById('food_weight').value = '';
            document.getElementById('period-select').value = 'Завтрак';
            document.getElementById('shadow').style.display = 'none';
            document.getElementById('add_food').style.display = 'none';
            document.getElementById('add_food_error').style.display = 'none';
        }
    }

    // Добавить тренировку

    document.getElementById('sport').onclick = function() {
        closePlus();
        document.getElementById('shadow').style.display = 'block';
        document.getElementById('add_sport').style.display = 'block';

        document.getElementById('sport-ok').onclick = function() {
            var sportList = ['Бег', 'Большой теннис', 'Волейбол', 'Футбол'];
            if (sportList.indexOf(document.getElementById('sport_search').value) >= 0
                && document.getElementById('sport_time').value > 0) {
                    var item = createItem(document.getElementById('sport_search').value,
                        document.getElementById('sport_time').value, true);
                    document.getElementsByClassName('list')[3].appendChild(item);
            }

            document.getElementById('sport_search').value = '';
            document.getElementById('sport_time').value = '';
            refreshList();
            document.getElementById('shadow').style.display = 'none';
            document.getElementById('add_sport').style.display = 'none';
        }

        document.getElementById('sport-cancel').onclick = function() {
            document.getElementById('sport_search').value = '';
            document.getElementById('sport_time').value = '';
            document.getElementById('shadow').style.display = 'none';
            document.getElementById('add_sport').style.display = 'none';
        }
    }

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
        
        document.getElementById('food_search').value = '';
        document.getElementById('food_weight').value = '';
        document.getElementById('period-select').value = 'Завтрак';
        document.getElementById('add_food_error').style.display = 'none';
    }
}

// Подсчет калорий

function kkal() {
    var normal = parseInt(document.getElementById('stableweight').textContent.slice(18));
    var get = 0;
    var spent = 0;

    for (var i = 0; i < document.getElementsByClassName('period').length - 1; i++) {
        get += parseInt(document.getElementsByClassName('head')[i].children[1].children[0].textContent);
    }
    spent = parseInt(document.getElementsByClassName('head')[3].children[1].children[0].textContent);
    left = normal - get - spent;

    document.getElementsByClassName('totals')[0].textContent = normal;
    document.getElementsByClassName('totals')[1].textContent = get;
    document.getElementsByClassName('totals')[2].textContent = -1 * spent;
    document.getElementsByClassName('totals')[3].textContent = left;
}

function calculate()
{

    var height = parseInt(document.getElementById('height').value)
    var weight = parseInt(document.getElementById('weight').value)
    var age = parseInt(document.getElementById('age').value)
    if(isNaN(height)|| isNaN(weight)|| isNaN(age)) 
    {
        document.getElementById('height').style.borderBottom = isNaN(height)? '2px solid red' : '1px solid #ccc'
        document.getElementById('weight').style.borderBottom = isNaN(weight)? '2px solid red' : '1px solid #ccc'
        document.getElementById('age').style.borderBottom = isNaN(age)? '2px solid red' : '1px solid #ccc'
        return
    }


    var genderIndex = document.getElementById('male').checked == true ? 5 : -163
    var gender = genderIndex == 5?'male':'female'
    var sport = document.getElementById('physical-activity')
    var sportIndex = sport[sport.selectedIndex].value
    var mass = (weight/((height*height)/10000))

    if(age <= 25)
    {
        var obj = {
           '(анорексия)' : 17.5,
           '(дефицит массы тела)' : 19.5,
           '(норма)' : 22.9,
           '(избыток веса)' : 27.4,
           '(ожирение I степени)' : 29.9,
           '(ожирение II степени)' : 34.9,
           '(ожирение III степени)' : 39.9,
           '(ожирение IV степени)' : 1000
        }
    }
    else
    {
        var obj = {
           '(анорексия)' : 17.5,
           '(дефицит массы тела)' : 20.0,
           '(норма)' : 25.9,
           '(избыток веса)' : 27.9,
           '(ожирение I степени)' : 30.9,
           '(ожирение II степени)' : 35.9,
           '(ожирение III степени)' : 40.9,
           '(ожирение IV степени)' : 1000
        }  
    }

    for(var key in obj)
    {
        if(mass < obj[key])
        {
            var fat = key
            break
        }
    }
    var kKal = (10*weight + 6.25*height - 5*age + genderIndex)*sportIndex
    document.getElementById('result').display = 'block'
    document.getElementById('bodymass').textContent = `Индекс массы тела: ${mass.toFixed(1)} ${fat}`
    document.getElementById('stableweight').textContent = `Стабильного веса: ${Math.round(kKal)} кКал`
    document.getElementById('weightloss').textContent = `Похудения: ${Math.round(kKal - kKal/5)} кКал`
    document.getElementById('fastweightloss').textContent = `Быстрого похудения: ${Math.round(kKal - kKal/2.5)} кКал`
    document.getElementById('result').style.display = 'block'

    refreshList();
}