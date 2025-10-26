"use client";
import React, { useState, ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface Tab {
  id: string;
  label: string;
}

interface Content {
  [key: string]: {
    text: string;
  };
}

const SalesRepPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
   
  ]);

  const tabs: Tab[] = [
    { id: "about", label: "About Me" },
    { id: "experiences", label: "Experiences" },
    { id: "recommended", label: "Recommended" },
  ];

  const content: Content = {
    about: {
      text: "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4 year old twin daughters - Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a...",
    },
    experiences: {
      text: "With over 10 years of experience in sales and customer relations, I've helped hundreds of companies transform their business processes.\n\nKey Achievements:\n• Exceeded sales targets by 150% for 3 consecutive years\n• Led a team of 12 sales representatives\n• Implemented CRM strategies that increased customer retention by 40%\n• Specialized in enterprise solutions and B2B sales",
    },
    recommended: {
      text: "I highly recommend connecting with industry leaders and staying updated with the latest sales techniques.\n\nTop Recommendations:\n• 'The Challenger Sale' by Matthew Dixon\n• Salesforce Trailhead certifications\n• LinkedIn Sales Navigator for prospecting\n• Weekly industry webinars and networking events\n• Continuous learning in AI and automation tools",
    },
  };

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="lg:w-1/2 w-full p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-linear-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-6 opacity-20"></div>
          <h2 className="text-4xl font-bold text-gray-600 mb-4">Portfolio</h2>
          <p className="text-gray-500 text-lg">Professional Profile</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 w-full p-6 md:p-8 space-y-6">
        {/* Tabs Widget */}
        <div className="bg-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-320px transition-all">
          <div className="flex flex-wrap gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 relative overflow-hidden ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
                style={{
                  transform:
                    activeTab === tab.id ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className="text-gray-300 leading-relaxed whitespace-pre-line transition-opacity duration-500"
            style={{
              animation: "fadeIn 0.5s ease-in",
            }}
          >
            {content[activeTab].text}
          </div>
        </div>

        {/* Gallery Widget */}
        <div className="bg-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Gallery</h3>

            {/* Add Image Input */}
            <label className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-300">
              <Plus size={20} />
              <span className="text-sm font-medium">ADD IMAGE</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImage}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    index === currentImageIndex ? "flex-2" : "flex-1"
                  }`}
                  style={{
                    height: "260px",
                    opacity: index === currentImageIndex ? 1 : 0.6,
                  }}
                  onMouseEnter={() => {
                    setCurrentImageIndex(index);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      index === currentImageIndex && isHovering
                        ? "scale-110 grayscale-0"
                        : "grayscale scale-100"
                    }`}
                    style={{
                      filter:
                        index === currentImageIndex && isHovering
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Image Counter */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default SalesRepPortfolio;
