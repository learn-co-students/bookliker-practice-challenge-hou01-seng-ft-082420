document.addEventListener(“DOMContentLoaded”, function() {
    fetch(“http://localhost:3000/books”)
    .then(res => res.json())
    .then(books => books.forEach(book => renderBook(book)))
    function renderBook(book){
        const ul= document.querySelector(“#list”)
        const li = document. createElement(“li”)
        li.innerText = book.title
        ul.append(li)
        const showPanel = document.querySelector(“#show-panel”)
        //const showPanelUl= document.createElement(“ul”)
        //showPanel.append(showPanelUl)
        const div =document.createElement(“div”)
        showPanel.append(div)
        //LIS WITH NO UL HOME ADDRESS US!!
        // const showBookLi = document.createElement(“li”)
        div.style.display= “none”
        div.className = “book”
        // showPanelUl.append(showBookLi)
        // console.log(showPanelUl)
        const img = document.createElement(“img”)//img not image!!
        img.src= book[“img_url”]
        const h2 = document.createElement(“h2”)
        h2.innerText= book.title
        const h3 = document.createElement(“h3")
        h3.innerText = book.subtitle
        const h4 = document.createElement(“h4”)
        h4.innerText= book.author
        const p = document.createElement(“p”)
        p.innerText = book.description
        const usersUl = document.createElement(“ul”)
        button = document.createElement(“button”)
        button.innerText = “like”
        book.users.forEach(user => {
            usersLi = document.createElement(“li”)
            usersLi.innerText= user.username
            usersUl.append(usersLi)
        })//ends forEach
        div.append(img, h2, h3, h4, p, usersUl, button)
        li.addEventListener(“click”, (e) => {
            let books = document.querySelectorAll(“.book”)
            for (let book of books){
                book.style.display = ‘none’
            }
            div.style.display = “block”


        })//ends li event listener
        button.addEventListener(“click”, (e) => {
            if(book.users.find(user =>user.id == 1)){
                // console.log(“pouros already liked this book”)
                // console.log(book)
            }else{
                // console.log(book)
                let newUsers = [{“id”:1, “username”:“pouros”}]
                book.users.forEach(user => newUsers.push(user))
                // console.log(newUsers)
                fetch(`http://localhost:3000/books/${book.id}`, {
                        method: “PATCH”,
                        headers:{
                                ‘Content-Type’: “application/json”,
                                ‘Accept’: “application/json”
                            },
                        body: JSON.stringify({
                                “users”: newUsers
                        })//ends JSON.stringify
                })//ends patch fetch
                .then(res => res.json())
                .then(book => {
                    const newLi = document.createElement(“li”)
                    newLi.innerText = book.users[0].username
                    usersUl.append(newLi)
                })
            }
        })//ends button event listener
    }// ends renderBook
});// ends DOM content
// {
//     “id”: 1,
//     “title”: “Grapefruit”,
//     “subtitle”: “A book of Instruction and Drawings.“,
//     “description”: “Back in print for the first time in nearly thirty years, here is Yoko Ono’s whimsical, delightful, subversive, startling book of instructions for art and for life. ‘Burn this book after you’ve read it.’ -- Yoko ‘A dream you dream alone may be a dream, but a dream two people dream together is a reality. This is the greatest book I’ve ever burned.’ -- John”,
//     “author”: “Yoko Ono”,
//     “img_url”: “https://books.google.com/books/content?id=3S8Rwr-iBdoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api”,
//     “users”: [
//       {
//         “id”: 2,
//         “username”: “auer”
//       },
//       {
//         “id”: 8,
//         “username”: “maverick”
//       }
//     ]
//   },
// const img = book.image
// const title = book.title
// const subtitle = book.subtitle
// const description = book.description
// const author = book.author
// const users = forEach(user => {
// const userid = user.id
// const username = user.username
// })//ends forEach