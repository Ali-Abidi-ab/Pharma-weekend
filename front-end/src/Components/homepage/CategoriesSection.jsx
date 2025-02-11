import React from "react";

import CategorieCard from "../cards/CategorieCard";
import ProductCard from "../cards/ProductCard";
import { categories, products } from "../../data/data";
import PopularCard from "../cards/PopularCard";
import { useNavigate } from "react-router-dom";

function CategoriesSection() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("/products");
  }
  return (
    <div className="bg-white flex flex-col items-center h-full">
      <div className="p-10 flex flex-col items-center">
        <div className="font-mina_bold text-3xl">Featured Categories</div>
        <div className="text-center">
          Explore our curated collection of featured categories, each tailored
          to meet your specific health needs.
        </div>
      </div>
      <div className="flex flex-wrap gap-6 items-center justify-center p-7">
        {categories.map((category, index) => {
          return <CategorieCard key={index} category={category}/>;
        })}
      </div>
      <div className="p-10 flex flex-col items-center">
        <div className="font-mina_bold text-3xl">Popular Products</div>
        <div className="text-center">
          Discover our Popular Products – a curated selection of frequently
          sought-after medicaments that have earned the trust of our community.
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-5 justify-center items-center">
        <PopularCard text={"Most Popular Products"} button={"Show More +"} handleClick={navigateToProducts}/>
        {products.map((product, index) => {
          if (index <=1) {
            return <ProductCard key={index} product={product} isVertical={true}/>;
          }
          return null;
        })}
      </div>
      <div className="p-10"></div>
    </div>
  );
}

export default CategoriesSection;
