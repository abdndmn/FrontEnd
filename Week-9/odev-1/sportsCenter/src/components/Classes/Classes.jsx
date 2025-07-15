import React, {useState} from "react";

const Classes = () => {
    const [activeClass, setActiveClass] = useState("yoga");

    const yoga = () => ({
        title: "Why Are You Yoga?",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!",
        schedule: [
            "Saturday-Sunday: 8:00am - 10:00am",
            "Monday-Tuesday: 8:00am - 10:00am",
            "Wednesday-Friday: 8:00am - 10:00am",
        ],
        image: "/images/yoga.jpg"
    });

    const group = () => ({
        title: "Why Are Your Group?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!",
        schedule: [
          "Saturday-Sunday: 8:00am - 10:000am",
          "Monday-Tuesday: 8:00am - 10:000am",
          "Wednesday-Friday: 8:00am - 10:000am",
        ],
        image: "/images/group.webp",
      });
    
      const solo = () => ({
        title: "Why Are Your Solo?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!",
        schedule: [
          "Saturday-Sunday: 8:00am - 10:000am",
          "Monday-Tuesday: 8:00am - 10:000am",
          "Wednesday-Friday: 8:00am - 10:000am",
        ],
        image: "/images/solo.jpg",
      });
    
      const stretch = () => ({
        title: "Why Are Your Stretch?",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!",
        schedule: [
          "Saturday-Sunday: 8:00am - 10:000am",
          "Monday-Tuesday: 8:00am - 10:000am",
          "Wednesday-Friday: 8:00am - 10:000am",
        ],
        image: "/images/stret.webp",
      });

      const classes = {
        yoga : yoga(),
        group : group(),
        solo : solo(),
        stretch : stretch(),
      };

      const activeContent = classes[activeClass];

      return(
        <section className="classes" id="classes">
            <div className="class-container">
                <div className="bg-shape"></div>
                <h2>OUR CLASSES</h2>
                <div className="line"></div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
                odit aut iste. Amet consectetur adipisicing elit
                </p>
                <div className="button-container">
                <button id="yoga"className={activeClass === "yoga" ? "active" : ""}
                    onClick={() => setActiveClass("yoga")}>
                    Yoga
                  </button>
                  <button
                    id="group"
                    className={activeClass === "group" ? "active" : ""}
                    onClick={() => setActiveClass("group")}>
                    Group
                  </button>
                  <button
                    id="solo"
                    className={activeClass === "solo" ? "active" : ""}
                    onClick={() => setActiveClass("solo")}>
                    Solo
                  </button>
                  <button
                    id="stretch"
                    className={activeClass === "stretch" ? "active" : ""}
                    onClick={() => setActiveClass("stretch")}>
                    Stretching
                  </button>
                </div>
                <div id="features-container">
                    <div>
                        <h6>{activeContent.title}</h6>
                        <p>{activeContent.description}</p>
                        <h6>When comes {activeClass.charAt(0).toUpperCase() + activeClass.slice(1)} Your Time?</h6>
                        {activeContent.schedule.map((time, index) => (
                            <p key={index}>{time}</p>
                        ))}
                    </div>
                    <img src= {activeContent.image} alt={activeClass} />
                </div>
            </div>
        </section>
    );
};

export default Classes;