# Angular Movie/TV Series Application - WatchQuest

Welcome to the Angular Movie/TV Series Application! This application is built with Angular and utilizes the TMDB API to retrieve information about movies and TV series. It offers various functionalities such as rating, adding to favorites, adding to watchlists, and searching for your favorite movies and shows.

- ### What you'll need to test the app
  - #### The website :link: - https://develop--majestic-selkie-153b60.netlify.app/
  - #### An TMBD account since the authentication is handled through their website, when redirected you can either signup or use an existing account.
  - #### To avoid issues with account creation I have created a test account for you.
    - username: username-test
    - password: username123
  - If the provided account doesn't work can can try creating one with a disposable email, using services like https://temp-mail.org/en/

## Features :bulb:

- **TMDB API Integration**: The application leverages the TMDB API to fetch comprehensive information about movies and TV series, including details, ratings, and more.

- **Rating System**: Users can rate movies and TV series based on their preferences, allowing them to provide feedback and contribute to the community.

- **Favorites**: You can add movies and TV series to your favorites list, making it easier to keep track of your preferred content.

- **Watchlists**: Create watchlists to curate a collection of movies and TV series that you intend to watch or save for later.

- **Search**: The application provides a search functionality, allowing you to find specific movies or TV series quickly and efficiently.

## NGRX Integration :gem:

To ensure consistent information throughout the application, the NGRX library has been incorporated. NGRX provides a cleaner structure, facilitating state management, reducing data inconsistencies and consolidating different http respones into one entity. While NGRX can sometimes be considered overengineering, in this case, it is necessary to maintain data integrity across various components and screens.

## Key Angular Features :notebook:

The application leverages several key Angular features to enhance functionality and user experience:

- **Interceptors**: Interceptors are utilized to handle notifications based on HTTP responses. This ensures smooth communication with the TMDB API and provides users with real-time feedback.

- **Session ID Handling**: The application appends the session ID to specific HTTP requests, enabling seamless interaction with the TMDB API's protected endpoints.

- **Resolver**: A resolver has been implemented to prefetch essential information required for rendering specific components. This optimizes performance by retrieving data in advance, resulting in a smoother user experience.

- **Route Guards**: The application utilizes route guards to protect certain routes and restrict access based on user authentication and authorization.

## Modular Architecture :triangular_ruler:

The application follows a modular architecture, dividing its components into separate modules. This approach offers several advantages, including improved management of NGRX and enhanced isolation of functionalities. Each module focuses on specific features, promoting maintainability and scalability.

## Testing :microscope:

While the application does not currently include testing, it is crucial to implement it for comprehensive quality assurance. Testing ensures the reliability and stability of the application, allowing for quick identification and resolution of potential issues.

## Known Issues :beetle:

Please note that there are some minor bugs related to the NGRX state within the application. However, these issues are actively being addressed, and future updates will rectify them to enhance the overall user experience.

## TMDB API :bar_chart:

The application heavily relies on the TMDB API (The Movie Database) to fetch movie and TV series data. The TMDB API provides a vast collection of information, including movie details, cast and crew information, user ratings, and more. To access the API, an account can be created on the TMDB website (https://www.themoviedb.org/) to obtain an API key.

## Conclusion

Thank you for choosing the Angular Movie/TV Series Application. This professional and feature-rich application brings you the latest information about movies and TV series, allowing you to rate, add to favorites, add to watchlists, and search effortlessly. With a modular architecture, NGRX integration, key Angular features, and route guards, this application guarantees a seamless user experience while ensuring data consistency and security. As future updates are released, we will continue to enhance
