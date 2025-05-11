function actualizarPrecio() {
    // Obtener los valores ingresados por el usuario
    const alto = parseFloat(document.getElementById("alto").value);
    const ancho = parseFloat(document.getElementById("ancho").value);
    const vinilPrecio = parseFloat(document.querySelector('input[name="vinil"]:checked').value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
  
    // Verificar si todos los campos son válidos
    if (alto && ancho && vinilPrecio && cantidad >= 50) {
      // Calcular el precio unitario
      const area = alto * ancho; // Pulgadas cuadradas
      const precioUnitario = area * vinilPrecio;
  
      // Aplicar descuento basado en la cantidad
      let descuento = 0;
      let precioTotal = precioUnitario * cantidad;
      let descuentoPrecio = 0;
  
      if (cantidad >= 1000) {
        descuento = 0.15; // 15% descuento
      } else if (cantidad >= 500) {
        descuento = 0.12; // 12% descuento
      } else if (cantidad >= 200) {
        descuento = 0.10; // 10% descuento
      } else if (cantidad >= 100) {
        descuento = 0.08; // 8% descuento
      }
  
      // Aplicar descuento al total
      descuentoPrecio = precioTotal * (1 - descuento);
  
      // Mostrar los resultados
      document.getElementById("precio-unitario").textContent = `Precio unitario: RD$${precioUnitario.toFixed(2)}`;
      document.getElementById("total").textContent = `Total por ${cantidad} unidades: RD$${descuentoPrecio.toFixed(2)}`;
      document.getElementById("descuento").textContent = `Descuento aplicado: RD$${(precioTotal - descuentoPrecio).toFixed(2)}`;
  
      // Mostrar el resultado y el botón de WhatsApp
      document.getElementById("resultado").style.display = "block";
  
      const message = `Hola me gustaria realizar esta orden\nTamaño: ${width}x${height} cm\nVinil: ${vinylTypeText}\nCantidad: ${quantity}\nPrecio total: ${totalPrice} pesos`;
      
      // Actualizar el número de WhatsApp
      const whatsappLink = `https://wa.me/8297633345?text=${encodeURIComponent(mensaje)}`;
      document.getElementById("whatsapp-link").style.display = "block";
      document.getElementById("whatsapp-link").setAttribute("href", whatsappLink);
  
    } else {
      // Si no es válido, no hacer nada
      document.getElementById("precio-unitario").textContent = "Precio unitario: RD$0.00";
      document.getElementById("total").textContent = "Total: RD$0.00";
      document.getElementById("descuento").textContent = "Descuento aplicado: RD$0.00";
      document.getElementById("whatsapp-link").style.display = "none";
    }
  }
  
  // Agregar eventos para actualizar en tiempo real
  document.getElementById("alto").addEventListener("input", actualizarPrecio);
  document.getElementById("ancho").addEventListener("input", actualizarPrecio);
  document.querySelectorAll('input[name="vinil"]').forEach(function(input) {
    input.addEventListener("change", actualizarPrecio);
  });
  document.getElementById("cantidad").addEventListener("input", actualizarPrecio);
  
  // Llamar a la función una vez para inicializar
  actualizarPrecio();
  