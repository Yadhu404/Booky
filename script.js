let listofBooks = [];
let mainDiv = document.getElementById('main');

//Fetch books from data.json
FetchBookData();
async function FetchBookData(bookReference = "All") {
    mainDiv.innerHTML = "";
    const responce = await fetch('data.json');
    listofBooks = await responce.json();

    DisplayBooks(bookReference);
}


let bookRef = "";
let GetSearchValue = (val) => {
    bookRef = val;
}

let Search = () => {
    if(bookRef != ""){
        FetchBookData(bookRef);
    }
}


//Displays the books
let isBookFound = false;
let bookCount = 0;
let DisplayBooks = (bookReference) =>{
    mainDiv.style.display = 'grid';
    mainDiv.style.justifyContent = 'center';
    mainDiv.style.gridTemplateColumns= '280px 280px 280px 280px 280px';

    listofBooks.forEach(card => {


        if(bookReference == card.name || bookReference == card.category || bookReference == "All"){
            isBookFound = true;
            bookCount++;
            const newDiv = document.createElement('div');
            newDiv.classList.add('card');
        

            newDiv.innerHTML = 
            `
            <div class="book-pic">
                        <img src="${card.imgurl}" alt="book">
                    </div>
                    <div class = "details">
                        <p>${card.name}</p>
                        <div class="inner-det">
                            <pre>Category  <p>${card.category}</p></pre>
                            <pre>Price         <p>$${card.price}</p></pre>
                        </div>
                        <div class="btns">
                            <div class="viewbttn">
                            <span id = "view">
                                <img src="Icons/eye.png" alt="buy">
                                <p>View</p>
                            </span>
                            </div>
                            <div class="impt-bttn">
                                <span id = "buy">
                                    <img src="Icons/shopping-bag.png" alt="buy">
                                    <p>Buy</p>
                                </span>
                                <span id = "cart">
                                    <img src="Icons/shopping-cart-add.png" alt="cart">
                                    <p>Add to cart</p>
                                </span>
                            </div>
                        </div>
                    </div>
            `;

            mainDiv.appendChild(newDiv);
        }
        
    })
    ShowCategory(bookReference);
    if(!isBookFound){
        mainDiv.style.display = 'flex';
        mainDiv.style.justifyContent = 'center';
        mainDiv.style.alignItems = 'center';

        const newDiv = document.createElement('div');
        newDiv.classList.add('no-book');
    
        newDiv.innerHTML = 
        `
        <img src="Images/no-books.png" alt="no books"/>
        <p>No books found!</p>
        `;
    
        mainDiv.appendChild(newDiv);
    }

    isBookFound = false;
    bookCount = 0;
}

let showCat = document.getElementById('cat-name');
let ShowCategory = (cat) => {
    showCat.innerHTML = `${cat} ( ${bookCount} )`;
}