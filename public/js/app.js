console.log('Client side javascript file is loaded!')

const form = document.querySelector('form#search');
const search= document.querySelector('#search input');
const messageLoad = document.querySelector('#message-0');
const messageOne = document.querySelector('#message-1');
let locationList = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    search.value = '';
    const url = '/weather?address='+encodeURIComponent(searchTerm);

    messageLoad.textContent = 'Loading...';

    fetch(url).then((response) =>{
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageLoad.innerHTML = `${data.error}`;
            } else {
                console.log(data);
                [...messageOne.children].forEach((card) => {
                    card.className = "weatherCard";
                })
                const dup = locationList.filter((loc) => loc.address === data.address);
                if (dup.length !== 0) {
                    const dupCard = document.getElementById(dup[0].address);
                    dupCard.className = "weatherCard active";
                }
                messageLoad.innerHTML = `Your weather update: `;
                const card = new Card('message-1', data);
                locationList.push(data);
            }
        })
    }).catch((error) => {
        console.log('cannot fetch data');
    })
})


class Card {
    constructor(el, data = {}) {
        this.createCard = this.createCard.bind(this);
        this.closeCard = this.closeCard.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.modal = this.createCard(data);
        this.list = locationList;
        const parent = document.getElementById(el);
        parent.insertBefore(this.modal, parent.firstChild);
    }

    createCard(data) {
        const {forecast = "", condition = "Sunny", temperature = 0, location = "", address = ""} = data;

        const node = document.createElement('section');
        node.className = "weatherCard active";
        node.id = address;
        node.addEventListener('click', this.handleClick);
        node.innerHTML = `
            <button type="button" class="close" aria-label="Close">
                <span class="close" aria-hidden="true">&times;</span>
            </button>
            <p class="weatherCard--location">${location}</p>
            <p class="weatherCard--temperature">${temperature} &#176;C</p>
            <p class="weatherCard--description">${condition}</p>
            <p class="weatherCard--forecast">${forecast}</p>
        `
        return node;
    }
    closeCard() {
        this.modal.remove();
    }

    handleClick(e) {
        if (event.target.className === 'close') {
            const tmpList = locationList.filter((card) => card.address !== this.modal.id);
            locationList = tmpList;
            this.closeCard();
        }
    }
}
