import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/SpEduTutorLogo.png";

export default function CloudComputing() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white text-gray-800 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <img src={logo} alt="spEdu Tutors Logo" className="mx-auto h-20 mb-6 rounded-full" />
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          ☁️ Cloud Computing
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          AWS, Azure & GCP — Master cloud deployment, architecture, and scalability through real-world projects.
        </p>
        <a
          href="https://student.speducation.co.in"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          Enroll Now
        </a>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section 1 */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
            ☁️ Cloud Foundations
          </h2>
          <ul className="list-disc text-left ml-8 space-y-2">
            <li>Understanding Cloud Computing Models — IaaS, PaaS, SaaS</li>
            <li>Cloud Architecture Fundamentals and Shared Responsibility Model</li>
            <li>Setting up Free Tiers on AWS, Azure, and GCP</li>
            <li>Virtual Machines, Networking, and Storage Basics</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
            🚀 AWS Deep Dive
          </h2>
          <ul className="list-disc text-left ml-8 space-y-2">
            <li>EC2, S3, IAM, RDS, and VPC Hands-on Labs</li>
            <li>Deploying Java/Spring Boot APIs to AWS Elastic Beanstalk & ECS</li>
            <li>Serverless Deployments with AWS Lambda</li>
            <li>Monitoring with CloudWatch and CloudTrail</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
            🔧 Azure Essentials
          </h2>
          <ul className="list-disc text-left ml-8 space-y-2">
            <li>Azure Resource Groups, VMs, App Service, and SQL Database</li>
            <li>CI/CD Pipelines with Azure DevOps</li>
            <li>Scaling Applications using Azure Load Balancer and Autoscaling</li>
            <li>Security & Access Management in Azure</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
            🌍 GCP Essentials
          </h2>
          <ul className="list-disc text-left ml-8 space-y-2">
            <li>Compute Engine, Cloud Storage, and Cloud SQL Basics</li>
            <li>Deploying Apps with App Engine & Cloud Run</li>
            <li>Networking and IAM Configuration</li>
            <li>Monitoring and Logging with Stackdriver</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
            🧠 Real-world Projects
          </h2>
          <ul className="list-disc text-left ml-8 space-y-2">
            <li>Multi-cloud Java API deployment (AWS + Azure)</li>
            <li>Containerized Microservice setup using Docker & Kubernetes</li>
            <li>Cloud Cost Optimization Techniques</li>
            <li>Load Testing and Performance Benchmarking</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
            🎯 What You’ll Achieve
          </h2>
          <p className="text-left ml-8 text-gray-700">
            By the end of this course, you’ll confidently deploy and manage Java applications
            across AWS, Azure, and GCP, understand architecture design principles, and be ready
            to pursue certifications like AWS Solution Architect, Azure Administrator, or GCP Associate Engineer.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div id="enroll" className="max-w-5xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Ready to Master Cloud Computing?</h3>
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
