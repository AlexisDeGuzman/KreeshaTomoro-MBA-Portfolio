/*================== toggle icon navbar ==================*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
	menuIcon.classList.toggle('bx-x');
	navbar.classList.toggle('active');
};


/*==================SCROLL SECTIONS ACTIVE LINK==================*/

//method to select all 'section' and 'header nav a' elements on the page and stores them in a variable
let sections = document.querySelectorAll('section'); 
let navLinks = document.querySelectorAll('header nav a');

// scroll event listener
// makes a function for scroll event on window object
window.onscroll = () => {
	sections.forEach(sec => {  //loops over each section element on the page.
		let top = window.scrollY;  //scrollY property returns the number of pixels that the document has been scrolled vertically from the top of the page.
		let offset = sec.offsetTop - 150; // offsetTop property of the section element returns the distance between the top of the section element and the top of the page.
		let height = sec.offsetHeight; //offsetHeight property of the section element returns the height of the section element.
		let id = sec.getAttribute('id'); //getAttribute() method is used to retrieve the id attribute of the section element.

		if(top >= offset && top < offset + height) {
			navLinks.forEach(links => {
				links.classList.remove('active');
				document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
			})
		}
	})
	/*================== STICKY NAVBAR ==================*/
	let header = document.querySelector('header')

	header.classList.toggle('sticky', window.scrollY > 100); //syntax classList.toggle(adds or removes, condition (true = adds, false = removes) )

	/*================== remove toggle icon and navbar when click navbar link (scroll) ==================*/
	menuIcon.classList.remove('bx-x');
	navbar.classList.remove('active');
};

	/*================== scroll reveal ==================*/
ScrollReveal({
	reset: false,
      distance: '50px',
      duration: 2000,
      delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*================== typed js ==================*/
/*
-go to https://github.com/mattboldt/typed.js
-copy this to your html <script src="https://unpkg.com/typed.js@2.0.132/dist/typed.umd.js"></script>
-delete the text in span tag
-add class on span tag to be used in this js file
-do this:
*/
const typed = new Typed('.multiple-text', {
      strings: ['Marketing Professional', 'Business Owner'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    });


// Cassianosch
const conteudoGeralElement = document.querySelector(".conteudo-geral");
const containerCarrousel = conteudoGeralElement.querySelector(
  ".conteudo-geral-sliderGeral"
);
const sliderGeral = conteudoGeralElement.querySelector(".sliderGeral");
const itemsDoSlider = sliderGeral.querySelectorAll(".sliderGeral-card");

// variaveis que mudarão de estados ao longo do código
let mouseEmCima = false;
let posicaoAtualDoMouse = 0;
let ultimaPosicaoDoMouse = 0;
let ultimoMovimentoDoMouse = 0;
let moverPara = 0;

const inicioSlider = () => {
  const propriedadesSlider = onResize();
  const tamanhoGeral = itemsDoSlider.length; // Longitud del array
  const tamanhoEmGraus = 360 / tamanhoGeral; // Grados por cada item
  const gap = 30; // espaco entre os items
  const tz = distanciaHorizontal(propriedadesSlider.w, tamanhoGeral, gap);

  const height = calcularAltura(tz);

  conteudoGeralElement.style.width = tz * 2 + gap * tamanhoGeral + "px";
  conteudoGeralElement.style.height = height + "px";

  itemsDoSlider.forEach((item, i) => {
    const grausPorItem = tamanhoEmGraus * i + "deg";
    item.style.setProperty("--rotatey", grausPorItem);
    item.style.setProperty("--tz", tz + "px");
  });
};

// suavidade da animação
const suavicaoDaAnimacao = (a, b, n) => {
  return n * (a - b) + b;
};

const distanciaHorizontal = (larguraElemento, tamanhoGeral, gap) => {
  return larguraElemento / 2 / Math.tan(Math.PI / tamanhoGeral) + gap; // Distancia horizontal dos items
};

//calcula a altura do container usando o campo de visão e a distância da perspectiva
const calcularAltura = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

//calcula o campo de visão do sliderGeral
const calculCampoDeVisao = (propriedadesSlider) => {
  const perpectiva = window
    .getComputedStyle(containerCarrousel)
    .perspective.split("px")[0];

  const tamanhoGeral =
    Math.sqrt(propriedadesSlider.w * propriedadesSlider.w) +
    Math.sqrt(propriedadesSlider.h * propriedadesSlider.h);
  const fov = 2 * Math.atan(tamanhoGeral / (2 * perpectiva)) * (180 / Math.PI);
  return fov;
};

//busca a posição X e avalia se a posição é direita ou esquerda
const getPosX = (x) => {
  posicaoAtualDoMouse = x;

  moverPara =
    posicaoAtualDoMouse < ultimaPosicaoDoMouse ? moverPara - 2 : moverPara + 2;

  ultimaPosicaoDoMouse = posicaoAtualDoMouse;
};

const atualizacaoGeral = () => {
  ultimoMovimentoDoMouse = suavicaoDaAnimacao(
    moverPara,
    ultimoMovimentoDoMouse,
    0.3
  );
  sliderGeral.style.setProperty("--rotatey", ultimoMovimentoDoMouse + "deg");

  requestAnimationFrame(atualizacaoGeral);
};

const onResize = () => {
  //busca as propriedades do tamanho do sliderGeral
  const boundingCarrousel = containerCarrousel.getBoundingClientRect();

  const propriedadesSlider = {
    w: boundingCarrousel.width,
    h: boundingCarrousel.height,
  };

  return propriedadesSlider;
};

const iniciarLogicaGeral = () => {
  //evento que detecta se o mouse está em cima do sliderGeral
  sliderGeral.addEventListener("mousedown", () => {
    mouseEmCima = true;
    sliderGeral.style.cursor = "grabbing";
  });
  sliderGeral.addEventListener("mouseup", () => {
    mouseEmCima = false;
    sliderGeral.style.cursor = "grab";
  });
  conteudoGeralElement.addEventListener(
    "mouseleave",
    () => (mouseEmCima = false)
  );

  sliderGeral.addEventListener(
    "mousemove",
    (e) => mouseEmCima && getPosX(e.clientX)
  );

  //evento que detecta se o mouse está clicando em cima do sliderGeral
  sliderGeral.addEventListener("touchstart", () => {
    mouseEmCima = true;
    sliderGeral.style.cursor = "grabbing";
  });
  sliderGeral.addEventListener("touchend", () => {
    mouseEmCima = false;
    sliderGeral.style.cursor = "grab";
  });
  conteudoGeralElement.addEventListener(
    "touchmove",
    (e) => mouseEmCima && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", inicioSlider);

  atualizacaoGeral();
  inicioSlider();
};

iniciarLogicaGeral();

// SLIDESHOW
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
/*function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
*/
// video autoplay

// First Slideshow
let slideIndex1 = 1;
showSlides(slideIndex1, 'mySlides', 'dot');

// Second Slideshow
let slideIndex2 = 1;
showSlides(slideIndex2, 'mySlides-new', 'dot-new');

// Next/previous controls
function plusSlides(n, slideshowClass) {
  if (slideshowClass === 'mySlides') {
    showSlides(slideIndex1 += n, 'mySlides', 'dot');
  } else if (slideshowClass === 'mySlides-new') {
    showSlides(slideIndex2 += n, 'mySlides-new', 'dot-new');
  }
}

// Thumbnail image controls
function currentSlide(n, slideshowClass) {
  if (slideshowClass === 'mySlides') {
    showSlides(slideIndex1 = n, 'mySlides', 'dot');
  } else if (slideshowClass === 'mySlides-new') {
    showSlides(slideIndex2 = n, 'mySlides-new', 'dot-new');
  }
}

function showSlides(n, slideshowClass, dotClass) {
  let i;
  let slides = document.getElementsByClassName(slideshowClass);
  let dots = document.getElementsByClassName(dotClass);
  if (n > slides.length) { 
    if (slideshowClass === 'mySlides') {
      slideIndex1 = 1;
    } else if (slideshowClass === 'mySlides-new') {
      slideIndex2 = 1;
    }
  }
  if (n < 1) { 
    if (slideshowClass === 'mySlides') {
      slideIndex1 = slides.length;
    } else if (slideshowClass === 'mySlides-new') {
      slideIndex2 = slides.length;
    }
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slideshowClass === 'mySlides') {
    slides[slideIndex1 - 1].style.display = "block";
    dots[slideIndex1 - 1].className += " active";
  } else if (slideshowClass === 'mySlides-new') {
    slides[slideIndex2 - 1].style.display = "block";
    dots[slideIndex2 - 1].className += " active";
  }
}

