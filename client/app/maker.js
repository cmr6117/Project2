let timer = 50;
let recoveryTimer = 0;

const handleQuiz = (e) => {
    e.preventDefault();
    
    $("#quizMessage").animate({width:'hide'},350);
    
    if($("#quizSubmitType").val() == '' || $("#quizSubmitValue").val() == '' || $("#quizAdditionalValue").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }
  
    sendAjax('POST', $("#quizForm").attr("action"), $("#quizForm").serialize(), () => {
        loadQuizzesFromServer();
    });
    
    return false;
};

const QuizForm = (props) => {
    return (
        <form id="quizForm"
            onSubmit={handleQuiz}
            name="quizForm"
            action="/maker"
            method="POST"
            className="quizForm"
        >
            <label htmlFor="name">Submission Type: </label>
            <input id="quizSubmitType" type="text" name="name" placeholder="Submission Type"/>
            <label htmlFor="age">Submission Value: </label>
            <input id="quizSubmitValue" type="text" name="age" placeholder="Submission Value"/>
            <label htmlFor="level">Additional Values: </label>
            <input id="quizAdditionalValue" type="text" name="level" placeholder="Additional Values"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeQuizSubmit" type="submit" value="Make Quiz" />
        </form>
    );
};

const QuizList = function(props) {
    if(props.quizzes.length === 0) {
        return (
            <div className="quizList">
                <h3 className="emptyQuiz">No quizzes yet</h3>
            </div>
        );
    }
    
    const quizNodes = props.quizzes.map(function(quiz) {
        return (
            <form id="quizForm"
                onSubmit={handleQuiz}
                name="quizForm"
                action="/maker"
                method="POST"
                className="quizForm"
            >
                <label htmlFor="name">Submission Type: </label>
                <input id="quizSubmitType{quiz.name}" type="text" name="name" placeholder="Submission Type" value={quiz.name} />
                <label htmlFor="age">Submission Value: </label>
                <input id="quizSubmitValue{quiz.name}" type="text" name="age" placeholder="Submission Value" value={quiz.age} />
                <label htmlFor="level">Additional Values: </label>
                <input id="quizAdditionalValue{quiz.name}" type="text" name="level" placeholder="Additional Values" value={quiz.level} />
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="makeQuizSubmit" type="submit" value="Make Quiz" />
            </form>
        );
    });
    
    return (
        <div className="quizList">
            {timer}
            {quizNodes}
        </div>
    );
};

const loadQuizzesFromServer = () => {
    sendAjax('GET', '/getQuizzes', null, (data) => {
      console.dir('loading');
        ReactDOM.render(
            <QuizList quizzes={data.quizzes} />, document.querySelector("#quizzes")
        );
      console.dir('finished loading');
    });
};

const loadQuizDataFromServer = () => {
    sendAjax('GET', '/getQuizData', null, (data) => {
      console.dir('loading');
//        ReactDOM.render(
//            <QuizList quizzes={data.quizzes} />, document.querySelector("#quizzes")
//        );
      console.dir(data);
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <QuizForm csrf={csrf} />, document.querySelector("#makeQuiz")
    );

    ReactDOM.render(
        <QuizForm quizzes={[]} />, document.querySelector("#quizzes")
    );

    loadQuizzesFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

const everySecond = () => {
    timer--;
    loadQuizzesFromServer();
};

const everyFiveSeconds = () => {
};

$(document).ready(function() {
    getToken();
    setInterval(everySecond, 1000);
    setInterval(everyFiveSeconds, 5000);
});





















