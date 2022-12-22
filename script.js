'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScorllTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav')


// ACCOUNT-OPEN-CLOSE

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//  COOKIES SETTINGS SECTION
/*
const header = document.querySelector('.header')
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = 'Allow cookies to get notifications. <button class="btn btn--close-cookies">Go it!<button>';

// header.prepend(message);
// header.append(message);
header.before(message);
message.style.backgroundColor = '#37383d'
// header.after(message)

document.querySelector('.btn--close-cookies')
  .addEventListener('click', function () {
    message.parentElement.removeChild(message);
  })
*/
//BUTTON SCROLL BAR SECTION

btnScorllTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect())
  section1.scrollIntoView({ behavior: 'smooth' });
});

// PAGE NAVIGATION

// document.querySelectorAll('.nav-links').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth' });
//   })
// })

document.querySelector('.nav__links').addEventListener('click',function(e){
  console.log(e.target)
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth' });
  }
});

// TABBED-COMPONENTS

// Activate-buttons-areas

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
 
 
  if (!clicked) return;
  tabs.forEach(t => t .classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c .classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active')
  
// Activate-content-areas
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active');
});

// MENU FADE ANIMATION

const handleHover = function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))

// STICKY-SCROLL

// const intialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll',function(){
//   if(window.scrollY > intialCoords.top)
//   nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })
const header =document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const[entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold:0,
    rootMargin:`-${navHeight}px`
  });

  headerObserver.observe(header);

  // REVEAL-SECTION
  const allSection = document.querySelectorAll('.section')
  const revealSection = function(entries,observe){
    const [entry] = entries;
    if (!entry.isIntersecting)return;
    entry.target.classList.remove('section--hidden')
    observe.unobserve(entry.target)

  }
  const sectionObserver = new IntersectionObserver(revealSection,{
    root:null,
    threshold:0.15,
  });
  allSection.forEach(function(section){
    sectionObserver.observe(section);
    // section.classList.add('section--hidden')
  })

//LASY-LOADING-IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observe){
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  
  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })
}

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px',
});
imgTargets.forEach(img => imgObserver.observe(img))

// SLIDING EFFECT
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.5) translateX(-800px)';
  // slider.style.overflow = 'visible';
  
  const createDots = function () {
    slides.forEach(function(_, i) {
      dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}">
      </button>`
      )
    });
  };

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active')
  }

  const goToSlide = function(slide){
    slides.forEach((s, i) => (s.style.transform =`translateX(${100 * (i-slide)}%)`));
  }


  const nextSlide = function() {
    if (currentSlide === maxSlide-1){
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
  const prevSlide = function(){
    if (currentSlide === 0){
      currentSlide = 0;
    }else{
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide);

  // using KeyboardEvents

  document.addEventListener('keydown',function(e){
    if (e.key === 'ArrowLeft')prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click',function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // console.log('DOT')
      const { slide }= e.target.dataset;
      goToSlide(slide)
      activateDot(slide)
    }
  });
};
slider();


















/*


















/*


// SLIDING EFFECT

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5) translateX(-800px)';
// slider.style.overflow = 'visible';
 
const goToSlide = function(slide){
  slides.forEach((s, i) => (s.style.transform =`translateX(${100 * (i-currentSlide)}%)`));
}
goToSlide(0);

const nextSlide = function() {
  if (currentSlide === maxSlide-1){
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
}
const prevSlide = function(){
  if (currentSlide === 0){
    currentSlide = 0;
  }else{
    currentSlide--;
  }
  goToSlide(currentSlide);
}
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);
*/