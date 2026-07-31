import { lazy } from "react";

const Main = lazy(() => import("../Components/main-container/Main"));
const Integrationnextsection = lazy(
  () => import("../Components/integration/Integration"),
);
const Apphero = lazy(() => import("../Components/apps/Apphero"));
const Help = lazy(() => import("../Components/help/Help"));
const HelpTopicArticles = lazy(
  () => import("../Components/help/HelpTopicArticles"),
);
const Widgets = lazy(() => import("../Components/furtherMenu/widget/Widgets"));
const KnowledgeBase = lazy(
  () => import("../Components/furtherMenu/Knowledge/KnowledgeBase"),
);
const AiChatbot = lazy(
  () => import("../Components/furtherMenu/aichatbot/AiChatbot"),
);
const MainDashboard = lazy(
  () => import("../Components/Dashboard/MainDashboard"),
);
const AIPage = lazy(() => import("../Components/furtherMenu/AI/AI"));
const SharedInbox = lazy(
  () => import("../Components/furtherMenu/SharedInbox/SharedInbox"),
);
const ForgotPasswordForm = lazy(
  () => import("../Components/signUp_Login/forgot/ForgotPasswordForm"),
);
const ResetPassword = lazy(
  () => import("../Components/signUp_Login/forgot/ResetPassword"),
);
const Wordpress = lazy(
  () => import("../Components/furtherMenu/integrateapps/Wordpress"),
);
const CoursesCard = lazy(() => import("../Components/allCourses/CoursesCard"));
const CourseDetail = lazy(
  () => import("../Components/allCourses/CourseDetail"),
);
const Webdesigning = lazy(
  () => import("../Components/allCourses/webdesigning/Webdesigning"),
);
const DigitalMarketing = lazy(
  () => import("../Components/allCourses/digitalMarketing/DigitalMarketing"),
);
const DataScience = lazy(
  () => import("../Components/allCourses/dataScience/DataScience"),
);
const ArtificialIntelligence = lazy(
  () => import("../Components/allCourses/AI/AI"),
);
const MachineLearning = lazy(() => import("../Components/allCourses/ML/ML"));
const AboutUs = lazy(() => import("../Components/AboutUs/AboutUs"));
const DataAnalytics = lazy(
  () => import("../Components/allCourses/DataAnalytics/DataAnalytics"),
);
const WebDevelopment = lazy(
  () => import("../Components/allCourses/webDevelopment/WebDevelopment"),
);
const MobileAppDevelopment = lazy(
  () => import("../Components/allCourses/Mobileapp/MobileApp"),
);
const PHP = lazy(() => import("../Components/allCourses/PHP/Php"));
const GraphicDesigning = lazy(
  () => import("../Components/allCourses/graphic/Graphic"),
);
const Form = lazy(() => import("../Components/form/Form"));
const IndustrialTraining = lazy(
  () => import("../Components/industrial training/IndustrialTraining"),
);
const ThankYou = lazy(() => import("../Components/thankyou/ThankYou"));
const Map = lazy(() => import("../Components/map/Map"));
const Sixmonth = lazy(
  () => import("../Components/industrial training/sixMonthTraining/Sixmonth"),
);
const Sixweek = lazy(
  () => import("../Components/industrial training/sixWeekTraining/Sixweek"),
);
const StudentSearch = lazy(() => import("../Components/admin/Studentform.js"));
const CardCarousel = lazy(
  () => import("../Components/placementcarousel/CardCarousel.jsx"),
);
const StudentForm = lazy(() => import("../Components/admin/Studentform"));
const BlogList = lazy(() => import("../Components/blog/BlogList"));
const BlogDetail = lazy(() => import("../Components/blog/BlogDetail"));
const AdminBlog = lazy(() => import("../Components/admin/AdminBlog"));
const AdminPanel = lazy(() => import("../Components/admin/AdminPanel"));

const AdminProtectedRoute = lazy(() => import("../Components/admin/AdminProtectedRoute"));

export const routes = [
  { path: "/", element: <Main /> },
  { path: "/placement", element: <Integrationnextsection /> },
  { path: "/services", element: <Apphero /> },
  { path: "/contact-us", element: <Help /> },
  { path: "/help/:topicName", element: <HelpTopicArticles /> },
  { path: "/widget", element: <Widgets /> },
  { path: "/knowledge", element: <KnowledgeBase /> },
  { path: "/aichatbot", element: <AiChatbot /> },
  { path: "/aipage", element: <AIPage /> },
  { path: "/sharedInbox", element: <SharedInbox /> },
  { path: "/inbox", element: <MainDashboard /> },
  { path: "/forgotpassword", element: <ForgotPasswordForm /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  { path: "/wordpress", element: <Wordpress /> },
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
  { path: "/allcourses", element: <CoursesCard /> },
  { path: "/allcourses/:courseRoute", element: <CourseDetail /> },
  { path: "/allcourses/:courseTitle", element: <CourseDetail /> },
  { path: "/form", element: <Form /> },
  { path: "/industrial-training", element: <IndustrialTraining /> },
  { path: "/thank-you", element: <ThankYou /> },
  { path: "/map", element: <Map /> },
  { path: "/admin", element: <AdminProtectedRoute><StudentSearch /></AdminProtectedRoute> },
  { path: "/six-month-training", element: <Sixmonth /> },
  { path: "/six-week-training", element: <Sixweek /> },
  { path: "/card", element: <CardCarousel /> },
  { path: "/search", element: <AdminProtectedRoute><StudentSearch /></AdminProtectedRoute> },
  { path: "/courses", element: <CoursesCard /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/Studentform", element: <AdminProtectedRoute><StudentForm /></AdminProtectedRoute> },
  // ── Blog Routes ──────────────────────────────
  { path: "/blogs", element: <BlogList /> },
  { path: "/blogs/:id", element: <BlogDetail /> },
  { path: "/admin/blog", element: <AdminProtectedRoute><AdminBlog /></AdminProtectedRoute> },
  { path: "/admin/panel", element: <AdminProtectedRoute><AdminPanel /></AdminProtectedRoute> },
];
