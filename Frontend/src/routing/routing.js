import Main from "../Components/main-container/Main";

// import Pricing from "../Components/Pricing/Pricing";
import Integrationnextsection from "../Components/integration/Integration";
import Apphero from "../Components/apps/Apphero";
import Help from "../Components/help/Help";
import HelpTopicArticles from "../Components/help/HelpTopicArticles";

// further menu
import Widgets from "../Components/furtherMenu/widget/Widgets";
import KnowledgeBase from "../Components/furtherMenu/Knowledge/KnowledgeBase";
import AiChatbot from "../Components/furtherMenu/aichatbot/AiChatbot";
import MainDashboard from "../Components/Dashboard/MainDashboard";
import AIPage from "../Components/furtherMenu/AI/AI";
import SharedInbox from "../Components/furtherMenu/SharedInbox/SharedInbox";

import ForgotPasswordForm from "../Components/signUp_Login/forgot/ForgotPasswordForm";
import ResetPassword from "../Components/signUp_Login/forgot/ResetPassword";
import Wordpress from "../Components/furtherMenu/integrateapps/Wordpress";

// ziion new routing //

import CoursesCard from "../Components/allCourses/CoursesCard";
import CourseDetail from "../Components/allCourses/CourseDetail";

import Webdesigning from "../Components/allCourses/webdesigning/Webdesigning";
import DigitalMarketing from "../Components/allCourses/digitalMarketing/DigitalMarketing";
import DataScience from "../Components/allCourses/dataScience/DataScience";
import ArtificialIntelligence from "../Components/allCourses/AI/AI";
import MachineLearning from "../Components/allCourses/ML/ML";
import AboutUs from "../Components/AboutUs/AboutUs";
import DataAnalytics from "../Components/allCourses/DataAnalytics/DataAnalytics";
import WebDevelopment from "../Components/allCourses/webDevelopment/WebDevelopment";
import MobileAppDevelopment from "../Components/allCourses/Mobileapp/MobileApp";
import PHP from "../Components/allCourses/PHP/Php";
import GraphicDesigning from "../Components/allCourses/graphic/Graphic";
// form //
import Form from "../Components/form/Form";

// IndustrialTraining //
import IndustrialTraining from "../Components/industrial training/IndustrialTraining";

import ThankYou from "../Components/thankyou/ThankYou";
import Map from "../Components/map/Map";

// industrial training //
import Sixmonth from "../Components/industrial training/sixMonthTraining/Sixmonth";
import LandingPage from "../Components/industrial training/sixMonthTraining/LandingPage/LandingPage";
import Sixweek from "../Components/industrial training/sixWeekTraining/Sixweek";
import StudentSearch from "../Components/admin/Studentform.js";
import CardCarousel from "../Components/placementcarousel/CardCarousel.jsx";

import StudentForm from "../Components/admin/Studentform";

export const routes = [
  { path: "/", element: <Main /> },
  // { path:'/aboutus',  element:<Pricing/> },
  { path: "/placement", element: <Integrationnextsection /> },
  { path: "/services", element: <Apphero /> },
  { path: "/contact-us", element: <Help /> },
  { path: "/help/:topicName", element: <HelpTopicArticles /> },

  // further menu
  { path: "/widget", element: <Widgets /> },
  { path: "/knowledge", element: <KnowledgeBase /> },
  { path: "/aichatbot", element: <AiChatbot /> },

  { path: "/aipage", element: <AIPage /> },

  { path: "/sharedInbox", element: <SharedInbox /> },
  { path: "/inbox", element: <MainDashboard /> },
  { path: "/forgotpassword", element: <ForgotPasswordForm /> },
  { path: "/resetpassword", element: <ResetPassword /> },

  // app integration
  { path: "/wordpress", element: <Wordpress /> },

  // ziion routing //
  { path: "/web-development", element: <WebDevelopment /> },
  { path: "/web-designing", element: <Webdesigning /> },
  { path: "/digital-marketing", element: <DigitalMarketing /> },
  { path: "/data-science", element: <DataScience /> },
  { path: "/data-analytics", element: <DataAnalytics /> },
  { path: "/ai", element: <ArtificialIntelligence /> },
  { path: "/ml", element: <MachineLearning /> },
  { path: "/mobileapp", element: <MobileAppDevelopment /> },
  { path: "/php", element: <PHP /> },
  { path: "/graphic", element: <GraphicDesigning /> },

  { path: "/aboutus", element: <AboutUs /> },

  // all courses routing //
  { path: "/allcourses", element: <CoursesCard /> },
  { path: "/allcourses/:courseRoute", element: <CourseDetail /> },
  { path: "/allcourses/:courseTitle", element: <CourseDetail /> },

  { path: "/form", element: <Form /> },

  // industrial training //
  { path: "/industrial-training", element: <IndustrialTraining /> },

  { path: "/thank-you", element: <ThankYou /> },

  { path: "/map", element: <Map /> },

  { path: "/admin", element: <StudentSearch /> },

  // industrial training //
  // six month //
  { path: "/six-month-training", element: <Sixmonth /> },
  { path: "/six-week-training", element: <Sixweek /> },

  { path: "/card", element: <CardCarousel /> },
  { path: "/search", element: <StudentSearch /> },

  { path: "/courses", element: <CoursesCard /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/Studentform", element: <StudentForm /> },
];
