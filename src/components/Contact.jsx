import React, { useState } from "react";
import TopNav from "./partials/TopNav";
import { Link, useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Form submitted:", formData);
  };

  return (
    <div className="w-screen min-h-screen bg-[#1f1e24]">
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-4">
        <i
          onClick={() => navigate(-1)}
          className=" text-3xl text-zinc-300 ri-arrow-left-line"
        ></i>
        <div className="w-full h-[10vh] px-[3%] flex items-center">
          <TopNav />
        </div>
      </div>

      <div className="w-full px-[3%] py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact <span className="text-[#6556cd]">Us</span>
          </h1>
          <p className="text-zinc-400 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-[#23222b] p-8 rounded-lg shadow-lg"
            style={{ animation: "fadeIn 0.8s ease-out" }}
          >
            <div className="mb-6">
              <label className="block text-zinc-400 mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-[#1f1e24] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6556cd] transition-all duration-300"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-[#1f1e24] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6556cd] transition-all duration-300"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-zinc-400 mb-2">Message</label>
              <textarea
                className="w-full bg-[#1f1e24] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6556cd] transition-all duration-300 min-h-[150px] resize-none"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6556cd] text-white py-3 rounded-lg hover:bg-[#4c3eb8] transition-all duration-300 hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>

          {/* Additional Contact Info */}
          <div
            className="mt-12 text-center"
            style={{ animation: "fadeIn 0.8s ease-out 0.4s forwards" }}
          >
            <div className="flex justify-center gap-8 text-zinc-400">
              <div className="flex items-center gap-2">
                <i className="ri-mail-line text-[#6556cd]"></i>
                <span>support@mhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-github-line text-[#6556cd]"></i>
                <Link to="https://github.com/jpjisan">
                  <span>@jpjisan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
