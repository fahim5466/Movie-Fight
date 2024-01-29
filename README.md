# Movie Fight
Movie Fight is a simple Javascript application where a user can search and select any two movies to compare their stats.
This project was done as part of this Udemy course - [The Modern Javascript Bootcamp Course](https://www.udemy.com/course/javascript-beginners-complete-tutorial). Although it
should be noted that this is not a direct duplication of the code. I have added some personal changes in the overall code structure and the actual code. I think these changes
improve upon the original.

This app uses [Axios](https://axios-http.com/) and [Bulma CSS](https://bulma.io/). The [OMDB](https://www.omdbapi.com/) api is used to search for and access movie data. You will
need your own api key to run this app. To get your own api key go to the OMDB site and follow their instructions.

This project mainly demonstrates the following things:
- How to create an app component(in this case, an autocomplete box) that can be easily plugged in and reused without strongly coupling it to the rest of the application code.
- How to create an app component that is model agnostic. Our autocomplete component is not tied to any specific model i.e., we can reuse it for something other than movies. This information is passed to the component during setup time through various callbacks(how to fetch movie data, how to render a movie option, etc.).
