import React from 'react';
import { UserManual } from "./UserManual";
import heroVideo from "../assets/videos/rsm1.mp4";

const Section1 = () => {
  return (
    <div className='Wrapper' id='section1'>
      <div id="offer" class="md:h-16 sm:h-14 sm:text:sm md:text-lg text-black sm:flex px-4 py-3 items-center justify-center" >For any grievance call on 139<a class="text-black" href="https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1703201">About Helpline Number</a></div>
      <div className='container flex flex-col lg:flex-row lg:items-center'>
        {/* Text Section */}
        <div className="mb-16 mt-5 md:mb-0 md:max-w-xl md:mt-0 sm:mx-auto md:text-center lg:text-left lg:w-1/2">
          <h2 className="mb-5 mt-[100px] font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            RailMadad is a grievance redressal system by{' '}
            <span className="inline-block text-[#762626]">
              Indian Railways.
            </span>
          </h2>
          <p className="mb-5 text-base text-gray-700 md:text-lg">
            Welcome to RailMadad, your dedicated platform for seamless railway assistance. The Web Application registers a complaint with minimum inputs from passenger, issues unique ID instantly and transfers complaint online to concerned officials for immediate action. This Digital India Initiative also provides information about the action taken on complaint to passenger through SMS.
          </p>
          <div className="flex items-center md:justify-center lg:justify-start">
            <a
              href="#section3"
              className="btn btn-primary inline-flex items-center justify-center px-6 mr-6 bg-[#762626]"
            >
              File Your Complaint
            </a>
            <UserManual />
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-16 mt-5 md:mb-0 md:max-w-xl md:mt-0 sm:mx-auto md:text-center lg:w-1/2 lg:flex lg:justify-end">
          <video 
            id='herovideo'
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
            className="max-w-[600px] lg:w-full h-auto mb-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Section1;
