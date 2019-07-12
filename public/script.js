const question = document.querySelector('#question')
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2')
const buttons = document.querySelectorAll('.answer-btn');
//wersja 1

// const ansewer1 = document.getElementById('answer1')
// const ansewer2 = document.getElementById('answer2')
// const ansewer3 = document.getElementById('answer3')
// const ansewer4 = document.getElementById('answer4')

function fillQuestionElements(data) {


    if (data.winner === true) {
        gameBoard.style.display = 'none'
        h2.innerText = 'Wygrałeś!!!'
        return
    }
    if (data.loser === true) {
        gameBoard.style.display = 'none'
        h2.innerText = 'Przegrałeś';
        return;
    }
    //Pytanie
    question.innerText = data.question;
    //------------------

    //Odpowiedzi

    //wersja 1

    // ansewer1.innerText = data.answers[0];
    // ansewer2.innerText = data.answers[1];
    // ansewer3.innerText = data.answers[2];
    // ansewer4.innerText = data.answers[3];

    //wersja 2

    for (const i in data.answers) {
        const answerEl = document.querySelector(` #answer${Number(i)+1}`);

        // console.log(answerEl);

        answerEl.innerText = data.answers[i]
    }


}



function showNextQuestion() {
    fetch('/question', {
            method: 'GET',

        })
        .then(r => r.json())
        .then(data => {
            fillQuestionElements(data)
        });
}



showNextQuestion()

const goodAnswersSpan = document.getElementById('good-answers')

function handleAnswerFeedback(data) {
    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
}


function sendAnswer(answerIndex) {

    fetch(`/answer/${answerIndex}`, {
            method: 'POST',
        })

        .then(r => r.json())
        .then(data => {
            handleAnswerFeedback(data)
        })

}


//petla for of działa tylko na tablice (dlatego idealnie pasuje na querySelectorAll bo zwraca tablie)

for (const button of buttons) {

    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer;


        sendAnswer(answerIndex)
    });
}

const tipDiv = document.querySelector('#tip')

function handleFriendsAnswer(data) {
    tipDiv.innerText = data.text;

}




function callToAFriend() {
    fetch('/help/friend', {
            method: 'GET',
        })

        .then(r => r.json())
        .then(data => {
            handleFriendsAnswer(data)
        })
}
document.querySelector('#callToAFriend').addEventListener('click', callToAFriend)



// function handleHalfOnHalfAnswer(data) {


//     if (typeof data.text === 'string') {
//         tipDiv.innerText = data.text;
//     } else {
//         console.log(buttons);

//         for (const button of buttons) {
//             if (data.answersToRemove.indexOf(button.innerText) > -1) {
//                 button.innerText = '';
//             }
//         }
//     }
// }
function handleHalfOnHalfAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        for (const button of buttons) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = '';

            }
        }
    }
}


function halfOnHalf() {
    fetch('/help/half', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleHalfOnHalfAnswer(data)
        })
}

document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf)




function handleCrowdAnswer(data) {
    console.log(data);
    if (typeof data.text === "string") {
        tipDiv.innerText = data.text;
    } else {
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText}: ${percent}%`
        })
    }

}



function questionToTheCrowd() {
    fetch('/help/crowd', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleCrowdAnswer(data)
        })
}
document.querySelector('#questionToTheCrowd').addEventListener('click', questionToTheCrowd)