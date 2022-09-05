function setCarritoVacio() {
  cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes products en el carrito</div></td>
    </tr>            
    `;
}
function vaciarCarrito() {
  localStorage.removeItem("carrito");
}

function calcularTotal(products) {
  return products.reduce(
    (acum, product) => (acum += product.price * product.quantity),
    0
  );
}
