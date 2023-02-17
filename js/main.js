import findElement from "./utils/findElement.js";
import BASE_URL from "./utils/urls.js";
import { mockApi } from "./utils/urls.js";
import apiKey from "./utils/apiKey.js";

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

const moreInfo = findElement(".more-info");
const btnRead = findElement(".more-info__read-btn");

const closeBtn = findElement(".more-info__btn-close");
const shadow = findElement(".more-info__shadow");

const authorsSection = findElement(".more-info__card-details");
const wrapper = findElement(".more-info__span-wrapper");
const moreInfoAuthors = findElement(".more-info__authors");

function productRenderer (data) {
    const arr = data.items;
    const fragment = document.createDocumentFragment();
    
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
                author.textContent = `${info.authors[0]} etc.`;
            } else {
                author.textContent = info.authors;
            }
        }
        
        const date = findElement(".books__card-date", template);
        date.textContent = info.publishedDate;
        
        template.addEventListener("click", (evt) => {
            if (evt.target.className.includes("books__btn-bookmark")) {
                class newBookmark {
                    constructor(title, authors, previewLink) {
                        this.title = title;
                        this.authors = authors;
                        this.preview = previewLink;
                    }
                };
                
                const bookmarkTemplate = elBookmarkTemplate.cloneNode("true");
                
                const bookTitle = findElement(".books__items-heading", bookmarkTemplate);
                bookTitle.textContent = info.title;
                
                const bookAuthor = findElement(".books__items-text", bookmarkTemplate);
                if (info.authors) {
                    if (info.authors.length > 1) {
                        bookAuthor.textContent = `${info.authors[0]} etc.`;
                    } else {
                        bookAuthor.textContent = info.authors;
                    }
                }
                
                const newBook = {
                    title: info.title,
                    authors: info.authors, 
                    preview: info.previewLink
                }
                console.log(newBook);
                
                elBookmarkList.appendChild(bookmarkTemplate);
                
                fetch(mockApi + "bookmarks", {
                    method: "POST",
                    body: JSON.stringify(newBook),
                })
                .then((res) => res.json())
                .then((json) => console.log(json))
                .catch((error) => console.error(error))
                
            }

            if (evt.target.className.includes("books__btn-info")) {
                closeBtn.addEventListener("click", () => {
                    moreInfo.classList.add("d-none");
                    wrapper.innerHTML = null;
                });

                shadow.addEventListener("click", () => {
                    moreInfo.classList.add("d-none");
                    wrapper.innerHTML = null;
                });
                
                moreInfo.classList.remove("d-none");
                const moreInfoTitle = findElement(".more-info__heading");
                moreInfoTitle.textContent = info.title;
                
                const img = findElement(".more-info__card-img-top");
                img.src = info.imageLinks.thumbnail;
                
                if (info.description) {
                    const description = findElement(".more-info__card-description");
                    description.textContent = info.description;
                };
                
                if (info.authors) {                    
                    wrapper.innerHTML = null;

                    if (info.authors.length > 1) {
                        
                        for (const item of info.authors) {
                            const authorsTemplate = moreInfoAuthors.cloneNode("true");
                            authorsTemplate.textContent = item;
                            
                            wrapper.appendChild(authorsTemplate);
                        }
                    } else {
                        const authorsTemplate = moreInfoAuthors.cloneNode("true"); 

                        authorsTemplate.textContent = info.authors;
                        wrapper.appendChild(authorsTemplate);
                    }
                }
                
                if (info.publishedDate) {
                    const dateOfPublishing = findElement(".more-info__date");
                    dateOfPublishing.textContent = info.publishedDate;
                }
                
                if (info.publisher) {
                    const publisher = findElement(".more-info__publisher");
                    publisher.textContent = info.publisher;
                }
                
                if (info.categories) {
                    const category = findElement(".more-info__category");
                    category.textContent = info.categories;
                }
                
                const pages = findElement(".more-info__pages");
                if (info.pageCount) {
                    pages.textContent = info.pageCount;
                } else {
                    pages.textContent = "Pages is not available";
                }

                btnRead.addEventListener("click", () => {
                    window.location.href = info.previewLink;
                })
            }
            
            if (evt.target.className.includes("books__card-link")) {
                window.location.href = info.previewLink;
            };
        });
        
        fragment.appendChild(template);
    });
    
    elSearchResultsList.appendChild(fragment);
}

function bookmarkRendering (data) {
    console.log(data);
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

// const bookmarkFetcher = async () => {
//     try {
//         const res = await fetch(mockApi + "bookmarks");

//         const data = await res.json();

//         bookmarkRendering(data)
//     } catch (error) {
//         console.error(error);
//     }
// }

// bookmarkFetcher()