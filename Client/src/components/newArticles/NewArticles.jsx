import React from "react";
import { Button } from "flowbite-react";

function NewArticles() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 JavaScript Interview Questions
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none">
          <a href="#">100 JavaScript Questions</a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          style={{ border: ".1px solid black", borderRadius: "20px" }}
          src="https://thumbs.dreamstime.com/b/content-writer-blog-articles-creation-concept-people-characters-freelance-work-business-marketing-vector-content-writer-159151388.jpg"
        />
      </div>
    </div>
  );
}

export default NewArticles;
