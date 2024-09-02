import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTools, faRocket, faSyncAlt, faCalendarDay, faChartLine, faHandshake } from '@fortawesome/free-solid-svg-icons';

const Section2 = () => {
  return (
    <div className='container' id='section2'>
      <span id="sub-heading" className="animate-pulse text-center">
        RAIL MADAD
      </span>
      <span id="heading" className='text-center block text-4xl font-bold mb-8'>ABOUT</span>
    <div id="timeline" className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-[#762626] before:from-transparent before:via-[#762626] before:to-transparent">
      
      {/* Item #1 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black text-xl underline">Inception and Vision</div>
            <time className="font-caveat font-bold text-white text-xl">2017</time>
          </div>
          <div className="text-white">Rail Madad was born out of a vision to revolutionize the way passengers interact with Indian Railways. Recognizing the need for a streamlined grievance redressal system, our goal was to create a platform that would make it easier for passengers to voice their concerns and get timely resolutions. The inception of Rail Madad marked a significant step towards enhancing the overall travel experience.</div>
        </div>
      </div>
      
      {/* Item #2 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faTools} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black underline text-xl">Development Phase</div>
            <time className="font-caveat font-bold text-white text-xl">2018-2019</time>
          </div>
          <div className="text-white">Rail Madad was officially launched in 1st of November in the year 2018, Marking a new era in passenger services for Indian Railways. The application introduced a range of features aimed at simplifying the grievance redressal process, from easy submission of complaints to real-time tracking of their status. The response was overwhelming, with thousands of users joining the platform within the first month.</div>
        </div>
      </div>
      
      {/* Item #3 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faRocket} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black underline text-xl">Launch of Rail Madad</div>
            <time className="font-caveat font-bold text-white text-xl">2020</time>
          </div>
          <div className="text-white">Rail Madad was officially launched in [Year], marking a new era in passenger services for Indian Railways. The application introduced a range of features aimed at simplifying the grievance redressal process, from easy submission of complaints to real-time tracking of their status. The response was overwhelming, with thousands of users joining the platform within the first month.
          </div>
        </div>
      </div>
      
      {/* Item #4 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faSyncAlt} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black underline text-xl">Major Updates and Improvements</div>
            <time className="font-caveat font-bold text-white text-xl">2021-2022</time>
          </div>
          <div className="text-white">Since its launch, Rail Madad has undergone several major updates, each designed to improve user experience and expand functionality. We listened to our users, incorporating their feedback to introduce new features such as multi-language support, offline complaint registration, and faster response times. Today, Rail Madad is trusted by millions for its efficiency and reliability.
          </div>
        </div>
      </div>

      {/* Item #5 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faCalendarDay} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black underline text-xl">Present Day</div>
            <time className="font-caveat font-bold text-white text-xl">2023</time>
          </div>
          <div className="text-white">Today, Rail Madad stands as a testament to our commitment to providing exceptional service to railway passengers. With a user base that continues to grow, the app has successfully resolved over [number] of grievances and remains an essential tool for travelers across the country. Our focus remains on delivering solutions that make every journey smoother and more enjoyable.
          </div>
        </div>
      </div>

      {/* Item #6 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black underline text-xl">Future Vision</div>
            <time className="font-caveat font-bold text-white text-xl">2024 & Beyond</time>
          </div>
          <div className="text-white">Looking ahead, Rail Madad is poised to introduce even more innovative features that will further enhance the passenger experience. We are exploring new ways to integrate advanced technologies, expand our service offerings, and continue building a platform that passengers can rely on. Your feedback is crucial in shaping the future of Rail Madad, and we encourage you to share your thoughts and suggestions with us.
          </div>
        </div>
      </div>
      
      {/* Item #7 */}
      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black bg-[#762626] group-[.is-active]:bg-[#762626] text-white group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
          <FontAwesomeIcon icon={faHandshake} />
        </div>
        {/* Card */}
        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#D88080] p-4 rounded border border-slate-200 shadow">
          <div className="flex items-center justify-between space-x-2 mb-1">
            <div className="font-bold text-black underline text-xl">Recognition</div>
            <time className="font-caveat font-bold text-white text-xl">2024</time>
          </div>
          <div className="text-white">Rail Madad is the result of the hard work and dedication of a talented team, along with the support of our partners and the Indian Railways. We extend our heartfelt thanks to everyone who has contributed to making Rail Madad the success it is today. Together, we are committed to continuously improving and serving our passengers better.
          </div>
        </div>
      </div>     
    </div>
    </div>
  );
};

export default Section2;
