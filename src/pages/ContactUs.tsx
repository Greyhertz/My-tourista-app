import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from '../components/core/Header';
// import CustomDrawer from '../components/core/CustomDrawer';
// import { ChangeProfile } from "../components/ChangeProfile";
// import useTheme from "../hooks/useTheme";

export default function ContactUs() {
  const data = useLoaderData() as {
    supportEmail: string;
    phone: string;
    office: string;
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // ⏳ 2 seconds delay

    return () => clearTimeout(timer); // cleanup
  }, []);

  //  const { theme, changeTheme } = useTheme();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(prev => !prev);
  const toggleThemeDropdown = () => setThemeDropdownOpen(prev => !prev);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setThemeDropdownOpen(false);
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(newTheme === 'dark');
    }
  };

  useEffect(() => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans">
        {/* Hero */}

        {/* <button
    onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
    className="bg-gray-300 dark:bg-gray-700 text-sm px-3 py-1 rounded"
  >
    Toggle {theme === "dark" ? "Light" : "Dark"} Mode
  </button> */}

        <Header stuff={{ toggleDrawer }} />
        {/* <CustomDrawer
          isOpen={isDrawerOpen}
          isDarkMode={isDarkMode}
          onClose={() => setDrawerOpen(false)}
          onThemeChange={handleThemeChange}
          currentTheme={theme}
          themeDropdownOpen={themeDropdownOpen}
          toggleThemeDropdown={toggleThemeDropdown}
        /> */}

        <section className="px-6 py-20 text-center border-b border-gray-300 bg-gray-300 dark:bg-gray-900 dark:border-gray-800 ">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg  font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
            Whether you're planning your next journey or need assistance, our
            team is here to help.
          </p>
        </section>

        {/* Contact Info Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Customer Support</h3>
            <p className="text-gray-600 dark:text-gray-400">Available 24/7</p>
            <a
              href={`mailto:${data.supportEmail}`}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {data.supportEmail}
            </a>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Mon - Fri, 9am - 6pm
            </p>
            <a
              href={`tel:${data.phone}`}
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {data.phone}
            </a>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Head Office</h3>
            <p className="text-gray-600 dark:text-gray-400">{data.office}</p>
          </div>
        </section>

        {/* Contact Form with Animation */}
        <section className="bg-gray-200 dark:bg-gray-900 py-16 px-6 ">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl relative overflow-hidden">
            {/* ✨ Animated blob */}
            <div className="hidden lg:flex justify-center items-center relative z-10">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  We'd Love to Hear From You
                </h2>
                <p className="text-lg text-gray-700">
                  Whether you're planning your next journey or need assistance,
                  our team is here to help.
                </p>
                <img
                  src="/asset/polygon-scatter-haikei.svg"
                  alt="Contact Illustration"
                  className="w-64 sm:w-72 md:w-80 animate-float"
                />
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6 relative z-10">
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-600 focus:border-0 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-600 focus:border-0 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  rows={5}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-600 focus:border-0 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
        {/* 
         <ChangeProfile setUsername={setUserName} />  */}

        {/* Map */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto mt-10 rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Location Map"
              className="w-full h-72"
              src="https://maps.google.com/maps?q=Times%20Square,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}
