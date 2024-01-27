package dev.itvitae.grocerystore.orderproduct;

import dev.itvitae.grocerystore.products.ProductDTO;

public record OrderProductDTO(ProductDTO product, Integer quantity) {

  public OrderProductDTO(OrderProduct cartProduct) {
    this(new ProductDTO(cartProduct.getProduct()), cartProduct.getQuantity());
  }
}
