import { Link } from "react-router-dom";
import works_Meal from "../assets/images/works_Meal.jpg";
import works_Box from "../assets/images/works_Box.jpg";
import works_Cook from "../assets/images/works_Cook.png";
import works_Delivery from "../assets/images/works_Delivery.png";
import home_whyImportant from "../assets/images/home_whyImportant.jpg";
import { Typewriter } from "react-simple-typewriter";

function Home() {
  return (
    <>
      {/* Main Section */}
      <section
        id="main"
        className="home-main w-full h-6/12 bg-cover bg-center bg-no-repeat overflow-x-hidden"
      >
        <div className="flex flex-col space-y-12 justify-center items-center w-full h-full text-white">
          <div>
            <h1 className="text-3xl font-bold">Save your serious</h1>
            <h1 className="text-center text-2xl">
              <Typewriter
                words={["time, stress, money"]}
                loop={false}
                typeSpeed={50}
              />
            </h1>
          </div>
          <h2 className="text-xl">Get started with Riverside Farm meals!</h2>
          <div>
            <h3>Now with more choices every week or created recipe by you</h3>
            <h3 className="text-center">
              and meals starting from just £5.99/pp
            </h3>
          </div>
          <Link
            to="/OurRecipeBoxes"
            className="shadow-white shadow-md py-4 px-8 bg-mediumOrange rounded-md"
          >
            Get Offer
          </Link>
        </div>
      </section>

      {/* Diversity Section */}
      <section
        id="diversty"
        className="md:border-b-2 border-dashed border-mediumOrange py-8"
      >
        <div className="md:flex md:space-x-20 m-6 justify-center">
          <div className="home-Breakfast h-96 md:w-1/2 lg:w-1/4 bg-cover bg-center"></div>
          <div className="home-Snacks h-96 md:w-1/2 lg:w-1/4 bg-cover bg-center"></div>
        </div>
        <div className="md:flex md:space-x-20 m-6 justify-center">
          <div className="home-Lunch h-96 md:w-1/2 lg:w-1/4 bg-cover bg-right"></div>
          <div className="home-Dinner h-96 md:w-1/2 lg:w-1/4 bg-cover bg-center"></div>
        </div>
      </section>

      {/* How it Works */}
      <section id="howWorks" className="py-8">
        <div className="flex flex-col my-4">
          <div>
            <h1 className="text-2xl text-center font-bold">How it works</h1>
            <p className="text-center font-imbue">
              Choose your recipes or create your own recipes • Pre-measured
              ingredients for less waste • Delivered safely to your door
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-x-2 md:space-y-1 space-y-4 mx-16 my-3">
            {[
              {
                img: works_Meal,
                title: "Choose your meals",
                desc: "Curated, easy-to-follow recipes every week, customisable by you",
              },
              {
                img: works_Box,
                title: "Create the perfect box",
                desc: "Suit your lifestyle with a variety of Extras, including desserts and sides",
              },
              {
                img: works_Delivery,
                title: "Get convenient weekly deliveries",
                desc: "Scheduling made easy, with drop-offs right at your door",
              },
              {
                img: works_Cook,
                title: "Cook seasonal, fresh ingredients",
                desc: "Food made from scratch in the comfort of your kitchen",
              },
            ].map((item, idx) => (
              <div key={idx} className="md:w-1/3 flex flex-col items-center">
                <img
                  className="object-cover h-60 w-60"
                  src={item.img}
                  alt={item.title}
                />
                <h1 className="text-center mt-2 font-bold">{item.title}</h1>
                <p className="text-center">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <Link
              to="HowItWorks"
              className="bg-mediumOrange w-36 text-center p-3 my-3 rounded-lg hover:scale-125 hover:bg-darkGreen ease-out duration-500"
            >
              Learn More
            </Link>
            <p className="underline decoration-wavy">
              You can skip a week or cancel at any time
            </p>
          </div>
        </div>
      </section>

      {/* Why Important */}
      <section id="whyImportant" className="py-8">
        <div className="flex md:flex-row flex-col md:space-y-1 space-y-6 mt-4 mx-6 space-x-6">
          <div className="md:w-1/2">
            <img
              src={home_whyImportant}
              alt="home_whyImportant"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 flex flex-col items-center justify-center space-y-10">
            <h1 className="box text-center py-4">
              <Typewriter
                words={["Why is eating healthy food important?"]}
                loop={false}
                typeSpeed={50}
              />
            </h1>
            <p>
              Eating healthy foods is important because it provides the
              nutrients the body needs to carry out its essential functions.
              These nutrients include vitamins, minerals, protein, healthy fats
              and complex carbohydrates. Healthy foods support cell growth and
              repair, maintain energy balance, and can improve the immune
              system. Healthy foods can also play a role in maintaining mental
              balance and providing stable energy throughout the day. By
              choosing foods wisely, we can play an active role in maintaining
              the health and well-being of our bodies.
            </p>
            <Link
              to="/Recipes"
              className="bg-darkGreen bg-opacity-80 hover:bg-darkGreen w-10/12 p-4 rounded-lg text-center text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* <FeedbackUI /> */}

      {/* Started Section */}
      <section id="started">
        <div className="home-started flex md:flex-row flex-col space-y-6 mt-4 items-center md:items-start md:justify-between md:mt-5 h-80 bg-cover bg-top md:bg-center">
          <h1 className="w-1/3 text-center text-2xl mt-6">Let's Start!</h1>
          <div className="w-1/3 text-center">
            {["G", "F", "G", "M"].map((letter, i) => (
              <p key={i} className="text-2xl">
                {letter}
                <i className="fa-solid fa-heart text-darkGreen"></i>
                <i className="fa-solid fa-heart text-darkGreen"></i>d
              </p>
            ))}
          </div>
          <Link
            to="/OurRecipeBoxes"
            className="w-1/3 border-2 border-darkGreen rounded-lg p-2 text-2xl text-center hover:bg-darkGreen hover:text-white"
          >
            View Our Boxes
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
