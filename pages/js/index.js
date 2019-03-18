const allAds = document.getElementById("allAds");
const JumboArea = document.getElementById("JumboArea");

window.addEventListener("load", () => {
  var allUserAdsKeys = [];
  JumboArea.classList.add("running");
  try {
    firebase
      .database()
      .ref("UserAds")
      .once("value", data => {
        var allUsersWhoPosted = data.val();
        var usersUidArr = Object.keys(allUsersWhoPosted);
        for (var key in usersUidArr) {
          localStorage.setItem("usersUidArr", JSON.stringify(usersUidArr));
          firebase
            .database()
            .ref("UserAds/" + usersUidArr[key])
            .once("value", data1 => {
              var allUserAds = data1.val();
              for (var key2 in allUserAds) {
                localStorage.setItem(key2, JSON.stringify(allUserAds[key2]));
                allUserAdsKeys.push(key2);
                localStorage.setItem(
                  "allUserAdsKeys",
                  JSON.stringify(allUserAdsKeys)
                );
                allAds.innerHTML += `
    <div class="col-md-12 col-lg-12 col-sm-12">
    <div class="col-md-3 col-lg-3 col-sm-3">
        <img class="custom-image float-left" src="${
          allUserAds[key2].imgUrls[0]
        }" alt="${allUserAds[key2].adTitle}">
    </div>
    <div class="col-md-12 col-lg-12 col-sm-12">
        <h3><a class="link" href="void:0" data-toggle="modal" data-target="#${key2}">${
                  allUserAds[key2].adTitle
                }</a></h3>
        <small><i class="fas fa-location-arrow"></i> Location: ${
          allUserAds[key2].location
        }</small>
        <p>${allUserAds[key2].adDesc}</p>
            <p style="font-size: 30px;">Price: Rs ${allUserAds[key2].price}</p>
        <div class="text-right">
            <a href="void:0" class="btn btn-primary" data-toggle="modal" data-target="#${key2}">More Details <i class="fas fa-external-link-alt"></i></a>
        </div>
    </div>
    <div class="text-right col-md-12 col-lg-12 col-sm-12">
        <hr class="col-md-12 col-lg-12 col-sm-12 style">
    </div>
</div>

<div id="${key2}" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${allUserAds[key2].adTitle}</h3>
            </div>
            <div class="modal-body">
                <div id="${key2}1" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${
                              allUserAds[key2].imgUrls[0]
                            }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                        </div>
                        <div class="carousel-item">
                            <img src="${
                              allUserAds[key2].imgUrls[1]
                            }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                        </div>
                        <div class="carousel-item">
                            <img src="${
                              allUserAds[key2].imgUrls[2]
                            }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                        </div>
                        <div class="carousel-item">
                            <img src="${
                              allUserAds[key2].imgUrls[3]
                            }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#${key2}1" role="button"
                        data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#${key2}1" role="button"
                        data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <hr />
                <p>${allUserAds[key2].adDesc}</p>
                <p>Posted in: <button class="btn btn-sm btn-warning">${
                  allUserAds[key2].category
                }</button></p>
                <p><i class="fas fa-location-arrow"></i> Location: ${
                  allUserAds[key2].location
                }</p>
                <h5 style="font-size: 50px;">Price: Rs ${
                  allUserAds[key2].price
                }</h5>
                <p><i class="fas fa-phone-square"></i> Phone: ${
                  allUserAds[key2].mobileNumber
                }</p>
                <p><i class="fas fa-user-alt"></i> Posted by: ${
                  allUserAds[key2].name
                }</p>
                <button class="btn btn-primary" onClick="addToWishList('${key2}')"><i class="fas fa-heart"></i> Add to Wishlist</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
                    `;
              }
              JumboArea.classList.remove("running");
            });
        }
      });
  } catch (error) {
    console.log("NETWORK DATA ERROR>>>", error);
    var allUserAdsKeys = JSON.parse(localStorage.getItem("allUserAdsKeys"));
    console.log(allUserAdsKeys);

    allAds.innerHTML += `
    <div class="col-md-12 col-lg-12 col-sm-12">
    <div class="col-md-3 col-lg-3 col-sm-3">
        <img class="custom-image float-left" src="${
          allUserAds[key2].imgUrls[0]
        }" alt="${allUserAds[key2].adTitle}">
    </div>
    <div class="col-md-12 col-lg-12 col-sm-12">
        <h3><a class="link" href="void:0" data-toggle="modal" data-target="#${key2}">${
      allUserAds[key2].adTitle
    }</a></h3>
        <small><i class="fas fa-location-arrow"></i> Location: ${
          allUserAds[key2].location
        }</small>
        <p>${allUserAds[key2].adDesc}</p>
            <p style="font-size: 30px;">Price: Rs ${allUserAds[key2].price}</p>
        <div class="text-right">
            <a href="void:0" class="btn btn-primary" data-toggle="modal" data-target="#${key2}">More Details <i class="fas fa-external-link-alt"></i></a>
        </div>
    </div>
    <div class="text-right col-md-12 col-lg-12 col-sm-12">
        <hr class="col-md-12 col-lg-12 col-sm-12 style">
    </div>
</div>

<div id="${key2}" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${allUserAds[key2].adTitle}</h3>
            </div>
            <div class="modal-body">
                <div id="${key2}1" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${
                              allUserAds[key2].imgUrls[0]
                            }" class="d-block w-100 carousel-imgs" alt="${
      allUserAds[key2].adTitle
    }">
                        </div>
                        <div class="carousel-item">
                            <img src="${
                              allUserAds[key2].imgUrls[1]
                            }" class="d-block w-100 carousel-imgs" alt="${
      allUserAds[key2].adTitle
    }">
                        </div>
                        <div class="carousel-item">
                            <img src="${
                              allUserAds[key2].imgUrls[2]
                            }" class="d-block w-100 carousel-imgs" alt="${
      allUserAds[key2].adTitle
    }">
                        </div>
                        <div class="carousel-item">
                            <img src="${
                              allUserAds[key2].imgUrls[3]
                            }" class="d-block w-100 carousel-imgs" alt="${
      allUserAds[key2].adTitle
    }">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#${key2}1" role="button"
                        data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#${key2}1" role="button"
                        data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <hr />
                <p>${allUserAds[key2].adDesc}</p>
                <p>Posted in: <button class="btn btn-sm btn-warning">${
                  allUserAds[key2].category
                }</button></p>
                <p><i class="fas fa-location-arrow"></i> Location: ${
                  allUserAds[key2].location
                }</p>
                <h5 style="font-size: 50px;">Price: Rs ${
                  allUserAds[key2].price
                }</h5>
                <p><i class="fas fa-phone-square"></i> Phone: ${
                  allUserAds[key2].mobileNumber
                }</p>
                <p><i class="fas fa-user-alt"></i> Posted by: ${
                  allUserAds[key2].name
                }</p>
                <button class="btn btn-primary" onClick="addToWishList('${key2}')"><i class="fas fa-heart"></i> Add to Wishlist</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
                    `;
  }
});

$(document).ready(function() {
  $("#SearchBtn").click(function() {
    $("#searchBox").slideToggle("slow");
  });
});

function searchNow() {
  var searchValue = document.getElementById("searchValue").value.toLowerCase();
  var searchAdResults = document.getElementById("searchAdResults");
  document.getElementById("allAds").innerHTML = "";
  document.getElementById("searchAdResults").innerHTML = "";
  document.getElementById("noData").style.display = "none";
  JumboArea.classList.add("running");

  firebase
    .database()
    .ref("UserAds")
    .once("value", data => {
      // document.getElementById("progressBarSearch").style.visibility = "visible";

      var allUsersWhoPosted = data.val();
      var usersUidArr = Object.keys(allUsersWhoPosted);
      var flag = true;
      for (var key in usersUidArr) {
        firebase
          .database()
          .ref("UserAds/" + usersUidArr[key])
          .once("value", data1 => {
            var allUserAds = data1.val();
            for (var key2 in allUserAds) {
              if (
                allUserAds[key2].category.toLowerCase() === searchValue ||
                allUserAds[key2].adTitle.toLowerCase() === searchValue
              ) {
                console.log("search matched...");
                // JumboArea.classList.remove("running");

                searchAdResults.innerHTML += `
            <div class="col-md-12 col-lg-12 col-sm-12">
            <div class="col-md-3 col-lg-3 col-sm-3">
                <img class="custom-image float-left" src="${
                  allUserAds[key2].imgUrls[0]
                }" alt="${allUserAds[key2].adTitle}">
            </div>
            <div class="col-md-12 col-lg-12 col-sm-12">
                <h3><a class="link" href="void:0" data-toggle="modal" data-target="#${key2}">${
                  allUserAds[key2].adTitle
                }</a></h3>
                <small><i class="fas fa-location-arrow"></i> Location: ${
                  allUserAds[key2].location
                }</small>
                <p>${allUserAds[key2].adDesc}</p>
                    <p style="font-size: 30px;">Price: Rs ${
                      allUserAds[key2].price
                    }</p>
                <div class="text-right">
                    <a href="void:0" class="btn btn-primary" data-toggle="modal" data-target="#${key2}">More Details <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
            <div class="text-right col-md-12 col-lg-12 col-sm-12">
                <hr class="col-md-12 col-lg-12 col-sm-12 style">
            </div>
        </div>
        
        <div id="${key2}" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">${allUserAds[key2].adTitle}</h3>
                    </div>
                    <div class="modal-body">
                        <div id="${key2}1" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="${
                                      allUserAds[key2].imgUrls[0]
                                    }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                                </div>
                                <div class="carousel-item">
                                    <img src="${
                                      allUserAds[key2].imgUrls[1]
                                    }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                                </div>
                                <div class="carousel-item">
                                    <img src="${
                                      allUserAds[key2].imgUrls[2]
                                    }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                                </div>
                                <div class="carousel-item">
                                    <img src="${
                                      allUserAds[key2].imgUrls[3]
                                    }" class="d-block w-100 carousel-imgs" alt="${
                  allUserAds[key2].adTitle
                }">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#${key2}1" role="button"
                                data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#${key2}1" role="button"
                                data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                        <hr />
                        <p>${allUserAds[key2].adDesc}</p>
                        <p>Posted in: <button class="btn btn-sm btn-warning">${
                          allUserAds[key2].category
                        }</button></p>
                        <p><i class="fas fa-location-arrow"></i> Location: ${
                          allUserAds[key2].location
                        }</p>
                        <h5 style="font-size: 50px;">Price: Rs ${
                          allUserAds[key2].price
                        }</h5>
                        <p><i class="fas fa-phone-square"></i> Phone: ${
                          allUserAds[key2].mobileNumber
                        }</p>
                        <p><i class="fas fa-user-alt"></i> Posted by: ${
                          allUserAds[key2].name
                        }</p>
                
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
                            `;
                flag = false;
              }
            }
            JumboArea.classList.remove("running");
            if (flag) {
              document.getElementById("noData").style.display = "block";
              JumboArea.classList.remove("running");
            }
          });
      }
    });
}

function addToWishList(addId) {
  var curUid = localStorage.getItem("currentUserUid");
  console.log(addId);

  firebase
    .database()
    .ref("MyWishList/" + curUid + "/addId")
    .push(addId)
    .then(() => {
      swal("You have added this Ad to your Wishlist!", {
        icon: "success"
      });
    })
    .catch(err => {
      swal({
        title: "Error!",
        text: err.message,
        icon: "error",
        button: {
          text: "OK",
          closeModal: true
        }
      });
    });
}
