import React, { useContext } from "react";
import { DataProviding } from "./App";
const Blogs = () => {
  const data = useContext(DataProviding);
  console.log(data);
  return (
    <section id="Blogs">
      <div className="wrapper">
        {data?.map?.((item, index) => (
          <div id="Container" key={`Blog ${index}`}>
            <img src={item.Image} key={`Blog_item_image${index}`} />
            <p key={`blog_Tags${index}`}>{item.Tags}</p>
            <h1 key={`blog_title${index}`}>{item.Title}</h1>
            <h2 key={`blog_content${index}`}>{item.Des}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
