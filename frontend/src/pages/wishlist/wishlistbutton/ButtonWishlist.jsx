import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Wishlistbutton.css";
import { addToWishlist, updateWishlistStatus } from "../../../redux/features/WishlistSlice";

const ButtonWishlist = ({ productId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Redux-dan istifadəçi məlumatlarını alırıq
  const { wishlist } = useSelector((state) => state.wishlist); // Wishlist məlumatlarını alırıq
  const userId = user?.existUser?._id; // İstifadəçi ID-si

  const [showModal, setShowModal] = useState(false); // Modalın açılıb-çıxma vəziyyəti
  const [selectedStatus, setSelectedStatus] = useState(null); // Seçilmiş status
  const [message, setMessage] = useState(""); // Mesajı idarə edən state

  // Wishlist-də kitabın mövcud statusunu tapmaq (default olaraq null)
  const currentStatus = wishlist.find(item => item.product._id === productId)?.status || null;

  useEffect(() => {
    if (showModal) {
      setSelectedStatus(currentStatus); // Modal açıldığında seçili statusu göstər
    }
  }, [showModal, currentStatus]);

  if (!userId) return null; // İstifadəçi yoxdursa, butonları göstərmirik

  // Modal açmaq və ya bağlamaq
  const handleModalToggle = () => {
    setShowModal(!showModal);
    console.log( currentStatus);
  };

  // Wishlist-ə kitab əlavə etmək və ya statusu dəyişdirmək
  const handleStatusChange = (status) => {
    if (currentStatus && currentStatus === status) {
      setMessage("This book is already in your wishlist with the selected status.");
      return; // Əgər artıq eyni statusdadırsa, heç bir əməliyyat etmirik
    }
    if (currentStatus) {
      // Yeniləmə əməliyyatı
      dispatch(updateWishlistStatus({ userId, productId, status }));
      setMessage("Wishlist status updated!");
    } else {
      // Yeni əlavə etmə əməliyyatı
      dispatch(addToWishlist({ userId, productId, status }));
      setMessage("Book added to wishlist!");
    }
    setSelectedStatus(status); // Seçimi yadda saxla
    setShowModal(false); // Modalı bağla
  
    // Mesajı bir müddət sonra silmək
    setTimeout(() => setMessage(""), 1000);
  };
  

  return (
    <>
      {/* Wishlist modalı */}
      {showModal && (
        <div className="Wishlistmodal">
          <div className="modal-contentWishlist">
            <h2>Select a Status</h2>
            <button
              onClick={() => handleStatusChange("wantToRead")}
              className={selectedStatus === "wantToRead" ? "btn-selected" : ""}
            >
              Want to Read
            </button>
            <button
              onClick={() => handleStatusChange("alreadyRead")}
              className={selectedStatus === "alreadyRead" ? "btn-selected" : ""}
            >
              Already Read
            </button>
            <button onClick={handleModalToggle}>Close</button>
          </div>
        </div>
      )}

      {/* Wishlist buttonları */}
      <div className="d-flex gap-2 flex-wrap">
        <button
          className={`btn ${currentStatus === "wantToRead" ? "btn-success" : "btn-outline-success"}`}
          onClick={handleModalToggle}
        >
          I want to read yeni
        </button>
      </div>

      {/* Mesaj */}
      {message && (
        <div className="alert alert-info mt-3">
          {message}
        </div>
      )}
    </>
  );
};

export default ButtonWishlist;
