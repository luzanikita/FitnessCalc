click();
// page1();
page2();

function click() {
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

function page2() {
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

    for (var i = 0; i < document.getElementsByClassName('item').length; i++) {
        document.getElementsByClassName('item')[i].onclick = function() {
            document.getElementsByClassName('shadow')[0].style.display = 'block';
            document.getElementsByClassName('extra')[0].style.display = 'block';

            document.getElementsByClassName('shadow')[0].onclick = function() {
                document.getElementsByClassName('shadow')[0].style.display = 'none';
                document.getElementsByClassName('extra')[0].style.display = 'none';
            }
        }
    }
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
    var sport = document.getElementById('physical-activity')
    var sportIndex = sport[sport.selectedIndex].value
    var mass = (weight/((height*height)/10000))

    var fat = mass < 22.5? '(норма)': mass < 30 ? '(ожирение: 1 стадия)' : '(ожирение: 2 стадия)'  

    var kKal = (10*weight + 6.25*height - 5*age + genderIndex)*sportIndex
    document.getElementById('result').display = 'block'
    document.getElementById('bodymass').textContent = `Индекс массы тела: ${mass.toFixed(1)} ${fat}`
    document.getElementById('stableweight').textContent = `Стабильного веса: ${Math.round(kKal)}кКал`
    document.getElementById('weightloss').textContent = `Похудения: ${Math.round(kKal - kKal/5)}кКал`
    document.getElementById('fastweightloss').textContent = `Быстрого похудения: ${Math.round(kKal - kKal/2.5)}кКал`
    document.getElementById('result').style.display = 'block'
}