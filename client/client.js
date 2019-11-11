const handleError = (message) => {
  $("#errorMessage").text(message);
  $("#musicMessage").animate({width:'toggle'},350);
}

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {
      $("#musicMessage").animate({width:'hide'},350);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    $("#musicMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("No, no, no!  All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("No, no, no!  Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    e.preventDefault();

    $("#musicMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("No, no, no!  Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });
  
  $("#musicForm").on("submit", (e) => {
    e.preventDefault();

    $("#musicMessage").animate({width:'hide'},350);

    if($("#musicQuestion").val() == '' || $("#musicAnswer").val() == '') {
      handleError("No, no, no!  All fields are required");
      return false;
    }

    sendAjax($("#musicForm").attr("action"), $("#musicForm").serialize());

    return false;
  });
});