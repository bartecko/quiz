import Question from "./question.js";
import Quiz from "./quiz.js";

const App = (() => {
    const quizEl = document.getElementById("app-body");
    const questionEl = document.querySelector(".question");
    const choicesBoxEl = document.querySelector("ul.answers");
    const trackerEl = document.getElementById("tracker");
    const progressInnerEl = document.querySelector(".progress-inner");
    const percentsEl = document.getElementById("percents");
    const messageEl = document.getElementById("message");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");

    const q1 = new Question("What is the JavaScript?", ['Text Editor', 'Programming language', 'HTML element', 'The name of the moovie'], 1);
    const q2 = new Question("What you should type to <> to write JavaScript code inside the HTML?", ['javascript', 'js', 'script', 'link'], 2);
    const q3 = new Question("Which of the following is the correct syntax to display 'Hi friend!' in an alert box using JavaScript?", ['alertbox("Hi friend");', 'msgbox("Hi friend");', 'msg("Hi friend");', 'alert("Hi friend");'], 3);
    const q4 = new Question("What is the correct syntax for adding comments in JavaScript?", ['<-!This is a comment', '//This is a comment', '**This is a comment**', '/*This is a comment'], 1);
    const q5 = new Question("What is the return of typeof []?", ['Object', 'Array', 'null', 'array'], 0);

    const qArray = [q1, q2, q3, q4, q5];
    const quiz = new Quiz(qArray);

    const listeners = _ => {
        nextButtonEl.addEventListener('click', function(){
            const selectedRadioButton = document.querySelector('input[name="choice"]:checked');
            if (selectedRadioButton) {
                const key = Number(selectedRadioButton.getAttribute("id").slice(-1));
                quiz.guess(key);
                renderAll();
            }
            
        });
        restartButtonEl.addEventListener('click', function(){
            //reset quiz
            quiz.reset();
            //rerender the content
            renderAll();
            //get back the next button
            nextButtonEl.style.display = 'block';
            restartButtonEl.style.display = 'none';
        });
    }

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(questionEl, question);
    }

    const renderAnswers = _ => {
        let resultAnswers = ``;
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((choice, index) => {
            resultAnswers += `<li>
                                <input type="radio" name="choice" id="choice${index}">
                                <label for="choice${index}"><i></i>${choice}</label>
                            </li>`;
        });
        //append to ul
        choicesBoxEl.innerHTML = resultAnswers;
    }

    const renderTracker = _ => {
        const indexOfQuestion = quiz.currentIndex;
        setValue(trackerEl, `${indexOfQuestion} of ${quiz.questions.length}`);
    }

    const getPercentages = (num1, num2) => {
        return Math.round(num1 / num2 * 100);
    }

    const changeWidth = (width, maxPercentages) => {
        let loadingBarWidth = setInterval(function(){
            if (width > maxPercentages) {
                clearInterval(loadingBarWidth);
            } else {
                progressInnerEl.style.width = `${width}%`;
                width++;
            }
        }, 5);
    }

    const renderProgress = _ => {
        //get percentages for a progress bar position
        const currentWidth = getPercentages(quiz.currentIndex, quiz.questions.length);
        //run a function to change width
        changeWidth(0, currentWidth);
    }

    const renderPercentages = _ => {
        const currenPercentages = getPercentages(quiz.currentIndex, quiz.questions.length);
        percentsEl.innerText = `${currenPercentages}%`;
    }

    const renderEndScreen = _ => {
        renderProgress();
        renderPercentages();
        renderTracker();
        
        setValue(percentsEl, 'Complete');
        setValue(messageEl, 'All questions are answered');
        //setValue(trackerEl, getPercentages(quiz.score, quiz.questions.length));
        const finalPercentages = getPercentages(quiz.score, quiz.questions.length);
        trackerEl.innerHTML = `Your score: ${finalPercentages} %`;
        if (finalPercentages >= 80) {
            setValue(questionEl , 'Nice job!');
        }
        else if(finalPercentages >= 50){
            setValue(questionEl , 'You should practice more!');
        }
        else {
            setValue(questionEl , 'At least it is done :/');
        }
        nextButtonEl.style.display = 'none';
        restartButtonEl.style.display = 'block';
    }

    const renderAll = _ => {
        listeners();
        if (quiz.hasEnded()) {
            //render endScreen
            renderEndScreen();
        } else {
            //Render the question
            renderQuestion();
            //Render the answers
            renderAnswers();
            //Render tracker
            renderTracker();
            //Render progress
            renderProgress();
            //Render percentages
            renderPercentages();
        }
    }

    return {
        renderAll: renderAll,
        listeners: listeners
    } 

})();
App.renderAll();
App.listeners();




















/* const App = (function() {
    let counter = 0;

    const getCounter = () => counter;

    const setCounter = (newNum) => counter = newNum;

    const incrementCounter = () => counter++;

    return {
        get: getCounter,
        set: setCounter
    }

})();

console.log(App.get());
App.set(3);
console.log(App.get()); */