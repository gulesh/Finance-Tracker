import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
import AccountInfo from "./AccountInfo";

const SliderComponent = (props) => {
    console.log(props.accounts)
    const setting = {
        infinite: true,
        dots: true,
        slidesToShow : 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000
    };

  return (
    <>
      <Slider {...setting}>
        {props.accounts.map((account) => (
          <AccountInfo
            key={account.id}
            accountName={account.name}
            balance={account.amount}
            isDebt={account.debt}
            accountObject={account}
          />
        ))}
      </Slider>
    </>
  );
};

export default SliderComponent;
