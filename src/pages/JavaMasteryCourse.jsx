import React from "react";
import logo from "../assets/images/SpEduTutorLogo.png";
import { Link } from "react-router-dom";

export default function JavaMasteryCourse() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-blue-50 text-gray-800 py-16 px-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center">
        <img src={logo} alt="spEdu Tutors Logo" className="mx-auto h-20 mb-6 rounded-full" />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Java Mastery: Core to Advanced Java with Real-World Projects
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Learn Java from fundamentals to enterprise-grade applications — guided by 25+ years of real-world IT experience.
          </p>
          <a
            href="https://student.speducation.co.in"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Enroll Now
          </a>
        </div>
      </div>
      {/* Overview */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Course Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          This comprehensive program takes you from beginner to expert in Java development. You’ll start with the foundations of programming, move through
          core and advanced Java, and build industry-grade projects applying real-world architectural principles including Spring Boot, REST APIs, microservices, and cloud deployment.
        </p>
      </div>

      {/* Who is it for */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Who This Course Is For</h2>
        <ul className="grid sm:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
          <li>Students and professionals aiming to master Java from scratch</li>
          <li>Developers switching from other stacks (.NET, Node.js, etc.)</li>
          <li>Engineers preparing for backend or full-stack roles</li>
          <li>Anyone interested in building enterprise-grade applications</li>
        </ul>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Course Modules</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Module 1: Java Fundamentals",
              desc: "Learn syntax, data types, control flow, arrays, and basic I/O operations.",
              project: "Project: Number Cruncher (CLI app for analytics)",
            },
            {
              title: "Module 2: OOP in Depth",
              desc: "Master Classes, Inheritance, Polymorphism, Interfaces, and Exception Handling.",
              project: "Project: Banking System Simulator",
            },
            {
              title: "Module 3: Core Java APIs",
              desc: "Explore Collections, Streams, Generics, and Java 8+ features.",
              project: "Project: Student Data Management System",
            },
            {
              title: "Module 4: Multithreading & Concurrency",
              desc: "Work with Threads, Executors, and Parallel Streams.",
              project: "Project: Stock Price Tracker",
            },
            {
              title: "Module 5: Advanced Java",
              desc: "Learn Reflection, JDBC, Design Patterns, Testing, and Logging.",
              project: "Project: Employee Management System",
            },
            {
              title: "Module 6: Enterprise Java with Spring Boot",
              desc: "Build REST APIs, integrate JPA, and secure apps with Spring Security.",
              project: "Project: Online Course Management API",
            },
            {
              title: "Module 7: Microservices & Cloud",
              desc: "Develop microservices, Dockerize apps, and deploy on AWS or GCP.",
              project: "Project: E-Learning Microservices Suite",
            },
            {
              title: "Module 8: Real-World Projects",
              desc: "Consolidate your learning by building end-to-end applications.",
              project: "Projects: Chat App, E-Commerce API, Expense Tracker, AWS CI/CD",
            },
          ].map((mod, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-2">{mod.title}</h3>
              <p className="text-gray-700 mb-3">{mod.desc}</p>
              <p className="text-sm font-semibold text-gray-500 italic">{mod.project}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="max-w-5xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Course Outcomes</h2>
        <ul className="grid sm:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
          <li>Build production-ready Java applications</li>
          <li>Understand design and architecture patterns</li>
          <li>Be job-ready for Java Developer or Backend roles</li>
          <li>Showcase real-world portfolio projects</li>
        </ul>
      </div>

      {/* Certification */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-3">Certification</h2>
        <p className="text-lg text-gray-700">
          🏅 Upon completion, earn the <strong>“Certified Java Master – spEdu Tutors”</strong> credential.
        </p>
      </div>

      {/* CTA */}
      <div id="enroll" className="max-w-5xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Ready to Master Java?</h3>
        <a
          href="https://student.speducation.co.in"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          Start Learning Now
        </a>
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
