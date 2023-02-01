import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // suppose 100 prdoucts want to display 10 prod per page so we have 10 pages

  // Backend driven code
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    // console.log(data.products);
    if (data && data.products) {
      setProducts(data.products);
      // console.log(products);
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    // // agr koi bhi click krta hai, page nu toh setPage krdege
    // if (selectedPage >= 1 && selectedPage <= products.length / 10)

    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages
      // &&
      // selectedPage !== pageNo
    )
      setPage(selectedPage);
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.map((elem) => {
            return (
              <span key={elem.id} className="product__single">
                <img src={elem.thumbnail} alt={elem.title} />
                <span>{elem.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disabled"}
            onClick={() => setPage(page - 1)}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "paginationSelected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => setPage(page + 1)}
            className={page < totalPages ? "" : "pagination_disabled"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;

/*
Display middle number according how many element we have
- [Array(products.length / 10)] -> [ [] ] jisme  undefined har jgh
- 100/10 = 10 ie 0 to 9
*/
