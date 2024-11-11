let users = [];
let cats = [];
const cardContainer = document.querySelector(".cards-container");    

async function getData(url){
    try {
        let response = await fetch(url);
        let data = await response.json();
        return await data;
    } 
    catch (error) {
        console.log(`Errore del metodo è ${error}`);  
    }
}

async function main() {
    cats = await getData('https://api.thecatapi.com/v1/images/search?limit=20');
    let userCall = await getData('https://randomuser.me/api/?results=10');
    users = await userCall.results;
    //console.log(users);
    //console.log(cats);

    let combinedData = cats.map((cat, index) => {
        return { 
            ...cat, 
            catName: users[index].name, 
            catGender: users[index].gender, 
            catLocation: users[index].location,
            catRegistered: users[index].registered,
            catPreferite: false,
        }
    })
    
    this.renderCards(combinedData);

    for (i = 0; i < combinedData.length; i++) {
        //console.log(`gattino se llama ${combinedData[i].catName.first} con su foto ${combinedData[i].url}`);
    }    

    const viewLikedBtn = document.querySelector(".viewLiked");
    viewLikedBtn.addEventListener("click", function() {
        filterLiked();
    });

    function filterLiked() {
        
        viewLikedBtn.classList.toggle("loved-active");
        
        let filterByLiked = combinedData.filter(cat => cat.catPreferite);

        if (viewLikedBtn.classList.contains("loved-active")){

            if(filterByLiked.length > 0){
                renderCards(filterByLiked);
                cardContainer.classList.add("loved");
            } else {
                cardContainer.classList.remove("loved");
                cardContainer.innerHTML = `
                    <div class="no-results">
                        <h2>:(</h2>
                        <h4>non ci sono cats preferiti</h4>
                    </div>
                `;
            }
        }else{
            cardContainer.classList.remove("loved");
            renderCards(combinedData);
        }
    }

    searchCat.addEventListener("change", (e) => {
        if (e.target.value) {
            filterBySearch(e.target.value);
        }else{
            console.log("search empty");
            renderCards(combinedData);
        } 
    });

    function filterBySearch(search){
        
        console.log(search);
        console.log(combinedData);
        
        let filterBySearch = combinedData.filter((cat) => cat.catName.first.toLowerCase().includes(search.toLowerCase()));
        console.log(filterBySearch);
        renderCards(filterBySearch);
        
    }
}
main();

searchTrigger.addEventListener("click", (e) => {
    console.log("trigger");
    document.querySelector(".search-box").classList.toggle("expanded");
});

AddCat.addEventListener("click", (e) => {
    console.log("New Cat Add");
    const card = document.createElement('div');
    card.classList.add('cat-card');
    cardContainer.append(card);
});



function renderCards(lista) {
    console.log("render");
    if(lista){
        cardContainer.innerHTML = ""; // remove loader placeholder
        lista.forEach((element, i) => {
            const card = document.createElement('div');
            card.classList.add('cat-card');
            card.id = "idCat" + element.id;

            card.innerHTML = `
                <figure style="background-image:url('${element.url}');">
                    <img
                    class="card-img"
                    src="${element.url}"
                    alt="${element.catName.first}"
                    title="${element.catName.first}"
                    />
                    <div class="spinner"></div>
                </figure>
                <div class="card-info">
                    <h2>
                        ${element.catName.title}
                        ${element.catName.first}
                        ${element.catName.last}
                        <i liked-status="${element.catPreferite}" id="${element.id}" title="" class="btn-heart icon icon-heart-outline 
                        ${checkPreferit(element)}
                        "></i>
                    </h2>
                    <p class="description">
                        ${element.catLocation.street.name},
                        ${element.catLocation.street.number},
                        ${element.catLocation.street.name},
                        ${element.catLocation.city}
                        ${element.catLocation.postcode}
                    </p>
                    <p class="extra">
                        since: ${element.catRegistered.date.substring(0, 4)}
                        - 
                         ${element.catGender}
                        -
                        age: ${element.catRegistered.age}
                    </p>
                    <div id="${element.id}" class="btnRemove">Remove</div>
                    <div class="status">
                        <span>
                            ${element.id}
                        </span>
                        <div>
                            <img class="avatar" src="assets/img/Avatar-1.png" alt="avatar1" />
                            <img class="avatar" src="assets/img/Avatar-2.png" alt="avatar 2" />
                            <img class="avatar" src="assets/img/Avatar-3.png" alt="avatar 3" />
                        </div>
                    </div>
                </div>
            `;
            cardContainer.append(card);

        });

        renderImgSpinner();

        removeItem(lista);
        likeAction(lista);
        
    }
}

function checkPreferit(element){
    return element.catPreferite ? 'icon-heart-full': '';
}


function removeItem(combinedData){
    const iconRemoves = document.querySelectorAll('.btnRemove');
    iconRemoves.forEach((iconRemove, index) => {
        iconRemove.addEventListener("click", (e) => {
            e.preventDefault();
            let index = combinedData.findIndex(x => x.id === iconRemove.id )
            console.log(combinedData[index]);
            combinedData.splice(index, 1);
            renderCards(combinedData);

            if (cardContainer.childNodes.length === 0){
                cardContainer.innerHTML = `
                <div class="no-results">
                    <h2>:(</h2>
                    <h4>non ci sono cats</h4>
                </div>
                `;
            }
            return;
            //likeAction(combinedData);
        })
    });
}


function likeAction(combinedData) {
    const iconHearts = document.querySelectorAll(".btn-heart");
    iconHearts.forEach((iconHeart, index) => {
        iconHeart.addEventListener("click", (e) => {
            e.preventDefault();
            iconHeart.classList.toggle("icon-heart-full");

            let likedItem = iconHeart.parentNode.parentNode.parentNode;

            let item = combinedData.findIndex(x => x.id === iconHeart.id )

            if (combinedData[item].catPreferite) {
                likedItem.classList.remove("liked-cat");
                combinedData[item].catPreferite = false;
                console.log("remove favorite" + combinedData[item].catPreferite);
                console.log(combinedData);
                
                if(cardContainer.classList.contains("loved")){
                    console.log("destroy it");
                    console.log(combinedData.length);
                    likedItem.remove();

                    if (cardContainer.childNodes.length === 0){
                        cardContainer.innerHTML = `
                        <div class="no-results">
                            <h2>:(</h2>
                            <h4>non ci sono cats preferiti</h4>
                        </div>
                        `;
                    }
                    return;
                }
                
                renderCards(combinedData);

            } else {
                likedItem.classList.add("liked-cat");
                combinedData[item].catPreferite = true;
                console.log("add to favorite" + combinedData[item].catPreferite);
                console.log(combinedData);
                renderCards(combinedData);
            }
        });
    });
}

function renderImgSpinner(){
    const imgs = document.querySelectorAll(".card-img"); 

    imgs.forEach(img => { 
        img.onload = function() {
            //console.log("La imagen ha sido cargada completamente.");
            this.nextElementSibling.remove(); 
        }; 
        img.onerror = function() { 
            //console.log("Hubo un error al cargar la imagen.");
        };
    });
}


document.addEventListener("DOMContentLoaded", function() { 
    //console.log("dom loaded");
});

