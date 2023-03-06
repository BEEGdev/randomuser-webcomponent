import { getUser } from '../modules/getUser.js';

class RandomUser extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    async connectedCallback() {
        this.data = await getUser();
        this.render();
    }

    render() {
        const color = this.data.country === 'Spain' ? 'red' : 'black'
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            .card{
                border:3px solid ${color};
                width: 500px;
                background-color: white;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                gap: 20px;
            }
        </style>
        <div class="card">
            <img src="${this.data.picture}" alt="${this.data.name}">
            <div class="information">
                <div class="name">${this.data.name}</div>
                <div class="username">${this.data.username}</div>
                <div class="city">${this.data.city}</div>
                <div class="country">${this.data.country}</div>
                <div class="email">${this.data.email}</div>
            </div>
        </div>`;
    }
}



customElements.define('random-user', RandomUser)