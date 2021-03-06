$('.collection-item').on('click', function() {

// badge dinamico para a tela // procura um badge se não existe
// ele cria um novo
    var $badge = $('.badge', this);
    if($badge.length == 0){
      $badge = $('<span class="badge brown-text">0</span>')
                .appendTo(this);
    }

    $badge.text(parseInt($badge.text()) + 1);

});

var texto = '';

// pego a quantidade do badge
$('#confirmar').on('click', function(){
  $('.badge').parent().each(function(){
      var produto = this.firstChild.textContent;
      var quantidade = this.lastChild.textContent;

      texto += produto + ': ' + quantidade + ', ';

  });

  $('#resumo').text(texto);
});

$('.modal-triger').leanModal();


$('.collection').on('click', '.badge', function(){
  $(this).remove();
  return false;
})

$('.acao-limpar').on('click', function() {
    $('#numero-mesa').val('');
    $('.badge').remove();
});

// click na camera faz isso!
$('.scan-qrcode').click(function(){
    cordova.plugins.barcodeScanner.scan(function(resultado){

      if(resultado.text){
          Materialize.toast('Mesa' + resultado.text, 2000);
          $('#numero-mesa').val(resultado.text);
      }
    },
    function(erro){
      Materialize.toast('Erro' + resultado.text, 2000, 'red-text');
    });
});

$('.acao-finalizar').click(function(){
    $.ajax({
      url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
      data: {
        mesa: $('#numero-mesa').val(),
        pedido: $('#resumo').text()
      },

      success: function(reposta){
        Materialize.toast(resposta, 2000);

        $('#numero-mesa').val('');
        $('.badge').remove();
      },

      error: function(erro){
        Materialize.toast(erro.responseText, 3000, 'red-text');
      }
    });
});
