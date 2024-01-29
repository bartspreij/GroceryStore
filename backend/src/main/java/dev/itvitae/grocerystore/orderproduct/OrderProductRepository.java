package dev.itvitae.grocerystore.orderproduct;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {

  @Query(
      "SELECT new dev.itvitae.grocerystore.orderproduct.OrderProductDTO("
          + "new dev.itvitae.grocerystore.products.ProductDTO(op.product), MAX(op.quantity)) "
          + "FROM OrderProduct op "
          + "JOIN op.order o "
          + "JOIN o.user u "
          + "WHERE u.id = :userId "
          + "GROUP BY op.product "
          + "ORDER BY MAX(op.quantity) DESC")
  List<OrderProductDTO> findTopFrequentlyPurchasedProductsByUserId(Long userId, Pageable pageable);
}
