const questions = [
    {
        question: "¿Cuál es el nombre del primer álbum de estudio de Imagine Dragons?",
        a: "Night Visions",
        b: "Smoke + Mirrors",
        c: "Evolve",
        d: "Origins",
        correct: "a"
    },
    {
        question: "¿En qué año Imagine Dragons lanzaron su primer álbum?",
        a: "2010",
        b: "2012",
        c: "2013",
        d: "2015",
        correct: "b"
    },
    {
        question: "¿Cuál de estas canciones no es de Imagine Dragons?",
        a: "Radioactive",
        b: "Thunder",
        c: "Believer",
        d: "Stressed Out",
        correct: "d"
    },
    {
        question: "¿Cuál es el nombre del vocalista principal de Imagine Dragons?",
        a: "Dan Reynolds",
        b: "Wayne Sermon",
        c: "Ben McKee",
        d: "Daniel Platzman",
        correct: "a"
    },
    {
        question: "¿Cuál es el título de la canción de Imagine Dragons que fue utilizada como tema principal de la película 'Transformers: La era de la extinción'?",
        a: "Demons",
        b: "Whatever It Takes",
        c: "Believer",
        d: "Battle Cry",
        correct: "d"
    },
    {
        question: "¿Qué canción de Imagine Dragons alcanzó el número uno en la lista Billboard Hot 100?",
        a: "Radioactive",
        b: "Demons",
        c: "Thunder",
        d: "Believer",
        correct: "a"
    },
    {
        question: "¿Cuál es el nombre del segundo álbum de estudio de Imagine Dragons?",
        a: "Smoke + Mirrors",
        b: "Evolve",
        c: "Origins",
        d: "Night Visions",
        correct: "a"
    },
    {
        question: "¿Quién es el guitarrista principal de Imagine Dragons?",
        a: "Dan Reynolds",
        b: "Wayne Sermon",
        c: "Ben McKee",
        d: "Daniel Platzman",
        correct: "b"
    },
    {
        question: "¿En qué ciudad se formó Imagine Dragons?",
        a: "Los Ángeles",
        b: "Seattle",
        c: "Las Vegas",
        d: "Nueva York",
        correct: "c"
    },
    {
        question: "¿Cómo se llama el EP debut de Imagine Dragons, lanzado en 2009?",
        a: "Imagine Dragons",
        b: "Hell and Silence",
        c: "It's Time",
        d: "Continued Silence",
        correct: "b"
    },
    {
        question: "¿Cuál de los siguientes álbumes de Imagine Dragons fue nominado al Premio Grammy al Mejor Álbum de Música Alternativa?",
        a: "Night Visions",
        b: "Smoke + Mirrors",
        c: "Evolve",
        d: "Origins",
        correct: "a"
    },
    {
        question: "¿Qué sencillo de Imagine Dragons recibió una nominación al Grammy a la Grabación del Año en 2014?",
        a: "Radioactive",
        b: "Demons",
        c: "Believer",
        d: "Thunder",
        correct: "a"
    }
]

const $quiz = document.querySelector('.container_quiz')
const $back = document.querySelector('.back')
const $question = document.querySelector('.question')
const $answerA = document.getElementById('ans_a')
const $answerB = document.getElementById('ans_b')
const $answerC = document.getElementById('ans_c')
const $answerD = document.getElementById('ans_d')
const $answers = document.getElementsByName('answer')
const $btnNext = document.getElementById('submit')

let countTrueAnswers = 0
let countQuestions = 0

load()

$btnNext.addEventListener("click", () => {
    if (getAnswer()) {
        $back.classList.remove('caer')
        setTimeout(() => {
            validateAnswer(getAnswer())
            countQuestions++

            if (countQuestions < questions.length) {
                load()

            } else {
                finalText()
            }
        })

    } else {
        showAlert()
    }
})

function load() {
    $back.classList.add('caer')
    $back.textContent = countQuestions + 1

    cleanOptions()
    let curentIndex = questions[countQuestions]

    $quiz.setAttribute('data-number', countQuestions + 1)
    $question.textContent = curentIndex.question
    $answerA.textContent = curentIndex.a
    $answerB.textContent = curentIndex.b
    $answerC.textContent = curentIndex.c
    $answerD.textContent = curentIndex.d
}

function getAnswer() {
    let answer

    $answers.forEach(item => {
        if (item.checked) {
            answer = item.id
        }
    })
    return answer
}

function validateAnswer(answer) {
    let curentIndex = questions[countQuestions]
    if (curentIndex.correct === answer) {
        return countTrueAnswers++
    }

    return countTrueAnswers
}

function cleanOptions() {
    $answers.forEach(item => {
        item.checked = false
    })
}

function finalText() {
    if (countTrueAnswers === questions.length) {
        showConfetti()
    }

    $quiz.innerHTML = `
    <h2 class="title_final caer">Respondiste correctamente ${countTrueAnswers} de ${questions.length} preguntas.</h2>
    <button onclick="reload()" id="reload">Intentar de nuevo</button>    
    `
}

function reload() {
    location.reload()
}

function showAlert() {
    $quiz.classList.add('show')

    setTimeout(() => {
        $quiz.classList.remove('show')
    }, 300)
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}
