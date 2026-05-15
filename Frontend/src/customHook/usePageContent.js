import { useState, useEffect } from "react";
import { fetchPageContent } from "../firebase/cmsFirebase";

const usePageContent = (pageKey, fallbackContent) => {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchPageContent(pageKey);
        if (data) {
          setContent(data);
        }
      } catch (error) {
        console.error(`Failed to load content for ${pageKey}`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [pageKey]);

  return { content, loading };
};

export default usePageContent;
