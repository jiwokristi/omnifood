// Fixing flexbox gap property missing in some Safari versions
const yearElement = document.querySelector('.year')
const year = new Date().getFullYear()
yearElement.textContent = year

const btnNavElement = document.querySelector('.btn-mobile-nav')
const headerElement = document.querySelector('.header')

btnNavElement.addEventListener('click', () => {
  headerElement.classList.toggle('nav-open')
})

const allLinks = document.querySelectorAll('a:link')
allLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    const href = link.getAttribute('href')

    // Scroll to the top.
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (href !== '#' && href.startsWith('#')) {
      // Scroll to other links.
      const sectionElement = document.querySelector(href)
      sectionElement.scrollIntoView({ behavior: 'smooth' })
    }

    // Close mobile navigation
    if (link.classList.contains('main-nav-link')) {
      headerElement.classList.toggle('nav-open')
    }
  })
})

const sectionHeroElement = document.querySelector('.section-hero')

const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0]
    if (!entry.isIntersecting) {
      document.body.classList.add('sticky')
    } else {
      document.body.classList.remove('sticky')
    }
  },
  {
    // In the viewport.
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  },
)
observer.observe(sectionHeroElement)

function checkFlexGap() {
  var flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  var isSupported = flex.scrollHeight === 1
  flex.parentNode.removeChild(flex)
  console.log(isSupported)

  if (!isSupported) document.body.classList.add('no-flexbox-gap')
}
checkFlexGap()
