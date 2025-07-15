import React from "react";

const Home = () => {
    return (
        <>
            <section id="home" className="home">
                <div className="home-container">
                    <div className="container">
                        <h6 className="power">
                            <p>POWERFULL</p>
                        </h6>
                        <h1>
                            Group <br />
                            Practice 
                            <br />
                            With Trainer
                        </h1>
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Necessitatibus odit aut iste. Velit porro rerum, unde modi ipsam
                            exercitationem laudantium illum. Id, laborum? Totam, dicta nisi.
                            Voluptates, vero id. Perferendis.
                        </p>
                    </div>
                    <div className="home-buttons">
                        <button className="sign">Sign Up</button>
                        <button className="details">Details</button>
                    </div>
                </div>
            </section>

            {/*Flex container stats alanı*/}
            <div className="flex-container">
                <div>
                    <p>
                        325 <br />
                        <span>Course</span>
                    </p>
                </div>
                <div>
                    <p>
                        405 <br />
                        <span>Work Out</span>
                    </p>
                </div>
                <div>
                    <p>
                        305 <br />
                        <span>Working Hour</span>
                    </p>
                </div>
                <div>
                    <p>
                        705 <br />
                        <span>Happy Client</span>
                    </p>
                </div>
            </div> 
        </>
    );
};

export default Home;