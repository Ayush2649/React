# Namaste React 🚀

- Why React is so fast??
  - It makes the DOM Operations very fast
  - It has one of the best rendering mechanisms

# Parcel 📦

- Dev Build
- Server
- HMR = Hot Module Replacement
- File Watching Algorithm - Written in C++
- Caching - Faster Builds
- Image Optimization (Usually is the most costly task)
- Minification of files
- Bundles all the files
- Compress
- Consistent Hashing
- Code Splitting
- Differential Bundling - Support older browsers
- Diagnositcs
- Error Handling
- Tree Shaking - Remove unused code
- Differnet dev and prod bundles

# Header

    - Logo
    - Nav Items
    - Search Bar

# Body

    - Restaurant Cards
        - Image
        - Name
        - Cuisine
        - Rating
        - ETA (Expected Time of Arrival)

# Footer

    - Copyright
    - Contact Info
    - Terms of Service

- Functional Component is nothing but a JavaScript function that returns a React element.
- Props (Properties) are nothing but arguements to that function
- Passing a prop to a component is just like passing an arguement to a function
- Config-driven UI, also known as Configuration-Driven UI (CDUI), is a design pattern where the structure, layout, and behavior of a user interface are defined and controlled by external configuration data rather than being hard-coded within the application's source code.

# Two Types of Import / Export

1. Default Import / Export

   - Export default Component (Component - Example file name)
   - Import Component from (file location)

2. Named Import / Export
   - Export const Component
   - Import {Component} from (file location)

# React Hooks

They are normal JS utility functions
There are two important Hooks

- useState() : Superpowerful State Variables in React
- useEffect()

- Whenever a State Variable updates, React rerenders the component

# Reconciliation Algorithm (React Fiber)

Virtual DOM is representaion of Actual DOM

# Diff Algorithm

- It just finds out the differnece between the Virtual DOMs

                       (Clicks on button)

  Root with seven nodes => Root with 3 nodes

- Whenever State Variable updates, React triggers a Reconciliation cycle(rerenders the component)

- Everytime the component is rendered, useEffect will be called
  - if no dependency array => useEffect is called on every render
  - if dependency array is empty = [] => useEffect is called on initial render only
  - if dependency array is [btnContent] => useEffect is called whenever the [btnContent] is updated

# Two types of Routing in Web Apps

    - Client Side Routing:
        - The browser downloads a JavaScript bundle that contains (or can dynamically load) all the code for different "pages" (really just components).
        - When you navigate, the router (e.g., React Router) intercepts the navigation and swaps components instead of asking the server for a new HTML page.
        - This avoids a full page refresh → smoother, faster transitions.
        - The server is usually only hit via API calls for data, not for new HTML. 
    
    - Server Side Routing: The Server refreshes the entire page to toggle between the links
        - Every time you click a link, the browser sends a request to the server.
        - The server responds with a new HTML document for that route.
        - This causes a full page reload with all resources reloaded (unless cached).