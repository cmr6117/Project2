"use strict";

var handleArtist = function handleArtist(e) {
    e.preventDefault();

    $("#artistMessage").animate({ width: 'hide' }, 350);

    if ($("#artistName").val() == '' || $("#artistAge").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    console.dir('handleartist');
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
            "Name: "
        ),
        React.createElement("input", { id: "artistName", type: "text", name: "name", placeholder: "Artist Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "artistAge", type: "text", name: "age", placeholder: "Artist Age" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Level: "
        ),
        React.createElement("input", { id: "artistLevel", type: "text", name: "level", placeholder: "Artist Level" }),
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
            "div",
            { key: artist._id, className: "artist" },
            React.createElement("img", { src: "/assets/img/artistface.jpeg", alt: "artist face", className: "artistFace" }),
            React.createElement(
                "h3",
                { className: "artistName" },
                " Name: ",
                artist.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "artistAge" },
                " Age: ",
                artist.age,
                " "
            ),
            React.createElement(
                "h3",
                { className: "artistLevel" },
                " Level: ",
                artist.level,
                " "
            )
        );
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
