function logOut() {
  swal({
    title: "Are you sure?",
    text: "Logout Now?",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(LogOUT => {
    if (LogOUT) {
      localStorage.setItem("currentUserUid", "null");
      swal("You have Logout Successfully!", {
        icon: "success"
      }).then(() => {
        location = "./login.html";
      });
    }
  });
}

const currentUserUid = localStorage.getItem("currentUserUid");
if (currentUserUid === "null") {
  swal({
    title: "You are not Logged in!",
    text: "Your input email is not found in Local Storage.",
    icon: "error",
    button: {
      text: "OK",
      closeModal: true
    }
  }).then(() => {
    location = "./login.html";
  });
} else if (currentUserUid === null) {
  swal({
    title: "You are not Logged in!",
    text: "Your input email is not found in Local Storage.",
    icon: "error",
    button: {
      text: "OK",
      closeModal: true
    }
  }).then(() => {
    location = "./login.html";
  });
}
