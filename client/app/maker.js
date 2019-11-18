const handleArtist = (e) => {
    e.preventDefault();
    
    $("#artistMessage").animate({width:'hide'},350);
    
    if($("#artistName").val() == '' || $("#artistAge").val() == '' || $("#artistLevel").val() == ''){
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
            <label htmlFor="name">Name: </label>
            <input id="artistName" type="text" name="name" placeholder="Artist Name"/>
            <label htmlFor="age">Age: </label>
            <input id="artistAge" type="text" name="age" placeholder="Artist Age"/>
            <label htmlFor="level">Level: </label>
            <input id="artistLevel" type="text" name="level" placeholder="Artist Level"/>
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
            <div key={artist._id} className="artist">
                <img src="/assets/img/artistface.jpeg" alt="artist face" className="artistFace" />
                <h3 className="artistName"> Name: {artist.name} </h3>
                <h3 className="artistAge"> Age: {artist.age} </h3>
                <h3 className="artistLevel"> Level: {artist.level} </h3>
            </div>
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





















