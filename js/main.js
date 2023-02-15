import findElement from "./utils/findElement.js";
import BASE_URL from "./utils/baseUrl.js";

const elSearchForm = findElement(".header__form");

const elLightChanger = findElement(".header__light-mode");
const elLogout = findElement(".header__btn-logout");

const elCounter = findElement(".header__results");
const elDateFilter = findElement(".header__btn-date-filter");

const elBookmarkList = findElement(".books__bookmarks-list");
const elBookmarkTemplate = findElement(".books__bookmarks-items");

const elSearchResultsList = findElement(".books__search-list");
const elSearchResultsItems = findElement(".books__search-items");
elSearchResultsList.innerHTML = null;

function productRenderer (data) {
    const arr = data.items;
    const fragment = document.createDocumentFragment();
    // data.forEach(element => {
    //     console.log(element);
    //     const template = elSearchResultsItems.cloneNode(true);
    
    //     const topImg = findElement(".books__card-img-top", template);
    //     topImg.src = element.avatar;
    
    //     const title = findElement(".books__card-title", template);
    //     title.textContent = element.name;
    
    //     const description = findElement(".books__card-text", template);
    //     description.textContent = element.description;
    
    //     const moreInfolink = findElement(".books__card-link", template);
    //     // moreInfolink.href = element.volumeInfo.previewLink;
    
    //     fragment.appendChild(template);
    // });
    
    arr.forEach(element => {
        console.log(element);
        const info = element.volumeInfo;
        const template = elSearchResultsItems.cloneNode(true);
        
        const topImg = findElement(".books__card-img-top", template);
        topImg.src = info.imageLinks.thumbnail;
        
        const title = findElement(".books__card-title", template);
        title.textContent = info.title;

        const author = findElement(".books__card-author", template);
        if (info.authors) {
            if (info.authors.length > 1) {
                author.textContent = `${info.authors} etc.`;
            } else {
                author.textContent = info.authors;
            }
        }

        const date = findElement(".books__card-date", template);
        date.textContent = info.publishedDate;
        
        const moreInfolink = findElement(".books__card-link", template);
        // moreInfolink.href = info.previewLink;
        
        fragment.appendChild(template);
    });
    
    elSearchResultsList.appendChild(fragment);
}

const fetcher = async () => {
    try {
        const res = await fetch(BASE_URL);
        
        const data = await res.json();
        
        productRenderer(data)
    } catch (error) {
        console.error(error);
    };
};

fetcher();