import React from "react";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>CONTACT US</h2>
        <div className="line"></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit aut iste.
        </p>
        <div className="message-container">
          <div className="phone-container">
            <h6>
              Mobile Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email Address
            </h6>
            <span>+135 773 321 4442&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; demo@demo.com</span>
            <div className="input-container">
              <h3>Make An Appointment</h3>
              <input type="text" placeholder="Your Name" id="textname" />
              <input type="email" placeholder="Your Email" id="ymail" />
              <textarea rows="5" cols="50" name="text" placeholder="Your Message"></textarea>
            </div>
          </div>
          <div className="googleMap">
            <iframe
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.7997403084178!2d29.200703299999997!3d41.0077562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacfe1004cef1d%3A0x5de3725c7732823e!2sMACFit%20%C3%87amsan%20Park!5e0!3m2!1str!2str!4v1727951343766!5m2!1str!2str"
              allowFullScreen
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;