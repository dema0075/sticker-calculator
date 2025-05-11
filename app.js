function actualizarPrecio() {
  const alto = parseFloat(document.getElementById("alto").value);
  const ancho = parseFloat(document.getElementById("ancho").value);
  const vinilPrecio = parseFloat(document.querySelector('input[name="vinil"]:checked').value);
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const tipoEntrega = document.getElementById("entrega").value;
  const envioSeleccionado = document.querySelector('input[name="envio"]:checked')?.value || "";

  if (!isNaN(alto) && !isNaN(ancho) && !isNaN(vinilPrecio) && cantidad >= 50) {
    const area = alto * ancho;
    const precioUnitario = area * vinilPrecio;
    let descuento = 0;
    let precioTotal = precioUnitario * cantidad;

    if (cantidad >= 1000) descuento = 0.15;
    else if (cantidad >= 500) descuento = 0.12;
    else if (cantidad >= 200) descuento = 0.10;
    else if (cantidad >= 100) descuento = 0.08;

    let descuentoPrecio = precioTotal * (1 - descuento);
    let costoEnvio = 0;

    if (tipoEntrega === "envio") {
      if (envioSeleccionado === "interior" || envioSeleccionado === "zona") costoEnvio = 300;
      else if (envioSeleccionado === "distrito") costoEnvio = 200;
    }

    const totalConEnvio = descuentoPrecio + costoEnvio;

    document.getElementById("precio-unitario").textContent = `Precio unitario: RD$${precioUnitario.toFixed(2)}`;
    document.getElementById("total").textContent = `Total: RD$${totalConEnvio.toFixed(2)}`;

    const descuentoText = document.getElementById("descuento");
    if (cantidad >= 100) {
      descuentoText.textContent = `Descuento aplicado: RD$${(precioTotal - descuentoPrecio).toFixed(2)}${tipoEntrega === "envio" ? ` | Envío: RD$${costoEnvio}` : ""}`;
    } else {
      descuentoText.textContent = tipoEntrega === "envio" ? `Envío: RD$${costoEnvio}` : "";
    }

    document.getElementById("resultado").style.display = "block";

    const vinilTipo = vinilPrecio === 15 ? "Vinil Básico" : "Vinil Metálico";
    let mensaje = `Hola, me gustaría realizar esta orden:\nTamaño: ${alto}x${ancho} pulgadas\nVinil: ${vinilTipo}\nCantidad: ${cantidad}\nPrecio con descuento: RD$${descuentoPrecio.toFixed(2)}\nTotal: RD$${totalConEnvio.toFixed(2)}\nMétodo de entrega: ${tipoEntrega === "retiro" ? "Retiro en tienda" : envioSeleccionado}`;

    if (tipoEntrega === "envio") {
      if (envioSeleccionado === "interior") {
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const ciudad = document.getElementById("ciudad").value;
        const transporte = document.getElementById("transporte").value;
        mensaje += `\nDatos de envío:\nNombre: ${nombre}\nTeléfono: ${telefono}\nCiudad: ${ciudad}\nTransporte: ${transporte}`;
      } else {
        const ubicacion = document.getElementById("ubicacion").value;
        mensaje += `\nUbicación para entrega:\n${ubicacion}`;
      }
    }

    const whatsappLink = `https://wa.me/8297633345?text=${encodeURIComponent(mensaje)}`;
    document.getElementById("whatsapp-link").style.display = "block";
    document.getElementById("whatsapp-link").setAttribute("href", whatsappLink);
  } else {
    document.getElementById("precio-unitario").textContent = "Precio unitario: RD$0.00";
    document.getElementById("total").textContent = "Total: RD$0.00";
    document.getElementById("descuento").textContent = "";
    document.getElementById("whatsapp-link").style.display = "none";
  }
}

function actualizarFormularioEnvio() {
  const tipoEntrega = document.getElementById("entrega").value;
  const envio = document.querySelector('input[name="envio"]:checked')?.value || "";

  const opcionesEnvio = document.getElementById("opciones-envio");
  const formInterior = document.getElementById("formulario-interior");
  const formUbicacion = document.getElementById("formulario-ubicacion");

  opcionesEnvio.style.display = tipoEntrega === "envio" ? "block" : "none";
  formInterior.style.display = envio === "interior" ? "block" : "none";
  formUbicacion.style.display = (envio === "distrito" || envio === "zona") ? "block" : "none";
}

// Eventos generales
["alto", "ancho", "cantidad", "entrega"].forEach(id => {
  document.getElementById(id).addEventListener("input", () => {
    actualizarFormularioEnvio();
    actualizarPrecio();
  });
});

// Eventos para vinil
document.querySelectorAll('input[name="vinil"]').forEach(input => {
  input.addEventListener("change", actualizarPrecio);
});

// Eventos para lugar de envío (radio buttons)
document.querySelectorAll('input[name="envio"]').forEach(input => {
  input.addEventListener("change", () => {
    actualizarFormularioEnvio();
    actualizarPrecio();
  });
});

// Eventos para datos del formulario
["nombre", "telefono", "ciudad", "transporte", "ubicacion"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", actualizarPrecio);
});

// Inicialización
actualizarFormularioEnvio();
actualizarPrecio();
