"use strict";

var handleArtist = function handleArtist(e) {
    e.preventDefault();

    $("#artistMessage").animate({ width: 'hide' }, 350);

    if ($("#artistSubmitType").val() == '' || $("#artistSubmitValue").val() == '' || $("#artistAdditionalValue").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#artistForm").attr("action"), $("#artistForm").serialize(), function () {
        loadArtistsFromServer();
    });

    return false;
};

var ArtistForm = function ArtistForm(props) {
    return React.createElement(
        "form",
        { id: "artistForm",
            onSubmit: handleArtist,
            name: "artistForm",
            action: "/maker",
            method: "POST",
            className: "artistForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Submission Type: "
        ),
        React.createElement("input", { id: "artistSubmitType", type: "text", name: "name", placeholder: "Submission Type" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Submission Value: "
        ),
        React.createElement("input", { id: "artistSubmitValue", type: "text", name: "age", placeholder: "Submission Value" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Additional Values: "
        ),
        React.createElement("input", { id: "artistAdditionalValue", type: "text", name: "level", placeholder: "Additional Values" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeArtistSubmit", type: "submit", value: "Make Artist" })
    );
};

var ArtistList = function ArtistList(props) {
    if (props.artists.length === 0) {
        return React.createElement(
            "div",
            { className: "artistList" },
            React.createElement(
                "h3",
                { className: "emptyArtist" },
                "No artists yet"
            )
        );
    }

    var artistNodes = props.artists.map(function (artist) {
        return React.createElement(
            "form",
            { id: "artistForm",
                onSubmit: handleArtist,
                name: "artistForm",
                action: "/maker",
                method: "POST",
                className: "artistForm"
            },
            React.createElement(
                "label",
                { htmlFor: "name" },
                "Submission Type: "
            ),
            React.createElement("input", { id: "artistSubmitType{artist.name}", type: "text", name: "name", placeholder: "Submission Type", value: artist.name }),
            React.createElement(
                "label",
                { htmlFor: "age" },
                "Submission Value: "
            ),
            React.createElement("input", { id: "artistSubmitValue{artist.name}", type: "text", name: "age", placeholder: "Submission Value", value: artist.age }),
            React.createElement(
                "label",
                { htmlFor: "level" },
                "Additional Values: "
            ),
            React.createElement("input", { id: "artistAdditionalValue{artist.name}", type: "text", name: "level", placeholder: "Additional Values", value: artist.level }),
            React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
            React.createElement("input", { className: "makeArtistSubmit", type: "submit", value: "Make Artist" })
        )
        /*
        <div key={artist._id} className="artist">
            <h3 className="artistSubmitType"> Name: {artist.name} </h3>
            <h3 className="artistSubmitValue"> Age: {artist.age} </h3>
            <h3 className="artistAdditionalValue"> Level: {artist.level} </h3>
        </div>
        */
        ;
    });

    return React.createElement(
        "div",
        { className: "artistList" },
        artistNodes
    );
};

var loadArtistsFromServer = function loadArtistsFromServer() {
    sendAjax('GET', '/getArtists', null, function (data) {
        console.dir('loading');
        ReactDOM.render(React.createElement(ArtistList, { artists: data.artists }), document.querySelector("#artists"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(ArtistForm, { csrf: csrf }), document.querySelector("#makeArtist"));

    ReactDOM.render(React.createElement(ArtistForm, { artists: [] }), document.querySelector("#artists"));

    loadArtistsFromServer();
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
    $("#artistMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("artistMessage").animate({ width: 'hide' }, 350);
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
