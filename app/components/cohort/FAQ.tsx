"use client";

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ: React.FC = () => {
  return ( 
    <section id="faq" className="w-full py-12 pb-24 flex justify-center items-center">
      <div className="w-11/12 sm:w-full container px-6 md:px-8 flex flex-col items-center">
        <h2 className="font-freight font-medium text-3xl sm:text-4xl md:text-5xl text-white text-center mb-8 ">FAQs.</h2>
        <div className="w-full max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">Who is the Cohort for?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                We welcome founders in the early stages of building or seriously exploring building hard tech and software for the national interest. We seek individuals driven by a unique set of values that motivates them to solve the West&apos;s hardest problems and attracts them to the culture of El Segundo.
                <br/><br/>
                We&apos;ve worked with student founders, full-time founders, and those balancing full-time jobs, so we don&apos;t exclude any particular persona.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">What&apos;s the timeline and commitment?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                The in-person part of the program runs for two fully paid weeks in El Segundo, CA, with attendance required for the entire duration. Other programming will be provided both before and after the Cohort. Founders will also be invited to yearly retreats with other founders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">Do I need to quit my job or drop out of school to participate?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                No, you just need to take two weeks off for the program. However, we look for founders who are interested in pursuing their ventures full-time or already doing so.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">Is having a team a requirement to apply?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                No, it isn&apos;t.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">Should every team member complete an application?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                No, only one team member needs to complete the application.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">Is having an incorporated company necessary to apply?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                No, it isn&apos;t.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7" className="!border-b-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-white text-left">Do you accept applicants from outside the U.S.?</AccordionTrigger>
              <AccordionContent className="w-full text-gray-300 text-sm md:text-base font-normal">
                Yes, we welcome international applicants. However, please note that the in-person program requires travel to El Segundo, CA for two weeks.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;