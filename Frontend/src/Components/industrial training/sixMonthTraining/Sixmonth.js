import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import Placements from "./Placements/Placements";
import TieUpClg from "./TieUpClg/TieUpClg";
import GrowthStory from "./GrowthStory/GrowthStory";
import FAQ from "./FAQ/FAQ";
import CompaniesTieUp from "./CompaniesTieUp/CompaniesTieUp";
import Talktoexpert from "./TalkToExpert/Talktoexpert";
import Proposal from "../sixWeekTraining/Proposal/Proposal";
import SyllabusCard from "../sixWeekTraining/Carousel/SyllabusCard";
import PlacedStudent from "../sixWeekTraining/placedstudent/Placedstudent";
import ProjectShow from "./ProjectShow/ProjectShow";
import Courses from "../sixWeekTraining/Courses/Courses";
import WhyChooseUs from "../sixWeekTraining/WhyChooseUs/WhyChooseUS";
import FAQ2 from "../sixWeekTraining/FAQ2/FAQ2";
import ReviewsSection from "../../reviews/ReviewsSection";
import Footer from "../../footer/Footer";
import Navbar from "../../head/Navbar";
const Sixmonth = () => {
  return(
     <>
      <Navbar />
      <main>
        <LandingPage />
        <PlacedStudent />
        <ProjectShow />
        <SyllabusCard />
        <Courses />
        <Placements />
        <TieUpClg />
        <WhyChooseUs />
        <FAQ2 />
        <CompaniesTieUp />
        <ReviewsSection />
        <Talktoexpert />
        <Proposal />
      </main>
      <Footer />
    </>
  );
};

export default Sixmonth;