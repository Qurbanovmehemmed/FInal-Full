import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/features/userSlice";
import Slider from "react-slick"; // 🔹 Slider kitabxanasını import et
import "slick-carousel/slick/slick.css"; // 🔹 Slick stilini əlavə et
import "slick-carousel/slick/slick-theme.css"; // 🔹 Tema stilini əlavə
import "./NewRelases.css";

const NewReleases = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const allUsers = users?.users;

  useEffect(() => {
    dispatch(getAllUsers()); // 🔹 Component yüklənəndə user-ləri götür
  }, [dispatch]);

  // `products`-u `createdAt`-a görə sıralamaq
  const sortedProducts = products
    ? [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  // `users`-in `name`-i ilə uyğun olmayan `products`-ları süzgəcdən keçirmək
  const filteredProducts = sortedProducts.filter(
    (product) => !allUsers?.some((user) => user.name === product.author)
  );

  // Slider üçün konfiqurasiya
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let descriptionLength = 100500; // Default to 500 characters
  if (window.innerWidth < 768) {
    descriptionLength = 300; // On smaller screens, use 300 characters
  }
  return (
    <div className="mt-2 releases-section shadow">
      <div className="container">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
          className="newH"
        >
          New releases
        </h1>
        <div className="">
          <Slider {...settings}>
            {filteredProducts.slice(0, 2).map((product) => (
              <div
                key={product._id}
                style={{ display: "flex ", alignItems: "center" }}
              >
                {/* Şəkil sol tərəfdə */}
                <div className=" releaseStart">
                  <div className="releaseImage">
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      alt={product.title}
                      className="releaseImg"
                    />
                  </div>

                  {/* Detallar sağ tərəfdə */}
                  <div className="releaseDetail">
                    <h2 className="releaseHead">{product.title}</h2>
                    <div className="releasDes">
                      {product.description.slice(0, descriptionLength)}
                    </div>
                    <div className="d-flex justify-content-between releasDes mediaCateDate">
                      <div className="d-flex gap-1">
                        Categories:
                        {product.categories.map((cat,index) => (
                          <div key={index}>{cat}</div>
                        ))}
                      </div>

                      <p>
                        Added:
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NewReleases;
