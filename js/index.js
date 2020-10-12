document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded")
});

const UrlBase = "http://localhost:3000/books"

const puoros = {"id":1, "username":"pouros"}

fetch(UrlBase).then(res => res.json()).then(books => books.forEach(book => displayTitles(book)))

function displayTitles(book){
    const ul = document.querySelector('#list')
    const li = document.createElement('li')
    li.innerText = book.title
    ul.append(li)

    li.addEventListener('click', e =>{
        e.preventDefault()
        console.log("CLICK!", book.title)
        if(typeof(document.querySelector('img')) != 'undefined' && document.querySelector('img') != null){
            changeDisplayedBook(book)
        } else {
            displayBook(book)
        }
        // displayBook(book)
    })
}

function displayBook(book){
    const showDiv = document.querySelector('#show-panel')
    const users = book.users
    const img = document.createElement('img')
    img.src = book.img_url

    const titleH = document.createElement('h2')
    titleH.innerText = book.title

    const subTitleH = document.createElement('h2')
    subTitleH.innerText = book.subtitle

    const p = document.createElement('p')
    p.innerText = book.description

    const userUl = document.createElement('ul')
    userDisplay(users, userUl)

    const button = document.createElement('button')
    if(checkLikeStatus(users) == true){
        console.log("already liked")
        button.innerText = "Unlike"
    } else{
        button.innerText = "Like"
    }
    
    console.log(users.filter(user => (user.username == "pouros"))[0])
    console.log(puoros)

    showDiv.append(img, titleH, subTitleH, p, userUl, button)

    button.addEventListener('click', e => {
        // need something more dynamic, but in this particular lab
        // puoros will always be the last element of an array.
        if(checkLikeStatus(users) == true){
            users.pop()
        }else{
        console.log("A like!? How flattering", users)
        users.push(puoros)
        console.log("did push work?", users)
        }
        console.log(UrlBase + `/${book.id}`)
        like(users, book.id)
    })
}

function userDisplay(users, userUl){
    // const userList = userUl 
    for(const user of users){
        let li = document.createElement('li')
        li.innerText = user.username
        userUl.append(li)
    }
}

function changeDisplayedBook(book){
    const showDiv = document.querySelector('#show-panel')
    // remove existing display:
    showDiv.innerHTML = ''
    displayBook(book)
}

function like(users, id){
    fetch(UrlBase + `/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json",
            Accept: 'application/json'
        },
        body: JSON.stringify({
            users: users
        })
    })
    .then(res => res.json()).then(book => changeDisplayedBook(book))
}

function checkLikeStatus(users){
    if (users.filter(user => (user.username == "pouros"))[0] == null){
        console.log(false)
        return false
    } else {
        console.log(true)
        return true 
    }
}