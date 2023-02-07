import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";
const Banner = ({ banner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{banner.smallText}</p>
        <h3>{banner.midText}</h3>
        <h1>{banner.largeText1}</h1>
      </div>
      <img
        src={urlFor(banner.image)}
        alt="Samsung F20"
        className="hero-banner-image"
      ></img>
      <div>
        <Link href={`/product/${banner.product}`}>
          <button type="button">{banner.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{banner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
