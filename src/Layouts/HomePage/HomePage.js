import React from "react";

import PropTypes from "prop-types";

import { faker } from "@faker-js/faker";

function HomePage() {
  return (
    <main className="min-h-screen max-w-prose mx-auto bg-emerald-50 my-4 rounded">
      <section className="p-4">
        <h1 className="my-3 text-2xl">{faker.lorem.words(5)}</h1>
        <p className="my-2">{faker.lorem.paragraph()}</p>
        <p className="my-2">{faker.lorem.paragraph()}</p>
        <p className="my-2">{faker.lorem.paragraph()}</p>
        <p className="my-2">{faker.lorem.paragraph()}</p>
        <p className="my-2">{faker.lorem.paragraph()}</p>
      </section>
    </main>
  );
}

HomePage.propTypes = {};

export default HomePage;
