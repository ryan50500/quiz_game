const baseURL = 'https://opentdb.com/api.php?amount=1';
// whole container
const containerEl = document.querySelector('.container');
const form = document.querySelector('#quiz_form');
// question
const qusEl = document.querySelector('.qus');
// all options
const optionEl = document.querySelector('.all_options');
// button container
const buttonEl = document.querySelector('.buttons');
// score
const ScoreEl = document.querySelector('.scoreBoard .score-num');
// answered questions
const answeredEl = document.querySelector('.scoreBoard .answered-num');

let question, answer;
let options = [];
let score = 0;
let answeredQus = 0;

window.addEventListener('DOMContentLoaded', quizApp);

async function quizApp(){
    const data = await fetchQuiz();
    question = data[0].question;
    options = [];
    answer = data[0].correct_answer;
    data[0].incorrect_answers.map(option => options.push(option));
}

async function fetchQuiz(){
    const response = await fetch(baseURL);
    const data = await response.json();

    console.log(data.results);
    return data.results;
}