export default function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function(){
    return this.questions[this.currentIndex];
}

Quiz.prototype.incrementIndex = function(){
    this.currentIndex++;
    return this.currentIndex;
}

Quiz.prototype.hasEnded = function(){
    return this.currentIndex === this.questions.length;
}

Quiz.prototype.guess = function(userGuess){
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion.isCorrect(userGuess)) {
        this.score++;
    }
    this.incrementIndex();
}

Quiz.prototype.reset = function(){
    this.score = 0;
    this.currentIndex = 0;
}