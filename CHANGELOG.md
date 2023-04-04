# Changelog

#### = 0.5.2 (April 4, 2023) =

* New: Using Redux for navigation API.
  - The new dependencies include `redux`, `react-redux`, `redux-devtools-extension`, `redux-thunk`, `next-redux-wrapper`
  - Related pages include `src/store/`, `src/components/Header/`, `src/components/Layout/`, `pages/_app.tsx`, `pages/api/navigation.ts`
  - Related components include `<Header />`, `<Layout />`

* New: Add new components `<MultilevelDropdownMenuProps />` and `<Layout />`.
* Feat: All page code optimization and partial Layout refactoring


#### = 0.4.9 (March 13, 2023) =

* New: Added new script that allows configuring the root directory of publishing source.
* New: Added the file `ecosystem.config.js` and modified the PM2 script.


#### = 0.4.6 (March 7, 2023) =

* New: Added some small tools for parsing HTML source code.
* Tweak: Updated some Node scripts.
* Tweak: Adjusted some dependencies.


#### = 0.4.4 (March 4, 2023) =

* Tweak: Some updates using nodejs as server side.


#### = 0.4.3 (March 2, 2023) =

* New: Added configuration for deploying with Docker.
  - change `next.config.js`
  - add `Dockerfile` & `.dockerignore`

* New: Added an example using dynamic component imports.
* New: Added examples of dynamic routing API.


#### = 0.4.2 (December 2, 2022) =

* Tweak: some minor optimizations.


#### = 0.4.1 (December 1, 2022) =

* New: Remote resource download support video and audio.


#### = 0.4.0 (November 17, 2022) =

* New: Add general component <BackToTop />.


#### = 0.3.9 (November 12, 2022) =

* New: Add Site URL (Root Directory) Configurations.
* Fix: Fix pagination switching.


#### = 0.3.7 (November 9, 2022) =

* Fix: Image matching problem with parameters.
* Fix: Solve problems that may arise when publishing to e.g. Github page


#### = 0.3.5 (November 8, 2022) =

* Fix:  Fix JSON content output.
* Fix:  Correct query for URL parameters.

#### = 0.3.2 (November 2, 2022) =

* Fix: Fix script for matching image URLs
* Tweak:Optimized sanitize function and content output in JSON format.


#### = 0.3.0 (October 31, 2022) =

* Tweak: Tools to optimize remote downloads.
* Tweak: Fix the parameter passing problem of build CLI.


#### = 0.2.5 (October 27, 2022) =

* New: Download images or other files of the remote API to the local (valid for local testing)
* Tweak: Updated Nextjs to 13+.


#### = 0.2.4 (October 13, 2022) =

* Tweak: Adjust file structure related to user permissions.
* Tweak: Simplified authorization judgment code.



#### = 0.2.1 (October 11, 2022) =

* New: Supports the writing method of executing Node server events according to the route, which can avoid browser blocking.
* New: Navigation support active state.



#### = 0.2.0 (October 2, 2022) =

* Tweak: Updated `<Pagination />` component
* New: Defer generating all pages on-demand by custom command.


#### = 0.1.6 (September 30, 2022) =

* New: Common tool library update.
* Tweak: Handling of request errors.


#### = 0.1.5 (September 29, 2022) =

* Fix: Fixed possible warnings for asynchronous requests.
* Fix: Fixed development commands.
* Tweak: Optimized data calling method.


#### = 0.1.2 (September 8, 2022) =

* New:  Added API interface to export static pages(Pages generate routes that support HTML suffixes).
* New:  Added Node commands `npm run export`, `npm run export:test` and `npm run export:fix`


#### = 0.1.1 (September 4, 2022) =

* New: Add a CRUD with axios demo on Dashboard page.
* Fix: Fixed a bug in front-end and back-end API communication.
* New: Support for importing SVG files.
* Tweak: Added solutions to problems that may occur when deploying the application on cloud server.
* Tweak: Modified the test path of the API.


#### = 0.1.0 (August 27, 2022) =

* First release.
