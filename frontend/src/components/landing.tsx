import e from "cors";
import { Button } from "./ui/button";



const Landing = (): JSX.Element => {
  return (



    <div className="min-h-screen flex flex-col bg-gradient-to-t from-gray-50 to-white">

      <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur z-40 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          <span className="font-black text-2xl text-blue-600 tracking-wide">payBase</span>
          <div className="space-x-2">
            <a
              href="/signup"
              className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition"
              aria-label="Sign up for PayBase"
            >
              Sign up
            </a>
            <a
              href="/login"
              className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
              aria-label="Sign in to PayBase"
            >
              Sign in
            </a>
          </div>
        </nav>
      </header>


      <div className="h-16" />


      <section className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Banking made <span className="text-blue-600">borderless</span>.
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-xl mx-auto">
          Experience the future of digital banking with <b>PayBase</b>. Zero fees, instant transfers, and smart savings tools — designed for today, built for tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#signup"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full font-semibold shadow-md hover:from-orange-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition"
          >
            Get started
          </a>
          <a
            href="#features"
            className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
          >
            Learn more
          </a>
        </div>
      </section>


      <section id="features" className="py-16 px-4 bg-gradient-to-r from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Why choose PayBase?</h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">

            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <svg className="h-10 w-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M3 10v10h18V10M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" /></svg>
              <h3 className="font-semibold text-lg mb-2">Zero-fee accounts</h3>
              <p className="text-gray-500 text-center">No monthly charges. Enjoy full banking services without hidden costs.</p>
            </div>

            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <svg className="h-10 w-10 text-orange-500 mb-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M17 9V7a5 5 0 00-10 0v2a3 3 0 00-3 3v4.5A2.5 2.5 0 006.5 19h11a2.5 2.5 0 002.5-2.5V12a3 3 0 00-3-3z" /></svg>
              <h3 className="font-semibold text-lg mb-2">Instant transfers</h3>
              <p className="text-gray-500 text-center">Send and receive money globally, instantly and securely, anytime.</p>
            </div>

            <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
              <svg className="h-10 w-10 text-green-500 mb-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
              <h3 className="font-semibold text-lg mb-2">Smart savings</h3>
              <p className="text-gray-500 text-center">AI-powered tools help you save and grow your money intelligently.</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 bg-gradient-to-r from-blue-600 to-orange-500 text-white flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to take control of your money?</h3>
        <a
          href="/signup"
          className="inline-block px-8 py-3 bg-white text-orange-500 font-semibold rounded-full shadow-lg hover:bg-orange-100 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          Sign up for free
        </a>
      </section>


      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="font-black text-xl text-blue-600 mb-2">payBase</div>
            <div className="text-gray-500 text-sm">Banking made borderless.<br />© 2025 PayBase.</div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold mb-1">Links</div>
            <a href="#features" className="block text-gray-500 hover:text-blue-600 transition">Features</a>
            <a href="#signup" className="block text-gray-500 hover:text-blue-600 transition">Sign up</a>
            <a href="#signin" className="block text-gray-500 hover:text-blue-600 transition">Sign in</a>
          </div>
          <div className="space-y-2">
            <div className="font-semibold mb-1">Contact</div>
            <a href="mailto:support@paybase.com" className="block text-gray-500 hover:text-blue-600 transition">support@paybase.com</a>
            <span className="block text-gray-500">Secure Digital Bank App</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


























export { Landing };
