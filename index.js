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
console.log(topBar)


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
    
    loadForm.addEventListener('submit', (evt) =>{
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
            if(response.id){
                showUserInformation(response)

            } else {
                console.log(response)
            }

        })

    })
    

}

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
    
    loadForm.addEventListener('submit', (evt) =>{
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
            console.log(response)
            if(response.id){
                showUserInformation(response)

            } else {
                console.log(response)
            }

        })

    })
    
}
// ------------ WHAT TO DO WITH TEACHER RESPONSE ------------
let showUserInformation = (author) => {
    showAuthorHomepage(author)
    renderTagsonMainPage(author)
}
// ------------ SET SIDE BAR AFTER LOGIN ------------


let showAuthorHomepage = (author) => {
    mainPage.innerHTML = ""
    topBar.innerHTML = ""
    let displayUsername = document.createElement('div')
        displayUsername.innerHTML = `<div id="top-nav-bar" uk-sticky><div>
        <ul class="uk-flex-right" uk-tab>
            <li id="sign-in-btn"><a href="#">Welcome ${author.username}</a></li>
        </ul>
    </div></div>`
    
        topBar.append(displayUsername)
        
}
    
// #TODO render tags on homepage
let renderTagsonMainPage = (author) => {
    let showTags = document.createElement('p')
    showTags.innerHTML = `<div uk-filter="target: .js-filter">

<ul class="uk-subnav uk-subnav-pill">
    <li uk-filter-control=".tag-acry"><a href="#">acrylic</a></li>
    <li uk-filter-control=".tag-photo"><a href="#">photography</a></li>
    <li uk-filter-control=".tag-draw"><a href="#">drawing</a></li>
    <li uk-filter-control=".tag-poet"><a href="#">poetry</a></li>
    <li uk-filter-control=".tag-music"><a href="#">music</a></li>
    <li uk-filter-control=".tag-oil"><a href="#">oil painting</a></li>
</ul>`




mainPage.append(showTags)
}



//Sign in Button
signInBtn.addEventListener('click', (evt) =>{
    formtoHtml()

});
//sign up Button
signUpBtn.addEventListener('click', (evt) =>{
    formToSignUp()
});
//home Button
goHome.addEventListener('click', (evt) =>{
    console.log(evt.target)
});
//profile Button
goToUserPage.addEventListener('click', (evt) =>{
    console.log(evt.target)
});
//all users Button
goToUsers.addEventListener('click', (evt) =>{
    console.log(evt.target)
});
//github repo Button
githubButton.addEventListener('click', (evt) =>{
    document.location.href = 'https://github.com/Fraciscv/artproject';
});


function showTags(){
fetch(`http://127.0.0.1:3000/tags`)
.then(r => r.json())
.then(tags => {
    tags.forEach(populateTagsOnPage)

})

function populateTagsOnPage(tags) {
    
    let divTag1 = document.createElement('div')
        divTag1.className =`"uk-child-width-1-2 uk-child-width-1-4@s uk-grid-match" uk-grid`
        divTag2 = document.createElement('div')
        divTag2.className =`"uk-animation-toggle" tabindex="0"`
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
            
}}

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