# Changelog

#### = 1.4.0 (July 17, 2024) =

* New: Add the Authorization header identifier in the middleware after login.
* New: Add App Router Template and save Pages Router Template.
  - rename the folder `pages` to `@pages`
  - add new folder `app`
  - To enable **Pages Router**, you need to rename the folder `@pages` to `pages`, and delete `app`
  - remove hook `useSafePush`

* Tweak: `next/router` migrated to `next/navigation`, adapted to page and app router.
* Tweak: remove demo of dynamic component using `next/dynamic`.
* Tweak: Other optimizations.



#### = 1.2.9 (July 10, 2024) =

* New: Add a demo page of Markdown Render.
* New: update `cache` utils of Nodejs and add `request.js` of axios.
* New: Add a guide of Migrating from Pages Router to App Router.
* Upgraded: Update Dockerfile.
* Upgraded: Update the cache and compression sample code for the node service



#### = 1.2.7 (June 11, 2024) =

* New: Add HTML/CSS/JS checker to the node service.
* New: Add some new custom hooks:
  - `useKeyPress()`
  - `useAutosizeTextArea()`
  - `useClickOutside()`
  - `useDraggable()`
  - ...

* Fixed: JWT scripts from nodejs.


#### = 1.2.5 (April 23, 2024) =

* Upgraded: nextjs to 4.2.2+.
* New: Added some minor utilities.
* Tweak: Change some files via ESM.


#### = 1.1.3 (November 20, 2023) =

* Fix: fixed some bugs for "output: export".



#### = 1.1.0 (November 2, 2023) =

* Tweak: Upgrade to [next 14+](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14).


#### = 1.0.8 (November 2, 2023) =

* New: add some new utilities.
* Tweak: Roll back to nextjs 13.0.0, compatible with previous HTML export.
  - ⚠️ Nextjs 14+ has export compatibility issues with some configurations of this project and current nextjs will not be updated yet.
  - ⚠️ This project is compatible with nextjs 14+, however, if you don't need to use the "Exporting Pure HTML Static Files", you can directly [upgrade to next 14+](https://nextjs.org/docs/pages/building-your-application/upgrading/version-14)


#### = 1.0.5 (September 27, 2023) =

* New: Add general component `<Avatar />`.
* New: Add `src/interfaces`.
* Refact: Using auth hooks (using createContext & useReducer) to control all components.


#### = 0.9.8 (September 26, 2023) =

* New: Add a new custom hook `useEffectOnce()` to avoid StrictMode renders components twice on development mode.



#### = 0.9.5 (September 8, 2023) =

* New: Authentication of Microservices.
* Tweak: Optimize SSR scripts.


#### = 0.9.2 (September 7, 2023) =

* Tweak: Optimize some node services.
* New: API Supplement.


#### = 0.8.5 (August 21, 2023) =

* Tweak: Node services optimization and performance fixes.
* Feat: Refactored Node services.


#### = 0.8.2 (August 19, 2023) =

* New: Add some node services.
* New: Add Request Cache demo.
* Tweak: Code optimization and performance fixes.
* Tweak: Upgrade next.js to 13.4.x.


#### = 0.6.8 (July 19, 2023) =

* Tweak: Update documentation of Docker deployment.


#### = 0.6.7 (June 13, 2023) =

* Tweak: Enhanced usage of Redux's Store.


#### = 0.6.6 (May 30, 2023) =

* New: Let custom server support socket.io.
  - custom server file of nextjs `server.js`
  - socket server file `backend/server-socket.js`

* New: add a new utility of shuffle.
* Fix: fixed some minor issues for utilities


#### = 0.6.4 (May 19, 2023) =

* Tweak: update Node scripts for server-side.
* New: add a new utility of color.

#### = 0.6.0 (May 15, 2023) =

* Tweak: update repackage scripts
* New: Add a new tool script to bind the Enter key
* New: Add language generated scripts
* Tweak: update translation script
* Tweak: Modify the tool that listens to the Enter key
* Tweak: Modify the architecture of CoreUtils
* Fix:fix a bug for CoreUtils


#### = 0.5.6 (April 8, 2023) =

* Fix: Fixed cross domain issue in express service.


#### = 0.5.5 (April 4, 2023) =

* New: Using Redux for navigation API.
  - The new dependencies include `redux`, `react-redux`, `redux-thunk`, `next-redux-wrapper`
  - Related pages include `src/store/`, `src/components/Header/`, `src/components/Layout/`, `pages/_app.tsx`, `pages/api/navigation.ts`
  - Related components include `<Header />`, `<Layout />`

* New: Add new components `<MultilevelDropdownMenuProps />`, `<Loader />` and `<Layout />`.
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

* New: Add general component `<BackToTop />`.


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
