import { Helmet } from "react-helmet-async";

const useCustom = (title, description, canonical) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default useCustom;
