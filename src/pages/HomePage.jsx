import React from "react";

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Campaign Service
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, manage, and track your campaigns with our intuitive platform.
          Join us today to streamline your campaign management process.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg">
          Get Started
        </button>
      </div>

      {/* Feature section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Create Campaigns",
            description:
              "Easily create and customize your campaigns with our user-friendly interface.",
          },
          {
            title: "Track Progress",
            description:
              "Monitor your campaign performance with real-time analytics and insights.",
          },
          {
            title: "Collaborate",
            description:
              "Work together with your team members and share campaign updates effortlessly.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
