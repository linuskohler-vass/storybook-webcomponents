import { tw } from "../../utils/tw.js";
import "../molecules/LikoHeader";

class LikoPage extends HTMLElement {
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
        const header = this.querySelector("liko-header");
        if (header) {
            header.user = this._user;
        } else {
            this.render();
        }
    }

    render() {
        this.innerHTML = "";
        const article = document.createElement("article");

        const header = document.createElement("liko-header");
        header.user = this._user;
        article.appendChild(header);

        const section = document.createElement("section");
        section.className = tw`mx-auto max-w-[600px] px-5 py-12 font-nunito-sans text-sm leading-6 text-[#333]`;

        section.innerHTML = `
    <h2>Pages in Storybook</h2>
    <p class="${tw`my-4`}">
      We recommend building UIs with a
      <a href="https://componentdriven.org" target="_blank" rel="noopener noreferrer" class="${tw`text-inherit no-underline`}">
        <strong>component-driven</strong> </a
      >process starting with atomic components and ending with pages.
    </p>
    <p class="${tw`my-4`}">
      Render pages with mock data. This makes it easy to build and review page states without
      needing to navigate to them in your app. Here are some handy patterns for managing page data
      in Storybook:
    </p>
    <ul class="${tw`my-4 list-disc pl-[30px]`}">
      <li class="${tw`mb-2`}">
        Use a higher-level connected component. Storybook helps you compose such data from the
        "args" of child component stories
      </li>
      <li class="${tw`mb-2`}">
        Assemble data in the page component from your services. You can mock these services out
        using Storybook.
      </li>
    </ul>
    <p class="${tw`my-4`}">
      Get a guided tutorial on component-driven development at
      <a href="https://storybook.js.org/tutorials/" target="_blank" rel="noopener noreferrer" class="${tw`text-inherit no-underline`}">
        Storybook tutorials
      </a>
      . Read more in the
      <a href="https://storybook.js.org/docs" target="_blank" rel="noopener noreferrer" class="${tw`text-inherit no-underline`}"> docs </a>
      .
    </p>
    <div class="${tw`my-10 text-[13px] leading-5`}">
      <span class="${tw`mr-2.5 inline-block rounded-[1em] bg-[#e7fdd8] px-3 py-1 align-top text-[11px] leading-3 font-bold text-[#357a14]`}">Tip</span> Adjust the width of the canvas with the
      <svg class="${tw`mt-[3px] mr-1 inline-block h-3 w-3 align-top`}" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path
            d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
            id="a"
            class="${tw`fill-[#1ea7fd]`}"
          />
        </g>
      </svg>
      Viewports addon in the toolbar
    </div>
  `;

        article.appendChild(section);
        this.appendChild(article);
    }
}

if (!customElements.get("liko-page")) {
    customElements.define("liko-page", LikoPage);
}

export const LikoPageExport = ({ user, onLogin, onLogout, onCreateAccount }) => {
    const page = document.createElement("liko-page");
    page.user = user;

    if (onLogin) page.addEventListener("login", onLogin);
    if (onLogout) page.addEventListener("logout", onLogout);
    if (onCreateAccount) page.addEventListener("createAccount", onCreateAccount);

    return page;
};
