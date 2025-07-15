import React, {useState, useEffect} from "react";
import "/src/assets/style.css";

const Navbar = () =>{
    const  [navbarBg, setNavbarBg] = useState(false); // navbar arka plan rengini tutmak için state

    useEffect(() => {
        const changeBg = () => {
            if(window.scrollY > 100) {
                setNavbarBg(true); // kaydırma 100ü geçerse arka plan rengi değişecek
            }else{
                setNavbarBg(false); // kaydırma geri çekilirse renk eski haline döner
            }
        };

        window.addEventListener("scroll", changeBg); // kaydırma olayını dinler

        return () => {
            window.removeEventListener("scroll", changeBg); // temizleme işlemi
        }
    }, []);

    return(
        <header>
            <nav className={`navbar-container ${navbarBg ? "bgColor" :""}`}>{/*arka plan rengini değişimi uygular*/}
                <div className="logo">
                    <img src="./images/logo.png" alt="band" />
                </div>
                <input type="checkbox" className="menu-btn" id="menu-btn" />
                <label htmlFor="menu-btn" className="menu-icon">
                    <span className="menu-hmbgr"></span>
                </label>
                <div className="bar">
                    <a href="#home">Home</a>
                    <a href="#classes">Classes</a>
                    <a href="#trainer">Trainer</a>
                    <a href="#review">Review</a>
                    <a href="#contact">Contact</a>
                    <button className="join-btn">
                        <a href="#joinus">JOIN US</a>
                    </button>
                </div>
            </nav>
        </header>
    );
};
export default Navbar;