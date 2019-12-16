let timer = 5;
let recovery = true;
let viewingLog = false;
let backgroundColor = "linear-gradient(rgb(125, 125, 150), rgba(125,125,150,0))";
let currentArtist = "";
let currentSong = "";
let victory = false;
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
        victory = data.quizChoice == data.quizCorrect;
        handleRecovery();
    });

    return false;
};

const handleRecovery = (color) => {
    recovery = true;
    timer = 5;
    let divStyle = {
        color: 'color',
    };

    ReactDOM.render(
        <QuizRecovery color={color} style={divStyle} />, document.querySelector("#quizzes")
    ); 
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


const QuizRecovery = function(props) {
    if(victory === ""){
        return (
            <div className="quizList">
                <h1>Get ready for the next question.</h1>
            </div>
        );
    }
    else if(victory === "Time's Up"){
        return (
            <div className="quizList">
                <h1><span id="blueText">Time's Up.</span> Get ready for the next question.</h1>
            </div>
        );
    }
    else if(victory === true){
        return (
            <div className="quizList">
                <h1><span id="greenText">Correct.</span> Get ready for the next question.</h1>
            </div>
        );
    }
    else{
        return (
            <div className="quizList">
                <h1><span id="redText">False.</span> Get ready for the next question.</h1>
            </div>
        );
    }
};


const QuizLog = function(props) {
    if(props.log.length === 0) {
        return (
            <div className="logList">
                <div className="logHeader">
                    <h3 className="emptyLog">No quizzes answered yet</h3>
                </div>
            </div>
        );
    }
    
    const logNodes = props.log.map(function(log) {
        if (log.quizWon){
            return (
                <div key={log._id} className="correctLog">
                    <h3 className="logSong"> Song: {log.quizSong.replace("&#x27;","'").replace("&#x27;","'").replace("&amp;","&")} </h3>
                    <h3 className="logCorrect"> Correct Answer: {log.quizCorrect.replace("&#x27;","'").replace("&amp;","&")} </h3>
                    <h3 className="logChoice"> Your Choice: {log.quizChoice.replace("&#x27;","'").replace("&amp;","&")} </h3>
                </div>
            );
        }
        else{
            return (
                <div key={log._id} className="incorrectLog">
                    <h3 className="logSong"> Song: {log.quizSong.replace("&#x27;","'").replace("&#x27;","'").replace("&amp;","&")} </h3>
                    <h3 className="logCorrect"> Correct Answer: {log.quizCorrect.replace("&#x27;","'").replace("&amp;","&")} </h3>
                    <h3 className="logChoice"> Your Choice: {log.quizChoice.replace("&#x27;","'").replace("&amp;","&")} </h3>
                </div>
            );
        }
    });
    
    return (
        <div className="logList">
            <div className="logHeader">Answer Log</div>
            {logNodes}
        </div>
    );
};



const Timer = function(props) {
    if(timer <= 0){
        return (
            <div className="timerDiv">
                -
            </div>
        );
    }
    else{
        return (
            <div className="timerDiv">
                {timer}
            </div>
        );
    }
};

const PauseButton = function(props) {
    if(viewingLog){
        return (
            <a>Resume</a>
        );        
    }
    return (
        <a>Pause</a>
    );
};

const loadQuizDataFromServer = () => {
    if(!viewingLog){
        sendAjax('GET', '/getQuizData', null, (data) => {
            ReactDOM.render(
                <QuizList artistOptions={data.artistOptions} song={data.song} correct={data.correctArtist}/>,
              document.querySelector("#quizzes")
            );
            currentArtist = data.correctArtist;
            currentSong = data.song;
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
    ReactDOM.render(
        <Timer />, document.querySelector("#timerSection")
    );
    <a>Switch Views</a>

    if(!viewingLog){
        timer--;
    }
    ReactDOM.render(
        <PauseButton />, document.querySelector("#switchViews")
    );

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
            victory = false;
            handleRecovery();
        }
        else{
            timer = 10;
            loadQuizDataFromServer();
        }
    }
};


$(document).ready(function() {
    getToken();
    $("#quizLog").animate({height:'hide'},350);
    $("#switchViews").click(function() {
        viewingLog = !viewingLog;
        sendAjax('GET', '/getQuizzes', null, (data) => {
            ReactDOM.render(
                <QuizLog log={data.quizzes.reverse()} />, document.querySelector("#quizLog")
            );
        });
        $("#quizzes").animate({height:'toggle'},350);
        $("#timerSection").animate({height:'toggle'},350);
        $("#quizLog").animate({height:'toggle'},350);
    });
    handleRecovery();
    setInterval(everySecond, 1000);
});

