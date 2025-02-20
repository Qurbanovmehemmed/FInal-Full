import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-dark text-light " style={{marginTop:"6rem"}}>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="https://www.facebook.com/Cristiano/?locale=az_AZ" target="_blank" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/realmadrid?mx=2"  target="_blank" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
           
            <a href="https://www.instagram.com/gurbanof77?igsh=MTVycGJ1NjJ2NThjYw%3D%3D&utm_source=qr" target="_blank" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/mehemmed-qurbanov-70637134b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Qurbanovmehemmed" target="_blank" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start " >
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>
                  <a href="/" className="text-uppercase fw-bold text-light">Wattpad</a>
                  
                </h6>
                <p>
                  Discover and share amazing stories. Read books from talented
                  writers or publish your own for the world to see.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Categories</h6>
                <p>
                  <a href="/allproduct?category=Romance" className="text-reset">
                    Romance
                  </a>
                </p>
                <p>
                  <a href="/allproduct?category=Fantasy" className="text-reset">
                    Fantasy
                  </a>
                </p>
                <p>
                  <a href="/allproduct?category=Horror" className="text-reset">
                    Horror
                  </a>
                </p>
                <p>
                  <a href="/allproduct?category=Mystery" className="text-reset">
                    Mystery
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/allproduct" className="text-reset">
                  Explore Books
                  </a>
                </p>
                <p>
                  <a href="/wishlist" className="text-reset">
                    My Library
                  </a>
                </p>
                <p>
                  <a href="/create" className="text-reset">
                  Start Writing
                  </a>
                </p>
                <p>
                  <a href="https://janeyburton.com/writing-advice-from-great-authors/" target="_blank" className="text-reset">
                    Helpful for Writers
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  mahammadag-af106@code.edu.az
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 994 55 665 33 91
                </p>
                  
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2025 Copyright
          <a className="text-reset fw-bold mx-1" href="/">
            all rights reserved.
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
