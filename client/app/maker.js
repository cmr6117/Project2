let timer = 50;

const handleQuiz = (e) => {
    e.preventDefault();
    
    $("#quizMessage").animate({width:'hide'},350);
    
    if($("#quizSubmitType").val() == '' || $("#quizSubmitValue").val() == '' || $("#quizAdditionalValue").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }
  
    sendAjax('POST', $("#quizForm").attr("action"), $("#quizForm").serialize(), () => {
        loadQuizsFromServer();
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
    if(props.quizs.length === 0) {
        return (
            <div className="quizList">
                <h3 className="emptyQuiz">No quizs yet</h3>
            </div>
        );
    }
    
    const quizNodes = props.quizs.map(function(quiz) {
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

const loadQuizsFromServer = () => {
    sendAjax('GET', '/getQuizs', null, (data) => {
      console.dir('loading');
        ReactDOM.render(
            <QuizList quizs={data.quizs} />, document.querySelector("#quizs")
        );
      console.dir('finished loading');
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <QuizForm csrf={csrf} />, document.querySelector("#makeQuiz")
    );

    ReactDOM.render(
        <QuizForm quizs={[]} />, document.querySelector("#quizs")
    );

    loadQuizsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

const everySecond = () => {
    timer--;
    loadQuizsFromServer();
};

$(document).ready(function() {
    getToken();
    setInterval(everySecond, 1000);
    alert(props.quizs);
});





















