let users = [];
let cats = [];

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
        return { ...cat, catName: users[index].name, catGender: users[index].gender }
    })
    
    this.renderCards(combinedData);

    for (i = 0; i < combinedData.length; i++) {
        console.log(`gattino se llama ${combinedData[i].catName.first} con su foto ${combinedData[i].url}`);
    }
}
main();

function renderCards(lista) {

    console.log(lista);

    if(lista){

        const cardContainer = document.querySelector(".cards-container");    
        cardContainer.innerHTML = ""; // remove loader placeholder

        lista.forEach((element, i) => {
            const card = document.createElement('div');
            card.classList.add('cat-card');

            card.innerHTML = `
                <figure style="background-image:url('${element.url}');">
                    <img
                    class="card-img"
                    src="${element.url}"
                    alt="${element.catName.first}"
                    title="${element.catName.first}"
                    />
                </figure>
                <div class="card-info">
                    <h2>
                        ${element.catName.title}
                        ${element.catName.first}
                        ${element.catName.last}
                        <i title="Remove Like :(" class="icon icon-heart-full"></i>
                    </h2>
                    <p class="description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices erat nec metus fermentum gravida.</p>
                    <div class="status">
                        <span>
                            ${element.id}
                            ${element.catGender}
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
    }
}