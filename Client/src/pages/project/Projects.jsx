import React from "react";
import NewArticles from "../../components/newArticles/NewArticles";
function Project() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Pojects</h1>
      <p className="text-md text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, and
        JavaScript!
      </p>
      <NewArticles />
    </div>
  );
}

export default Project;
