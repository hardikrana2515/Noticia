import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feature_list = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const feature = [
    {
      index: 0,
      title: "🧠 Smart Storage",
      description: "Securely save and access your notes from any device, anytime, anywhere.",
    },
    {
      index: 1,
      title: "🎯 Clean UI",
      description: "A minimal and elegant design that keeps your focus on writing.",
    },
    {
      index: 2,
      title: "🔐 Privacy First",
      description: "Your thoughts are encrypted and safe — no compromise on privacy.",
    },
    {
      index: 3,
      title: "📅 Daily Logs",
      description: "Organize your goals, track tasks, or write a diary — effortlessly.",
    },
    {
      index: 4,
      title: "📩 Mail Connectivity",
      description: "Soothing integration with your email for seamless note-taking.",
    }
  ];

  return (
    <>
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-10"> What Makes <span className="text-blue-500">Noticia</span> Special</h2>

      <Slider {...settings}>
        {feature.map((item) => (
          <div key={item.index} className="px-4">
            <div className="bg-gradient-to-br from-blue-300 to-white hover:shadow-2xl transition-all duration-300 shadow-md border border-gray-200 rounded-2xl p-6 h-52 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-blue-700">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Feature_list;
