const botaoMenu = document.querySelector('.botao-menu');
const linksMenu = document.querySelector('.links-menu');
const links = document.querySelectorAll('.links-menu a');
const botaoTopo = document.querySelector('.voltar-topo');
const elementosRevelar = document.querySelectorAll('.revelar');
const secoes = document.querySelectorAll('section[id]');

botaoMenu.addEventListener('click', () => {
    const menuAberto = linksMenu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', menuAberto);
});

links.forEach((link) => {
    link.addEventListener('click', () => {
        linksMenu.classList.remove('aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
    });
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, {
    threshold: 0.16
});

elementosRevelar.forEach((elemento) => observador.observe(elemento));

function atualizarInterface() {
    if (window.scrollY > 420) {
        botaoTopo.classList.add('aparecer');
    } else {
        botaoTopo.classList.remove('aparecer');
    }

    let secaoAtual = '';

    secoes.forEach((secao) => {
        const topoSecao = secao.offsetTop - 120;
        const alturaSecao = secao.offsetHeight;

        if (window.scrollY >= topoSecao && window.scrollY < topoSecao + alturaSecao) {
            secaoAtual = secao.getAttribute('id');
        }
    });

    links.forEach((link) => {
        link.classList.remove('ativo');
        if (link.getAttribute('href') === `#${secaoAtual}`) {
            link.classList.add('ativo');
        }
    });
}

window.addEventListener('scroll', atualizarInterface);
window.addEventListener('load', atualizarInterface);
