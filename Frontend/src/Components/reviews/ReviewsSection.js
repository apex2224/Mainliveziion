import React from 'react'
import styles from './ReviewsSection.module.css'

export const reviewsData = [
  {
    title: "Exceptional Experience",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I am currently enrolled in the Full Stack Web Development course, and my experience has been exceptional. The instructors are highly skilled and ensure that concepts are explained thoroughly with real-world examples.",
    img: "https://picsum.photos/40/40?random=1",
    name: "Mandeep Singh",
  },
  {
    title: "Clear and Practical Teaching",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I really appreciate our trainer’s teaching style in the full-stack development course. They explain things clearly and use practical examples that make learning easier and more interesting.",
    img: "https://picsum.photos/40/40?random=2",
    name: "Vatsal",
  },
  {
    title: "Comprehensive Machine Learning Training",
    rating: "⭐️⭐️⭐️⭐️",
    text: "I had the privilege of undergoing a comprehensive six-week training program at Ziion Technology focused on machine learning. I really appreciate our trainer's teaching style - they explain things clearly.",
    img: "https://picsum.photos/40/40?random=3",
    name: "Manpreet Kaur",
  },
  {
    title: "Great Front-End Development Course",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I recently completed a 6-week online training program in Front-End Development with React JS from Ziion Technology Co. The course was well-organized, and the instructors were knowledgeable and supportive.",
    img: "https://picsum.photos/40/40?random=4",
    name: "Sajan Malhotra",
  },
  {
    title: "Fantastic AI Training",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Just finished my AI training with Ziion Technology and it was fantastic. The instructors were knowledgeable and helpful, and the course material was well-organized. Loved the hands-on projects too.",
    img: "https://picsum.photos/40/40?random=5",
    name: "Jashanpreet Singh",
  },
  {
    title: "Amazing Python Training",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I just finished my Python training from Ziion Technology, the overall experience was amazing. I learnt a lot of new things during my training which will surely help me in future.",
    img: "https://picsum.photos/40/40?random=6",
    name: "Nishant Gautam",
  },
  {
    title: "Boosted My Web Dev Skills",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I recently completed a 45-day training in web technology at Ziion Technology. The program was comprehensive, the instructors were knowledgeable, and the hands-on experience greatly enhanced my skills.",
    img: "https://picsum.photos/40/40?random=7",
    name: "UNIQUE SARFAROJ",
  },
  {
    title: "Stellar Coding Experience",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Absolutely stellar experience with Ziion Technology! Their teaching approach is top-notch, making complex concepts easy to grasp. The instructors are incredibly knowledgeable and supportive.",
    img: "https://picsum.photos/40/40?random=8",
    name: "Danial Verma",
  },
  {
    title: "Exciting Learning Experience",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "The learning experience at Ziion technology was very exciting and fun. They are dedicated to enhancing the technical skills and practical knowledge of the students.",
    img: "https://picsum.photos/40/40?random=9",
    name: "Aman Kumar (Negi)",
  },
  {
    title: "Excellent Frontend Training",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I finished frontend web development training from here. My overall experience is excellent. Trainers are well experienced and guided me for my future and career.",
    img: "https://picsum.photos/40/40?random=10",
    name: "Suman",
  },
  {
    title: "Top-Notch AI & ML Course",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "The Artificial Intelligence & Machine Learning course is top-notch. The instructors are experts in their field and the practical exercises really enhanced my understanding.",
    img: "https://picsum.photos/40/40?random=11",
    name: "Anmol",
  },
  {
    title: "Great Web Designing Training",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I was a bit nervous about joining a Full Stack Development in Web Designing course, but the trainer here is amazing. They made everything easy to understand.",
    img: "https://picsum.photos/40/40?random=12",
    name: "VISHAL SINGH",
  },
  {
    title: "Well-Structured Curriculum",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I've been attending coding classes at ZIION TECHNOLOGIES. The instructors are helpful, and the curriculum is well-structured. I appreciate the hands-on projects.",
    img: "https://picsum.photos/40/40?random=13",
    name: "Anuj 29",
  },
  {
    title: "Best Summer Training",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Best place for summer trainings. Trainers explained everything very well. Overall my experience is great.",
    img: "https://picsum.photos/40/40?random=14",
    name: "Harshdeep Kaur",
  },
  {
    title: "Real-World Web Dev Projects",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I got an opportunity to learn Web Development from Ziion Technology. In the 6-week period, I got to build up my skills by working on real-world projects.",
    img: "https://picsum.photos/40/40?random=15",
    name: "1216_JASHANPREET SINGH",
  },
  {
    title: "Game-Changing Web Design",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Attending classes at this IT training company was a game-changer for me, especially in web designing training in Mohali. The instructors are passionate about sharing their knowledge.",
    img: "https://picsum.photos/40/40?random=16",
    name: "7084 SAHIL RAWAT",
  },
  {
    title: "Cutting-Edge Tools Training",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Training with Ziion Technology was exceptional, providing hands-on experience with cutting-edge tools. The comprehensive curriculum significantly enhanced my skills.",
    img: "https://picsum.photos/40/40?random=17",
    name: "Sejal Mehnay",
  },
  {
    title: "Patient Python Instruction",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I took a Python course here and it was a great experience with ZIION Technology! My trainer was very patient and explained things well.",
    img: "https://picsum.photos/40/40?random=18",
    name: "Rudra Rathi",
  },
  {
    title: "Confident in Python Skills",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I'm so happy I chose this company, especially for Python training in Mohali. The instructors are friendly, and I feel confident in my skills now.",
    img: "https://picsum.photos/40/40?random=19",
    name: "Rahul Khurana",
  },
  {
    title: "Motivating Internship",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I really enjoyed my internship from here. The staff is friendly and gives motivation. I studied very well.",
    img: "https://picsum.photos/40/40?random=20",
    name: "Tushar",
  },
  {
    title: "Great Web Dev Journey",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "It was a very great experience to start my Web dev journey with Ziion Tech. I learnt a lot and gained some great skills.",
    img: "https://picsum.photos/40/40?random=21",
    name: "Aalamjot Singh",
  },
  {
    title: "Supportive Web Dev Learning",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Learning with Ziion Technology has been a great journey to unlock new potential in Web Development. Everyone is quite supportive.",
    img: "https://picsum.photos/40/40?random=22",
    name: "Prabhnoor singh",
  },
  {
    title: "Full Stack Mastery",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "A really good experience... I learned a lot about Full Stack web development in these 6 weeks!",
    img: "https://picsum.photos/40/40?random=23",
    name: "Manav Sharma",
  },
  {
    title: "Responsive Faculty",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Very nice faculties. Sir was very responsive and calm. He always gave time to understand the logic.",
    img: "https://picsum.photos/40/40?random=24",
    name: "Tushar Dhaka",
  },
  {
    title: "Best Learning Center",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "Ziion Technology is the best center for getting knowledge and teachers are very good in behavior and teaching.",
    img: "https://picsum.photos/40/40?random=25",
    name: "Krishan Kant",
  },
  {
    title: "Cooperative Experience",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "It was very nice working here. Mam here is very cooperating and helpful. Overall an amazing experience.",
    img: "https://picsum.photos/40/40?random=26",
    name: "Runveer Singh",
  },
  {
    title: "HR Internship Excellence",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I had a great internship experience in the HR department at Ziion Technology. Highly recommended!",
    img: "https://picsum.photos/40/40?random=27",
    name: "Supriya Chouhan",
  },
  {
    title: "Best Learning Experience",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "The internship program gave me real industry exposure and helped me build confidence in my skills.",
    img: "https://picsum.photos/40/40?random=28",
    name: "Rahul Mehta",
  },
  {
    title: "Supportive Team Environment",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "The team at Ziion Technology was very supportive and always encouraged me to learn and grow.",
    img: "https://picsum.photos/40/40?random=29",
    name: "Priya Sharma",
  },
  {
    title: "Practical Knowledge Gained",
    rating: "⭐️⭐️⭐️⭐️⭐️",
    text: "I gained a lot of practical knowledge during my internship which will definitely help in my career.",
    img: "https://picsum.photos/40/40?random=30",
    name: "Amit Verma",
  }
];

const ReviewsSection = () => {
  return (
    <>
      <div className={styles.reviewsContainer}>
        <h1 className={styles.heading}>Our Student Testimonials</h1>

        <ul className={styles.reviewsList}>
          {reviewsData.map((review, index) => (
            <li className={styles.reviewCard} key={index}>
              <h4 className={styles.reviewHeader}>
                <span className={styles.reviewTitle}>{review.title}</span>
                <span className={styles.reviewRating}>{review.rating}</span>
              </h4>
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.writerContainer}>
                <img
                  src={review.img}
                  alt={review.name}
                  className={styles.userImg}
                />
                <p className={styles.writerName}>{review.name}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.moreReviews}>
          <a
            href="https://www.google.com/search?q=ziion+technology#lrd=0x390fef7b48418d6b:0x8b24ec380ed85440,1"
            className={styles.readMoreBtn}
            target="_blank"
            rel="noreferrer"
          >
            Read More Reviews
          </a>
        </div>
      </div>
    </>
  )
}
export default ReviewsSection;