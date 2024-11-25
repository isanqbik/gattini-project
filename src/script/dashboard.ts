import { Cat } from "./interface/cat-interface";
import { User } from "./interface/user-interface";
import { CombinedData } from "./interface/combined-data-interface";

let users = [];
let cats = [];
let lista:CombinedData[] = [];
const cardContainer:HTMLElement | null = document.querySelector(".cards-container") as HTMLElement | null;

const searchBox = document.querySelector(".search-box") as HTMLElement | null;
const searchTrigger: HTMLElement | null = document.querySelector("#searchTrigger");
const searchCat: HTMLElement | null = document.querySelector("#searchCat");

const AddCat = document.querySelector("#AddCat") as HTMLElement;

const viewLikedBtn = document.querySelector(".viewLiked") as HTMLElement;

const menuVoices: NodeListOf<HTMLImageElement> | null = document.querySelectorAll(".voice") as NodeListOf<HTMLImageElement>;

const sidebar = document.querySelector(".sidebar") as HTMLElement;
const collapseSidebar = document.querySelector(".collapse-sidebar") as HTMLElement;
const hamburguerBtn = document.querySelector(".hamburguer") as HTMLElement;

const catsCounter = document.querySelector(".counter-number") as HTMLElement;


async function getData(url:string): Promise<any>{
    try {
        let response = await fetch(url);
        let data:any = await response.json();
        return data;
    } 
    catch (error) {
        console.log(`Errore del metodo è ${error}`);  
        throw error;
    }
}

async function main(): Promise<void> {
    try {
        const cats: Cat[] = await getData('https://api.thecatapi.com/v1/images/search?limit=20');
        const userCall = await getData('https://randomuser.me/api/?results=10');
        const users: User[] = userCall.results;

        lista = cats.map((cat, index) => {
            return {
                ...cat,
                catName: users[index].name,
                catGender: users[index].gender,
                catLocation: users[index].location,
                catRegistered: users[index].registered,
                catPreferite: false,
            };
        });
        renderCards(lista);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

function renderCards(lista: CombinedData[]): void {
    console.log("render" + lista.length);
    if (lista) {
        if(cardContainer){
            cardContainer.innerHTML = ""; // remove loader placeholder
        }
        lista.forEach((element) => {
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
                    <div class="status">
                        <div id="${element.id}" class="btnRemove">
                            <span>Remove:</span> <i>${element.id}</i>
                        </div>
                    
                        <div>
                            <img class="avatar" src="../../assets/img/Avatar-1.png" alt="avatar1" />
                            <img class="avatar" src="../../assets/img/Avatar-2.png" alt="avatar 2" />
                            <img class="avatar" src="../../assets/img/Avatar-3.png" alt="avatar 3" />
                        </div>
                    </div>
                </div>
            `;
            if(cardContainer){
                cardContainer.append(card);
            }
        });

        renderImgSpinner();
        removeItem(lista);
        likeAction(lista);

        updateCounter(lista);

    }
}

main();

function likeAction(lista: CombinedData[]) {
    const iconHearts = document.querySelectorAll(".btn-heart") as NodeListOf<HTMLImageElement>;
    iconHearts.forEach((iconHeart, index) => {
        iconHeart.addEventListener("click", (e) => {
            e.preventDefault();
            iconHeart.classList.toggle("icon-heart-full");

            let likedItem:HTMLElement = iconHeart.parentNode?.parentNode?.parentNode as HTMLElement;

            let item = lista.findIndex(x => x.id === iconHeart.id )

            if (lista[item].catPreferite) {
                likedItem.classList.remove("liked-cat");
                lista[item].catPreferite = false;
                console.log("remove favorite" + lista[item].catPreferite);
                console.log(lista);
                
                if(cardContainer && cardContainer.classList.contains("loved")){
                    let filterByLiked:CombinedData[] = lista.filter(cat => cat.catPreferite);
                    console.log("destroy it");
                    console.log(lista.length);
                    likedItem.remove();
                    renderCards(filterByLiked);

                    if (cardContainer.childNodes.length === 0){
                        catsCounter.style.display = "none";
                        cardContainer.innerHTML = `
                        <div class="no-results">
                            <h2>:(</h2>
                            <h4>non ci sono cats preferiti</h4>
                        </div>
                        `;
                    }
                    return;
                }
                
                renderCards(lista);

            } else {
                likedItem.classList.add("liked-cat");
                lista[item].catPreferite = true;
                console.log("add to favorite" + lista[item].catPreferite);
                console.log(lista);
                renderCards(lista);
            }
        });
    });
}

function updateCounter(lista: CombinedData[]): void {
    catsCounter.innerHTML = `total elements to show: <span>${lista.length}</span>`;
    catsCounter.style.display = "block";
    console.log("update counter");
    
}

function renderImgSpinner(): void {
    const imgs = document.querySelectorAll('.card-img') as NodeListOf<HTMLImageElement>;

    imgs.forEach((img: HTMLImageElement) => {
    
        img.onload = function() {
            img.nextElementSibling?.remove();
        };

        img.onerror = function(this: HTMLImageElement) {
            console.log("Hubo un error al cargar la imagen.");
        };
    });
}

viewLikedBtn.addEventListener("click", function() {
    filterLiked();
});

function filterLiked() {
    
    if(viewLikedBtn.classList.contains("loved-active") === false){
        searchBox?.classList.remove("expanded");
    }

    viewLikedBtn.classList.toggle("loved-active");

    console.log(lista);
    
    let filterByLiked:CombinedData[] = lista.filter(cat => cat.catPreferite);

    if (viewLikedBtn.classList.contains("loved-active")){

        if(cardContainer){
            if(filterByLiked.length > 0){
                renderCards(filterByLiked);
                cardContainer.classList.add("loved");
            } else {
                cardContainer.classList.remove("loved");
                catsCounter.style.display = "none";
                cardContainer.innerHTML = `
                    <div class="no-results">
                        <h2>:(</h2>
                        <h4>non ci sono cats preferiti</h4>
                    </div>
                `;
            }
        }
    }else{
        if(cardContainer){
            cardContainer.classList.remove("loved");
            renderCards(lista);
            checkCatsList();
            console.log("salgo de preferidos");
        }
    }

}

function checkPreferit(element: CombinedData){
    return element.catPreferite ? 'icon-heart-full': '';
}

function removeItem(activeLista: CombinedData[]){
    const iconRemoves = document.querySelectorAll('.btnRemove') as NodeListOf<HTMLButtonElement>;

    iconRemoves.forEach((iconRemove, index) => {
        iconRemove.addEventListener("click", (e) => {
            e.preventDefault();
            let index = activeLista.findIndex(x => x.id === iconRemove.id )
            console.log(activeLista[index]);
            activeLista.splice(index, 1);
            lista = lista.filter(cat => cat.id !== iconRemove.id );
        
            renderCards(activeLista);
            checkCatsList();
        })
    });
}

function checkCatsList() {
    console.log("checkCatsList")
    if (cardContainer && cardContainer.childNodes.length === 0){
        cardContainer.innerHTML = `
        <div class="no-results">
            <h2>:(</h2>
            <h4>non ci sono cats</h4>
        </div>
        `;
    }
    return;
}

if (AddCat) {
    AddCat.addEventListener("click", (e: Event) => {
        console.log("add card");
        addSingleCard();
        AddCat.addEventListener('click', scrollToTop);
    });
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

async function addSingleCard(): Promise<void> {
let singleCard: CombinedData
    try {

        const cat: Cat[] = await getData('https://api.thecatapi.com/v1/images/search?limit=1');
        const userCall = await getData('https://randomuser.me/api/?results=1');
        const user: User[] = userCall.results;

        singleCard = {
            ...cat[0],
            catName: user[0].name,
            catGender: user[0].gender,
            catLocation: user[0].location,
            catRegistered: user[0].registered,
            catPreferite: false,
        };

        lista.unshift(singleCard);
        
        renderCards(lista);


    } catch (error) {
        console.error('Error in main function:', error);
    }
}


if (searchTrigger) {
    searchTrigger.addEventListener("click", (e: Event) => {
        console.log("trigger");
        searchBox?.classList.toggle("expanded");
    });
}

if (menuVoices) {
    menuVoices.forEach((menuVoice, index) => {
        menuVoice.addEventListener("click", (e: Event) => {
            menuVoice.parentElement?.classList.toggle("expanded");
        })
    });
}

if (collapseSidebar) {
    collapseSidebar.addEventListener("click", (e: Event) => {
        sidebar?.classList.toggle("expanded");
    });
}

if (hamburguerBtn) {
    hamburguerBtn.addEventListener("click", (e: Event) => {
        hamburguerBtn?.classList.toggle("open");
        sidebar?.classList.toggle("open");
    });
}

if (searchCat) {
    searchCat.addEventListener("change", (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.value) {
            filterSearch(target.value);
        } else {
            console.log("search empty");
            renderCards(lista);
            checkCatsList();
        }
    });
}

function filterSearch(search:string){
    
    console.log(search);
    console.log(lista);
    
    let filterBySearch:CombinedData[] = lista.filter((cat) => cat.catName.first.toLowerCase().includes(search.toLowerCase()));

    if(viewLikedBtn.classList.contains("loved-active")){
        console.log("quito la classe filtered porque");
        filterLiked();
    }else{
        console.log("no hago nada");
    }

    if(cardContainer){
        if(filterBySearch.length > 0){
            renderCards(filterBySearch);
            checkCatsList();
        } else {
            cardContainer.innerHTML = `
                <div class="no-results">
                    <h4>
                        non ci sono resultati
                        per <i>"${search}"</i>
                    </h4>
                </div>
            `;
        }
    }
}

export {} 