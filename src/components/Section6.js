import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

function Section6() {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex((prevState) => (prevState === index ? null : index));
  };

  const faqs = [
    {
      question: "What is Rail Madad?",
      answer: "Rail Madad is a platform developed to address and manage complaints related to railway services. It aims to streamline the complaint management process using advanced technologies like AI for efficient resolution.",
      link: "",
    },
    {
      question:
        "How does Rail Madad improve complaint management?",
      answer:
        "Rail Madad uses AI technologies such as image and video recognition, OCR (Optical Character Recognition), chatbots, smart routing, and sentiment analysis to automate the categorization, prioritization, and resolution of complaints. This helps in faster and more accurate handling of issues.",
      link: "",
    },
    {
      question: "How do I file a complaint using Rail Madad?",
      answer:
        "Once a complaint is filed, users will receive updates via the Rail Madad platform or through notifications. The system will provide real-time status updates and any actions taken towards resolving the issue.",
      link: "",
    },
    {
      question: "How will I know the status of my complaint?",
      answer:
        "Yes, users can track the progress of their complaint through the Rail Madad platform. The system provides a dashboard with status updates, resolution steps, and estimated timelines.",
      link: "",
    },
    {
      question: "Who can I contact for support regarding Rail Madad?",
      answer:
        "For any support or inquiries related to Rail Madad, users can contact the support team through the platform's help section or reach out via the provided contact information.",
      link: "",
    },
  ];

  return (
    <div id="section6">
      <section className="mx-auto max-w-7xl px-2 py-10 md:px-0">
        <div>
        <span id="sub-heading" className="animate-pulse text-center">RAIL MADAD</span>
        <span id="heading" className='mb-8 text-center block text-4xl font-bold'>FAQs</span>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md bg-[#D88080] border $ border-[#D88080] shadow-lg transition-all duration-200`}
                style={{
                  background: `${openFAQIndex === index ? "#762626" : ""}`,
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQIndex === index}
                >
                  <span className="flex text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  {openFAQIndex === index ? (
                    <AiOutlineUp
                      style={{
                        width: "16px",
                        height: "16px",
                        minWidth: "16px",
                        minHeight: "16px",
                      }}
                      className="text-white"
                    />
                  ) : (
                    <AiOutlineDown
                      style={{
                        width: "16px",
                        height: "16px",
                        minWidth: "16px",
                        minHeight: "16px",
                      }}
                      className="text-white"
                    />
                  )}
                </button>
                {openFAQIndex === index && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <a
                      href="/"
                      target="_blank"
                      className="text-gray-400 link-doc-res"
                      style={{
                        position: "relative",
                        top: faq.link === "" ? "0" : "-10px",
                      }}
                    >
                      {faq.link === "" ? (
                        ""
                      ) : (
                        <span
                          className="d-flex align-items-center"
                          style={{ gap: "3px" }}
                        >
                          <FaLink /> Video tutorial for reference
                        </span>
                      )}
                    </a>
                    <p className="text-white">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-[820px] mt-4">
            <div className="rounded-xl bg-[#D88080] flex flex-wrap items-center justify-between p-[22px] px-[34px] md:flex-wrap md:p-[18px]">
              <div className="flex flex-wrap items-center">
              <FontAwesomeIcon icon={faComments} className="w-[74px] h-[70px] mr-[14px] text-[#762626]" />
                <div>
                  <h3 className="text-white font-bold">Still have questions?</h3>
                  <h5 className="text-white font-semibold">Try our RailBot it might help you solve your queries.</h5>
                </div>
              </div>
              <button type="button" className="btn btn-primary mt-[10px] border border-black" onClick={() => window.location.href = 'https://railbot-alpha.vercel.app/'}>
                <div className="relative h-full">
                  <div className="h-full text-wrap">
                    RailBot <span className="animate-pulse">[सहायक]</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section6;
