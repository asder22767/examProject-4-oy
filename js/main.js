import findElement from "./utils/findElement.js"
import BASE_URL from "./utils/urls.js"
import apiKey from "./utils/apiKey.js"
import { bookmarksHandler, bookmarksRenderer } from "./utils/bookmarks.js"
import { moreInfoHandler } from "./utils/moreInfoRenderer.js"
import { bookmarkID } from "./utils/bookmarks.js"

const elSearchForm = findElement(".header__form")

const elLightChanger = findElement(".header__light-mode")
const elLogout = findElement(".header__btn-logout")

const elCounter = findElement(".header__results")
const elDateFilter = findElement(".header__btn-date-filter")

const elSearchResultsList = findElement(".books__search-list")
const elSearchResultsItems = findElement(".books__search-items")
elSearchResultsList.innerHTML = null

function productRenderer(data) {
  const arr = data.items
  const fragment = document.createDocumentFragment()

  arr.forEach(({ volumeInfo, id }) => {
    const template = elSearchResultsItems.cloneNode(true)

    const topImg = findElement(".books__card-img-top", template)
    if (volumeInfo.imageLinks) {
      topImg.src = volumeInfo.imageLinks.thumbnail
    } else {
      topImg.src = "./img/img_not_found.jpg"
    }

    const title = findElement(".books__card-title", template)
    title.textContent = volumeInfo.title

    const author = findElement(".books__card-author", template)
    if (volumeInfo.authors) {
      if (volumeInfo.authors.length > 1) {
        author.textContent = `${volumeInfo.authors[0]} etc.`
      } else {
        author.textContent = volumeInfo.authors
      }
    } else {
      author.textContent = "<<author is unknown>>"
    }

    const date = findElement(".books__card-date", template)
    if (volumeInfo.publishedDate) {
      date.textContent = volumeInfo.publishedDate
    } else {
      date.textContent = "<<no publishing date>>"
    }

    const btnBookmark = findElement(".books__btn-bookmark", template)
    btnBookmark.id = `a${id}`
    template.addEventListener("click", (evt) => {
      if (evt.target.className.includes("books__btn-bookmark")) {
        const target = evt.target
        class newBookmark {
          constructor(title, authors, previewLink, id) {
            this.title = title
            this.authors = authors
            this.preview = previewLink
            this.id = id
          }
        }
        const newBook = {
          title: volumeInfo.title,
          authors: volumeInfo.authors,
          previewLink: volumeInfo.previewLink,
          id: id,
        }

        bookmarksHandler(target, newBook, id)
      }

      if (evt.target.className.includes("books__btn-info")) {
        moreInfoHandler(volumeInfo)
      }

      if (evt.target.className.includes("books__card-link")) {
        window.location.href = volumeInfo.previewLink
      }
    })

    fragment.appendChild(template)
  })

  elSearchResultsList.appendChild(fragment)
}
bookmarksRenderer()

const fetcher = async () => {
  try {
    const res = await fetch(BASE_URL)

    const data = await res.json()

    productRenderer(data)
  } catch (error) {
    console.error(error)
  }
}

fetcher()
