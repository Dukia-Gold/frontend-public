import { featuredNews } from "../../Utilities/news";
import classes from "./LandingPageAsFeaturedIn.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

const LandingPageAsFeaturedIn = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <hr />
        <h4>As featured in</h4>
        <hr />
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        spaceBetween={50}
        slidesPerView={6}
        className={classes.newsBody}
      >
        {featuredNews.map((data, i) => {
          return (
            <SwiperSlide key={i} className={classes.newsItem}>
              <div
                className={classes.imageSection}
                onClick={() => {
                  window.open(data.ctaLink);
                }}
              >
                <img src={data.logo} alt={data.headLine} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LandingPageAsFeaturedIn;
