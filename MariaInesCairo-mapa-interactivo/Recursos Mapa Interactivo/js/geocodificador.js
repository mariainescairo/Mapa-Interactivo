geocodificadorModulo = (function () {
  var geocodificador // Geocodificador que dada una dirección devuelve una coordenada
  
    // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {
    geocodificador.geocode({'address': direccion}, function(results, status) {
			if (status === 'OK') {
				var coordenada = results[0].geometry.location,
				coordenada_lat = coordenada.lat(),
        coordenada_long = coordenada.lng();

      funcionALlamar(direccion, coordenada);
      
    } else {
				var mensajeError = "";
				if (status === "ZERO_RESULTS") {
					mensajeError = "No hubo resultados para la dirección ingresada.";
				} else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
					mensajeError = "Error general del mapa.";
				} else if (status === "INVALID_REQUEST") {
					mensajeError = "Error de la web. Contacte con Name Agency.";
				}
				alert(mensajeError);
      }
    })
  };
  


    // Inicializo el geocoder que obtiene las corrdenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {
    var that = this
    geocodificador = new google.maps.Geocoder()

        // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value
        that.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa)
      }
    })
  }

  return {
    usaDireccion,
    inicializar
  }
})()
