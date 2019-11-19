const handleArtist = (e) => {
    e.preventDefault();
    
    $("#artistMessage").animate({width:'hide'},350);
    
    if($("#artistSubmitType").val() == '' || $("#artistSubmitValue").val() == '' || $("#artistAdditionalValue").val() == ''){
        handleError("RAWR! All fields are required");
        return false;
    }
  
    sendAjax('POST', $("#artistForm").attr("action"), $("#artistForm").serialize(), () => {
        loadArtistsFromServer();
    });
    
    return false;
};

const ArtistForm = (props) => {
    return (
        <form id="artistForm"
            onSubmit={handleArtist}
            name="artistForm"
            action="/maker"
            method="POST"
            className="artistForm"
        >
            <label htmlFor="name">Submission Type: </label>
            <input id="artistSubmitType" type="text" name="name" placeholder="Submission Type"/>
            <label htmlFor="age">Submission Value: </label>
            <input id="artistSubmitValue" type="text" name="age" placeholder="Submission Value"/>
            <label htmlFor="level">Additional Values: </label>
            <input id="artistAdditionalValue" type="text" name="level" placeholder="Additional Values"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeArtistSubmit" type="submit" value="Make Artist" />
        </form>
    );
};

const ArtistList = function(props) {
    if(props.artists.length === 0) {
        return (
            <div className="artistList">
                <h3 className="emptyArtist">No artists yet</h3>
            </div>
        );
    }
    
    const artistNodes = props.artists.map(function(artist) {
        return (
            <form id="artistForm"
                onSubmit={handleArtist}
                name="artistForm"
                action="/maker"
                method="POST"
                className="artistForm"
            >
                <label htmlFor="name">Submission Type: </label>
                <input id="artistSubmitType{artist.name}" type="text" name="name" placeholder="Submission Type" value={artist.name} />
                <label htmlFor="age">Submission Value: </label>
                <input id="artistSubmitValue{artist.name}" type="text" name="age" placeholder="Submission Value" value={artist.age} />
                <label htmlFor="level">Additional Values: </label>
                <input id="artistAdditionalValue{artist.name}" type="text" name="level" placeholder="Additional Values" value={artist.level} />
                <input type="hidden" name="_csrf" value={props.csrf} />
                <input className="makeArtistSubmit" type="submit" value="Make Artist" />
            </form>
            /*
            <div key={artist._id} className="artist">
                <h3 className="artistSubmitType"> Name: {artist.name} </h3>
                <h3 className="artistSubmitValue"> Age: {artist.age} </h3>
                <h3 className="artistAdditionalValue"> Level: {artist.level} </h3>
            </div>
            */
        );
    });
    
    return (
        <div className="artistList">
            {artistNodes}
        </div>
    );
};

const loadArtistsFromServer = () => {
    sendAjax('GET', '/getArtists', null, (data) => {
      console.dir('loading');
        ReactDOM.render(
            <ArtistList artists={data.artists} />, document.querySelector("#artists")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <ArtistForm csrf={csrf} />, document.querySelector("#makeArtist")
    );

    ReactDOM.render(
        <ArtistForm artists={[]} />, document.querySelector("#artists")
    );

    loadArtistsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});





















