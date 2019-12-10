let timer = 50;
let recoveryTimer = 0;
let csrfToken;

const handleQuiz = (e) => {
    e.preventDefault();
  
  console.dir(e.target.id);
    
    $("#quizMessage").animate({width:'hide'},350);
  
    let form = e.target;
    console.dir(form.action);
  
    let data = {
      quizCorrect: e.target.querySelector("#quizCorrect").value,
      quizSong: e.target.querySelector("#quizSong").value,
      quizChoice: e.target.querySelector("#quizChoice").value,
      _csrf: csrfToken,
    }
  
    console.dir(data);
    
    sendAjax('POST', form.action, data, () => {
        loadQuizDataFromServer();
    });
    
    return false;
};

const QuizList = function(props) {
    if(props.artistOptions.length === 0) {
        return (
            <div className="quizList">
                <h3 className="emptyQuiz">No quizzes yet</h3>
            </div>
        );
    }
  
    const quizNodes = props.artistOptions.map(function(option) {
      console.log('option', option)
        return (
            <form id={`quizForm${option}`}
                onSubmit={handleQuiz}
                name="quizForm"
                action="/maker"
                method="POST"
                className="quizForm"
            >   
                <input id="quizCorrect" type="hidden" name="quizCorrect" value={props.correct} />
                <input id="quizSong" type="hidden" name="quizSong" value={props.song} />
                <input id="quizChoice" type="submit" name="quizChoice" value={option} />
            </form>
        );
    });
    
    return (
        <div className="quizList">
            {timer}
            <h1>Song: {props.song}</h1>
            {quizNodes}
        </div>
    );
};

const loadQuizzesFromServer = () => {
    //sendAjax('GET', '/getQuizzes', null, (data) => {
    //  console.log('quiz data', data.quizzes);
    //    ReactDOM.render(
    //        <QuizList artistOptions={data.quizzes} />, document.querySelector("#quizzes")
    //    );
    //  console.dir('finished loading');
    //});
};

const loadQuizDataFromServer = () => {
    sendAjax('GET', '/getQuizData', null, (data) => {
    ReactDOM.render(
        <QuizList artistOptions={data.artistOptions} song={data.song} correct={data.correctArtist}/>,
      document.querySelector("#quizzes")
    );
    });
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        csrfToken = result.csrfToken;
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





















