
// class Card {
//     constructor(el, data = {}, locationList = []) {
//         this.createCard = this.createCard.bind(this);
//         this.closeCard = this.closeCard.bind(this);
//         this.handleClick = this.handleClick.bind(this);
//
//         this.modal = this.createCard(data);
//         this.list = locationList;
//         document.getElementById(el).appendChild(this.modal);
//     }
//
//     createCard(data) {
//         const {forecast = "", condition = "Sunny", location = "", address = ""} = data;
//
//         const node = document.createElement('section');
//         node.className = "weatherCard";
//         node.id = address;
//         node.addEventListener('click', this.handleClick);
//         node.innerHTML = `
//             <button type="button" class="close" aria-label="Close">
//                 <span class="close" aria-hidden="true">&times;</span>
//             </button>
//             <p>Weather at <b> ${location} </b> is ${condition}</p>
//             <p>${forecast}</p>
//         `
//         return node;
//     }
//     closeCard() {
//         this.modal.remove();
//     }
//
//     handleClick(e) {
//         if (event.target.className === 'close') {
//             const tmpList = this.list.filter((card) => card.address !== this.modal.id);
//             this.list = tmpList;
//             this.closeCard();
//         }
//     }
// }

module.exports = Card;
