/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Results, queryProducts } from '../../api/products-api';
import ProductList from './ProductList';
import DiscountGallery from '../discount/DiscountGallery';
import BuyAgainGallery from '../buy-again/BuyAgainGallery';

const Products = () => {
  const [results, setResults] = useState<Results>(new Results());
  const location = useLocation();
  const navigate = useNavigate();
  const PAGE_SIZE = 8;

  const formatSearchString = (search: string) => search.replace(/\+/g, ' ');

  const getCategory = () => new URLSearchParams(location.search).get('c');

  const getQuery = () => new URLSearchParams(location.search).get('q');

  const getPageNumber = () =>
    parseInt(new URLSearchParams(location.search).get('page') ?? '0', 10);

  const getPageTitle = () => {
    if (getQuery()) return `"${formatSearchString(getQuery()!)}"`;
    if (getCategory()) return formatSearchString(getCategory()!);
    return 'All Products';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await queryProducts(
        getPageNumber(),
        PAGE_SIZE,
        getQuery() ?? '',
        getCategory() ?? ''
      );

      setResults(result);
    };

    fetchProducts();
  }, [location, location.search]);

  const setPage = (page: number) => {
    const search = new URLSearchParams(location.search);
    search.set('page', page.toString());
    navigate(`?${search}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {getPageNumber() === 0 && location.search.length === 0 && (
        <>
          <BuyAgainGallery />
          <DiscountGallery />
        </>
      )}

      <h2>{getPageTitle()}</h2>

      <ProductList
        products={results.content}
        currentPage={getPageNumber()}
        totalPages={results.totalPages}
        setPage={(page: number) => setPage(page)}
      />
    </>
  );
};

export default Products;
