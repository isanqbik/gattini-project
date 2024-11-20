var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [];
let cats = [];
let lista = [];
const cardContainer = document.querySelector(".cards-container");
const searchBox = document.querySelector(".search-box");
const searchTrigger = document.querySelector("#searchTrigger");
const searchCat = document.querySelector("#searchCat");
const AddCat = document.querySelector("#AddCat");
const viewLikedBtn = document.querySelector(".viewLiked");
const menuVoices = document.querySelectorAll(".voice");
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(url);
            let data = yield response.json();
            return data;
        }
        catch (error) {
            console.log(`Errore del metodo è ${error}`);
            throw error;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cats = yield getData('https://api.thecatapi.com/v1/images/search?limit=20');
            const userCall = yield getData('https://randomuser.me/api/?results=10');
            const users = userCall.results;
            lista = cats.map((cat, index) => {
                return Object.assign(Object.assign({}, cat), { catName: users[index].name, catGender: users[index].gender, catLocation: users[index].location, catRegistered: users[index].registered, catPreferite: false });
            });
            renderCards(lista);
        }
        catch (error) {
            console.error('Error in main function:', error);
        }
    });
}
function renderCards(lista) {
    console.log("render" + lista.length);
    if (lista) {
        if (cardContainer) {
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
                    <div id="${element.id}" class="btnRemove">Remove</div>
                    <div class="status">
                        <span>
                            ${element.id}
                        </span>
                        <div>
                            <img class="avatar" src="../../assets/img/Avatar-1.png" alt="avatar1" />
                            <img class="avatar" src="../../assets/img/Avatar-2.png" alt="avatar 2" />
                            <img class="avatar" src="../../assets/img/Avatar-3.png" alt="avatar 3" />
                        </div>
                    </div>
                </div>
            `;
            if (cardContainer) {
                cardContainer.append(card);
            }
        });
        renderImgSpinner();
        removeItem(lista);
        likeAction(lista);
    }
}
main();
function likeAction(lista) {
    const iconHearts = document.querySelectorAll(".btn-heart");
    iconHearts.forEach((iconHeart, index) => {
        iconHeart.addEventListener("click", (e) => {
            var _a, _b;
            e.preventDefault();
            iconHeart.classList.toggle("icon-heart-full");
            let likedItem = (_b = (_a = iconHeart.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode;
            let item = lista.findIndex(x => x.id === iconHeart.id);
            if (lista[item].catPreferite) {
                likedItem.classList.remove("liked-cat");
                lista[item].catPreferite = false;
                console.log("remove favorite" + lista[item].catPreferite);
                console.log(lista);
                if (cardContainer && cardContainer.classList.contains("loved")) {
                    console.log("destroy it");
                    console.log(lista.length);
                    likedItem.remove();
                    if (cardContainer.childNodes.length === 0) {
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
            }
            else {
                likedItem.classList.add("liked-cat");
                lista[item].catPreferite = true;
                console.log("add to favorite" + lista[item].catPreferite);
                console.log(lista);
                renderCards(lista);
            }
        });
    });
}
function renderImgSpinner() {
    const imgs = document.querySelectorAll('.card-img');
    imgs.forEach((img) => {
        img.onload = function () {
            var _a;
            (_a = img.nextElementSibling) === null || _a === void 0 ? void 0 : _a.remove();
        };
        img.onerror = function () {
            // console.log("Hubo un error al cargar la imagen.");
        };
    });
}
viewLikedBtn.addEventListener("click", function () {
    filterLiked();
});
function filterLiked() {
    if (viewLikedBtn.classList.contains("loved-active") === false) {
        searchBox === null || searchBox === void 0 ? void 0 : searchBox.classList.remove("expanded");
    }
    viewLikedBtn.classList.toggle("loved-active");
    console.log(lista);
    let filterByLiked = lista.filter(cat => cat.catPreferite);
    if (viewLikedBtn.classList.contains("loved-active")) {
        if (cardContainer) {
            if (filterByLiked.length > 0) {
                renderCards(filterByLiked);
                cardContainer.classList.add("loved");
            }
            else {
                cardContainer.classList.remove("loved");
                cardContainer.innerHTML = `
                    <div class="no-results">
                        <h2>:(</h2>
                        <h4>non ci sono cats preferiti</h4>
                    </div>
                `;
            }
        }
    }
    else {
        if (cardContainer) {
            cardContainer.classList.remove("loved");
            renderCards(lista);
            checkCatsList();
            console.log("salgo de preferidos");
        }
    }
}
function checkPreferit(element) {
    return element.catPreferite ? 'icon-heart-full' : '';
}
function removeItem(activeLista) {
    const iconRemoves = document.querySelectorAll('.btnRemove');
    iconRemoves.forEach((iconRemove, index) => {
        iconRemove.addEventListener("click", (e) => {
            e.preventDefault();
            let index = activeLista.findIndex(x => x.id === iconRemove.id);
            console.log(activeLista[index]);
            activeLista.splice(index, 1);
            lista = lista.filter(cat => cat.id !== iconRemove.id);
            renderCards(activeLista);
            checkCatsList();
        });
    });
}
function checkCatsList() {
    console.log("checkCatsList");
    if (cardContainer && cardContainer.childNodes.length === 0) {
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
    AddCat.addEventListener("click", (e) => {
        console.log("add card");
        addSingleCard();
    });
}
function addSingleCard() {
    return __awaiter(this, void 0, void 0, function* () {
        let singleCard;
        try {
            const cat = yield getData('https://api.thecatapi.com/v1/images/search?limit=1');
            const userCall = yield getData('https://randomuser.me/api/?results=1');
            const user = userCall.results;
            singleCard = Object.assign(Object.assign({}, cat[0]), { catName: user[0].name, catGender: user[0].gender, catLocation: user[0].location, catRegistered: user[0].registered, catPreferite: false });
            lista.unshift(singleCard);
            renderCards(lista);
        }
        catch (error) {
            console.error('Error in main function:', error);
        }
    });
}
if (searchTrigger) {
    searchTrigger.addEventListener("click", (e) => {
        console.log("trigger");
        searchBox === null || searchBox === void 0 ? void 0 : searchBox.classList.toggle("expanded");
    });
}
if (menuVoices) {
    menuVoices.forEach((menuVoice, index) => {
        menuVoice.addEventListener("click", (e) => {
            var _a;
            (_a = menuVoice.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("expanded");
        });
    });
}
if (searchCat) {
    searchCat.addEventListener("change", (e) => {
        const target = e.target;
        if (target.value) {
            filterSearch(target.value);
        }
        else {
            console.log("search empty");
            renderCards(lista);
            checkCatsList();
        }
    });
}
function filterSearch(search) {
    console.log(search);
    console.log(lista);
    let filterBySearch = lista.filter((cat) => cat.catName.first.toLowerCase().includes(search.toLowerCase()));
    if (viewLikedBtn.classList.contains("loved-active")) {
        console.log("quito la classe filtered porque");
        filterLiked();
    }
    else {
        console.log("no hago nada");
    }
    if (cardContainer) {
        if (filterBySearch.length > 0) {
            renderCards(filterBySearch);
            checkCatsList();
        }
        else {
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
export {};
//# sourceMappingURL=dashboard.js.map