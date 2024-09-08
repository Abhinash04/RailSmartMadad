import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";

export const UserManual = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="btn btn-primary inline-flex items-center justify-center px-6 mr-6 bg-[#762626]"
      >
        View User Instructions
      </button>

      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto max-w-2xl space-y-4 text-white">
          
          <h2 className="text-4xl font-bold text-[#762626] mt-5">
            Welcome To Rail Madad Platform
          </h2>
        
          <p className="mb-4">
            Welcome to Rail Madad, a dedicated platform designed by Indian Railways to address and resolve grievances efficiently. This manual will guide you through the various features and functionalities of the Rail Madad web application to help you navigate and utilize the platform effectively.
          </p>
          
          <h3 className="text-xl font-semibold mb-2">1. Introduction to Rail Madad</h3>
          <p className="mb-4">
            Rail Madad is an initiative aimed at simplifying the process of filing and managing complaints related to railway services. By using this platform, passengers can submit their grievances, track the status of their complaints, and receive timely updates on actions taken. The system ensures that complaints are directed to the appropriate authorities for swift resolution.
          </p>
          
          <h3 className="text-xl font-semibold mb-2">2. Getting Started with Rail Madad</h3>
          <p className="mb-4">
            To start using Rail Madad, you need to access the web application via your browser or the mobile app. If you are a new user, follow these steps:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li>Visit the Rail Madad website or download the mobile app from the app store.</li>
            <li>If you are using the web application, click on the 'Register' button to create a new account. Provide your email address, phone number, and create a secure password.</li>
            <li>For mobile app users, follow the on-screen instructions to complete the registration process.</li>
            <li>Once registered, log in to your account using your credentials.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">3. Filing a Complaint</h3>
          <p className="mb-4">
            To file a complaint, follow these steps:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li>Log in to your Rail Madad account.</li>
            <li>Navigate to the 'Submit Complaint' section, usually found in the main menu.</li>
            <li>Fill out the complaint form with the necessary details:
              <ul className="list-disc mb-4 ml-6">
                <li><strong>Train Number:</strong> Enter the train number associated with your complaint.</li>
                <li><strong>Date of Travel:</strong> Specify the date on which you traveled.</li>
                <li><strong>Complaint Description:</strong> Provide a detailed description of the issue you faced, including any relevant facts and observations.</li>
              </ul>
            </li>
            <li>Attach any supporting documents or images if necessary.</li>
            <li>Review the information provided and submit the complaint.</li>
            <li>You will receive a unique complaint ID, which you can use to track the status of your complaint.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">4. Tracking Your Complaint</h3>
          <p className="mb-4">
            After submitting your complaint, you can track its progress by:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li>Logging in to your Rail Madad account.</li>
            <li>Going to the 'Track Complaint' section.</li>
            <li>Entering the complaint ID you received after submission.</li>
            <li>Viewing the current status of your complaint, including any updates or actions taken by the railway authorities.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">5. Receiving Updates</h3>
          <p className="mb-4">
            Rail Madad keeps you informed about the status of your complaint through various channels:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li><strong>SMS Notifications:</strong> You will receive SMS updates regarding the progress of your complaint and any actions taken.</li>
            <li><strong>Email Notifications:</strong> If you have provided an email address, you will also receive email updates.</li>
            <li><strong>In-App Notifications:</strong> Check the Rail Madad app or website for real-time updates and messages.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">6. Resolving Complaints</h3>
          <p className="mb-4">
            Once your complaint has been reviewed and actioned, you will receive a resolution notification. The complaint status will be updated to reflect the outcome, which could include:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li><strong>Resolved:</strong> The issue has been addressed, and appropriate measures have been taken.</li>
            <li><strong>Pending:</strong> Further action is required, and your complaint is still under review.</li>
            <li><strong>Rejected:</strong> Your complaint could not be processed, usually due to insufficient information or it falling outside the scope of the complaint system.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">7. Additional Features</h3>
          <p className="mb-4">
            Rail Madad offers additional features to enhance your experience:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li><strong>Train Status Updates:</strong> Check real-time updates on train arrivals, departures, delays, and cancellations.</li>
            <li><strong>Station Information:</strong> Access information about station facilities, services, and contact details.</li>
            <li><strong>Help and Support:</strong> Reach out to customer support for any queries or issues using the contact options provided in the application.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">8. Contacting Support</h3>
          <p className="mb-4">
            If you need further assistance or have any questions, you can contact Rail Madad support through:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li><strong>Phone:</strong> Call the customer support helpline provided on the Rail Madad website or app.</li>
            <li><strong>Email:</strong> Send an email to the support team using the email address listed on the platform.</li>
            <li><strong>Online Chat:</strong> Use the live chat feature on the Rail Madad website or app for real-time assistance.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">9. Troubleshooting</h3>
          <p className="mb-4">
            If you encounter any issues while using Rail Madad, consider the following troubleshooting steps:
          </p>
          <ul className="list-disc mb-4 ml-6">
            <li><strong>Check Internet Connection:</strong> Ensure you have a stable internet connection.</li>
            <li><strong>Clear Cache:</strong> Clear your browser cache or app cache if you experience loading issues.</li>
            <li><strong>Update Application:</strong> Ensure you are using the latest version of the Rail Madad app.</li>
            <li><strong>Contact Support:</strong> Reach out to customer support if the issue persists.</li>
          </ul>

          <p className="mb-4">
            Thank you for using Rail Madad. We are committed to improving your railway travel experience and ensuring that your grievances are addressed promptly and efficiently.
          </p>
          {/* Add as many paragraphs or content as needed */}
        </div>
      </DragCloseDrawer>
    </div>
  );
};

const DragCloseDrawer = ({ open, setOpen, children }) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-[#D88080]"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-[#D88080] p-4">
              <button
                onPointerDown={(e) => {
                  controls.start(e);
                }}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-[#762626] active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default UserManual;
