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
        if (document.getElementsByClassName('list')[i].children.length == 0) { 
            document.getElementsByClassName('period')[i].style.display = 'none';
            count++;
        }
        else
            document.getElementsByClassName('period')[i].style.display = 'block';
    }
    if (count == 4) 
        document.getElementById('empty').style.display = 'block';
    else
        document.getElementById('empty').style.display = 'none';

}

function page2() {
    refreshList();
    // Нажатие на плюсик

    var options = false;
    document.getElementById('add').onclick = function() {
        if (!options) {
            document.getElementById('plus').style.transform = 'rotate(135deg)';
            document.getElementById('food').style.display = 'block';
            document.getElementById('sport').style.display = 'block';
            document.getElementById('food_label').style.display = 'block';
            document.getElementById('sport_label').style.display = 'block';
        }
        else {
            document.getElementById('plus').style.transform = 'rotate(0deg)';
            document.getElementById('food').style.display = 'none';
            document.getElementById('sport').style.display = 'none';
            document.getElementById('food_label').style.display = 'none';
            document.getElementById('sport_label').style.display = 'none';
        }
        options = !options;
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

    // При клике на элементы списка появление окна взаимодейсствия (Редактировать/Удалить)
    var selected;
    for (var i = 0; i < document.getElementsByClassName('item').length; i++) {
        document.getElementsByClassName('item')[i].onclick = function() {
            selected = this;
            document.getElementsByClassName('shadow')[0].style.display = 'block';
            document.getElementsByClassName('extra')[0].style.display = 'block';
            document.getElementsByClassName('extra')[0].children[0].children[0].textContent = 
                this.children[0].children[1].textContent

            document.getElementsByClassName('shadow')[0].onclick = function() {
                document.getElementsByClassName('shadow')[0].style.display = 'none';
                document.getElementsByClassName('extra')[0].style.display = 'none';
            }
        }
    }

    document.getElementById('delete').onclick = function() {
        selected.remove();
        document.getElementsByClassName('shadow')[0].style.display = 'none';
        document.getElementsByClassName('extra')[0].style.display = 'none';
        refreshList()
    }
}