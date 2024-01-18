package dev.itvitae.grocerystore.orderproduct;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {

    @Query(
            "SELECT new dev.itvitae.grocerystore.orderproduct.OrderProductDTO(op.product, op.quantity) "
                    + "FROM OrderProduct op "
                    + "JOIN op.order o "
                    + "JOIN o.user u "
                    + "WHERE u.id = :userId "
                    + "GROUP BY op.product, op.quantity "
                    + "ORDER BY COUNT(op) DESC")
    List<OrderProductDTO> findTopFrequentlyPurchasedProducts(Long userId, Pageable pageable);
}
