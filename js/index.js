const URLBase = "http://localhost:3000/books/"

document.addEventListener("DOMContentLoaded", () => {
    // const showPanel = document.querySelector('#show-panel')
    // const bookList = document.querySelector('#list')

    fetch(URLBase).then(res => res.json())
    .then(books => books.forEach(book =>createBookCard(book)));


    function createBookCard (book) {
        const ul = document.querySelector('#list')

        const showPanel = document.querySelector('#show-panel')
        const div = document.createElement('div')
        div.setAttribute('class', 'book')
        //same as div.className = "book"
        //none hides it from the user when created
        div.style.display = 'none'
        showPanel.append(div)
       
        const li = document.createElement('li')
        li.innerText = book.title
        li.addEventListener('click', function(e){
            let books = document.querySelectorAll(".book")
            for (let book of books){
                //this hides it again after creation
                book.style.display = 'none'
            }
            //block, allows it to be seen if user 'clicks'
            div.style.display = 'block'
        })

        const img = document.createElement('img')
        img.src = book.img_url

        const h4 = document.createElement('h4')
        h4.innerText = book.title

        const h5 = document.createElement('h5')
        h5.innerText = book.subtitle

        const h6 = document.createElement('h6')
        h6.innerText = book.author

        const p = document.createElement('p')
        p.innerText = book.description

        const userUl = document.createElement('ul')
        book.users.forEach(user => {
            const li = document.createElement('li')
            li.innerText = user.username
            userUl.append(li)
        })

        const br1 = document.createElement('br')
        const br2 = document.createElement('br')


        const likeBtn = document.createElement('button')
        likeBtn.innerText = "Like"
        likeBtn.addEventListener('click', e => {
            if(book.users.find(user => user.id == 1)){
                // book.users.includes({"id":1, "username": "pouros"})
                // pets.includes('at')
                console.log("hiiii")
            } else{
                let newUsers = [{"id":1, "username": "pouros"}]
                book.users.forEach(user => newUsers.push(user))

                fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": 'application/json',
                    Accept: 'application/json' 
                },
                body: JSON.stringify({
                    //we need to get into the users array within the book object
                    // book.users.push({"id":1, "username":"pouros"})
                    "users": newUsers
                })
            })
            .then(res => res.json())
            .then(book => {
                    const newLi = document.createElement('li')
                    newLi.innerText = book.users[0].username
                    userUl.append(newLi)
            })

            }


            
        })

        ul.append(li)
        div.append(img, h4, h5, h6, p, userUl, likeBtn, br1, br2)
    }

});//DOMContentLoaded ends here
