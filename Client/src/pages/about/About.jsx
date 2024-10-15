import React from "react";
function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About RentEase
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to RentEase, your one-stop platform for seamless property
              rentals and sales. Whether you’re looking to rent your dream
              apartment or sell a property hassle-free, RentEase simplifies the
              entire process. With an intuitive interface and reliable listings,
              we connect property owners with potential tenants and buyers,
              making real estate transactions smooth and efficient. Find your
              next home or investment with ease—only on RentEase!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
