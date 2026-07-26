import React, { useEffect } from "react";

export function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto prose prose-orange lg:prose-lg">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-6">By accessing and using Kavi Builders' website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Services Provided</h2>
        <p className="text-gray-600 mb-6">Kavi Builders provides construction, renovation, and architectural consulting services. All project timelines and deliverables are subject to individual contract terms.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. User Responsibilities</h2>
        <p className="text-gray-600 mb-6">Clients are responsible for providing accurate information regarding property boundaries, legal ownership, and necessary local permissions prior to the commencement of any construction work.</p>
        
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-gray-600 mb-6">Kavi Builders shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services or website.</p>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">If you have any questions about these Terms, please contact us.</p>
        </div>
      </div>
    </main>
  );
}
