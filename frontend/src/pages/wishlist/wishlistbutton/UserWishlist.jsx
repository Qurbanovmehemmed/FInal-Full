import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      console.log("İstifadəçi login olunmayıb.");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/wishlist/${user.id}`);
        setWishlist(response.data); // Wishlist məlumatlarını saxlayırıq
      } catch (error) {
        console.log("Wishlist alınarkən xəta:", error.message);
      }
    };

    fetchWishlist();
  }, [user]);

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Wishlist boşdur.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item._id}>
              <h3>{item.product.title}</h3>
              <p>{item.product.author}</p>
              <p>{item.status}</p>
              {/* Kitabı silmək və ya statusunu dəyişmək üçün düymələr */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserWishlist;
