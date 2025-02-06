import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasket } from "../../redux/features/BasketSlice";

const Basket = () => {
  const { basket } = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const total = basket.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Your Basket</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Title</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th>Product Count</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {basket &&
            basket.map((product) => (
              <tr style={{ textAlign: "center" }} key={product._id}>
                <td>
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteBasket(product._id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <p className="total">TOTAL: {total}</p>
    </div>
  );
};

export default Basket;
