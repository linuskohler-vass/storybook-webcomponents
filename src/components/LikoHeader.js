import { tw } from "../utils/tw.js";
import { LikoButtonExport } from "./LikoButton";

class LikoHeader extends HTMLElement {
    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
        this.update();
    }

    connectedCallback() {
        this.render();
    }

    update() {
        if (this.isConnected) {
            this.render();
        }
    }

    render() {
        this.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = tw`flex items-center justify-between border-b border-black/10 px-5 py-[15px] font-nunito-sans`;

        const logoDiv = document.createElement("div");
        logoDiv.innerHTML = `<svg class="${tw`inline-block align-top`}" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path
        d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
        fill="#FFF"
      />
      <path
        d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
        fill="#555AB9"
      />
      <path
        d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
        fill="#91BAF8"
      />
    </g>
  </svg>
  <h1 class="${tw`my-[6px] ml-[10px] inline-block align-top text-[20px] leading-none font-bold`}">Acme</h1>`;

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = tw`space-x-[10px]`;

        if (this._user) {
            const welcomeSpan = document.createElement("span");
            welcomeSpan.className = tw`mr-[10px] text-sm text-[#333]`;
            welcomeSpan.innerText = `Welcome, ${this._user.name}!`;
            buttonsDiv.appendChild(welcomeSpan);

            const btn = LikoButtonExport({
                size: "small",
                label: "Log out",
                onClick: () => this.dispatchEvent(new CustomEvent("logout", { bubbles: true })),
            });
            buttonsDiv.appendChild(btn);
        } else {
            const loginBtn = LikoButtonExport({
                size: "small",
                label: "Log in",
                onClick: () => this.dispatchEvent(new CustomEvent("login", { bubbles: true })),
            });

            const signupBtn = LikoButtonExport({
                primary: true,
                size: "small",
                label: "Sign up",
                onClick: () => this.dispatchEvent(new CustomEvent("createAccount", { bubbles: true })),
            });

            buttonsDiv.appendChild(loginBtn);
            buttonsDiv.appendChild(signupBtn);
        }

        wrapper.appendChild(logoDiv);
        wrapper.appendChild(buttonsDiv);
        this.appendChild(wrapper);
    }
}

if (!customElements.get("liko-header")) {
    customElements.define("liko-header", LikoHeader);
}

export const LikoHeaderExport = ({ user, onLogin, onLogout, onCreateAccount }) => {
    const header = document.createElement("liko-header");
    header.user = user;

    if (onLogin) header.addEventListener("login", onLogin);
    if (onLogout) header.addEventListener("logout", onLogout);
    if (onCreateAccount) header.addEventListener("createAccount", onCreateAccount);

    return header;
};
