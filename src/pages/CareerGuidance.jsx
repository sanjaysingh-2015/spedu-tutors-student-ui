// src/components/CareerGuidance.jsx
import React from "react";
import logo from "../assets/images/SpEduTutorLogo.png";
import { Link } from "react-router-dom";

export default function CareerGuidance() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-blue-50 text-gray-800 py-16 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <img src={logo} alt="spEdu Tutors Logo" className="mx-auto h-20 mb-6 rounded-full" />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Career Guidance & Counselling
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Tailored career coaching for final-year students and job seekers — resume reviews, interview preparation, role alignment, and real-world job search strategies.
          </p>
          <a
            href="https://student.speducation.co.in"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* Overview */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Course Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          Career Guidance & Counselling is a practical program focused on helping final-year students and professionals transition successfully into the job market. Through personalised coaching, practical exercises, and mock interviews, you’ll craft a job-ready profile and confident interview presence.
        </p>
      </div>

      {/* Who is it for */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Who This Is For</h2>
        <ul className="grid sm:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
          <li>Final-year students preparing for campus placements</li>
          <li>Graduates entering the job market after a break</li>
          <li>Professionals switching careers or tech stacks</li>
          <li>Developers preparing for interviews at startups and enterprises</li>
        </ul>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Program Modules</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Module 1: Career Discovery & Goal Setting",
              desc: "Identify strengths, interests, and target roles; build a 6-12 month career plan.",
              activity: "Activity: Personal SWOT & role-mapping workshop",
            },
            {
              title: "Module 2: Resume & LinkedIn Mastery",
              desc: "Craft ATS-friendly resumes and a compelling LinkedIn profile that grabs recruiter attention.",
              activity: "Activity: Resume makeover with live feedback",
            },
            {
              title: "Module 3: Portfolio & Project Storytelling",
              desc: "Learn to present projects with impact — scope, architecture, your contributions, outcomes.",
              activity: "Activity: Project pitch practice",
            },
            {
              title: "Module 4: Interview Preparation & Mock Rounds",
              desc: "Behavioural interview techniques, system design primer, and role-specific technical mocks.",
              activity: "Activity: Live mock interviews with feedback",
            },
            {
              title: "Module 5: Salary Negotiation & Offer Evaluation",
              desc: "Understand compensation components and negotiate offers confidently.",
              activity: "Activity: Offer-review checklist and negotiation scripts",
            },
            {
              title: "Module 6: Job Search Strategy & Networking",
              desc: "Targeted outreach, recruiter engagement, and leveraging alumni & community networks.",
              activity: "Activity: Building a weekly job-hunt plan",
            },
            {
              title: "Module 7: Career Growth & Early Onboarding",
              desc: "First 90-days plan, setting goals, and converting your early tenure into long-term growth.",
              activity: "Activity: 90-day onboarding template",
            },
            {
              title: "Module 8: Specialized Paths (Optional)",
              desc: "Guided paths for Backend, Cloud, Data, and Frontend roles with tailored interview prep.",
              activity: "Activity: Role-specific study plan",
            },
          ].map((mod, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-indigo-600 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-2">{mod.title}</h3>
              <p className="text-gray-700 mb-3">{mod.desc}</p>
              <p className="text-sm font-semibold text-gray-500 italic">{mod.activity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div className="max-w-5xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">What You’ll Achieve</h2>
        <ul className="grid sm:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
          <li>Resume and LinkedIn that pass ATS and attract recruiters</li>
          <li>Clear role-targeting and a measurable job-search plan</li>
          <li>Confident interview performance in technical and behavioural rounds</li>
          <li>Ability to evaluate and negotiate offers</li>
        </ul>
      </div>

      {/* Certification */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-3">Certification</h2>
        <p className="text-lg text-gray-700">
          🎓 Earn the <strong>“Career Ready — spEdu Tutors”</strong> certificate after completing the program and mock interviews.
        </p>
      </div>

      {/* CTA */}
      <div id="enroll" className="max-w-5xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">Ready for a Career Kickstart?</h3>
        <a
          href="https://student.speducation.co.in"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          Book a Counselling Session
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
