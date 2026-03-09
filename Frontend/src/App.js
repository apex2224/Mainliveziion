import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { routes } from "./routing/routing";
import styles from "./App.module.css";
import homeImages from "./assets/homeImages";
import ScrollToTop from "./routing/ScrollonTop";

const Form = lazy(() => import("./Components/form/Form"));
const FixedForm = lazy(() => import("./routing/fixedForm"));

function App() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowForm(true);
    }, 200000);
    return () => clearInterval(interval);
  }, []);

  // wtsapp icon //
  const phone = "919878564224"; // ✅ country code + number, only digits
  const text = "Hello! I’d like to know more.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  // useEffect(() => {
  //   const handleLoad = () => setLoading(false);

  //   // If page already loaded, hide loader immediately
  //   if (document.readyState === "complete") {
  //     handleLoad();
  //   } else {
  //     window.addEventListener("load", handleLoad);
  //     return () => window.removeEventListener("load", handleLoad);
  //   }
  // }, []);

  return (
    <>
      {/* {loading ? <Loading /> : <Main />} */}

      <div className="App">
        <Suspense fallback={null}>
          <FixedForm />
        </Suspense>
        <ScrollToTop />
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
          {/* ✅ Use your existing Form component as popup */}
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
    </>
  );
}

export default App;
