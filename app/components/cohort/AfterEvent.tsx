"use client";

import React from "react";
import { TbCalendar } from "react-icons/tb";
import { TbHierarchy3, TbSchool } from "react-icons/tb";
import { TbPigMoney } from "react-icons/tb";
import { TbArrowsMaximize } from "react-icons/tb";
import { motion } from "framer-motion";

const AfterEvent: React.FC = () => {
  return (
    <div className="lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center lg:items-stretch justify-center lg:gap-8 gap-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-11/12 sm:w-9/12 md:w-[450px] lg:w-1/2 border-[0.5px] border-[#99999933] bg-[#99999911] p-8 rounded-lg flex flex-col justify-start"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='font-freight text-2xl md:text-2xl lg:text-3xl font-bold text-left'
        >
          After You Leave The Program
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <ul className='flex flex-col gap-4'>
                          {[
                "Get mentorship from mission-aligned unicorn founders in El Segundo",
                <span key="hf0">Clear plan to raise a funding round with help from <a href="https://www.hf0.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 underline">HF0</a> and in-person access to 100+ top investors through the Demo Day for the American Interest</span>,
                "Become an El Segundo insider and get to know the key players in the ecosystem"
              ].map((text, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <span className="text-white mt-1">•</span>
                <span>{text}</span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center space-x-4 text-gray-400 italic"
            >
              <span>and more...</span>
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-11/12 sm:w-9/12 md:w-[450px] lg:w-1/2 border-[0.5px] border-[#99999933] bg-[#99999911] p-8 rounded-lg flex flex-col justify-start"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='font-freight text-2xl md:text-2xl lg:text-3xl font-bold text-left'
        >
          Example Day Schedule
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-4"
        >
          <ul className='flex flex-col gap-4'>
            {[
              { time: "06:00", text: "Founder workout" },
              { time: "08:15", text: "One hour session from guest speaker" },
              { time: "09:15", text: "Unicorn founder office hours" },
              { time: "15:00", text: "Investor office hours" },
              { time: "19:00", text: "Dinner with special guest speaker" },
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0">
                  <TbCalendar className="min-w-[20px] min-h-[20px] text-white" />
                </div>
                <span><b>{item.time}</b> {item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AfterEvent;