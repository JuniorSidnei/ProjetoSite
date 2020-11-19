$(document).ready(function(){
  setProducts();

  $('header div.main div.options div.search img').on('click', function(){
    if($(this).siblings('input').css('visibility') == 'hidden'){
      $(this).siblings('input').css('visibility', 'visible').focus();
    }else{
      $(this).siblings('input').css('visibility', 'hidden');
    }
  });

  var hash = window.location.hash.substr(1);

  if(hash != ''){
    $('html,body').animate({ scrollTop: $('#'+hash).offset().top }, 500);
  }

  var session = JSON.parse(localStorage.getItem("session"));
  if(session != null && session != undefined){
    $('header div.main div.options a.login').addClass('logout').removeAttr('href');
    $('header div.main div.options a.login img').attr('src', '../img/logout.png');
  }

  $('header div.main div.options a.logout').on('click', function(){
    localStorage.removeItem('session');
    localStorage.setItem('carrinho', JSON.stringify([]));
    window.location.reload();
  });

  $('img.mobileMenu').on('click', function(){
   if($('header div.main nav').css('display') == 'flex'){
      $('header div.main nav').slideUp();
    }else{
      $('header div.main nav').slideDown({
        start: function () {
          $(this).css({
            display: "flex"
          })
        }
      });  
    }
  });
});

function setProducts(){
  var produtos = [];
  produtos.push({
    id: 1,
    nome: 'Garrafa tornado',
    descricao: 'Térmica para todos os dias!',
    foto: 'produto1.jpg',
    valor: 15
  });
  produtos.push({
    id: 2,
    nome: 'Garrafa surfista',
    descricao: 'Bebidas geladas é sua especialidade',
    foto: 'produto2.jpg',
    valor: 5
  });
  produtos.push({
    id: 3,
    nome: 'Garrafa Clean',
    descricao: 'Para ninguem perguntar "o que está bebendo" toda hora, né?',
    foto: 'produto3.jpg',
    valor: 2.5
  });
  produtos.push({
    id: 4,
    nome: 'Garrafa Dark',
    descricao: 'Tenha em mais o modelo mais dark da Garrafas Inc.',
    foto: 'produto4.jpg',
    valor: 30
  });
  produtos.push({
    id: 5,
    nome: 'Garrafa Alluminiun',
    descricao: 'Despojada e desejada, com um design inovador, todos querem!',
    foto: 'produto5.jpg',
    valor: 10
  });
  produtos.push({
    id: 6,
    nome: 'Garrafa Cute',
    descricao: 'Para aqueles que querem uma garrafa boa e fofa',
    foto: 'produto6.jpg',
    valor: 11.75
  });

  localStorage.setItem('produtos', JSON.stringify(produtos));
}

function getProductById(id){
  const produtos = JSON.parse(localStorage.getItem("produtos"));

  var produto;
  
  produtos.forEach(function(element, index, array){
    if(element.id == id){
      produto = element;
    }
  });

  return produto;
}

function formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}