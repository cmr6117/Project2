"use strict";

var timer = 50;
var recoveryTimer = 0;
var csrfToken = void 0;

var handleQuiz = function handleQuiz(e) {
    e.preventDefault();

    console.dir(e.target.id);

    $("#quizMessage").animate({ width: 'hide' }, 350);

    var form = e.target;
    console.dir(form.action);

    var data = {
        quizCorrect: e.target.querySelector("#quizCorrect").value,
        quizSong: e.target.querySelector("#quizSong").value,
        quizChoice: e.target.querySelector("#quizChoice").value,
        _csrf: csrfToken
    };

    console.dir(data);

    sendAjax('POST', form.action, data, function () {
        loadQuizDataFromServer();
    });

    return false;
};

var QuizList = function QuizList(props) {
    if (props.artistOptions.length === 0) {
        return React.createElement(
            "div",
            { className: "quizList" },
            React.createElement(
                "h3",
                { className: "emptyQuiz" },
                "No quizzes yet"
            )
        );
    }

    var quizNodes = props.artistOptions.map(function (option) {
        console.log('option', option);
        return React.createElement(
            "form",
            { id: "quizForm" + option,
                onSubmit: handleQuiz,
                name: "quizForm",
                action: "/maker",
                method: "POST",
                className: "quizForm"
            },
            React.createElement("input", { id: "quizCorrect", type: "hidden", name: "quizCorrect", value: props.correct }),
            React.createElement("input", { id: "quizSong", type: "hidden", name: "quizSong", value: props.song }),
            React.createElement("input", { id: "quizChoice", type: "submit", name: "quizChoice", value: option })
        );
    });

    return React.createElement(
        "div",
        { className: "quizList" },
        timer,
        React.createElement(
            "h1",
            null,
            "Song: ",
            props.song
        ),
        quizNodes
    );
};

var loadQuizzesFromServer = function loadQuizzesFromServer() {
    //sendAjax('GET', '/getQuizzes', null, (data) => {
    //  console.log('quiz data', data.quizzes);
    //    ReactDOM.render(
    //        <QuizList artistOptions={data.quizzes} />, document.querySelector("#quizzes")
    //    );
    //  console.dir('finished loading');
    //});
};

var loadQuizDataFromServer = function loadQuizDataFromServer() {
    sendAjax('GET', '/getQuizData', null, function (data) {
        ReactDOM.render(React.createElement(QuizList, { artistOptions: data.artistOptions, song: data.song, correct: data.correctArtist }), document.querySelector("#quizzes"));
    });
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        csrfToken = result.csrfToken;
    });
};

var everySecond = function everySecond() {
    timer--;
    loadQuizzesFromServer();
};

var everyFiveSeconds = function everyFiveSeconds() {};

$(document).ready(function () {
    getToken();
    //setInterval(everySecond, 1000);
    //setInterval(everyFiveSeconds, 5000);
    loadQuizDataFromServer();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#quizMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("quizMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
