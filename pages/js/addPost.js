const uid = localStorage.getItem('currentUserUid');
const JumboArea = document.getElementById('JumboArea');
const categories = [
    "null",
    "Cars",
    "Furniture",
    "Jobs",
    "Electronics & Appliance",
    "Mobile",
    "Bikes",
    "Books",
    "Fashion",
    "Pet",
    "Service",
    "Properties",
];

function adSubmit() {
    var adTitle = document.querySelector("#title").value;
    var e = document.getElementById("categories");
    var category = categories[e.options[e.selectedIndex].value];
    var adDesc = document.querySelector("#adDesc").value;
    var location = document.querySelector("#location").value;
    var price = document.querySelector("#price").value;
    var name = document.querySelector("#name").value;
    var mobileNumber = document.querySelector("#mobileNumber").value;
    var picure1 = document.querySelector("#picure1").files[0];
    var picure2 = document.querySelector("#picure2").files[0];
    var picure3 = document.querySelector("#picure3").files[0];
    var picure4 = document.querySelector("#picure4").files[0];

    if (adTitle !== "" && adTitle !== " " && category !== "null" && adDesc !== "" && adDesc !== " " && location !== "" && location !== " " && price !== "" && price !== " " && name !== "" && name !== " " && mobileNumber !== "" && mobileNumber !== " " && picure1 !== undefined && picure2 !== undefined && picure3 !== undefined && picure4 !== undefined) {
        JumboArea.classList.add("running");
        const ref = firebase.storage().ref();
        const imgUrls = [];
        ref.child("UserAds/").child(uid).child(picure1.name).put(picure1)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                console.log(url);
                imgUrls.push(url);
                ref.child("UserAds/").child(uid).child(picure2.name).put(picure2)
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        console.log(url);
                        imgUrls.push(url);
                        ref.child("UserAds/").child(uid).child(picure3.name).put(picure3)
                            .then(snapshot => snapshot.ref.getDownloadURL())
                            .then((url) => {
                                console.log(url);
                                imgUrls.push(url);
                                ref.child("UserAds/").child(uid).child(picure4.name).put(picure4)
                                    .then(snapshot => snapshot.ref.getDownloadURL())
                                    .then((url) => {
                                        console.log(url);
                                        imgUrls.push(url);
                                        console.log('Images Array:', imgUrls);

                                        var adPostData = {
                                            adTitle,
                                            category,
                                            adDesc,
                                            location,
                                            price,
                                            name,
                                            mobileNumber,
                                            imgUrls: imgUrls,
                                        }

                                        firebase.database().ref("UserAds/" + uid).push(adPostData)
                                            .then(() => {
                                                JumboArea.classList.remove("running");
                                                swal({
                                                    title: "Ad Posted!",
                                                    text: "You have successfully posted a new Ad",
                                                    icon: "success",
                                                    button: {
                                                        text: "OK",
                                                        closeModal: true,
                                                    }
                                                })
                                                    .then(() => {
                                                        window.location.href = "./index.html";
                                                        // location = './index.html'
                                                    });
                                            })
                                            .catch((err) => {
                                                JumboArea.classList.remove("running");
                                                swal({
                                                    title: "Database Error",
                                                    text: err.message,
                                                    icon: "error",
                                                    button: {
                                                        text: "OK",
                                                        closeModal: true,
                                                    }
                                                });
                                            })
                                    })
                            })
                    })
            })

    } else {
        JumboArea.classList.remove("running");
        swal({
            title: "All fields are required!",
            text: "You have to enter all details to continue...",
            icon: "error",
            button: {
                text: "OK",
                closeModal: true,
            }
        });
    }
}