"use strict";

var handleQuiz = function handleQuiz(e) {
    e.preventDefault();

    $("#quizMessage").animate({ width: 'hide' }, 350);

    if ($("#quizSubmitType").val() == '' || $("#quizSubmitValue").val() == '' || $("#quizAdditionalValue").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#quizForm").attr("action"), $("#quizForm").serialize(), function () {
        loadQuizsFromServer();
    });

    return false;
};

var QuizForm = function QuizForm(props) {
    return React.createElement(
        "form",
        { id: "quizForm",
            onSubmit: handleQuiz,
            name: "quizForm",
            action: "/maker",
            method: "POST",
            className: "quizForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Submission Type: "
        ),
        React.createElement("input", { id: "quizSubmitType", type: "text", name: "name", placeholder: "Submission Type" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Submission Value: "
        ),
        React.createElement("input", { id: "quizSubmitValue", type: "text", name: "age", placeholder: "Submission Value" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Additional Values: "
        ),
        React.createElement("input", { id: "quizAdditionalValue", type: "text", name: "level", placeholder: "Additional Values" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeQuizSubmit", type: "submit", value: "Make Quiz" })
    );
};

var QuizList = function QuizList(props) {
    if (props.quizs.length === 0) {
        return React.createElement(
            "div",
            { className: "quizList" },
            React.createElement(
                "h3",
                { className: "emptyQuiz" },
                "No quizs yet"
            )
        );
    }

    var quizNodes = props.quizs.map(function (quiz) {
        return React.createElement(
            "form",
            { id: "quizForm",
                onSubmit: handleQuiz,
                name: "quizForm",
                action: "/maker",
                method: "POST",
                className: "quizForm"
            },
            React.createElement(
                "label",
                { htmlFor: "name" },
                "Submission Type: "
            ),
            React.createElement("input", { id: "quizSubmitType{quiz.name}", type: "text", name: "name", placeholder: "Submission Type", value: quiz.name }),
            React.createElement(
                "label",
                { htmlFor: "age" },
                "Submission Value: "
            ),
            React.createElement("input", { id: "quizSubmitValue{quiz.name}", type: "text", name: "age", placeholder: "Submission Value", value: quiz.age }),
            React.createElement(
                "label",
                { htmlFor: "level" },
                "Additional Values: "
            ),
            React.createElement("input", { id: "quizAdditionalValue{quiz.name}", type: "text", name: "level", placeholder: "Additional Values", value: quiz.level }),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "makeQuizSubmit", type: "submit", value: "Make Quiz" })
        )
        /*
        <div key={quiz._id} className="quiz">
            <h3 className="quizSubmitType"> Name: {quiz.name} </h3>
            <h3 className="quizSubmitValue"> Age: {quiz.age} </h3>
            <h3 className="quizAdditionalValue"> Level: {quiz.level} </h3>
        </div>
        */
        ;
    });

    return React.createElement(
        "div",
        { className: "quizList" },
        quizNodes
    );
};

var loadQuizsFromServer = function loadQuizsFromServer() {
    sendAjax('GET', '/getQuizs', null, function (data) {
        console.dir('loading');
        ReactDOM.render(React.createElement(QuizList, { quizs: data.quizs }), document.querySelector("#quizs"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(QuizForm, { csrf: csrf }), document.querySelector("#makeQuiz"));

    ReactDOM.render(React.createElement(QuizForm, { quizs: [] }), document.querySelector("#quizs"));

    loadQuizsFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
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
