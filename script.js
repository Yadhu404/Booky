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
                            <span id = "view" onclick="ExpandBook('${card.imgurl}', '${card.name}', '${card.category}', ${card.price})">
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

//Shows a tab that contains more details about the book
let body = document.body;
let ExpandBook = (bookUrl, bookName, category, price) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('expand-card');


    newDiv.innerHTML = 
    `
    <div class="big-card">
            <div class="book-pic">
                <img src="${bookUrl}" alt="book" />
            </div>
            <div class="det">
                <div class="close">
                    <p>${bookName}</p>
                    <img src="Icons/close.png" alt="close" onclick = "CloseBookViewTab()">
                </div>
                <div class="para">
                    <p>
                        The book had appeared on the old library shelf as if it had grown there overnight, 
                        its faded green cover whispering of hidden adventures. No author was listed, and 
                        the title—The Clockmaker's Whispers—was embossed in gold that shimmered oddly in 
                        dim light. Anyone who picked it up claimed the pages felt warm, almost alive, and 
                        the story inside seemed to shift each time it was read. Some said the book chose its 
                        reader, revealing different truths to different hands, while others insisted it was 
                        merely an eccentric relic. But everyone agreed on one thing: once you opened it, it 
                        was almost impossible to put it down.
                    </p>
                </div>
                <div class="cat-pri">
                    <pre>Category   <p>${category}</p></pre>
                    <pre>Price   <p>$${price}</p></pre>
                </div>
                <div class="search-with-cat">
                    <span onclick = 'BookViewTabCloseEvent("${category}")'>
                        <p>Search books this category</p>
                        <img src="Icons/right-arrow.png" alt="rightarrow"/>
                    </span>
                </div>
                <div class="impt-bttn-1">
                    <span id = "buy">
                        <img src="Icons/shopping-bag.png" alt="buy">
                        <p>Buy</p>
                    </span>
                    <span id = "rcart">
                        <img src="Icons/shopping-cart-add.png" alt="cart">
                        <p>Add to cart</p>
                    </span>
                </div>
            </div>
        </div>
    `;

    body.appendChild(newDiv);
}

let searchBox = document.getElementById('search-box');
let BookViewTabCloseEvent = (category) => {
    CloseBookViewTab();
    FetchBookData(category);
    searchBox.value = category;
}

let CloseBookViewTab = () => {
    let tab = document.getElementsByClassName('expand-card')[0];
    if(tab){
        body.removeChild(tab);
    }
}