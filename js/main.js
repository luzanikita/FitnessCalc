click()

function click() {
    document.getElementById('profile').onclick = function(){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        this.classList.add('selected');
    }

    document.getElementById('diet').onclick = function(){
        document.getElementsByClassName('selected')[0].classList.remove('selected');
        this.classList.add('selected');
    }
}