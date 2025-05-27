import { MapPin, Users, Award, Globe, Star, Camera, Navigation, Heart } from "lucide-react";
import CustomDrawer from "../components/CustomDrawer";
import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function AboutUs() {
  const stats = [
    { icon: Users, label: "Happy Travelers", value: "2M+" },
    { icon: MapPin, label: "Destinations", value: "500+" },
    { icon: Star, label: "Average Rating", value: "4.9" },
    { icon: Award, label: "Awards Won", value: "15+" }
  ];

  const features = [
    {
      icon: Navigation,
      title: "Smart Navigation",
      description: "Get turn-by-turn directions to hidden gems and popular attractions with our advanced GPS technology."
    },
    {
      icon: Camera,
      title: "Photo Spots",
      description: "Discover the most Instagram-worthy locations and get tips for capturing the perfect shot."
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Receive customized recommendations based on your interests, budget, and travel style."
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Explore destinations worldwide with local insights from our community of travel experts."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Travel Experience Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

   const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  
    const toggleDrawer = () => setDrawerOpen((prev) => !prev);
    const toggleThemeDropdown = () => setThemeDropdownOpen((prev) => !prev);
  
    const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
      setTheme(newTheme);
      setThemeDropdownOpen(false);
      if (newTheme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);
      } else {
        setIsDarkMode(newTheme === "dark");
      }
    };
  
    useEffect(() => {
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);
      } else {
        setIsDarkMode(theme === "dark");
      }
    }, [theme]);
    

  return (
      <div className={isDarkMode ? "dark" : ""} >
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  font-sans">
       <Header stuff={{toggleDrawer}}/>
              <CustomDrawer
                isOpen={isDrawerOpen}
                isDarkMode={isDarkMode}
                onClose={() => setDrawerOpen(false)}
                onThemeChange={handleThemeChange}
                currentTheme={theme}
                themeDropdownOpen={themeDropdownOpen}
                toggleThemeDropdown={toggleThemeDropdown}
              />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About TravelMate</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We're passionate about making travel accessible, enjoyable, and unforgettable for everyone. 
            Our mission is to connect travelers with authentic experiences around the world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="text-blue-600" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2019 by a team of passionate travelers, TravelMate was born from the frustration 
                of planning trips with outdated guidebooks and generic recommendations. We believed there 
                had to be a better way to discover authentic, local experiences.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Today, we've grown into a global community of over 2 million travelers, local guides, 
                and destination experts who share a common goal: making every journey extraordinary.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're seeking adventure, relaxation, culture, or cuisine, TravelMate helps 
                you discover experiences that match your unique travel style and create memories that last a lifetime.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with local expertise to deliver personalized travel experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate travelers and tech experts working to revolutionize how you explore the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 ">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl leading-relaxed mb-8">
            To democratize travel by providing every traveler with access to authentic, local experiences 
            and the tools they need to explore the world confidently and responsibly.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Authentic</h3>
              <p className="text-blue-100">Real experiences from local experts who know their destinations inside out</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Accessible</h3>
              <p className="text-blue-100">Travel planning made simple and affordable for every type of traveler</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Sustainable</h3>
              <p className="text-blue-100">Promoting responsible tourism that benefits local communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join millions of travelers who trust TravelMate to make their adventures unforgettable
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Download TravelMate
          </button>
        </div>
      </section>
      </div>
      </div>
  );
}