"use client";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast notifications

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    // Show a toast notification
    toast.success("Message sent!");

    // Reset form data after submission if needed
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40 text-center flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-primary mb-6">Contact Us</h2>
      <div className="w-full max-w-lg bg-white shadow-lg p-8 rounded-lg">
        <img
          src="/contact-us.png"
          alt="Contact Us"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <Button color="primary" className="w-full text-2xl" type="submit">
            Send Message
          </Button>
        </form>
      </div>
      <ToastContainer /> {/* Place ToastContainer here */}
    </div>
  );
}

export default ContactUs;
