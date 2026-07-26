import React, { useEffect } from "react";

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-orange lg:prose-lg">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-6">We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and project details.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-6">We use the information we collect to provide, maintain, and improve our services, communicate with you about your projects, and respond to your inquiries.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Information Sharing</h2>
        <p className="text-gray-600 mb-6">We do not share your personal information with third parties except as necessary to provide our services (e.g., subcontractors) or to comply with the law.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Data Security</h2>
        <p className="text-gray-600 mb-6">We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </div>
    </main>
  );
}
