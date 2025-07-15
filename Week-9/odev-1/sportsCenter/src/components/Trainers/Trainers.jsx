import React from "react";

const Trainers = () => {
    const trainers = [
        {
            name: "Marry Jane",
            specialty : "Pilates Trainer",
            image: "/images/osi.jpg"
        },
        {
            name: "Henry Cavill",
            specialty : "Functional Trainer",
            image: "/images/mi.jpg"
        },
        {
            name: "Jane Doe",
            specialty : "Cardio Trainer",
            image: "/images/osi.jpg"
        },
    ];

    return (
        <section className="trainer" id="trainer">
            <div className="trainer-container">
                <h2>OUR BEST TRAINERS</h2>
                <div className="line"></div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus odit aut iste. Amet consectetur adipisicing elit.
                </p>
                <div className="trainers-container">
                    {trainers.map((trainer, index) => (
                        <div className="trainer-portfolio" key={index}>
                            <img src={trainer.image} alt={trainer.name} />
                            <div className="trainer-layer">
                                <h4>{trainer.name}</h4>
                                <p>{trainer.specialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trainers;