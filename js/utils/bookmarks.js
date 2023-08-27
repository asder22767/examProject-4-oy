function findElement(element, parent = document) {
  return parent.querySelector(element)
}

const elBookmarkList = findElement(".books__bookmarks-list")
const elBookmarkTemplate = findElement(".books__bookmarks-items")
elBookmarkList.innerHTML = null

export let bookmarkID = []
export let bookmarksData = []

export function bookmarksHandler(target, newBook, id) {
  if (newBook && id) {
    if (bookmarkID.includes(id)) {
      filterer(id)
    } else {
      bookmarkID.push(id)
      bookmarksData.push(newBook)
      bookmarksRenderer()
    }
  }
  bookmarkedHandler(id)
}

function filterer(id) {
  bookmarkID = bookmarkID.filter((i) => i != id)
  bookmarksData = bookmarksData.filter((book) => book.id != id)
  bookmarksRenderer()
}

function bookmarkedHandler(id) {
  const btnBookmark = findElement(`#a${id}`)
  if (bookmarkID.includes(id)) {
    btnBookmark.style.backgroundColor = "#ffffff"
  } else {
    btnBookmark.style.backgroundColor = "#ffd80d"
  }
}

export function bookmarksRenderer() {
  elBookmarkList.innerHTML = null
  const fragment = document.createDocumentFragment()

  bookmarksData.forEach((bookmark) => {
    const id = bookmark.id
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
        window.location.href = bookmark.previewLink
      }

      if (evt.target.className.includes("books__delete-img")) {
        filterer(id)
        bookmarkedHandler(id)
      }
    })
    fragment.appendChild(template)
  })
  elBookmarkList.appendChild(fragment)
}
