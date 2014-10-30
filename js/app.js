var accessToken = '67aad4d3a43f4faf8379fb750914d8d5',
latlng = {};

function instaPopular(lat, lng) {
    $.ajax({
        url: 'https://api.instagram.com/v1/media/popular?client_id=67aad4d3a43f4faf8379fb750914d8d5',
        dataType: 'jsonp',
        cache: false,
        type: 'GET',
        data: {
            client_id: accessToken,
        },
        success: function (data) {
            console.log(data);
            for (x in data.data) {
                $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>');
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function instaTag(tag){
    $.ajax({
        url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent',
        dataType: 'jsonp',
        cache: false,
        type: 'GET',
        data: {
            client_id: accessToken,
            q: tag
        }, 
        success: function(data) {
            console.log(data);
            for (x in data.data) {
                $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>')
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}


function instaLocation(lat, lng){

    $.ajax({
        url: 'https://api.instagram.com/v1/media/search?client_id="67aad4d3a43f4faf8379fb750914d8d5',
        dataType: 'jsonp',
        type: 'GET',
        cache: false,
        data: {
            client_id: accessToken,
            lat: lng,
            lng: lat,
            distance: '',
        },
        success: function(data) {
            console.log(data);
            $('ul').empty();
            for (x in data.data) {
                $('ul').append('<li><img src="' + data.data[x].images.low_resolution.url + '"></li>');
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function initialize() {
  var mapOptions = {
    center: { lat: -34.397, lng: 150.644},
    zoom: 8
};
map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
geocoder = new google.maps.Geocoder;
}

$(document).ready(function(){
    $('#masterInput').keydown(function(e){
        if(e.which == '13'){
            if ($('#selector').val() === "location"){
                console.log("test");
                initialize();
                geocoder.geocode({address: $(this).val()}, function(results, status){
                    latlng.lat = results[0].geometry.location.B;
                    latlng.lng = results[0].geometry.location.k;

                    instaLocation(latlng.lat, latlng.lng);
                    
                });
            } else{
                //Tag Popular Search 
                instaTag($(this).val());
            }
        }
    });
    //Popular Photos Search
    instaPopular(latlng.lat, latlng.lng); 
<<<<<<< HEAD
});
=======
});
>>>>>>> master
