function actualizarPrecio() {
  // Obtener los valores ingresados por el usuario
  const alto = parseFloat(document.getElementById("alto").value);
  const ancho = parseFloat(document.getElementById("ancho").value);
  const vinilPrecio = parseFloat(document.querySelector('input[name="vinil"]:checked').value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  // Verificar si todos los campos son válidos
  if (!isNaN(alto) && !isNaN(ancho) && !isNaN(vinilPrecio) && cantidad >= 50) {
    // Calcular el precio unitario
    const area = alto * ancho; // Pulgadas cuadradas
    const precioUnitario = area * vinilPrecio;

    // Calcular el precio total y aplicar descuentos
    let descuento = 0;
    let precioTotal = precioUnitario * cantidad;
    let descuentoPrecio = precioTotal;

    if (cantidad >= 1000) {
      descuento = 0.15;
    } else if (cantidad >= 500) {
      descuento = 0.12;
    } else if (cantidad >= 200) {
      descuento = 0.10;
    } else if (cantidad >= 100) {
      descuento = 0.08;
    }

    descuentoPrecio = precioTotal * (1 - descuento);

    // Mostrar resultados en pantalla
    document.getElementById("precio-unitario").textContent = `Precio unitario: RD$${precioUnitario.toFixed(2)}`;
    document.getElementById("total").textContent = `Total por ${cantidad} unidades: RD$${descuentoPrecio.toFixed(2)}`;
    document.getElementById("descuento").textContent = `Descuento aplicado: RD$${(precioTotal - descuentoPrecio).toFixed(2)}`;

    // Mostrar resultados
    document.getElementById("resultado").style.display = "block";

    // Crear mensaje de WhatsApp
    const vinilTipo = vinilPrecio === 15 ? "Vinil Básico" : "Vinil Metálico";
    const mensaje = `Hola, me gustaría realizar esta orden:\nTamaño: ${alto}x${ancho} pulgadas\nVinil: ${vinilTipo}\nCantidad: ${cantidad}\nPrecio total: RD$${descuentoPrecio.toFixed(2)}`;

    const whatsappLink = `https://wa.me/8297633345?text=${encodeURIComponent(mensaje)}`;
    document.getElementById("whatsapp-link").style.display = "block";
    document.getElementById("whatsapp-link").setAttribute("href", whatsappLink);

  } else {
    // Limpiar resultados si los datos no son válidos
    document.getElementById("precio-unitario").textContent = "Precio unitario: RD$0.00";
    document.getElementById("total").textContent = "Total: RD$0.00";
    document.getElementById("descuento").textContent = "Descuento aplicado: RD$0.00";
    document.getElementById("whatsapp-link").style.display = "none";
  }
}

// Eventos para actualizar el precio en tiempo real
document.getElementById("alto").addEventListener("input", actualizarPrecio);
document.getElementById("ancho").addEventListener("input", actualizarPrecio);
document.querySelectorAll('input[name="vinil"]').forEach(function(input) {
  input.addEventListener("change", actualizarPrecio);
});
document.getElementById("cantidad").addEventListener("input", actualizarPrecio);

// Inicializar cálculo
actualizarPrecio();
