import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";

export default function SpringBootCourse() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 text-gray-800 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <img src={logo} alt="spEdu Tutors Logo" className="mx-auto h-20 mb-6 rounded-full" />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Spring Boot & Microservices Mastery
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Build scalable, production-grade backend systems using Spring Boot, REST APIs, and Microservice architecture with real-world deployment experience.
          </p>
          <a
            href="https://student.speducation.co.in"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Enroll Now
          </a>
        </div>

        {/* Overview */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Course Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            This hands-on course takes you from Spring fundamentals to advanced microservice design and deployment.
            You’ll learn how to build modular, fault-tolerant, and cloud-ready backend systems —
            the same patterns used by modern enterprise applications.
          </p>
        </div>

        {/* Topics Covered */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Key Topics Covered</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Spring Boot Fundamentals — Dependency Injection, Starters, and Auto-configuration</li>
            <li>RESTful API Design — Controllers, DTOs, Validation, and Exception Handling</li>
            <li>Spring Data JPA — Working with MySQL, PostgreSQL, and repository patterns</li>
            <li>Microservices Architecture — Service decomposition, communication, and discovery</li>
            <li>Spring Cloud — Config Server, Eureka, API Gateway, and Feign clients</li>
            <li>Security — Implementing JWT-based authentication and authorization</li>
            <li>Resilience & Fault Tolerance — Circuit Breakers and Retries with Resilience4j</li>
            <li>Messaging — Event-driven architecture using Kafka and RabbitMQ</li>
            <li>Containerization — Dockerizing microservices and orchestrating with Docker Compose</li>
            <li>CI/CD — Automating builds, tests, and deployments with Jenkins and GitHub Actions</li>
          </ul>
        </div>

        {/* Real Projects */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Real-World Projects</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Project 1:</strong> Employee Management REST API</li>
            <li><strong>Project 2:</strong> Payment Processing Microservice System</li>
            <li><strong>Project 3:</strong> API Gateway with JWT Authentication and Rate Limiting</li>
            <li><strong>Project 4:</strong> Event-driven Order Processing with Kafka</li>
            <li><strong>Project 5:</strong> Full CI/CD Pipeline using Docker and Jenkins</li>
          </ul>
        </div>

        {/* Target Audience */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Who This Course Is For</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Java developers ready to transition into enterprise-level backend development</li>
            <li>Developers aiming to understand microservices and distributed systems</li>
            <li>Professionals preparing for backend or cloud-native engineering roles</li>
            <li>Students seeking hands-on experience with production-grade APIs</li>
          </ul>
        </div>

        {/* Certification */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">Certification</h2>
          <p className="text-lg text-gray-700">
            🏅 Upon completion, earn the <strong>“Certified Spring Boot & Microservices Professional – spEdu Tutors”</strong> credential.
          </p>
        </div>

        {/* CTA */}
        <div id="enroll" className="max-w-5xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">Ready to Master Spring Boot & Microservices?</h3>
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
