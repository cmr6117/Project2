let timer = 5;
let recovery = true;
let viewingLog = false;
let backgroundColor = "linear-gradient(rgb(125, 125, 150), rgba(125,125,150,0))";
let currentArtist = "";
let currentSong = "";
let csrfToken;

const handleQuiz = (e) => {
    e.preventDefault();
  
    //console.dir(e.target.id);
    
    $("#quizMessage").animate({width:'hide'},350);
  
    let form = e.target;
    //console.dir(form.action);
  
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
            <div className="quizList" style="backgroundImage:{backgroundColor}">
                <h3 className="emptyQuiz">No quizzes yet</h3>
            </div>
        );
    }
  
    const quizNodes = props.artistOptions.map(function(option) {
        //console.log('option', option)
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
            <h1>The song "<span id="redText">{props.song}</span>" is most commonly attributed to which artist?</h1>
            {quizNodes}
        </div>
    );
};

const Timer = function(props) {
    return (
        <div className="timerDiv">
            {timer}
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
    if(!viewingLog){
        sendAjax('GET', '/getQuizData', null, (data) => {
            ReactDOM.render(
                console.dir(data);
                currentArtist = data.correctArtist;
                currentSong = data.song;
                <QuizList artistOptions={data.artistOptions} song={data.song} correct={data.correctArtist}/>,
              document.querySelector("#quizzes")
            );
        });
    }
    else{
        sendAjax('GET', '/getQuizzes', null, (data) => {
            ReactDOM.render(
                <QuizList artistOptions={data.quizzes} />, document.querySelector("#quizzes")
            );
        });
    }
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        csrfToken = result.csrfToken;
    });
};

const everySecond = () => {
    sendAjax('GET', '/getQuizzes', null, (data) => {
        ReactDOM.render(
            <Timer artistOptions={data.quizzes} />, document.querySelector("#timerSection")
        );
    });
    if(!viewingLog){
        timer--;
    }
    if(timer < 0){
        recovery = !recovery;
        if(recovery){
            let data = {
                "quizCorrect": currentArtist,
                "quizSong": currentSong,
                "quizChoice": "Time's Up",
                "_csrf": csrfToken
            }
            console.dir(data);
            sendAjax('POST', document.querySelector(".quizForm").action, data, () => {});
            timer = 5;
        }
        else{
            loadQuizDataFromServer();
            timer = 10;
        }
    }
};


$(document).ready(function() {
    getToken();
    loadQuizDataFromServer();
    $("#switchViews").click(function() {
        viewingLog = !viewingLog;
    });
    setInterval(everySecond, 1000);
});

