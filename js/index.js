const bookURL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {

    fetch(bookURL).then(response => response.json())
    .then(bookArray => bookArray.forEach(book => createBookList(book)))

    const createBookList = (book) => {
        // console.log(book)
        // console.log(`${bookURL}/${book.id}`)

        bookList = document.querySelector('#list')
       
        li = document.createElement('li')
        li.innerText = book.title
        li.className = "book-title"
        li.addEventListener("click", e => {
            // console.log(e.target)
            // createBookCard(book)

            bookCard = document.createElement('div')
            showPanel = document.querySelector('#show-panel')

            //clears showPanel so only one shows up at a time
            showPanel.innerText = ""

            imgURL = document.createElement('img')
            imgURL.src = book.img_url

            title = document.createElement('h3')
            title.innerText = book.title

            subtitle = document.createElement('h3')
            subtitle.innerText = book.subtitle

            author = document.createElement('h3')
            author.innerText = book.author

            description = document.createElement('p')
            description.innerText = book.description

            bookCard.append(imgURL, title, subtitle, author, description)

            book.users.forEach(user => {
                // console.log(user.username)
                let userBullet = document.createElement('li')
                userBullet.innerText = user.username
                bookCard.append(userBullet)
            })

            likeButton = document.createElement('button')
            likeButton.innerText = "LIKE"
            bookCard.append(likeButton)
            likeButton.addEventListener('click', e => {
                likeButton.innerText = "UNLIKE"

                // console.log(book.users.forEach(user => console.log(user.id, user.username)))
                // let likerID = book.users.forEach(user => {return user.id})
                // let likerName = book.users.forEach(user => {return user.username})
                // console.log(likerID, likerName)


                // let patchOption = {
                //     method: "PATCH",
                //     headers: {
                //         "Content-Type": "application/json",
                //         Accept: "application/json"
                //     },
                //     body: JSON.stringify({
                //         "users": [
                //             book.users.forEach(user)
        
                //         ]
                //     })
                // }

                // fetch(`${bookURL}/${book.id}`, patchOption)
                // .then(response => response.json())
                // .then(response => console.log(response.users[response.users.length - 1].username))

                // likeButton.addEventListener('click', e => {
                //     likeButton.innerText = "LIKE"

                //     let patchOption = {
                //         method: "PATCH",
                //         headers: {
                //             "Content-Type": "application/json",
                //             Accept: "application/json"
                //         },
                //         body: JSON.stringify({
                //             "users": [
                //                 {"id":2, "username":"auer"},
                //                 {"id":8, "username":"maverick"}
                //             ]
                //         })
                //     }
    
                //     fetch(`${bookURL}/${book.id}`, patchOption)
                //     .then(response => response.json())

                // })



            })

            showPanel.append(bookCard)

        })

        bookList.append(li)        
        
    }
});


// author: "Yoko Ono"
// description: "Back in print for the first time in nearly thirty years, here is Yoko Ono's whimsical, delightful, subversive, startling book of instructions for art and for life. 'Burn this book after you've read it.' -- Yoko 'A dream you dream alone may be a dream, but a dream two people dream together is a reality. This is the greatest book I've ever burned.' -- John"
// id: 1
// img_url: "https://books.google.com/books/content?id=3S8Rwr-iBdoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
// subtitle: "A book of Instruction and Drawings."
// title: "Grapefruit"
