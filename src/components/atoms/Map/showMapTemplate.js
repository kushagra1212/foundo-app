export const webViewTemplate = ({ latitude, longitude }) => {
  return `
<div>

<script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
    <style>
            html, body {
                margin: 0;
            }

            #map {
                height: 100%;
                width: 100%;
            }
    </style>
    
    <div id='map' class='map'></div>
    <div id='marker'>
    <i class="fas fa-band-aid"></i>
    </div>

    <!-- load TomTom Maps Web SDK from CDN -->
    
    <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
    <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

    <script>
        // create the map
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
        let map = tt.map({
            key: 'JUIJsyn8XHBbAG8tYRJwWeBVg2EW7wEQ',
            container: 'map',
            center: [${longitude}, ${latitude}],
            zoom: 22,
            dragPan: true,

            

        });
        var marker = new tt.Marker({fillColor: 'red', color: 'red', width: 50, height: 70,elevation: 20})
.setLngLat( [${longitude}, ${latitude}])
.addTo(map);
        map.on('dragend', function() {
            let center = map.getCenter();
            window.ReactNativeWebView.postMessage(center.lng.toFixed(6) + ", " + center.lat.toFixed(6));
        })
    </script>
</div>
`;
};
