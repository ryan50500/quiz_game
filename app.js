// anonymous function - variables are no longer global
(function(){
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
    let ScoreEl = document.querySelector('.scoreBoard .score-num');
    // answered questions
    let answeredEl = document.querySelector('.scoreBoard .answered-num');
    
    let question, answer;
    let options = [];
    let score = 0;
    let answeredQus = 0;
    
    window.addEventListener('DOMContentLoaded', quizApp);
    
    async function quizApp(){
        addPlaceHolder();
        const data = await fetchQuiz();
        question = data[0].question;
        options = [];
        answer = data[0].correct_answer;
        data[0].incorrect_answers.map(option => options.push(option));
        options.splice(Math.floor(Math.random() * options.length +1), 0, answer);
    
        // formulate questions
        generateTemplate(question, options);
        console.log(answer)
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        if(e.target.quiz.value){
            checkQuiz(e.target.quiz.value);
            e.target.querySelector('button').style.display = "none";
            generateButtons()
        }else{
            return
        }
    })
    
    async function fetchQuiz(){
        const response = await fetch(baseURL);
        const data = await response.json();
    
        console.log(data.results);
        return data.results;
    }
    
    // formulate questions
    function generateTemplate (question, options){
        removePLaceholder();
        optionEl.innerHTML = '';
        qusEl.innerHTML = question;
        options.map( (option, index) =>{
            const item = document.createElement('div');
            item.classList.add('option');
            item.innerHTML = `
            <input type="radio" id="option${index+1}" value="${option}" name="quiz">
            <label for="option${index+1}">${option}</label>
            `
            optionEl.appendChild(item);
        })
    }
    
    function checkQuiz (selected) {
        answeredQus++;
        if(selected === answer){
            score++
        }
        updateScoreBoard();
        form.quiz.forEach( input => {
            if(input.value === answer) {
                input.parentElement.classList.add('correct');
            }
        })
    }
    
    function updateScoreBoard(){
        ScoreEl.innerText = score;
        answeredEl.innerText = answeredQus;
    }
    
    function generateButtons(){
        const finishBtn = document.createElement('button');
        finishBtn.innerText = 'Finish';
        finishBtn.setAttribute('type', 'button');
        finishBtn.classList.add('finish-btn');
        buttonEl.appendChild(finishBtn);
    
        const nextBtn = document.createElement('button');
        nextBtn.innerText = 'Next Quiz';
        nextBtn.setAttribute('type', 'button');
        nextBtn.classList.add('next-btn');
        buttonEl.appendChild(nextBtn);
    
        finishBtn.addEventListener('click', finishQuiz);
        nextBtn.addEventListener('click', getNextQuiz);
    }
    
    function getNextQuiz() {
        const nextBtn = document.querySelector('.next-btn');
        const finishBtn = document.querySelector('.finish-btn');
    
        buttonEl.removeChild(nextBtn);
        buttonEl.removeChild(finishBtn);
    
        buttonEl.querySelector('button[type="submit"]').style.display = 'block';
    
        quizApp();
    }
    
    function finishQuiz(){
        const nextBtn = document.querySelector('.next-btn');
        const finishBtn = document.querySelector('.finish-btn');
    
        buttonEl.removeChild(nextBtn);
        buttonEl.removeChild(finishBtn);
        buttonEl.querySelector('button[type="submit"]').style.display = 'block';
    
        const overlay = document.createElement('div');
        overlay.classList.add('result-overlay');
    
        overlay.innerHTML = `
        <div class="final-result">${score}/${answeredQus}</div>
        <button>Play Again</button>
        `
    
        containerEl.appendChild(overlay);
        document.querySelector('.result-overlay button').addEventListener('click', playAgain )
    }
    
        function playAgain(){
            score = 0;
            answeredQus = 0;
            updateScoreBoard();
            document.querySelector('.result-overlay').remove();
            quizApp();
        }
    
        function addPlaceHolder(){
            const placeholder = document.createElement('div');
            placeholder.classList.add('placeholder');
            containerEl.appendChild(placeholder);
        }
    
        function removePLaceholder(){
            const placeholder = document.querySelector('.placeholder')
            containerEl.removeChild(placeholder);
        }
})();
