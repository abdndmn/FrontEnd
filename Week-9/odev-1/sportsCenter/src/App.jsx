import React from 'react';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home";
import Classes from "./components/Classes/Classes";
import BMI from "./components/BMI/BMI";
import Trainers from "./components/Trainers/Trainers";
import Purchase from "./components/Purchase/Purchase";
import Reviews from "./components/Reviews/Reviews";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import './assets/style.css';


const App = () => {
  return(
    <div>
      <Navbar />
      <Home />
      <Classes />
      <BMI />
      <Trainers />
      <Purchase />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;