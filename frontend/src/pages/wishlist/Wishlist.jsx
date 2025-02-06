import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, deleteWishlist } from "../../redux/features/WishlistSlice";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Your Wishlist</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Title</th>
            <th>Product Category</th>
            <th>Product Price</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {wishlist &&
            wishlist.map((product) => (
              <tr style={{ textAlign: "center" }} key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(addWishlist(product))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Wishlist;
