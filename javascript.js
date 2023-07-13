window.addEventListener('DOMContentLoaded', () => {
    const score = document.querySelector('.score0');
    const SCORE = document.querySelector('.score1');
    const kletki = Array.from(document.querySelectorAll('.kletka'));
    const playerDisplay = document.querySelector('.display-player');
    const menuButton = document.querySelector('#menu');
    const NewgameButton = document.querySelector('#Newgame');
    const resetButton = document.querySelector('#reset');
    const resultat = document.querySelector('.resultat');
    score.innerText = '0';
    SCORE.innerText = '0';
    var score0=0;
    var score1=0;
    let pole = ['', '', '', '', '', '', '', '', ''];
    let nowPlayer = 'X';
    let isGameActive = true;
    const X_WON = 'X_WON';
    const O_WON = 'O_WON';
    const TIE = 'TIE';
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    function proverkahoda() {
        let roundWon = false;
        for (let i = 0; i < 8; i++) {
            const winn = win[i];
            const first = pole[winn[0]];
            const second = pole[winn[1]];
            const third = pole[winn[2]];
            if (first === '' || second === '' || third === '') {
                continue;
            }
            if (first === second && second === third) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            RESULTATE(nowPlayer === 'X' ? X_WON : O_WON);
            isGameActive = false;
            return;
        }

        if (!pole.includes(''))
            RESULTATE(TIE);

    }


    const RESULTATE = (type) => {
        switch(type){
            case O_WON:
                resultat.innerHTML = 'ИГРОК <span class="playerO">O</span> ПОБЕДИЛ!!!';
                score0++;
                SCORE.innerText = String(score0);
                break;
            case X_WON:
                resultat.innerHTML = 'ИГРОК <span class="playerX">X</span> ПОБЕДИЛ!!!';
                score1++;
                score.innerText = String(score1);
                break;
            case TIE:
                resultat.innerText = 'НИЧЬЯ';
        }
        resultat.classList.remove('hide');
    };

    const pusto = (kletka) => {
        if (kletka.innerText === 'X' || kletka.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updatepole =  (index) => {
        pole[index] = nowPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${nowPlayer}`);
        nowPlayer = nowPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = nowPlayer;
        playerDisplay.classList.add(`player${nowPlayer}`);
    }

    const userAction = (kletka, index) => {
        if(pusto(kletka) && isGameActive) {
            kletka.innerText = nowPlayer;
            kletka.classList.add(`player${nowPlayer}`);
            updatepole(index);
            proverkahoda();
            changePlayer();
        }
    }

    const resetpole = () => {
        pole = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        resultat.classList.add('hide');

        if (nowPlayer === 'O') {
            changePlayer();
        }

        kletki.forEach(kletka => {
            kletka.innerText = '';
            kletka.classList.remove('playerX');
            kletka.classList.remove('playerO');
        });
    }

    const Newscore =() =>{
        pole = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        resultat.classList.add('hide');

        if (nowPlayer === 'O') {
            changePlayer();
        }

        kletki.forEach(kletka => {
            kletka.innerText = '';
            kletka.classList.remove('playerX');
            kletka.classList.remove('playerO');
        });
        score0 =0;
        score1=0;
        score.innerText = '0';
        SCORE.innerText = '0';

    }

    /*const MENU=( )=>{
        onclick="document.location='menu.html'";
    }*/


    kletki.forEach( (kletka, index) => {
        kletka.addEventListener('click', () => userAction(kletka, index));
    });

    resetButton.addEventListener('click', resetpole);
    //menuButton.addEventListener('click',MENU)
    NewgameButton.addEventListener('click',Newscore);
});