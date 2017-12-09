$(function(){
	/*GoogleMap*/
	var map,marker,infoW,AllPins,styles,styledMapOptions;

	AllPins=[];
	markers=[];
	infoW = new google.maps.InfoWindow();

	function action(){
		showMap();
		styleMap();
		createPinData();

	}

	//GoogleMap表示
	function showMap(){
		var latlng = new google.maps.LatLng(35.6720887,139.716826);
		  var myOptions = {
		    zoom: 10,
			maxZoom: 13 ,
		    center: latlng,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    //disableDefaultUI:true
		   // scrollwheel: false;
		  };
	  	map = new google.maps.Map(document.getElementById('gmap'), myOptions);

	}

	//Pinデータの作成
	function createPinData(){

		// JSON形式のファイルをダウンロードする
		$.getJSON("/js/gmap_data.json" , function(data) {
			
			var len = data.length;

			//ループで地図上にマーカーを配置する
			for (var i = 0; i < len; i++) { 	
				var obj = {
					name : data[i].name,
					url : data[i].url,
					lat : data[i].lat,
					lng : data[i].lng,
					pj : data[i].pj
				};
				
				AllPins.push(obj);
			}
			setPin(AllPins);
			
		});


	}

	//Pin立て
	function setPin(target){
		var image = [];
		//console.log(target.length);
		for(var i=0 ; i < target.length ; i++){

			image = {
				url : '/images/icon/gmap_icon.png',
				scaledSize : new google.maps.Size(24, 24)
			}

			markerLatLng = new google.maps.LatLng({lat: target[i]['lat'], lng: target[i]['lng']});
    		marker = new google.maps.Marker({
    			position: markerLatLng,
      			map: map,
				icon:image
      		});

      		markers.push(marker);

      		//イベント設定
	        google.maps.event.addListener(marker, 'mouseover',
	        	(function(marker, i) {
	        		return function() {
	          			infoW.setContent(target[i]['name']);
	          			infoW.open(map, marker);
	        		}
	      		})(marker, i)
	      	);

	      	google.maps.event.addListener(marker, 'mouseout',function(){
	      		infoW.close();
	      	});

	      	google.maps.event.addListener(marker, 'click',
	        	(function(i) {
	        		return function() {
	          			location.href=target[i]['url'];
	        		}
	      		})(i)
	      	);
		}
	}
	
	//styleの反映
	function styleMap(){
		var styledMapType = new google.maps.StyledMapType(styles, styledMapOptions);
		map.mapTypes.set('styled_map', styledMapType);
		map.setMapTypeId('styled_map');
	}

	//実行
	google.maps.event.addDomListenerOnce(window, "load", action);


	//STYLEの設定
	styles = [
	  {
		"featureType": "administrative.land_parcel",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "administrative.neighborhood",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.attraction",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.business",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.government",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.medical",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "labels.text",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.place_of_worship",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.school",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.sports_complex",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road.arterial",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "labels.text",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  }
	];
	styledMapOptions = { name: 'coplus'};
	
});
/*

 https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=35.66836978581039,139.71203079223628&zoom=13&format=png&maptype=roadmap&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi.attraction%7Cvisibility:off&style=feature:poi.business%7Cvisibility:off&style=feature:poi.government%7Cvisibility:off&style=feature:poi.medical%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:poi.place_of_worship%7Cvisibility:off&style=feature:poi.school%7Cvisibility:off&style=feature:poi.sports_complex%7Cvisibility:off&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Cvisibility:off&style=feature:water%7Celement:labels.text%7Cvisibility:off&size=480x360 

*/
