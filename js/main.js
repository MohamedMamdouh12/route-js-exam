$(".contactLi").click(function (e) {
    let linkHref = $(e.target).attr('href');
    // console.log(linkHref);
    let sectionOffset = $(linkHref).offset().top;
    // console.log(sectionOffset);

    $("html , body").animate({ scrollTop: sectionOffset }, 1000);

});



$('.linksMovies').click(function (e) {
let moviesHref=$(e.target).attr('href');
// console.log(moviesHref)
   getMovies(moviesHref.replace('#',''));
   let sectionOffset = $(this).offset().top;
   $("html , body").animate({ scrollTop: sectionOffset }, 1000);

});

// End LINKS DISPLAY



// main API


let movieResponse;
let responseData = [];
async function getMovies(defaultMovies='now_playing') {
 let url = ''
    if(defaultMovies == "trending"){
        url = `https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    }else{
        url = `https://api.themoviedb.org/3/movie/${defaultMovies}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
    }
    movieResponse = await fetch(url)
    responseData = await movieResponse.json();
    displayResponseData = responseData.results


    // console.log(responseData.results);
    displayMovies(displayResponseData);


}
getMovies();


// let movieResponse = new XMLHttpRequest();

// movieResponse.open('GET', "https://api.themoviedb.org/3/trending/movie/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44");

// movieResponse.send();
// movieResponse.addEventListener('readystatechange', function () {
//     if (movieResponse.readyState == 4 && movieResponse.status == 200) {
//         responseData =JSON.parse(movieResponse.response).results ;

//         console.log(responseData);

//         displayMovies()
//     }
// });



// END OF MAIN API













// HIDDEN NAV TOGGLE

let openBtn = document.querySelector('.openBtn');
let closeBtn = document.querySelector('.closeBtn');


$(".toggleBtn a").click(function () {
    if ($(".nav-hidden").width() == "0") {

        $(".nav-hidden").width('250px');
        openBtn.classList.replace('d-flex', 'd-none');
        closeBtn.classList.replace('d-none', 'd-flex')
        $(".nav-links ul li ").eq(0).animate({ marginTop: "25px" }, 1200);
        $(".nav-links ul li ").eq(1).animate({ marginTop: "25px" }, 1400);
        $(".nav-links ul li ").eq(2).animate({ marginTop: "25px" }, 1600);
        $(".nav-links ul li ").eq(3).animate({ marginTop: "25px" }, 1800);
        $(".nav-links ul li ").eq(4).animate({ marginTop: "25px" }, 2000);
        $(".nav-links ul li ").eq(5).animate({ marginTop: "25px" }, 2200);


    }
    else {

        $(".nav-hidden").animate({ width: "0" }, 500);
        openBtn.classList.replace('d-none', 'd-flex');
        closeBtn.classList.replace('d-flex', 'd-none');
        $(".nav-links ul li  ").animate({ marginTop: "500px" }, 0);

    }
});


// END HIDDEN NAV TOGGLE






// DISPLAY FUNCTION

function displayMovies(para) {
    let cartona = '';
    for (let i = 0; i < para.length; i++) {
        cartona += `<div class="col-md-6 col-lg-4 ">
        <div class="movies-image ">
            <img src='https://image.tmdb.org/t/p/w500${para[i].poster_path}'  class="w-100" alt="">
            <div class="image-layer py-5 px-4">

                <h3>${para[i].title}</h3>
                <p>${para[i].overview}</p>
             
                <p class='w-100'>rate:  ${para[i].vote_average}</p>
                <p>${para[i].release_date}</p>
               
            </div>

        </div>
    </div>`}


    document.getElementById('rowData').innerHTML = cartona;

};


// END DISPLAY FUNCTION





// SEARCH BY WORD IN API ENGINE

let searchBtn = document.querySelector("#searchByWord");

let movieSeResponse;
let searchData = [];

async function getSearchedMovies(currentSearch) {
    movieSeResponse = await fetch('https://api.themoviedb.org/3/search/movie?query=' + currentSearch + '&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false')
    searchData = await movieSeResponse.json();
    displaySerreponseData = searchData.results

    // console.log(searchData.results);
    displayMovies(displaySerreponseData);


}
searchBtn.addEventListener("input", function (e) {
    currentSearch = searchBtn.value;
    if(currentSearch != ""){
        getSearchedMovies(currentSearch)
    }else{
        getMovies();
    }
})

// END SEARCH BY WORD IN API ENGINE








// SEARCH BY WORD IN MAIN SITE

function search(searchTxt) {
    var searchArray = [];
    for (let i = 0; i < displayResponseData.length; i++) {

        if (displayResponseData[i].title.toLowerCase().includes(searchTxt.toLowerCase()) == true) {
            searchArray.push(displayResponseData[i])

        }

    }
    displayMovies(searchArray);

};


//END SEARCH BY WORD IN MAIN SITE





//  CONTACTS INPUTS


let nameInput = document.querySelector('.nameInput');
let emailInput = document.querySelector('.emailInput');
let phoneInput = document.querySelector('.phoneInput');
let ageInput = document.querySelector('.ageInput');
let passInput = document.querySelector('.passInput');
let repassInput = document.querySelector('.repassInput');
let nameMessage = document.querySelector('.nameMessage');
let emailMessage = document.querySelector('.emailMessage');
let phoneMessage = document.querySelector('.phoneMessage');
let ageMessage = document.querySelector('.ageMessage');
let passMessage = document.querySelector('.passMessage');
let repassMessage = document.querySelector('.repassMessage');
// console.log(nameInput,emailInput,phoneInput,ageInput,passInput,repassInput,nameMessage,emailMessage);

nameInput.addEventListener('input', function (e) {

    let nameRegex = /^[\w]{3,9}$/;
    let nameInputValue = e.target.value;
    let nameValid = nameRegex.test(nameInputValue);
    if (nameValid) {
        nameMessage.style.display = 'none'
    }
    else {
        nameMessage.style.display = 'flex'
    }

});



emailInput.addEventListener('input', function (e) {

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailInputValue = e.target.value;
    let emailValid = emailRegex.test(emailInputValue);
    if (emailValid) {
        emailMessage.style.display = 'none'
    }
    else {
        emailMessage.style.display = 'flex'
    }

});





phoneInput.addEventListener('input', function (e) {

    let phoneRegex = /^01[0125][0-9]{8}$/;
    let phoneInputValue = e.target.value;
    let phoneValid = phoneRegex.test(phoneInputValue);
    if (phoneValid) {
        phoneMessage.style.display = 'none'
    }
    else {
        phoneMessage.style.display = 'flex'
    }

});



ageInput.addEventListener('input', function (e) {

    let ageRegex = /^([9]|[1-7][0-9])$/;
    let ageInputValue = e.target.value;
    let ageValid = ageRegex.test(ageInputValue);
    if (ageValid) {
        ageMessage.style.display = 'none'
    }
    else {
        ageMessage.style.display = 'flex'
    }

});





passInput.addEventListener('input', function (e) {

    let passRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    let passInputValue = e.target.value;
    let passValid = passRegex.test(passInputValue);
    if (passValid) {
        passMessage.style.display = 'none'
    }
    else {
        passMessage.style.display = 'flex'
    }


    repassInput.addEventListener('input', function (e) {


        let repassInputValue = e.target.value;

        if (repassInputValue == passInputValue) {
            repassMessage.style.display = 'none'
        }
        else {
            repassMessage.style.display = 'flex'
        }

    });


    // 3shan t2dar tshof passvalue 3shan alscope
})


// END CONTACTS INPUT








// THE END





















































































