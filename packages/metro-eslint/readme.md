# Course Outline



## Prereqs 🛑
- Intermediate React experience
- Intermediate Node JS experience
- AWS Account
- Basic knowledge of electronics and circuits
- Basic knowledge of  GraphQL
- Basic knowledge of git and continuous integration
- Basic knowledge of TDD and BDD
- Willingness to read documentation and specifications throughout the course


## Materials
  - esp8266
  - led
  - breadboard
  - jumper cables



## You will learn...
- Core technical skills like onboarding consumers (connecting device to their local wifi)
- Fundamental patterns to scale and manage your systems
- To apply engineering principles to problem solving
- To work as if you were at an actual IoT company
- To build APIs for junior JS developers, e.g., bridges for React Native using Kotlin or for the RTOS using C

## You won't learn...
- To create industrial IoT products using cellular networks
- Embedded C or swift
- Analog circuits, electronics, digital signals processing



### References, APIs, and Specifications

- References
  - Making Embedded Systems by Elecia White
  - Real-time Operating Systems by James Cooling
  - Node JS Design Patterns by Mario Casciaro
  - Serverless Architectures by Peter Sbarski
  - React Design Patterns and Best Practices by Michele Bertoli


- Specifications
  - graphql
  - mqtt



### Principles and Definition

Definition of an IoT Product:
> Sensors or actuators that send and receive data (respectively), usually to a user interface.


#### Principles:

- Use abstractions when they empower you, not when they slow you down or make you lazy. However, make sure to understand the mechanism behind the abstraction.

  Useful when an abstraction...
    - Creates a layer that allows your source code to target multiple platforms (avoiding vendor lock-in)
    -  Has elegantly solved a critical problem for everyone, while implementing it yourself would add time and effort that creates no benefit to you as an engineer or the product.


- Unapologetically Product-Centric: this is why you get paid. Most code (including state management) will be centralized on the front end, to more quickly and efficiently give the customer what they want.

- Employ Sandboxing: "A sandbox is a testing environment that isolates untested code changes and outright experimentation from the production environment or repository, in the context of software development including Web development and revision control."

- Architect a system so that junior developers can contribute largest percentage of the codebase possible.




### Core Patterns
  - Facade
  - Pub/Sub
  - Higher Order Components


## 1. Tooling 🛠

1. Documentation
  - static
    - high-level diagrams
    - gitflows
    - code style guide
    - API Reference
      - lambdas (jsdocs)
      - components (react-docgen)
  - interactive  
    - cloudcraft
    - graph-*I*-QL
    - storybook

3. Continuous Integration
  - git flows

  - BDD Template

```feature
  Feature: <insert simple feature verb statement, such as, 'On Boarding',  'Purchasing', 'Upgrading Account'>

    Scenario: User is <insert: 'unregistered', 'registered', 'logged in', 'logged out', 'upgraded to'> and  

      # repeat this block for every interaction on the mockup
      When user <insert: 'presses', 'types', 'swipes'> ...
      Then user <insert: 'sees', 'hears', 'senses vibration'>...
      # use only for redirection and/or to display a custom error ui
      When the user does not get result, they should <insert: 'sees', 'hears', 'senses vibration'> ...
      Then user <insert: 'sees', 'hears', 'senses vibration'>...


      # next interaction
      When user <insert: 'presses', 'types", 'swipes'> ...
      ...      
```




  - kanban

## 2. Scope and  System Design 🔎

- Static Typing
  - None on lambdas themselve because of modularity
  - Strong Type enforcement on graphql API
  - Use of proptypes for the UI

- System  Architecture

## 3. Building the Infrastructure 👷‍

## 4. Feature: Onboarding 🚉

## 5. Feature: Notification System 🔔

## 6. Feature: WebShop💰

>see the [wiki](https://github.com/iot-course/org/wiki) for more info
