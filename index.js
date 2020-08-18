const mainPage = document.querySelector(`.bodydiv`)
const signinForm = document.querySelector('#form')
const signInBtn = document.querySelector('#sign-in-btn')
const signUpBtn = document.querySelector('#sign-up-btn')
const goHome = document.querySelector('#home-btn')
const goToUserPage = document.querySelector('#user-btn')
const goToUsers = document.querySelector('#users-btn')
const githubButton = document.querySelector('#github-btn')
signInBtn.addEventListener('click', (evt) =>{
    console.log(evt.target)
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
showTags()
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