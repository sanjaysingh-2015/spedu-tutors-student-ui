import React from "react";
import { Link } from "react-router-dom";
import { FaReact, FaCode, FaLaptopCode, FaUserGraduate } from "react-icons/fa";
import logo from "../assets/images/SpEduTutorLogo.png";

export default function ReactJsMastery() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 py-16 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <img src={logo} alt="spEdu Tutors Logo" className="mx-auto h-20 mb-6 rounded-full" />
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">
            ReactJS Mastery Program
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium mb-4">
            Learn to build modern, high-performance web apps using React — from
            fundamentals to real-world projects.
          </p>
          <a
            href="https://student.speducation.co.in"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Book a Session
          </a>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
            <FaCode className="text-blue-600 text-3xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Hands-On Projects</h3>
            <p>
              Build practical apps like Todo Manager, Course Platform, and
              Portfolio to gain real-world development skills.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
            <FaLaptopCode className="text-blue-600 text-3xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Modern React Concepts</h3>
            <p>
              Master Hooks, Context API, Routing, State Management, and API
              integration using the latest React best practices.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
            <FaUserGraduate className="text-blue-600 text-3xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Guided by Experts</h3>
            <p>
              Learn from experienced mentors who build production-grade apps
              using React, Node, and AWS.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
            <FaReact className="text-blue-600 text-3xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Job-Ready Curriculum</h3>
            <p>
              Designed for final-year students and working professionals aiming
              to upskill or switch to front-end development.
            </p>
          </div>
        </div>

        {/* Course Structure */}
        <div className="bg-indigo-50 p-8 rounded-xl shadow-inner border border-indigo-100 mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Course Structure
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Introduction to React & Component Architecture</li>
            <li>JSX, Props, and State Management</li>
            <li>React Hooks (useState, useEffect, useContext)</li>
            <li>Routing and Navigation (React Router)</li>
            <li>Integrating REST APIs and JSON Data</li>
            <li>Building Reusable UI Components</li>
            <li>Form Handling and Validation</li>
            <li>Deploying React Apps to Cloud Platforms</li>
          </ul>
        </div>

        {/* CTA */}
        <div id="enroll" className="max-w-5xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">Ready to start your journey as a Frontend Developer?</h3>
          <a
            href="https://student.speducation.co.in"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Start Learning Now
          </a>
        </div>
      </div>
      <Link
        to="/classes"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        ← Back to Courses
      </Link>
    </section>
  );
}
