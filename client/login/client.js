const handleLogin = (e) => {
    e.preventDefault();
    
    $("quizMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }
    
    console.log($("input[name=_csrf]").val());
    
    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    
    $("#quizMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields are required");
        return false;
    }
    
    
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    
    return false;
};

const handleChangePass = (e) => {
    e.preventDefault();
    
    $("#quizMessage").animate({width:'hide'},350);
    
    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '' || $("#oldpass").val() == ''){
        handleError("All fields are required");
        return false;
    }
    
    
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }
    
    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
    
    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm" 
            name=""
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm" 
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/><br />
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/><br />
        <label htmlFor="pass2">Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password"/><br />
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="formSubmit" type="submit" value="Sign Up" /><br />
        </form>
    );
};

const ChangePassWindow = (props) => {
    return (
        <form id="changePassForm" 
            name="changePassForm"
            onSubmit={handleChangePass}
            action="/changepass"
            method="POST"
            className="mainForm"
        >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/><br />
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/><br />
        <label htmlFor="pass2">Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password"/><br />
        <label htmlFor="oldpass">Old Password: </label>
        <input id="oldpass" type="password" name="oldPass" placeholder="old password"/><br />
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

const AboutWindow = (props) => {
    return (
        <div className="mainForm">This is a app for creating logs.</div>
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createChangePassWindow = (csrf) => {
    ReactDOM.render(
        <ChangePassWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createAboutWindow = (csrf) => {
    ReactDOM.render(
        <AboutWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const aboutButton = document.querySelector("#aboutButton");
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const changePassButton = document.querySelector("#changePassButton");
    
    aboutButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAboutWindow(csrf);
        return false;
    });
    
    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });
    
    changePassButton.addEventListener("click", (e) => {
        e.preventDefault();
        createChangePassWindow(csrf);
        return false;
    });
    
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    
    createLoginWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});






























