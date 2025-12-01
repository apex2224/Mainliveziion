import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Webdesigning from './webdesigning/Webdesigning';
import DigitalMarketing from './digitalMarketing/DigitalMarketing';
import DataScience from './dataScience/DataScience';
import ArtificialIntelligence from './AI/AI';
import MachineLearning from './ML/ML';
import WebDevelopment from './webDevelopment/WebDevelopment';
import DataAnalytics from './DataAnalytics/DataAnalytics';
import MobileAppDevelopment from './Mobileapp/MobileApp';
import PHP from './PHP/Php';
import GraphicDesigning from './graphic/Graphic';
import CloudComputing from './CloudComputing/CC';
import Devops from './DevOps/Devops';
import Inprogress from '../inprogress/Inprogress';

const CourseDetail = () => {
  const { courseRoute } = useParams();

  const normalizedTitle = courseRoute?.toLowerCase();

  const courseComponents = {
    'web-designing': <Webdesigning />,
    'web-development': <WebDevelopment />,
    'digital-marketing': <DigitalMarketing />,
    'data-science': <DataScience />,
    'data-analytics': <DataAnalytics />,
    'ai': <ArtificialIntelligence />,
    'ml': <MachineLearning />,
    'mobileapp': <MobileAppDevelopment />,
    'php': <PHP />,
    'graphic': <GraphicDesigning />,
    'devops': <Devops />,
    'cloud-computing': <CloudComputing />
  };

  // Update document title
  useEffect(() => {
    const titleMap = {
      'web-designing': 'Web Designing',
      'web-development': 'Web Development',
      'digital-marketing': 'Digital Marketing',
      'data-science': 'Data Science',
      'data-analytics': 'Data Analytics',
      'ai': 'Artificial Intelligence',
      'ml': 'Machine Learning',
      'mobileapp': 'Mobile App Development',
      'php': 'PHP',
      'graphic': 'Graphic Designing',
      'devops': 'DevOps',
      'cloud-computing': 'Cloud Computing'
    };

    const pageTitle = titleMap[normalizedTitle] || 'Course Not Found';
    document.title = `${pageTitle} | Ziion Technology`;
  }, [normalizedTitle]);

  return courseComponents[normalizedTitle] || <div>Course Not Found</div>;
};

export default CourseDetail;
