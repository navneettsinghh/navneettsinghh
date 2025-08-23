import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold">Convert Screenshots to Code Instantly</h1>
        <p className="text-xl mt-4 text-gray-600">The ultimate tool for developers and designers to turn visual concepts into clean, functional code.</p>
        <Link href="/register" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
          Get Started for Free
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">AI-Powered Conversion</h3>
              <p>Leverages state-of-the-art AI to ensure accurate and high-quality code generation.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Supports Multiple Frameworks</h3>
              <p>Generate code in plain HTML/CSS, or for frameworks like React, Vue, and Angular.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Developer API</h3>
              <p>Integrate our screenshot-to-code functionality directly into your own applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-bold">1. Upload Screenshot</h3>
              <p>Simply upload an image of the UI you want to build.</p>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">2. AI Processing</h3>
              <p>Our AI analyzes the image and generates the code.</p>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">3. Get Your Code</h3>
              <p>Download or copy the generated code in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Ready to Speed Up Your Workflow?</h2>
          <p className="mt-4">Sign up now and start converting screenshots to code in minutes.</p>
          <Link href="/register" className="mt-8 inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg">
            Sign Up Now
          </Link>
        </div>
      </section>
    </>
  );
}
