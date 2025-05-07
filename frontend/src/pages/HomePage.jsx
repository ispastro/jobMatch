import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import LoginRegster from '../features/auth/LoginRegister';

const MetricCard = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.2 }}
    className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 shadow-[0_8px_24px_rgba(30,64,175,0.05)]"
  >
    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
      {value}
    </div>
    <div className="text-lg text-gray-600 font-medium">{label}</div>
  </motion.div>
);

const HomePage = () => {
  const stepsRef = useRef(null);
  const isStepsInView = useInView(stepsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Hero Section */}

      <LoginRegster/>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Build Your Future with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Direct Opportunities
                </span>
              </h1>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-1 shadow-xl ring-1 ring-gray-900/5">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-gray-600">
                        I'm Looking For
                      </label>
                      <select className="w-full p-4 rounded-lg border-0 bg-transparent focus:ring-2 focus:ring-blue-500">
                        <option>Work Opportunities</option>
                        <option>Skilled Workers</option>
                      </select>
                    </div>
                    <div className="relative flex-1">
                      <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500">
                        Near
                      </label>
                      <input
                        type="text"
                        placeholder="Enter location"
                        className="w-full p-4 rounded-lg border-0 bg-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-blue-500/20">
                      Search
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 items-center text-gray-600">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  Popular Searches:
                  <div className="flex gap-2">
                    {['Electricians', 'Welders', 'Drivers'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl transform rotate-2"></div>
              <img
                src="https://images.unsplash.com/photo-1581093458799-ee4c4af72e58"
                alt="Skilled worker"
                className="relative rounded-3xl transform -rotate-1 shadow-2xl"
              />
              <div className="absolute -bottom-8 left-8 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1.2k+</div>
                    <div className="text-gray-600">Active Jobs Today</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 w-full">
          <path
            fill="currentColor"
            fillOpacity="0.1"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </section>

      {/* Metrics Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <MetricCard value="2,154+" label="Daily Matches" delay={0} />
            <MetricCard value="98.7%" label="Success Rate" delay={0.2} />
            <MetricCard value="4.9/5" label="Average Rating" delay={0.4} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-20 text-gray-900">
            Streamlined Workforce Solutions
          </h2>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-3 gap-12">
              {['Post/Find', 'Match', 'Work'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isStepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className="relative z-10"
                >
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(30,64,175,0.05)] transition-all hover:shadow-[0_12px_32px_rgba(30,64,175,0.1)]">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {index === 0 &&
                        "Create or discover skilled trade opportunities with our intelligent matching system"}
                      {index === 1 &&
                        "Advanced algorithms connect qualified professionals with ideal positions instantly"}
                      {index === 2 &&
                        "Secure contracts, manage projects, and build lasting professional relationships"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 opacity-80">
            {['AES-256', 'PCI-DSS', 'SOC2'].map((badge) => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="text-2xl font-bold text-gray-900">{badge}</div>
                <div className="text-sm text-gray-500">Certified</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Transforming Careers Daily
          </h2>

          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            centeredSlides
            loop
            className="pb-16"
          >
            {[1, 2, 3, 4].map((i) => (
              <SwiperSlide key={i} className="max-w-md">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(30,64,175,0.05)]">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                      className="w-14 h-14 rounded-full"
                      alt="User"
                    />
                    <div>
                      <div className="font-bold text-lg">Michael Chen</div>
                      <div className="text-sm text-blue-600">HVAC Specialist</div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "Within 48 hours of joining, I secured three long-term contracts. The verification system 
                    gives employers confidence in my certifications."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">2 days ago</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
