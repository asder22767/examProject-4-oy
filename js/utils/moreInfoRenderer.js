function findElement(element, parent = document) {
  return parent.querySelector(element)
}
const moreInfo = findElement(".more-info")
const btnRead = findElement(".more-info__read-btn")

const closeBtn = findElement(".more-info__btn-close")
const shadow = findElement(".more-info__shadow")

const wrapper = findElement(".more-info__span-wrapper")
const moreInfoAuthors = findElement(".more-info__authors")

export function moreInfoHandler(volumeInfo) {
  closeBtn.addEventListener("click", () => {
    moreInfo.classList.add("d-none")
    wrapper.innerHTML = null
  })

  shadow.addEventListener("click", () => {
    moreInfo.classList.add("d-none")
    wrapper.innerHTML = null
  })

  moreInfo.classList.remove("d-none")
  const moreInfoTitle = findElement(".more-info__heading")
  moreInfoTitle.textContent = volumeInfo.title

  const img = findElement(".more-info__card-img-top")
  img.src = volumeInfo.imageLinks.thumbnail

  if (volumeInfo.description) {
    const description = findElement(".more-info__card-description")
    description.textContent = volumeInfo.description
  }

  if (volumeInfo.authors) {
    if (volumeInfo.authors.length > 1) {
      for (const item of volumeInfo.authors) {
        const authorsTemplate = moreInfoAuthors.cloneNode("true")
        authorsTemplate.textContent = item

        wrapper.appendChild(authorsTemplate)
      }
    } else {
      const authorsTemplate = moreInfoAuthors.cloneNode("true")

      authorsTemplate.textContent = volumeInfo.authors
      wrapper.appendChild(authorsTemplate)
    }
  } else {
    wrapper.innerHTML = null
    const authorsTemplate = moreInfoAuthors.cloneNode("true")
    authorsTemplate.textContent = "<<authors is unknown>>"
    wrapper.appendChild(authorsTemplate)
  }

  if (volumeInfo.publishedDate) {
    const dateOfPublishing = findElement(".more-info__date")
    dateOfPublishing.textContent = volumeInfo.publishedDate
  }

  if (volumeInfo.publisher) {
    const publisher = findElement(".more-info__publisher")
    publisher.textContent = volumeInfo.publisher
  }

  if (volumeInfo.categories) {
    const category = findElement(".more-info__category")
    category.textContent = volumeInfo.categories
  }

  const pages = findElement(".more-info__pages")
  if (volumeInfo.pageCount) {
    pages.textContent = volumeInfo.pageCount
  } else {
    pages.textContent = "Pages is not available"
  }

  btnRead.addEventListener("click", () => {
    window.location.href = volumeInfo.previewLink
  })
}
