// this file is not meant to be run like a "function" -- it's just in this repo so I can use mongodb without installing it elsewhere.

const { ObjectId } = require('mongodb');
const mongoClient = require("mongodb").MongoClient;


// fill this in if you wanna run the thing!
mongodb_connection_string = "";

raw_data = [{ "name": "reactjs", "author": "nor386 on quizlet", "kluvernote": "public data used without permission for educational purposes (sorry!)", "cards": [{ "front": "Component", "back": "A piece of the UI with its own logic and appearance, which can range in size from a button to an entire page\u200b\u200b." }, { "front": "JSX", "back": "A markup syntax used in most React projects for its convenience, stricter than HTML, requiring closed tags and wrapped multiple tags\u200b\u200b." }, { "front": "className", "back": "The attribute used in React to specify a CSS class, functioning similarly to the class attribute in HTML\u200b\u200b." }, { "front": "Event Handlers", "back": "Functions triggered in response to user interactions like clicking, hovering, focusing on form inputs, etc., in React apps\u200b\u200b." }, { "front": "State", "back": "Component-specific memory in React, allowing components to \"remember\" things like the current input value or the current image\u200b\u200b." }, { "front": "useState", "back": "A Hook in React that lets you declare a state variable, providing a pair of values: the current state and a state setter function\u200b\u200b." }, { "front": "Local Variables", "back": "Variables that don't persist between renders in React, and their changes don't trigger renders\u200b\u200b." }, { "front": "Lifting State Up", "back": "A common React pattern where the state of two components is managed by their closest common parent and passed down via props\u200b\u200b." }, { "front": "isActive", "back": "A boolean state in React components that determines whether its content is visible or not\u200b\u200b." }, { "front": "Context", "back": "A feature in React that allows a parent component to provide data to the entire tree below it without passing it through props\u200b\u200b." }, { "front": "Prop Drilling", "back": "A situation in React where props are passed through many components, often leading to verbose and inconvenient code\u200b\u200b." }, { "front": "Reducer", "back": "A function in React used to consolidate state update logic outside of a component, especially useful for components with many state updates\u200b\u200b." }, { "front": "useReducer", "back": "A Hook in React used for managing state logic in a single function, offering an alternative to useState for complex state logic\u200b\u200b." }, { "front": "TaskApp", "back": "An example React component that holds an array of tasks in state and uses event handlers to add, remove, and edit tasks\u200b\u200b." }, { "front": "Props", "back": "The mechanism for passing data from a parent to a child component in React." }, { "front": "Hooks", "back": "Special functions in React that allow functional components to use state and other React features." }, { "front": "Functional Components", "back": "A simpler way to write components as functions in React, which can use state and other React features via hooks." }, { "front": "Class Components", "back": "More traditional React components defined as ES6 classes, often including methods for lifecycle events and rendering." }, { "front": "Lifecycle Methods", "back": "Functions in class components in React that get called at specific points in a component's life, such as mounting, updating, and unmounting." }, { "front": "Virtual DOM", "back": "An in-memory representation of the real DOM in React, which optimizes updates and re-rendering of the UI." }, { "front": "Keys", "back": "Special attribute used in React lists to help identify which items have changed, been added, or been removed." }, { "front": "Fragment", "back": "A React component that allows you to return multiple elements in a render method without creating an additional DOM element." }, { "front": "PropTypes", "back": "A library in React for type-checking the props a component receives." }, { "front": "Higher-Order Components", "back": "A technique in React for reusing component logic by transforming components into other components." }, { "front": "Render Props", "back": "A technique in React where a prop is a function that returns a React element, allowing for more dynamic and reusable components." }, { "front": "React Router", "back": "A library for routing in React applications, enabling navigation between different components." }, { "front": "Redux", "back": "A popular state management library often used with React to manage the state of an entire application." }, { "front": "Context API", "back": "A React API that allows for the creation of a global state that can be passed around components without prop drilling." }, { "front": "Memoization", "back": "A React optimization technique to prevent unnecessary re-rendering by caching output of expensive function calls." }, { "front": "Suspense", "back": "A React feature for handling asynchronous operations in rendering, allowing components to wait for something before rendering." }] }, { "name": "Flask", "author": "Masynthetic on quizlet", "kluvernote": "public data used without permission for educational purposes (sorry!)", "cards": [{ "front": "What file do the apps CSS, javascript, and images go in?", "back": "Static" }, { "front": "What file does the HTML go in?", "back": "Templates" }, { "front": "What file does routes.py go in?", "back": "The main project folder" }, { "front": "Explain the process of the request-response cycle", "back": "1.) User issues a request to routes.py\n2.) Routes.py finds the correct HTML file and python functions in the templates folder\n3.) The HTML fetches the CSS, JS, and images it needs from the static folder\n4.) Rendered HTML is returned to the user" }, { "front": "The home page of your app should be named", "back": "index.html" }, { "front": "What are web templates for?", "back": "They allow you to edit the HTML on multiple pages all at once" }, { "front": "What should the HTML template that each page shares be called?", "back": "layout.html" }, { "front": "If using templates makes web pages the same, how can you make them differentiate slightly?", "back": "Child pages inherit the HTML from a base template but can then be edited further independently" }, { "front": "What do you put in your HTML of a base template where you want a child template to be able to add/change something", "back": "{% block content%}\n{% end block %}" }, { "front": "What does this do?\n\n{% extends \"layout.html\" %}", "back": "Tells flask that this template inherits from layout.html" }, { "front": "What should your import show?", "back": "from flask import Flask, render_template" }, { "front": "Create a new usable instance of flask and save as \"app\"", "back": "app = flask(__name__)" }, { "front": "What does this do?\napp.route(\"/\")", "back": "It is the opening line of the function that will tell flask what to do when the user visits the url \"/\"" }, { "front": "Write the code that will tell flask to render the template index.html when the user visits the url \"/\"", "back": "app.route(\"/\")\ndef index():\n render_template(\"index.html\")" }, { "front": "What should the last couple of lines in your routes.py file be?", "back": "if __name__ == \"__main__\":\n app.run(debug=True)" }, { "front": "What do you use under the href attribute for the css file? why?", "back": "{{ url_for(\"static\", filename=\"css/main.css\") }}\n\nthis tells flask to generate the url that points to the css file named" }, { "front": "HTML content on a page that inherits HTML from another must go in between:", "back": "{% block content %}\n\n{% end block %}" }, { "front": "What file interacts with the database?", "back": "models.py" }, { "front": "Show the code needed to input a variable \"foo\" into an HTML template, in both the python and HTML files", "back": "HTML:\n{{ foo }}\n\nPython: (inside of app.route) \ntemplateData = {\n'variable' : 'value'}\nreturn render_template('main.html', **templateData)" }, { "front": "How does a button talk to the flask file", "back": "the href can pass variables to flask using the url" }] }, { "name": "HTML CSS", "author": "njitu on quizlet", "kluvernote": "public data used without permission for educational purposes (sorry!)", "cards": [{ "front": "Identify this element <p></p>.", "back": "Paragraph Element" }, { "front": "Name five of the nine block elements of HTML5.", "back": "header, main, footer, nav, section, article, aside, figure, figcaption" }, { "front": "This HTML5 element is used to structure a quote.", "back": "The Blockquote Element" }, { "front": "What will this CSS code produce, body {background-color: \"red\";}?", "back": "It will make the background color of the body the color red." }, { "front": "Name four valid non-css values for the Image Element <img>.", "back": "src, height, width, alt" }, { "front": "This image type is best used for photographs.", "back": "JPG, JPEG" }, { "front": "What is the order of cascade for styling a webpage?", "back": "Browser default, external style sheet, embedded style sheet (internal), and inline styles." }, { "front": "This element will allow a user to type in comments, blog entries, support questions, etc.", "back": "The textarea element." }, { "front": "CSS is the acronym for what?", "back": "Cascading Style Sheets" }, { "front": "HTML is the acronym for what?", "back": "HyperText Markup Language" }, { "front": "HTTP is the acronym for what?", "back": "HyperText Transfer Protocol" }, { "front": "What three values are valid to determine the shape of an image map?", "back": "rect, circle, poly" }, { "front": "Name the seven elements that are required for a valid HTML5 webpage.", "back": "doctype, head, body, header, nav, main, footer." }, { "front": "A smaller image is used to link to a larger image.", "back": "Thumbnail" }, { "front": "This symbol precedes the characters needed to code special characters.", "back": "Ampersand &" }, { "front": "This symbol is used to style an individual element.", "back": "Hashtag #" }, { "front": "This symbol is used to style multiple elements of the same type.", "back": "Period ." }, { "front": "This punctuation mark ends all declaration statements.", "back": "Semi-colon ;" }, { "front": "The set of grouping symbols used for declaration statements.", "back": "Braces { }" }, { "front": "Name the three objects of a CSS declaration statement.", "back": "Selector, declaration property, declaration value" }, { "front": "Name the element that uses the \"method=\" attribute.", "back": "The Form Element" }, { "front": "This object takes several smaller images and combines them into a single large image.", "back": "Sprites" }, { "front": "This is the term used to link webpages.", "back": "Hyperlink" }, { "front": "This element is used to anchor down hyperlinks.", "back": "Anchor Element <a></a>" }, { "front": "This CSS selector is used to identify an element nested in another element.", "back": "Descendant Selector" }, { "front": "This is the term DOM.", "back": "Document Object Model" }, { "front": "This symbol is used to shorten the jQuery element name.", "back": "Dollar Sign - $" }, { "front": "This method causes a warning window to appear", "back": "alert()" }] }]
// // scroll past this. I definitely stole it from quizlet, which I'm sorry about but the needs of teaching are unkind.
raw_recipe_data = [
    {
        "userId": null,
        "name": "Spaghetti Carbonara",
        "steps": [
            "Cook spaghetti in salted boiling water until al dente.",
            "Fry pancetta in oil until crispy.",
            "Whisk eggs and Parmesan in a bowl, then combine with pasta.",
            "Add pancetta, mix well, and season with black pepper."
        ],
        "pictureUrl": "http://example.com/recipe_1.jpg",
        "ingredients": [
            { "item": "Spaghetti", "quantity": "200g" },
            { "item": "Pancetta", "quantity": "100g" },
            { "item": "Eggs", "quantity": "2" },
            { "item": "Parmesan cheese", "quantity": "50g" }
        ],
        "tag": ["Dinner"]
    },
    {
        "userId": null,
        "name": "Chicken Caesar Salad",
        "steps": [
            "Grill chicken breasts until cooked.",
            "Chop romaine lettuce and mix with croutons and Caesar dressing.",
            "Slice chicken and add to the salad.",
            "Sprinkle with Parmesan cheese and serve."
        ],
        "pictureUrl": "http://example.com/recipe_2.jpg",
        "ingredients": [
            { "item": "Chicken breast", "quantity": "2" },
            { "item": "Romaine lettuce", "quantity": "1 head" },
            { "item": "Croutons", "quantity": "1 cup" },
            { "item": "Caesar dressing", "quantity": "100ml" },
            { "item": "Parmesan cheese", "quantity": "30g" }
        ],
        "tag": ["Lunch"]
    },
    {
        "userId": null,
        "name": "Beef Stir Fry",
        "steps": [
            "Slice beef into thin strips.",
            "Stir fry beef in a hot pan with oil until browned.",
            "Add sliced bell peppers and onions, cook until vegetables are tender.",
            "Season with soy sauce and serve over rice."
        ],
        "pictureUrl": "http://example.com/recipe_3.jpg",
        "ingredients": [
            { "item": "Beef", "quantity": "200g" },
            { "item": "Bell peppers", "quantity": "2" },
            { "item": "Onion", "quantity": "1" },
            { "item": "Soy sauce", "quantity": "2 tbsp" },
            { "item": "Rice", "quantity": "200g" }
        ],
        "tag": ["Dinner", "Fast Food"]
    },
    {
        "userId": null,
        "name": "Mushroom Risotto",
        "steps": [
            "Cook diced onions in butter until soft.",
            "Add risotto rice and cook until translucent.",
            "Gradually add chicken broth, stirring constantly until rice is creamy.",
            "Stir in sliced mushrooms and Parmesan cheese, and serve."
        ],
        "pictureUrl": "http://example.com/recipe_4.jpg",
        "ingredients": [
            { "item": "Onion", "quantity": "1" },
            { "item": "Butter", "quantity": "2 tbsp" },
            { "item": "Risotto rice", "quantity": "200g" },
            { "item": "Chicken broth", "quantity": "600ml" },
            { "item": "Mushrooms", "quantity": "150g" },
            { "item": "Parmesan cheese", "quantity": "50g" }
        ],
        "tag": ["Dinner", "Dessert"]
    },
    {
        "userId": null,
        "name": "Tomato Basil Soup",
        "steps": [
            "Sauté chopped onions and garlic in olive oil until translucent.",
            "Add chopped tomatoes and vegetable broth, bring to boil.",
            "Simmer for 20 minutes, then blend until smooth.",
            "Stir in chopped basil and season with salt and pepper."
        ],
        "pictureUrl": "http://example.com/recipe_5.jpg",
        "ingredients": [
            { "item": "Onion", "quantity": "1" },
            { "item": "Garlic", "quantity": "2 cloves" },
            { "item": "Olive oil", "quantity": "2 tbsp" },
            { "item": "Tomatoes", "quantity": "500g" },
            { "item": "Vegetable broth", "quantity": "500ml" },
            { "item": "Basil", "quantity": "20g" }
        ],
        "tag": ["Lunch", "Dessert"]
    },
    {
        "userId": null,
        "name": "Pancakes",
        "steps": [
            "Mix flour, sugar, baking powder, and salt in a bowl.",
            "In another bowl, beat eggs with milk and melted butter.",
            "Combine the wet and dry ingredients until smooth batter forms.",
            "Pour batter onto hot griddle and cook until bubbles form, then flip to cook other side."
        ],
        "pictureUrl": "http://example.com/recipe_6.jpg",
        "ingredients": [
            { "item": "Flour", "quantity": "200g" },
            { "item": "Sugar", "quantity": "50g" },
            { "item": "Baking powder", "quantity": "1 tsp" },
            { "item": "Salt", "quantity": "1/2 tsp" },
            { "item": "Eggs", "quantity": "2" },
            { "item": "Milk", "quantity": "300ml" },
            { "item": "Butter", "quantity": "50g melted" }
        ],
        "tag": ["Breakfast"]
    },
    {
        "userId": null,
        "name": "Grilled Cheese Sandwich",
        "steps": [
            "Butter one side of each bread slice.",
            "Place cheese between bread slices, buttered sides out.",
            "Grill on skillet until golden brown and cheese is melted.",
            "Cut in half and serve hot."
        ],
        "pictureUrl": "http://example.com/recipe_7.jpg",
        "ingredients": [
            { "item": "Bread slices", "quantity": "2" },
            { "item": "Butter", "quantity": "2 tbsp" },
            { "item": "Cheese", "quantity": "2 slices" }
        ],
        "tag": ["Lunch", "Fast Food"]
    },
    {
        "userId": null,
        "name": "Vegetable Stir Fry",
        "steps": [
            "Heat oil in a pan and fry tofu until golden brown, set aside.",
            "In the same pan, add chopped vegetables and stir fry quickly.",
            "Add soy sauce, sugar, and water, and bring to a simmer.",
            "Return tofu to the pan, mix well, and serve hot with rice."
        ],
        "pictureUrl": "http://example.com/recipe_8.jpg",
        "ingredients": [
            { "item": "Tofu", "quantity": "200g" },
            { "item": "Mixed vegetables", "quantity": "300g" },
            { "item": "Soy sauce", "quantity": "2 tbsp" },
            { "item": "Sugar", "quantity": "1 tsp" },
            { "item": "Water", "quantity": "50ml" },
            { "item": "Rice", "quantity": "200g" }
        ],
        "tag": ["Dinner", "Fast Food"]
    },
    {
        "userId": null,
        "name": "Fish Tacos",
        "steps": [
            "Season fish fillets and grill until cooked through.",
            "Warm tortillas on a skillet and set aside.",
            "Prepare toppings: slice cabbage, chop cilantro, and cut lime into wedges.",
            "Assemble tacos by placing fish on tortillas, add toppings, and drizzle with sauce."
        ],
        "pictureUrl": "http://example.com/recipe_9.jpg",
        "ingredients": [
            { "item": "Fish fillets", "quantity": "200g" },
            { "item": "Tortillas", "quantity": "4" },
            { "item": "Cabbage", "quantity": "100g" },
            { "item": "Cilantro", "quantity": "30g" },
            { "item": "Lime", "quantity": "1" }
        ],
        "tag": ["Lunch", "Fast Food"]
    },
    {
        "userId": null,
        "name": "Lemon Chicken",
        "steps": [
            "Marinate chicken breasts in lemon juice, olive oil, and herbs.",
            "Pan-fry chicken until golden and cooked through.",
            "In the same pan, add a splash of chicken broth to deglaze, then pour over chicken.",
            "Serve with steamed vegetables."
        ],
        "pictureUrl": "http://example.com/recipe_10.jpg",
        "ingredients": [
            { "item": "Chicken breasts", "quantity": "2" },
            { "item": "Lemon juice", "quantity": "50ml" },
            { "item": "Olive oil", "quantity": "2 tbsp" },
            { "item": "Herbs", "quantity": "1 tbsp" },
            { "item": "Chicken broth", "quantity": "100ml" }
        ],
        "tag": ["Dinner"]
    },
    {
        "userId": null,
        "name": "Chili Con Carne",
        "steps": [
            "Brown minced beef in a pot, then drain excess fat.",
            "Add chopped onions, garlic, and cook until soft.",
            "Stir in chili powder, cumin, and canned tomatoes and simmer.",
            "Add kidney beans and cook until heated through.",
            "Serve hot with rice or bread."
        ],
        "pictureUrl": "http://example.com/recipe_11.jpg",
        "ingredients": [
            { "item": "Minced beef", "quantity": "500g" },
            { "item": "Onions", "quantity": "2" },
            { "item": "Garlic", "quantity": "2 cloves" },
            { "item": "Chili powder", "quantity": "2 tsp" },
            { "item": "Cumin", "quantity": "1 tsp" },
            { "item": "Canned tomatoes", "quantity": "400g" },
            { "item": "Kidney beans", "quantity": "400g" }
        ],
        "tag": ["Dinner"]
    },
    {
        "userId": null,
        "name": "Vegan Curry",
        "steps": [
            "Sauté onions and garlic in coconut oil until translucent.",
            "Add curry powder, stir for a minute then add chopped vegetables and chickpeas.",
            "Pour in coconut milk and simmer until vegetables are tender.",
            "Serve hot with basmati rice."
        ],
        "pictureUrl": "http://example.com/recipe_12.jpg",
        "ingredients": [
            { "item": "Onions", "quantity": "1" },
            { "item": "Garlic", "quantity": "2 cloves" },
            { "item": "Coconut oil", "quantity": "2 tbsp" },
            { "item": "Curry powder", "quantity": "2 tbsp" },
            { "item": "Vegetables", "quantity": "300g" },
            { "item": "Chickpeas", "quantity": "200g" },
            { "item": "Coconut milk", "quantity": "400ml" }
        ],
        "tag": ["Dinner", "Vegan"]
    },
    {
        "userId": null,
        "name": "Apple Pie",
        "steps": [
            "Prepare pie crust and line a pie dish.",
            "Mix sliced apples with sugar, cinnamon, and flour.",
            "Fill the crust with apple mixture and cover with a lattice crust.",
            "Bake until the crust is golden and apples are tender."
        ],
        "pictureUrl": "http://example.com/recipe_13.jpg",
        "ingredients": [
            { "item": "Pie crust", "quantity": "1" },
            { "item": "Apples", "quantity": "5" },
            { "item": "Sugar", "quantity": "150g" },
            { "item": "Cinnamon", "quantity": "1 tsp" },
            { "item": "Flour", "quantity": "2 tbsp" }
        ],
        "tag": ["Dessert"]
    },
    {
        "userId": null,
        "name": "Banana Bread",
        "steps": [
            "Preheat oven to 175°C and grease a loaf pan.",
            "Mash ripe bananas, then mix with melted butter.",
            "Mix in baking soda, salt, sugar, beaten egg, and vanilla extract.",
            "Add flour and mix until smooth, then pour into the prepared pan.",
            "Bake for 50 minutes or until a tester comes out clean."
        ],
        "pictureUrl": "http://example.com/recipe_14.jpg",
        "ingredients": [
            { "item": "Bananas", "quantity": "3" },
            { "item": "Butter", "quantity": "75g melted" },
            { "item": "Baking soda", "quantity": "1 tsp" },
            { "item": "Salt", "quantity": "1/4 tsp" },
            { "item": "Sugar", "quantity": "150g" },
            { "item": "Egg", "quantity": "1" },
            { "item": "Vanilla extract", "quantity": "1 tsp" },
            { "item": "Flour", "quantity": "190g" }
        ],
        "tag": ["Dessert"]
    },
    {
        "userId": null,
        "name": "Caesar Salad",
        "steps": [
            "In a bowl, combine chopped romaine lettuce, croutons, and shaved Parmesan.",
            "Whisk together lemon juice, olive oil, crushed garlic, Worcestershire sauce, and Dijon mustard.",
            "Drizzle the dressing over the salad and toss to coat evenly.",
            "Season with salt and pepper, and serve immediately."
        ],
        "pictureUrl": "http://example.com/recipe_15.jpg",
        "ingredients": [
            { "item": "Romaine lettuce", "quantity": "1 head" },
            { "item": "Croutons", "quantity": "1 cup" },
            { "item": "Parmesan cheese", "quantity": "50g" },
            { "item": "Lemon juice", "quantity": "2 tbsp" },
            { "item": "Olive oil", "quantity": "3 tbsp" },
            { "item": "Garlic", "quantity": "1 clove" },
            { "item": "Worcestershire sauce", "quantity": "1 tsp" },
            { "item": "Dijon mustard", "quantity": "1 tsp" }
        ],
        "tag": ["Lunch", "Dessert"]
    },
    {
        "userId": null,
        "name": "Pumpkin Soup",
        "steps": [
            "Heat oil in a large pot and sauté chopped onions until translucent.",
            "Add peeled and chopped pumpkin to the pot and cook for a few minutes.",
            "Pour in vegetable stock and bring to a boil, then simmer until pumpkin is soft.",
            "Blend the soup until smooth, season with salt and pepper, and serve hot."
        ],
        "pictureUrl": "http://example.com/recipe_16.jpg",
        "ingredients": [
            { "item": "Oil", "quantity": "2 tbsp" },
            { "item": "Onions", "quantity": "1" },
            { "item": "Pumpkin", "quantity": "1kg" },
            { "item": "Vegetable stock", "quantity": "1 liter" }
        ],
        "tag": ["Dinner", "Vegan"]
    },
    {
        "userId": null,
        "name": "Fried Rice",
        "steps": [
            "Heat oil in a wok and fry chopped onions until golden.",
            "Add beaten eggs and scramble until just set.",
            "Increase heat and add cooked rice, soy sauce, and chopped vegetables.",
            "Stir-fry until everything is hot and well mixed.",
            "Serve immediately, garnished with sliced green onions."
        ],
        "pictureUrl": "http://example.com/recipe_17.jpg",
        "ingredients": [
            { "item": "Oil", "quantity": "2 tbsp" },
            { "item": "Onions", "quantity": "1" },
            { "item": "Eggs", "quantity": "2" },
            { "item": "Cooked rice", "quantity": "3 cups" },
            { "item": "Soy sauce", "quantity": "2 tbsp" },
            { "item": "Vegetables", "quantity": "1 cup" },
            { "item": "Green onions", "quantity": "2" }
        ],
        "tag": ["Lunch", "Fast Food"]
    },
    {
        "userId": null,
        "name": "Shrimp Scampi",
        "steps": [
            "Cook spaghetti until al dente, drain, and set aside.",
            "In a skillet, heat olive oil and cook garlic until fragrant.",
            "Add shrimp and cook until they turn pink.",
            "Deglaze the pan with white wine, then add lemon juice and butter.",
            "Toss in the cooked spaghetti, garnish with parsley and serve."
        ],
        "pictureUrl": "http://example.com/recipe_18.jpg",
        "ingredients": [
            { "item": "Spaghetti", "quantity": "200g" },
            { "item": "Olive oil", "quantity": "2 tbsp" },
            { "item": "Garlic", "quantity": "3 cloves" },
            { "item": "Shrimp", "quantity": "300g" },
            { "item": "White wine", "quantity": "100ml" },
            { "item": "Lemon juice", "quantity": "2 tbsp" },
            { "item": "Butter", "quantity": "50g" },
            { "item": "Parsley", "quantity": "20g" }
        ],
        "tag": ["Dinner"]
    },
    {
        "userId": null,
        "name": "Beef Bourguignon",
        "steps": [
            "Brown beef chunks in hot oil and remove.",
            "In the same pot, cook onions and carrots until softened.",
            "Add garlic and tomato paste, cook for a few minutes.",
            "Return beef to the pot, add red wine and beef stock, and simmer for 2 hours.",
            "Stir in mushrooms and cook until tender, then serve."
        ],
        "pictureUrl": "http://example.com/recipe_19.jpg",
        "ingredients": [
            { "item": "Beef chunks", "quantity": "500g" },
            { "item": "Oil", "quantity": "2 tbsp" },
            { "item": "Onions", "quantity": "2" },
            { "item": "Carrots", "quantity": "3" },
            { "item": "Garlic", "quantity": "2 cloves" },
            { "item": "Tomato paste", "quantity": "2 tbsp" },
            { "item": "Red wine", "quantity": "300ml" },
            { "item": "Beef stock", "quantity": "500ml" },
            { "item": "Mushrooms", "quantity": "250g" }
        ],
        "tag": ["Dinner"]
    },
    {
        "userId": null,
        "name": "Chocolate Mousse",
        "steps": [
            "Melt chocolate over a bain-marie and let cool slightly.",
            "Whisk together egg yolks and sugar until fluffy.",
            "Fold in the melted chocolate and a pinch of salt.",
            "Whip cream to soft peaks and fold into the chocolate mixture.",
            "Chill for at least 4 hours before serving."
        ],
        "pictureUrl": "http://example.com/recipe_20.jpg",
        "ingredients": [
            { "item": "Chocolate", "quantity": "200g" },
            { "item": "Egg yolks", "quantity": "3" },
            { "item": "Sugar", "quantity": "50g" },
            { "item": "Salt", "quantity": "1 pinch" },
            { "item": "Cream", "quantity": "250ml" }
        ],
        "tag": ["Dessert"]
    }
];

// recipe_list = [ObjectId("6636aa4552b6969f66c1d363"), ObjectId("6636aa4652b6969f66c1d364"),
// ObjectId("6636aa4652b6969f66c1d365"), ObjectId("6636aa4652b6969f66c1d366"),
// ObjectId("6636aa4652b6969f66c1d367"), ObjectId("6636aa4652b6969f66c1d368"),
// ObjectId("6636aa4652b6969f66c1d369"), ObjectId("6636aa4652b6969f66c1d36a"),
// ObjectId("6636aa4652b6969f66c1d36b"), ObjectId("6636aa4652b6969f66c1d36c"),
// ObjectId("6636aa4652b6969f66c1d36d"), ObjectId("6636aa4652b6969f66c1d36e"),
// ObjectId("6636aa4652b6969f66c1d36f"), ObjectId("6636aa4652b6969f66c1d370"),
// ObjectId("6636aa4652b6969f66c1d371"), ObjectId("6636aa4652b6969f66c1d372"),
// ObjectId("6636aa4652b6969f66c1d373"), ObjectId("6636aa4652b6969f66c1d374"),
// ObjectId("6636aa4652b6969f66c1d375"), ObjectId("6636aa4652b6969f66c1d376")];

raw_mealplan_data = [
    {
        "userId": null,
        "date": "2024-04-20",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d368" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d373" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d375" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-21",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36f" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d369" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36a" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-22",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d376" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d367" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d372" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-23",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d371" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d366" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-24",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d368" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d371" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36a" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-25",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d376" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36b" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d374" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-26",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d371" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4552b6969f66c1d363" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-27",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d364" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d365" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-28",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d376" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d369" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d374" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-29",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d369" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d365" }]
        }
    },
    {
        "userId": null,
        "date": "2024-04-30",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36b" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36d" }]
        }
    },

    {
        "userId": null,
        "date": "2024-05-01",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d368" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d369" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d365" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-02",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d376" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36b" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d365" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-03",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d368" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d367" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36d" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-04",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d376" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d369" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d366" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-05",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d364" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d375" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-06",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d376" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36b" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d374" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-07",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d368" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36b" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d365" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-08",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36f" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d371" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d36a" }]
        }
    },
    {
        "userId": null,
        "date": "2024-05-09",
        "meals": {
            "breakfast": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d370" }],
            "lunch": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d371" }],
            "dinner": [{ "$ref": "recipes", "$id": "6636aa4652b6969f66c1d374" }]
        }
    }
]

raw_tag_data = [
    {
        "tag": "Breakfast",
        "deleted": false
    },
    {
        "tag": "Lunch",
        "deleted": false
    },
    {
        "tag": "Dinner",
        "deleted": false
    },
    {
        "tag": "Fast Food",
        "deleted": false
    },
    {
        "tag": "Vegan",
        "deleted": false
    },
    {
        "tag": "Desserts",
        "deleted": false
    },
    {
        "tag": "Salads",
        "deleted": false
    },
    {
        "tag": "Seafood",
        "deleted": false
    },
    {
        "tag": "Italian Cuisine",
        "deleted": false
    },
    {
        "tag": "Beverages",
        "deleted": false
    }
];

// // form 1: just a single document
// async function form1() {
//     website = { _id: "1", decks: raw_data }
//     const client = await mongoClient.connect(mongodb_connection_string)
//     const result = await client.db("FoodieMateDB").collection("recipes").insertOne(website)
//     client.close()
//     return "done1"
// }
// form1().then(console.log)


// form 2: cards are embedded on decks
async function tag() {
    const client = await mongoClient.connect(mongodb_connection_string)
    for (const deck of raw_tag_data) {
        await client.db("FoodieMateDB").collection("tags").insertOne(deck)
    }
    client.close()
    return "done tag"
}
tag().then(console.log)

// // form 2: cards are embedded on decks
// async function form2() {
//     const client = await mongoClient.connect(mongodb_connection_string)
//     for (const deck of raw_recipe_data) {
//         await client.db("FoodieMateDB").collection("recipes").insertOne(deck)
//     }
//     client.close()
//     return "done2"
// }
// form2().then(console.log)


// // form 3: cards are distinct collection, decks reference cards
// async function form3() {
//     const client = await mongoClient.connect(mongodb_connection_string)
//     for (const deck of raw_mealplan_data) {
//         const meals = {};
//         for (const meal in deck.meals) {

//             if (deck.meals.hasOwnProperty(meal)) {
//                 // temp = deck["meals"];
//                 // 获取当前餐点的第一个元素的 $id
//                 const recipeId = deck.meals[meal][0]["$id"];
//                 // 创建一个新的 ObjectId 并赋值给 meals 对象
//                 meals[meal] = new ObjectId(recipeId);
//             }
//         }
//         //     const res = await client.db("FoodieMateDB").collection("recipes").insertOne(card)
//         //     meals.push(new ObjectId(res.insertedId))
//         // }
//         const deck2 = { ...deck }
//         deck2.meals = meals
//         await client.db("FoodieMateDB").collection("mealplans").insertOne(deck2)
//     }
//     client.close()
//     return "done3"
// }
// form3().then(console.log)

// // test: cards are distinct collection, decks reference cards
// async function test() {
//     const client = await mongoClient.connect(mongodb_connection_string)
//     for (const deck of raw_data) {
//         cards = []
//         for (const card of deck.cards) {
//             const res = await client.db("testDB").collection("cards").insertOne(card)
//             cards.push(new ObjectId(res.insertedId))
//         }
//         const deck2 = { ...deck }
//         deck2.cards = cards
//         await client.db("testDB").collection("decks").insertOne(deck2)
//     }
//     client.close()
//     return "done test"
// }
// test().then(console.log)

