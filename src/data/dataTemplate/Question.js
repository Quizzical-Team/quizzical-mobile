class Question {
    constructor(id, question, answers){
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.correctlyAnswered = 0;
        this.answered = 0;
        this.passed = 0;
    }
}

export default Question;