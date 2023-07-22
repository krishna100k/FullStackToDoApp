/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "./Routes/users.js":
/*!*************************!*\
  !*** ./Routes/users.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0__.Router();\nrouter.get(\"/\", (req, res) => {\n  fs__WEBPACK_IMPORTED_MODULE_1__.readFile(\"todos.json\", \"utf-8\", (err, data) => {\n    if (err) throw err;\n    let todos = JSON.parse(data);\n    res.send(todos);\n  });\n});\nrouter.post(\"/\", (req, res) => {\n  const newTodo = {\n    id: Math.floor(Math.random() * 1000000),\n    title: req.body.title,\n    description: req.body.description\n  };\n  fs__WEBPACK_IMPORTED_MODULE_1__.readFile(\"todos.json\", \"utf-8\", (err, data) => {\n    if (err) throw err;\n    let todos = JSON.parse(data);\n    todos.push(newTodo);\n    fs__WEBPACK_IMPORTED_MODULE_1__.writeFile(\"todos.json\", JSON.stringify(todos), err => {\n      if (err) throw err;\n    });\n  });\n\n  // const userWithId = {...todo, id:userID}\n  // todos.push(userWithId);\n\n  res.send(`todo with name ${newTodo.title} has been added to the database`);\n});\nrouter.get(\"/:id\", (req, res) => {\n  fs__WEBPACK_IMPORTED_MODULE_1__.readFile(\"todos.json\", \"utf-8\", (err, data) => {\n    if (err) throw err;\n    let todos = JSON.parse(data);\n    const id = req.params.id;\n    const foundTodo = todos.find(check => check.id == id);\n    if (!foundTodo) {\n      res.status(404).send();\n    } else {\n      res.send(foundTodo);\n    }\n  });\n});\nrouter.delete(\"/:id\", (req, res) => {\n  fs__WEBPACK_IMPORTED_MODULE_1__.readFile(\"todos.json\", \"utf-8\", (err, data) => {\n    if (err) throw err;\n    let todos = JSON.parse(data);\n    const id = req.params.id;\n    let filtered = todos.filter(todo => todo.id != id);\n    fs__WEBPACK_IMPORTED_MODULE_1__.writeFile(\"todos.json\", JSON.stringify(filtered), err => {\n      if (err) throw err;\n    });\n    res.send(`todo with id ${id} has been deleted`);\n  });\n});\nrouter.patch(\"/:id\", (req, res) => {\n  fs__WEBPACK_IMPORTED_MODULE_1__.readFile(\"todos.json\", \"utf-8\", (err, data) => {\n    if (err) throw err;\n    let todos = JSON.parse(data);\n    const id = req.params.id;\n    const {\n      title,\n      description\n    } = req.body;\n    const foundtodo = todos.find(todo => todo.id == id);\n    if (title) {\n      foundtodo.title = title;\n    }\n    if (description) {\n      foundtodo.description = description;\n    }\n    fs__WEBPACK_IMPORTED_MODULE_1__.writeFile(\"todos.json\", JSON.stringify([...todos, foundtodo]), err => {\n      if (err) throw err;\n    });\n    res.send(`${id} patched successfully`);\n  });\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://week-2/./Routes/users.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var _Routes_users_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Routes/users.js */ \"./Routes/users.js\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/**\r\n  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.\r\n  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)\r\n  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)\r\n\r\n  Each todo has a title and a description. The title is a string and the description is a string.\r\n  Each todo should also get an unique autogenerated id every time it is created\r\n  The expected API endpoints are defined below,\r\n  1.GET /todos - Retrieve all todo items\r\n    Description: Returns a list of all todo items.\r\n    Response: 200 OK with an array of todo items in JSON format.\r\n    Example: GET http://localhost:3000/todos\r\n\r\n  2.GET /todos/:id - Retrieve a specific todo item by ID\r\n    Description: Returns a specific todo item identified by its ID.\r\n    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.\r\n    Example: GET http://localhost:3000/todos/123\r\n\r\n  3. POST /todos - Create a new todo item\r\n    Description: Creates a new todo item.\r\n    Request Body: JSON object representing the todo item.\r\n    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}\r\n    Example: POST http://localhost:3000/todos\r\n    Request Body: { \"title\": \"Buy groceries\", \"completed\": false, description: \"I should buy groceries\" }\r\n\r\n  4. PUT /todos/:id - Update an existing todo item by ID\r\n    Description: Updates an existing todo item identified by its ID.\r\n    Request Body: JSON object representing the updated todo item.\r\n    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.\r\n    Example: PUT http://localhost:3000/todos/123\r\n    Request Body: { \"title\": \"Buy groceries\", \"completed\": true }\r\n\r\n  5. DELETE /todos/:id - Delete a todo item by ID\r\n    Description: Deletes a todo item identified by its ID.\r\n    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.\r\n    Example: DELETE http://localhost:3000/todos/123\r\n\r\n    - For any other route not defined in the server return 404\r\n\r\n  Testing the server - run `npm run test-todoServer` command in terminal\r\n */\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\nconst PORT = 5000;\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1__.json());\napp.use(cors__WEBPACK_IMPORTED_MODULE_4__());\napp.use('/todos', _Routes_users_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\napp.get('/', (req, res) => {\n  res.send(\"Hello From Homepage\");\n});\n\n// app.get(\"/\"), (req, res)=> {\n//   res.sendFile(path.join(__dirname, \"index.html\"));\n// }\n\napp.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`));\n\n//# sourceURL=webpack://week-2/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;