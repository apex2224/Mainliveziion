import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const PageContext = createContext("Unknown Page");

export const PageProvider = ({ children }) => {
  const location = useLocation();

  const getPageName = (pathname) => {
    if (!pathname || pathname === "/") return "Home Page";
    return pathname
      .split("/")
      .filter(Boolean)
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <PageContext.Provider value={getPageName(location.pathname)}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageSource = () => useContext(PageContext);
