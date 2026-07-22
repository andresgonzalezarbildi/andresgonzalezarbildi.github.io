# Personal Portfolio

A personal hub that brings together my web projects, study tools and practical applications in one place.

**Link to project:** https://andresgonzalez.netlify.app/

![portfolio screenshot](Portfolio%20screenshot.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

I built this portfolio as a central place for projects that were previously spread across different repositories and deployments.

The content is divided into three main areas: study platforms, practical tools and personal projects. Each card includes a short description, relevant technologies and links to the live project or repository.

Instead of writing every card directly in the HTML, the project information is stored in a JavaScript configuration object. The interface reads that data and generates the sections, cards, navigation and resource counter automatically. This makes it easier to add or edit projects without changing the page structure.

I also added a search system, responsive layouts and a visual design that keeps the different types of projects separated without turning the page into a long traditional portfolio.

## Optimizations

The original version of my portfolio was a more conventional landing page and did not represent the variety of tools and applications I had built over time.

I redesigned it as a data-driven hub, separating the project content from the HTML templates. This reduced repeated markup and made future updates much simpler.

The search, category navigation and project count are all generated from the same source of data, avoiding the need to update different parts of the interface manually whenever a new project is added.

## Possible Improvements

- Move the project data into a separate JSON file.
- Add project screenshots or previews inside each card.
- Add filters by technology.
- Add a small section for recently updated projects.

## Lessons Learned:

This project helped me understand the value of separating content from presentation, even in a small static website.

It also showed me that a portfolio does not need to follow a fixed format. In my case, organizing everything as a personal application hub represents my work better than a traditional page with only a few featured projects.
