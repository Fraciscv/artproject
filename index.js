const mainPage = document.querySelector(`.bodydiv`)
const signinForm = document.querySelector('#form')
const signInBtn = document.querySelector('#sign-in-btn')
const signUpBtn = document.querySelector('#sign-up-btn')
const goHome = document.querySelector('#home-btn')
const goToUserPage = document.querySelector('#user-btn')
const goToUsers = document.querySelector('#users-btn')
const githubButton = document.querySelector('#github-btn')
const navBar = document.querySelector(`#userProfile`)
const topBar = document.querySelector('#top-nav-bar')
const addButton = document.querySelector('#add-button')

//This for is used to sign-up through "POST" sign-up 
//ShowUserInformation line 47 renders main page.
const formToSignUp = () => {
    mainPage.innerHTML = ""
    let pTag = document.createElement('p')
    pTag.innerText = "Become a content creator"
    let loadForm = document.createElement('form')
    let Div1 = document.createElement('div')
    Div1.className = "uk-margin"
    let Div2 = document.createElement('div')
    Div2.className = "uk-inline"
    Div2.innerHTML = `<span class="uk-form-icon" uk-icon="icon: user"></span>
    <input class="uk-input" type="text">`

    loadForm.append(Div1, Div2)
    mainPage.append(loadForm, pTag)

    loadForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        let username = evt.target[0].value
        console.log(username)
        fetch("http://localhost:3000/authors/signup", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                usernameFromFrontEnd: username
            })
        })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.id) {
                    showUserInformation(response)

                } else {
                    console.log(response)
                }

            })
    })

}

//Form if you are a returning user
//line 90 renders user showUserInformation()
const formtoHtml = () => {
    mainPage.innerHTML = ""
    let pTag = document.createElement('p')
    pTag.innerText = "Welcome back, passwords coming soon"
    let loadForm = document.createElement('form')
    let Div1 = document.createElement('div')
    Div1.className = "uk-margin"
    let Div2 = document.createElement('div')
    Div2.className = "uk-inline"
    Div2.innerHTML = `<span class="uk-form-icon" uk-icon="icon: user"></span>
    <input class="uk-input" type="text">`

    loadForm.append(Div1, Div2, pTag)
    mainPage.append(loadForm)

    loadForm.addEventListener('submit', (evt) => {
        evt.preventDefault()
        let username = evt.target[0].value
        fetch("http://localhost:3000/authors/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                usernameFromFrontEnd: username
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response.id) {
                    showUserInformation(response)

                } else {
                    console.log(response)
                }

            })

    })

}
// ------------ HELPER METHOD TO RENDER HOME PAGE ------------
let showUserInformation = (author) => {
    showAuthorHomepage(author)
    renderTagsonMainPage(author)

}
// ------------ SET SIDE BAR AFTER LOGIN ------------


let showAuthorHomepage = (author) => {
    mainPage.innerHTML = ""
    topBar.innerHTML = ""
    addButton.innerHTML = `<a class="nav-link" id="plus-btn" href="" uk-icon="icon: plus"></a>`
    const listenToButton = document.querySelector(`#plus-btn`)
    listenToButton.addEventListener('click', (evt) => {
        evt.preventDefault()
        console.log(evt.target)
        //TO DO NEED TO RENDER A FORM TO "POST" to posts in back end, using image_link, title... whatever else you might need.
        let divForForm = document.createElement('dt')
        divForForm.innerHTML = `<form class="form-for-upload">
        <fieldset class="uk-fieldset">
    
            <legend class="uk-legend">Upload your art</legend>
            
            <div class="uk-margin">
                <select class="uk-select" id="mySelect">
                    <option>acrylic</option>
                    <option>oil</option>
                    <option>photography</option>
                    <option>drawing</option>
                    <option disabled>music(coming soon)</option>
                    <option disabled>poetry(coming soon)</option>
                </select>
            </div>

            <div class="uk-margin">
                <dt>for images please use a link of your images from a foreign source</dt>
                <input class="uk-input" type="text" placeholder="URL">
            </div>
    
    
        </fieldset>
    </form>`;
        mainPage.innerHTML = ""
        mainPage.append(divForForm)

        const forForUpload = document.querySelector('.form-for-upload')
        forForUpload.addEventListener('submit', (evt) =>{
            evt.preventDefault()
            console.log(evt)
            console.log(evt.target)
            
        })
    })
//displays username on top of page and gets rid of sign in or sign up
let displayUsername = document.createElement('div')
    displayUsername.innerHTML = `<div id="top-nav-bar" uk-sticky><div>
        <ul class="uk-flex-right" uk-tab>
            <li id="sign-in-btn"><a href="#">Welcome ${author.username}</a></li>
        </ul>
    </div></div>`

    topBar.append(displayUsername)

}
let renderUsersProfileButton = (author) => {
    mainPage.innerHTML = ""
}

// Renders Tags onto home page for each user
//TODO :  need to figure out why its not filtering
let renderTagsonMainPage = (author) => {
    let showTags = document.createElement('a')
    showTags.innerHTML = `<div uk-filter="target: .js-filter">
    
<ul class="uk-subnav uk-subnav-pill">
    
    <li uk-filter-control=".acrylic"><a href="#">acrylic</a></li>
    <li uk-filter-control=".photography"><a href="#">photography</a></li>
    <li uk-filter-control=".music"><a href="#">drawing</a></li>
    <li uk-filter-control=".poetry"><a href="#">poetry</a></li>
    <li uk-filter-control=".drawing"><a href="#">music</a></li>
    <li uk-filter-control=".oil"><a href="#">oil painting</a></li>
</ul>`
    
fetch(`http://127.0.0.1:3000/authors/${author.id}`)
    .then(response => response.json())
    .then(authorObj => authorObj.posts.map(displayUnderEachProfile))

function displayUnderEachProfile(authObj) {
    let newLi = document.createElement('li')
        newLi.className = `${authObj.tag_name}`
    let newImgDiv = document.createElement('div')
        newImgDiv.className = "uk-card uk-card-default uk-card-body"
        newImgDiv.innerHTML = `<img src=${authObj.image_url}>`

        newLi.append(newImgDiv)
        thisBelongsHere.append(newLi)
}


        let thisBelongsHere = document.createElement('ul')
            thisBelongsHere.innerHTML = `<ul class="js-filter uk-child-width-1-2 uk-child-width-1-3@m uk-text-center" uk-grid></ul>`

        showTags.append(thisBelongsHere)
        mainPage.append(showTags)



    //all users Button
goToUsers.addEventListener('click', (evt) => {
    evt.preventDefault()
    mainPage.innerHTML = ""
    let title = document.createElement('h3')
    title.innerText = "Artist Info"
    let h3Tag = document.createElement('p')    
    fetch(`http://127.0.0.1:3000/authors`)
    .then(response => response.json())
    .then(authorObj => authorObj.map(displayEachUser).sample)
    
    function displayEachUser(authObj) {
        debugger
    let displayUsersHTML = document.createElement('li')
    displayUsersHTML.innerHTML = `<dl class="uk-description-list uk-description-list-divider">
    <dt><strong>@${authObj.username}</strong></dt>
    <dd>Bio:${authObj.bio} </dd>
    <dt>Latest Posts:</dt>
    <dd>image a list of images here.</dd>
    <p>
</dl>`

    h3Tag.append(displayUsersHTML)
        }    
    mainPage.append(title, h3Tag)
    
});

    //profile Button
    const currentdate = new Date(); 
    const datetime = "Today is: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    goToUserPage.innerHTML = `<li><a class="nav-link" id="user-btn" href="#" uk-icon="icon: user"></a></li>
    <div uk-dropdown>
        <ul class="uk-nav uk-dropdown-nav">
            <li class="uk-active"><a href="#">Hello ${author.username}</a></li>
            <li><a href="#">${datetime}</a></li>
            <li class="uk-nav-header">Edit Profile</li>
            <li><a href="#">Bio</a></li>
            <li><a href="#">Avatar</a></li>
            <li class="uk-nav-divider"></li>
            <li><a href="#">delete account</a></li>
        </ul>
    </div>`
//home Button renders user info
goHome.addEventListener('click', (evt) => {
    evt.preventDefault()
    debugger
    showUserInformation(author)

});

}





signInBtn.addEventListener('click', (evt) => {
    formtoHtml()

});

//sign up Button
signUpBtn.addEventListener('click', (evt) => {
    formToSignUp()
});



//github repo Button
githubButton.addEventListener('click', (evt) => {
    document.location.href = 'https://github.com/Fraciscv/artproject';
});


function showTags() {
    fetch(`http://127.0.0.1:3000/tags`)
        .then(r => r.json())
        .then(tags => {
            tags.forEach(populateTagsOnPage)

        })

    function populateTagsOnPage(tags) {

        let divTag1 = document.createElement('div')
        divTag1.className = `"uk-child-width-1-2 uk-child-width-1-4@s uk-grid-match" uk-grid`
        divTag2 = document.createElement('div')
        divTag2.className = `"uk-animation-toggle" tabindex="0"`
        divTag3 = document.createElement('div')
        divTag3.className = `"uk-card uk-card-default uk-card-body uk-animation-fade uk-animation-reverse"`
        let pTag = document.createElement('p')
        pTag.className = `"uk-text-center"`
        pTag.innerText = `# ${tags.name}`
        divTag3.append(pTag)
        mainPage.append(divTag1, divTag2, divTag3)

        divTag1.addEventListener('click', (evt) => {
            console.log(evt)
        });

    }
}

//TODO showTags()  is a helper function that populates when a user logs in. or clicks on another users profile
//         populateTagsOnPage.addEventListener("click", populatePosts)
//     }

// let populatePosts = (evt) => {
//     console.log(evt)

// signinForm.addEventListener("submit", handleLoginForm)

// let handleLoginForm = (evt) => {
//     evt.preventDefault()
//     let username = evt.target.username.value
//     console.log(username)
//     fetch("http://localhost:3000/authors/login", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: JSON.stringify({
//             usernameFromFrontEnd: username
//         })
//     })
//         .then(res => res.json())
//         .then(response => {
//             if(response.id){
//                 showTeacherInformation(response)
//             } else {
//                 console.log(response)
//             }

//         })
// }