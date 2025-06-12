# 🎨 EventPlanner - Frontend

A responsive and interactive web client for the **EventPlanner** platform — built with modern Angular, supporting multiple user roles, reactive programming, and seamless integration with backend APIs.

---

## 📋 Table of Contents
- [About the Project](#about-the-project)
- [Architecture & Features](#architecture--features)
- [Tech Stack](#tech-stack)
- [Testing & Code Quality](#testing--code-quality)
- [My Contributions](#my-contributions)

---

<a name="about-the-project"></a>
## 📖 About the Project

The **Frontend** repository contains the Angular-based client application for the **EventPlanner** platform. It provides a rich UI/UX for:
- 👤 **Guests** - browse events, products and services
- 🎫 **Authenticated Users** – browse, register for events, manage profiles  
- 🎤 **Event Organizers** – create, edit, and manage events and participants  
- 🛠️ **Service/Product Providers** – manage their offerings and orders  
- 🛡️ **Admins** – monitor platform status and user activity

The frontend communicates with the backend via REST APIs and uses reactive programming patterns for efficient state and event management.

See also:  
- [Backend Repository](https://github.com/Nikola034/Event-Planner-Backend)  
- [Android Repository](https://github.com/Nikola034/Event-Planner-Android) 
- [Selenium Tests Repository](https://github.com/Nikola034/Event-Planner-Selenium-Tests)

---

<a name="architecture--features"></a>
## 🧱 Architecture & Features

### ⚛️ Angular Architecture
- Component-based architecture using Angular 17  
- Reactive Forms and RxJS for handling asynchronous data streams  
- State management with services and Observables

### 🖥️ User Interface
- Responsive design with **PrimeNG** UI components  
- Integration with **OpenStreetMap** for event locations  
- Dynamic routing with Angular Router, guarding routes based on roles

### 🔗 API Integration
- HTTPClient with JWT token handling  
- Centralized service layer for all backend API calls  
- Error handling and loading states management

### 📅 Event & Product Management
- Full CRUD for events, products, and services  
- Event types and filters for better user experience  
- Profile management and registration/login workflows

---

<a name="tech-stack"></a>
## 🧰 Tech Stack

| Category         | Technologies Used                   |
|------------------|-----------------------------------|
| **Framework**    | Angular 17                        |
| **UI Library**   | PrimeNG                           |
| **Reactive Lib** | RxJS                             |
| **Routing**      | Angular Router                   |
| **HTTP Client**  | Angular HttpClient                |
| **Maps**         | OpenStreetMap integration         |

---

<a name="testing--code-quality"></a>
## 🧪 Testing & Code Quality

- ✅ **Unit & Integration Testing** – Jasmine
- 🚀 **End-to-End Testing** – Selenium 
- 📏 **Clean Code Practices** – modular components, reusable services  
- 🔄 **Code Reviews & Pull Requests** – ensured high-quality merges  
- 🗂️ **Agile Development** – sprint planning and retrospectives via Trello

---

<a name="my-contributions"></a>
## 👨‍💻 My Contributions

- 🎨 Developed event creation/editing components and workflows  
- 🔐 Implemented user authentication and role-based route auth guards as well as registration and login features
- 🗺️ Integrated OpenStreetMap for event location selection  
- 🛍️ Supported CRUD operations for events, event types and products
- 🧪 Wrote unit and integration tests for key UI components  
- 💬 Participated in UI/UX design iterations and code reviews

---
