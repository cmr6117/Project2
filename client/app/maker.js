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
            <label htmlFor="quizCorrect">Submission Type: </label>
            <input id="quizSubmitType" type="text" name="quizCorrect" placeholder="Submission Type"/>
            <label htmlFor="quizChoice">Submission Value: </label>
            <input id="quizSubmitValue" type="text" name="quizChoice" placeholder="Submission Value"/>
            <label htmlFor="quizSong">Additional Values: </label>
            <input id="quizAdditionalValue" type="text" name="quizSong" placeholder="Additional Values"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeQuizSubmit" type="submit" value="Make Quiz" />
        </form>

    );
};

const QuizList = function(props) {
    if(props.quizzes.artistOptions && props.quizzes.artistOptions.length === 0) {
        return (
            <div className="quizList">
                <h3 className="emptyQuiz">No quizzes yet</h3>
            </div>
        );
    }
    
    const quizNodes = props.quizzes.artistOptions.map(function(option) {
        return (
            <form id="quizForm"
                onSubmit={handleQuiz}
                name="quizForm"
                action="/maker"
                method="POST"
                className="quizForm"
            > 
                <input id="quizSubmitType{quiz.quizCorrect}" type="hidden" name="quizCorrect" placeholder="Submission Type" value={props.quizzes.correctArtist} />
                <input id="quizSubmitValue{quiz.quizChoice}" type="submit" name="quizChoice" placeholder="Submission Value" value={quiz.quizChoice} />
                <input type="hidden" name="_csrf" value={props.csrf} />
            </form>
        );
    });
    
    return (
        <div className="quizList">
            {timer}
            <h1>Song: {props.quizzes.song}</h1>
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
    ReactDOM.render(
        <QuizList quizzes={data} />, document.querySelector("#quizzes")
    );
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
    //setInterval(everySecond, 1000);
    //setInterval(everyFiveSeconds, 5000);
    loadQuizDataFromServer();
});





















