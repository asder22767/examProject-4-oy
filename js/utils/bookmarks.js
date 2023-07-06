function findElement(element, parent = document) {
  return parent.querySelector(element)
}

const elBookmarkList = findElement(".books__bookmarks-list")
const elBookmarkTemplate = findElement(".books__bookmarks-items")
elBookmarkList.innerHTML = null

export let bookmarkID = []
export let bookmarksData = []

export function bookmarksHandler(newBook, id) {
  if (bookmarkID.includes(id)) {
    filterer(id)
  } else {
    bookmarkID.push(id)
    bookmarksData.push(newBook)
    bookmarksRenderer()
  }
}

function filterer(id) {
  bookmarkID = bookmarkID.filter((i) => i != id)
  bookmarksData = bookmarksData.filter((book) => book.id != id)
  bookmarksRenderer()
}

export function bookmarksRenderer() {
  elBookmarkList.innerHTML = null
  const fragment = document.createDocumentFragment()

  bookmarksData.forEach((bookmark) => {
    const template = elBookmarkTemplate.cloneNode(true)
    const title = findElement(".books__items-heading", template)
    title.textContent = bookmark.title

    const author = findElement(".books__items-text", template)
    if (bookmark.authors) {
      if (bookmark.authors.length == 1) {
        author.textContent = bookmark.authors
      } else {
        author.textContent = `${bookmark.authors[0]} etc.`
      }
    } else {
      author.textContent = "<<authors is unknown>>"
    }
    template.addEventListener("click", (evt) => {
      if (evt.target.className.includes("books__more-info-img")) {
        console.log("salm")
        window.location.href = bookmark.previewLink
      }

      if (evt.target.className.includes("books__delete-img")) {
        filterer(bookmark.id)
      }
    })
    fragment.appendChild(template)
  })
  elBookmarkList.appendChild(fragment)
}
