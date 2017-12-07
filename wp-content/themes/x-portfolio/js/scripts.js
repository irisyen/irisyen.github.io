 //Masonry

jQuery(document).ready(function($){

var $container = $('.masonry').imagesLoaded( function() {
//var $container = $('.masonry');
$container.imagesLoaded(function(){
$container.masonry({
  // options
  //columnWidth: '.grid-sizer',
  itemSelector: '.grid-item',
  percentPosition: true,
  //columnWidth: 200
});});});


  $('#cssmenu').prepend('<div id="menu-button">Menu</div>');
  $('#cssmenu #menu-button').on('click', function(){
    var menu = $(this).next('ul');
    if (menu.hasClass('open')) {
      menu.removeClass('open');
    } else {
      menu.addClass('open');
    }
  });

  // Intercept the Jetpack Load More button when it's reinserted
  $( document ).bind( 'DOMNodeInserted', function( e ) {
    var $target = $( e.target );
    if ( $target.is( '#infinite-handle' ) ) {
      $target.hide();
    }
  } );
  
  
  // Triggers re-layout on Jetpack infinite scroll
  infinite_count = 0;
    $( document.body ).on( 'post-load', function() {

        infinite_count = infinite_count + 1;
    
    // Target the new items and hide them
    var $selector = $( '#infinite-view-' + infinite_count ),
          $elements = $selector.find( '.post-preview' );
      
    $elements.hide();

    // When images are loaded, show them again
        $elements.imagesLoaded().done( function(){
            $container.append( $elements );
      $elements.show();
      $container.masonry( 'appended', $elements );
      
      // Prepare for fade-in animation on scroll
      $elements.each( function( index ) {
        if ( $( this ).offset().top < ( $( window ).height() + $( window ).scrollTop() ) ) {
          $( this ).addClass( 'jetpack-fade-in' );
        } else {
          $( this ).addClass( 'will-spot' ).removeClass( 'spotted' );
        }
        
      } );
      
      setTimeout( function() { 
        masonryInit();
      }, 500 ); 
      
      // Show the load more button again
      $( '#infinite-handle' ).fadeIn();
      
        });

    });
});
