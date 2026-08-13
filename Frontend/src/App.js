import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { PageProvider } from "./context/PageContext";
import { routes } from "./routing/routing";
import styles from "./App.module.css";
import homeImages from "./assets/homeImages";
import ScrollToTop from "./routing/ScrollonTop";
import { CreditCard } from "lucide-react";

const Form = lazy(() => import("./Components/form/Form"));
const FixedForm = lazy(() => import("./routing/fixedForm"));
const EMIForm = lazy(() => import("./routing/EMIForm"));

function AppInner() {
  const [showForm, setShowForm] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const location = useLocation();

  const isAllCoursesPage =
    location.pathname === "/allcourses" || location.pathname === "/courses";

  const isCourseDetailPage =
    location.pathname.startsWith("/web-development") ||
    location.pathname.startsWith("/web-designing") ||
    location.pathname.startsWith("/digital-marketing") ||
    location.pathname.startsWith("/data-science") ||
    location.pathname.startsWith("/data-analytics") ||
    location.pathname.startsWith("/ai") ||
    location.pathname.startsWith("/ml") ||
    location.pathname.startsWith("/mobileapp") ||
    location.pathname.startsWith("/php") ||
    location.pathname.startsWith("/graphic") ||
    location.pathname.startsWith("/allcourses/") ||
    location.pathname === "/industrial-training" ||
    isAllCoursesPage;

  useEffect(() => {
    const interval = setInterval(() => {
      const path = window.location.pathname;
      if (
        !path.startsWith("/admin") &&
        !path.startsWith("/Studentform") &&
        !path.startsWith("/search")
      ) {
        setShowForm(true);
      }
    }, 200000);
    return () => clearInterval(interval);
  }, []);

  const phone = "919878564224";
  const text = "Hello! I'd like to know more.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <div className="App">
      <Suspense fallback={null}>
        <FixedForm externalOpen={emiOpen} setExternalOpen={setEmiOpen} />
        <EMIForm externalOpen={emiOpen} setExternalOpen={setEmiOpen} />
      </Suspense>
      <ScrollToTop />
      <Suspense
        fallback={
          <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            Loading...
          </div>
        }
      >
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>

      <section className={styles.toolsMain}>
        {showForm && (
          <div className={styles.formOverlay}>
            <div className={styles.formWrapper}>
              <Suspense fallback={null}>
                <Form closeForm={() => setShowForm(false)} />
              </Suspense>
            </div>
          </div>
        )}
      </section>

      {/* Floating stack — bottom right */}
      <div className={styles.floatingStack}>
        {isCourseDetailPage && (
          <button
            className={styles.emiBubble}
            onClick={() => setEmiOpen(true)}
            aria-label="EMI Available"
            title="EMI Available"
          >
            <CreditCard size={20} />
            <span>EMI</span>
          </button>
        )}
        <div
          className={styles.wtsapDiv}
          onClick={() => window.open(url, "_blank")}
          role="button"
          aria-label="Chat on WhatsApp"
          title="Any Query"
        >
          <img
            src={homeImages.whatsappIcon}
            alt="WhatsApp"
            className={styles.wtsapImg}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <PageProvider>
      <AppInner />
    </PageProvider>
  );
}

export default App;
