import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feature_list = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const features = [
    {
      index: 0,
      title: "🧠 Smart Cloud Storage",
      description: "Securely save and retrieve your blogs and notes from any modern device, anywhere.",
    },
    {
      index: 1,
      title: "🎯 Focused, Clean UI",
      description: "A minimal, elegant aesthetic designed to keep your thoughts clear and centered.",
    },
    {
      index: 2,
      title: "🔐 Author-Controlled Privacy",
      description: "Strict ownership checks ensure only you can edit or remove your published articles.",
    },
    {
      index: 3,
      title: "🌐 Community Public Feed",
      description: "Explore diverse perspectives and tutorials shared by fellow thinkers on Noticia.",
    },
    {
      index: 4,
      title: "📩 Instant Notifications",
      description: "Automated welcome alerts to confirm your account setup and security.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4 overflow-hidden">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-900 mb-8">
        Why Readers & Writers Love <span className="text-blue-600">Noticia</span>
      </h3>

      <div className="pb-6">
        <Slider {...settings}>
          {features.map((item) => (
            <div key={item.index} className="px-3 py-2">
              <div className="bg-gradient-to-br from-blue-100/90 via-blue-50/50 to-white hover:shadow-xl transition-all duration-300 shadow-sm border border-blue-200/70 rounded-3xl p-6 h-48 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-blue-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Feature_list;
