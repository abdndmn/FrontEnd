import React from "react";

const Reviews = () => {
  return (
    <section className="review" id="review">
      <div className="review-container">
        <h2>REVIEW CLIENT</h2>
        <div className="line"></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit aut iste.
        </p>
        <div className="client-container">
          <div className="review">
            <div className="client">
              <img src="/images/client1.jpg" alt="Client 1" />
              <p>
                <span>Diet Expert</span><br />
                CFO
              </p>
            </div>
            <div className="comment">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. 
                Atque, illum corporis odio pariatur ad harum non, molestias maiores molestiae 
                sapiente perferendis veniam earum fugit ipsum repellendus architecto.
              </p>
            </div>
          </div>
          <div className="review">
            <div className="client">
              <img src="/images/client2.jpg" alt="Client 2" />
              <p>
                <span>Cardio Trainer</span><br />
                CEO
              </p>
            </div>
            <div className="comment">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. 
                Atque, illum corporis odio pariatur ad harum non, molestias maiores molestiae 
                sapiente perferendis veniam earum fugit ipsum repellendus architecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;