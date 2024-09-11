import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdTrain } from "react-icons/io";
import { RiGovernmentFill } from "react-icons/ri";
import { GrRestroomWomen } from "react-icons/gr";
import { FaIdCard } from "react-icons/fa";
import { Grid, Typography} from '@mui/material';
import Enquiry from "./Enquiry";
import Women from "./Women";
import Train from "./train";
import Station from "./station";

const IconSideNav = () => {
  const [selected, setSelected] = useState(0);

  const renderContent = () => {
    switch (selected) {
      case 0:
        return <Train />;
      case 1:
        return <Station />;
      case 2:
        return <Women />;
      case 3:
        return <Enquiry />;
      default:
        return null;
    }
  };

  return (
    <div className=" text-slate-100 flex">
      <SideNav selected={selected} setSelected={setSelected} />
      <div className="w-full">
        <div className="h-[40px] m-4 rounded">
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: "#75002b", fontWeight: "bold" }}>
              GRIEVANCE DETAILS
            </Typography>
            
            <Typography sx={{ color: "white", fontWeight: "bold" }}>
              <span className="text-red-600">*</span> Mandatory Fields
            </Typography>
          </Grid>
        </div>
        <div className="h-[628px] m-4 rounded bg-gray-200">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const SideNav = ({ selected, setSelected }) => {
  return (
    <nav className="h-[725px] w-fit bg-red-400 p-4 flex flex-col items-center gap-7">
      <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
        <IoMdTrain className="text-4xl" />
      </NavItem>
      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <RiGovernmentFill className="text-4xl" />
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <GrRestroomWomen className="text-4xl" />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <FaIdCard className="text-4xl" />
      </NavItem>
    </nav>
  );
};

const NavItem = ({ selected, id, setSelected, children }) => {
  return (
    <motion.button
      className={`p-3 text-xl rounded-md transition-colors relative ${
        selected ? "text-black" : "text-white hover:text-black shadow-black"
      }`}
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-white bg-opacity-20 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default IconSideNav;