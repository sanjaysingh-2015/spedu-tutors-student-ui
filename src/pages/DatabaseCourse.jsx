import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";

export default function DatabasesCourse() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 text-gray-800 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <img src={logo} alt="spEdu Tutors Logo" className="mx-auto h-20 mb-6 rounded-full" />
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Databases Mastery
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Master SQL, database design, performance tuning, and real-world data management
            using Oracle and MySQL — the foundation of all enterprise systems.
          </p>
          <a
            href="https://spedu-student-ui-436077983835.asia-south2.run.app"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Enroll Now
          </a>
        </div>

        {/* Course Overview */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Course Overview
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This course gives you a complete, hands-on understanding of how databases power
            real-world applications. From basic SQL queries to advanced indexing, normalization,
            stored procedures, and performance optimization — you'll learn how to design, query,
            and maintain robust data systems that scale.
          </p>
        </div>

        {/* Topics Covered */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Key Topics Covered
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Database Fundamentals — Tables, Relationships, Keys, and Constraints</li>
            <li>SQL Mastery — SELECT, INSERT, UPDATE, DELETE, and advanced joins</li>
            <li>Database Design — Normalization, ER Modeling, and schema planning</li>
            <li>Views, Indexes, and Stored Procedures — how and when to use them</li>
            <li>Transactions, Concurrency, and ACID properties</li>
            <li>Performance Tuning — Explain plans, indexing strategies, and query optimization</li>
            <li>Triggers, Functions, and Packages (Oracle/MySQL)</li>
            <li>Backup, Restore, and Data Migration</li>
            <li>Security — Roles, privileges, and best practices for data access</li>
            <li>Integration — Connecting databases with backend APIs and ORMs</li>
          </ul>
        </div>

        {/* Real Projects */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Real-World Projects
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Project 1:</strong> Library Management Database with stored procedures</li>
            <li><strong>Project 2:</strong> E-commerce Order System — multi-table joins and constraints</li>
            <li><strong>Project 3:</strong> Payment Transaction Logs with audit tables and triggers</li>
            <li><strong>Project 4:</strong> Database Performance Audit & Query Optimization Report</li>
            <li><strong>Project 5:</strong> REST API Integration with MySQL/Oracle using Spring Boot</li>
          </ul>
        </div>

        {/* Target Audience */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Who This Course Is For
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Beginners who want to build a strong foundation in SQL and database design</li>
            <li>Backend and Full Stack Developers integrating relational databases into apps</li>
            <li>Database Administrators (DBAs) seeking query tuning and optimization skills</li>
            <li>Students preparing for database certification or technical interviews</li>
          </ul>
        </div>

        {/* Certification */}
        <div className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">Certification</h2>
          <p className="text-lg text-gray-700">
            🏅 Upon completion, earn the <strong>“Certified Database Professional – spEdu Tutors”</strong> credential.
          </p>
        </div>

        {/* CTA */}
        <div id="enroll" className="max-w-5xl mx-auto mt-16 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">Ready to Master Databases?</h3>
          <a
            href="https://spedu-student-ui-436077983835.asia-south2.run.app"
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
