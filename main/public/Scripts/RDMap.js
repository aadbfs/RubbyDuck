function initMap() {
    var uluru = { lat: 61.20553, lng: -149.9189 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

