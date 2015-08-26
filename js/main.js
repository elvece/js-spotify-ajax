// things that rely on page being fully loaded go in doc ready
$(document).on('ready', function() {
  $('p').hide();
});

$('form').on('submit', function(event){
  event.preventDefault();
  var searchTerm = $('#search-term').val().trim();
  //trim removes all spaces bc api wont recognize spaces
  getResults(searchTerm);
  $('p').show();
});

function getResults(searchTerm){
  var request = $.ajax({
    url: "https://api.spotify.com/v1/search",
    method: "GET", //needs to be capitalized
    data: {
      q: "artist:"+searchTerm,
      type: "album",
      limit: 5
    },
    dataType: "json"
  });

  request.done(function(data){//can call this function anything
    var albums = data.albums.items;
    var display = "";
    $.each(albums, function(i, album){
      var albumName = album.name;
      var albumImage = album.images[0].url;
      var spotifyLink = album.external_urls.spotify;
      display += "<li><img src=" + albumImage + "></li>";
    });
    $('.results').html(display);
  });
}
