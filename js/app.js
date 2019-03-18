function RunTest() {
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var termsCond = document.getElementById("customCheck1");

  var NameReg = /^([a-zA-Z])/;
  var EmailReg = /([a-z\d_-]+)@([a-z\d_-]+)\.[a-z]{2,4}/;
  var PasswordReg = /^([a-zA-Z0-9]{6,10})/;

  var dataObj = {};

  if (fName.match(NameReg)) {
    document.getElementById("fNameError").innerText = "";
    dataObj.fName = fName;
  } else {
    document.getElementById("fNameError").innerText = "Please Enter First Name";
    document.getElementById("fNameError").setAttribute("class", "text-danger");
    return false;
  }

  if (lName.match(NameReg)) {
    document.getElementById("lNameError").innerText = "";
    dataObj.lName = lName;
  } else {
    document.getElementById("lNameError").innerText = "Please Enter Last Name";
    document.getElementById("lNameError").setAttribute("class", "text-danger");
    return false;
  }

  if (email.match(EmailReg)) {
    document.getElementById("emailError").innerText = "";
    dataObj.email = email;
  } else {
    document.getElementById("emailError").innerText =
      "Please Correct Email Address";
    document.getElementById("emailError").setAttribute("class", "text-danger");
    return false;
  }

  if (password.match(PasswordReg)) {
    document.getElementById("passwordError").innerText = "";
    if (password === confirmPassword) {
      document.getElementById("confirmPasswordError").innerText = "";
      dataObj.password = password;
    } else {
      document.getElementById("confirmPasswordError").innerText =
        "Please Enter Same Password";
      document
        .getElementById("confirmPasswordError")
        .setAttribute("class", "text-danger");
      return false;
    }
  } else {
    document.getElementById("passwordError").innerText =
      "Password Must be Between 6 - 10 contains A-Z, a-z & 0-9 only";
    document
      .getElementById("passwordError")
      .setAttribute("class", "text-danger");
    return false;
  }

  if (termsCond.checked) {
    document.getElementById("termsCondError").innerText = "";
    console.log(dataObj);
    document.getElementById("spin-div").classList.add("running");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(success) {
        console.log("success", success);
        // localStorage.setItem("userInfo", JSON.stringify(dataObj));
        var userId = firebase.auth().currentUser.uid;
        resetForm();
        firebase
          .database()
          .ref("usersData/" + userId)
          .set(dataObj)
          .then(() => {
            swal({
              title: "Account Created!",
              text: "Your account has been successfuly created!",
              icon: "success",
              button: {
                text: "Login Now!",
                closeModal: true
              }
            }).then(() => {
              location = "./pages/login.html";
            });
          })
          .catch(function(error) {
            console.log("error", error);
            document.getElementById("spin-div").classList.remove("running");

            swal({
              title: "Unknown Error!",
              text: "ERROR: " + error.message,
              icon: "error",
              button: {
                text: "Try Again!",
                closeModal: true
              }
            }).then(() => {
              location = "./index.html";
            });
          });
      })
      .catch(function(error) {
        document.getElementById("spin-div").classList.remove("running");

        console.log("error", error);
        swal({
          title: "Unknown Error!",
          text: "ERROR: " + error.message,
          icon: "error",
          button: {
            text: "Try Again!",
            closeModal: true
          }
        }).then(() => {
          location = "./index.html";
        });
      });
  } else {
    document.getElementById("termsCondError").innerText =
      "You must agree before submitting.";
    document
      .getElementById("termsCondError")
      .setAttribute("class", "text-danger");
    return false;
  }
}

function resetForm() {
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
  document.getElementById("customCheck1").removeAttribute("checked");
  document.getElementById("spin-div").classList.remove("running");
}

function logIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var EmailReg = /([a-z\d_-]+)@([a-z\d_-]+)\.[a-z]{2,4}/;
  var PasswordReg = /^([a-zA-Z0-9]{6,10})/;

  if (email.match(EmailReg)) {
    document.getElementById("emailError").innerText = "";
  } else {
    document.getElementById("emailError").innerText =
      "Please Correct Email Address";
    document.getElementById("emailError").setAttribute("class", "text-danger");
    return false;
  }

  if (password.match(PasswordReg)) {
    document.getElementById("passwordError").innerText = "";
  } else {
    document.getElementById("passwordError").innerText =
      "Password Must be Between 6 - 10 contains A-Z, a-z & 0-9 only";
    document
      .getElementById("passwordError")
      .setAttribute("class", "text-danger");
    return false;
  }
  document.getElementById("spin-div").classList.add("running");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("spin-div").classList.remove("running");

      var uid = firebase.auth().currentUser.uid;
      localStorage.setItem("currentUserUid", uid);
      swal({
        title: "Account Logged In!",
        text: "You have successfully login to your account",
        icon: "success",
        button: {
          text: "OK",
          closeModal: true
        }
      }).then(() => {
        location = "./index.html";
      });
    })
    .catch(function(error) {
      document.getElementById("spin-div").classList.remove("running");

      swal({
        title: "Password is not Correct",
        text: error.message,
        icon: "error",
        button: {
          text: "OK",
          closeModal: true
        }
      });
    });
}
