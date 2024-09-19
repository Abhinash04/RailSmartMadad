import { motion } from "framer-motion";
import { FaStar, FaRegFileAlt, FaCheckCircle, FaHourglassHalf, FaUsers } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { delay: 0.2, type: "spring", stiffness: 200 } }
};

const Dashboard = () => {
  const stats = [
    { icon: FaRegFileAlt, value: "10M+", label: "Complaints Registered", color: "text-blue-500" },
    { icon: FaCheckCircle, value: "500K+", label: "Complaints Resolved", color: "text-green-500" },
    { icon: FaHourglassHalf, value: "300K+", label: "Complaints Pending", color: "text-amber-500" },
    { icon: FaUsers, value: "5", label: "Users Rating", color: "text-purple-500", star: true }
  ];

  return (
    <div className="p-8">
      <motion.h1 
        className="text-4xl font-bold text-[#762626] mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Complaint Management Dashboard
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6">
              <motion.div
                className={`text-4xl ${stat.color} mb-4`}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
              >
                <stat.icon />
              </motion.div>
              <motion.div 
                className={`text-3xl font-bold ${stat.color} mb-2`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {stat.value}
                {stat.star && <FaStar className="inline ml-1" />}
              </motion.div>
              <motion.div 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
