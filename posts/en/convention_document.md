---
title: "Convention Document"
date: "2024-03-20"
category: "frontend"
description: "Development Rules"
tags: ["Convention", "Document"]
thumbnail: ""
---

## 1. Purpose

1. Development Standardization: Provide consistency in frontend development to improve code readability and maintainability.
2. Team Collaboration Enhancement: Facilitate collaboration between developers and improve communication.
3. New Developer Onboarding: Help newly joined developers quickly adapt to the project and develop efficiently.
4. Code Quality Improvement: Enhance code quality through consistent coding styles and optimization techniques.
5. Maintainability Enhancement: Improve code readability and ease maintenance through consistent structure and naming conventions.

## 2. Coding Style Guide

### 2.1. Indentation

1. Use Prettier's default settings for indentation.

### 2.2. Variables and Constants

Variables and constants are important concepts in frontend development. This section explains guidelines for using variables and constants.

1. Variable and Constant Names
   - Variable and constant names should be chosen to clearly convey their meaning.
   - Variable and constant names should be written in English.
   - For multi-word names, use camelCase to separate words. Example: myVariable, userName
2. Variable Declaration and Assignment
   - Use the let keyword when declaring variables. Example: let count = 0;
   - Variable values can be changed whenever needed.
3. Constant Declaration and Assignment
   - Use the const keyword when declaring constants. Example: const PI = 3.14;
   - Constants cannot be changed once assigned.
4. Variable and Constant Initialization
   - It's recommended to assign initial values when declaring variables and constants.
   - Uninitialized variables or constants can cause unintended behavior and should be avoided.

Variables and constants are essential elements for storing and manipulating program data. Use variables and constants appropriately to write readable code, and choose between them considering whether values need to be mutable.

### 2.3. Functions and Methods

Functions and methods are important elements for code reusability and modularity in frontend development. This section provides guidelines for using functions and methods.

1. Function and Method Definition
   - Functions are independent code blocks that can receive input, process it, and return results.
   - Methods are functions that belong to objects, manipulating object state or performing object behavior.
2. Function and Method Naming Conventions
   - Function and method names typically take verb forms. Example: calculateTotal, loginUser
   - Function and method names should clearly convey their purpose.
   - For multi-word names, use camelCase. Example: calculateTaxAmount, loginUserWithCredentials
3. Function and Method Parameters
   - Functions and methods can receive input values as parameters.
   - Parameter names should follow the same naming conventions as variables and clearly express the meaning of input values.
4. Function and Method Return Values
   - Functions and methods can return results as needed.
   - Return value types should be clearly defined and return data that matches the function or method's purpose.
5. Function and Method Scope
   - Functions and methods are valid within their declared block (scope). Variables declared inside a function can only be used within that function and cannot be accessed from outside.

Functions and methods are tools that enhance code reusability and maintainability. Structure your code using appropriate functions and methods, and design them considering readability and flexibility.

### 2.4. Components

Classes and components are important concepts in object-oriented programming and React frontend development. This section provides guidelines for using classes and components.

1. Component Definition
   - Components are independent UI elements. They can be represented as modules with specific functionality on the screen.
   - In React, components can be defined as either classes or functions. There are class components and functional components.
2. Component Naming Conventions
   - Component names must start with a capital letter.
   - Component names are typically nouns or noun phrases. Example: User, LoginForm, Header
3. Inheritance and Extensibility
   - Components can be extended through inheritance. This enhances code reusability and extensibility.
   - When using inheritance, understand the functionality of the inherited component well and redefine necessary parts.

Components play a crucial role in object-oriented concepts and React development. Understand components well and use them appropriately to write maintainable and extensible code.

### 2.5. Comments

Comments are used to provide explanations or additional information about code. Proper comment writing helps improve code readability and maintainability. Below are guidelines for writing comments.

1. Comment Purpose
   - Minimize the use of comments and only use them when necessary.
   - Write comments to emphasize important points or parts that need future work.
2. Comment Writing Rules
   - Comments should be clear and concise.
   - Comments should be written in appropriate amounts relative to the code. Excessive comments can reduce code readability.
   - Comments should be written where needed, and unnecessary comments should be deleted.
   - Comments should be updated according to code changes.

Comments help make code easier to understand and maintain. Write appropriate comments to keep code clear and meaningful.

### 2.6. Naming Conventions

Consistent naming conventions are important for maintaining code readability and consistency. Below are guidelines for naming conventions.

1. Variable and Constant Naming
   - Meaning Conveyance: Variable and constant names should explain their values well. Other developers should be able to understand the role and purpose of variables from their names.
   - Camel Case: Use camelCase for variable and constant names. Start the first word with a lowercase letter and capitalize the first letter of subsequent words. Example: firstName, userAge
   - Readability: Set appropriate variable lengths. Too short can make meaning unclear, too long can reduce readability.
2. Function and Method Naming
   - Verb Form: Function and method names should start with verbs. Choose verbs that well describe the functioning feature. Example: getUserData, calculateTotal
   - Camel Case: Use camelCase for function and method names. Start the first word with a lowercase letter and capitalize the first letter of subsequent words. Example: fetchData, updateProfile
3. Component Naming
   - Pascal Case: Use PascalCase for component names. Capitalize the first letter of every word with no spaces between words. Example: UserService, HomePage
   - Clear Role: Class and component names should clearly convey their roles. Other developers should be able to understand the role of the class or component from its name.
4. Folder Directory File Naming: All files in src folders except routes and type folders should be unified as index.
   - Component Folders
     - Capital Letters and Pascal Case: File names should start with a capital letter with no spaces between words
   - Other Folders
     - Lowercase and Hyphens: File names should be written in lowercase, with multiple words separated by hyphens. Example: user-service.js, home-page.tsx
   - File Extensions: Set file extensions according to the file type. Example: .ts, .tsx

Following consistent naming conventions improves code readability and maintains consistency in collaboration. Ensure all developers share and follow naming conventions.

### 2.7. Code Formatting

Consistent code formatting improves readability and facilitates collaboration.

Below are guidelines for code formatting, organized in order.

- Leave one line between major categories (1,2,3...)
- Do not leave lines between subcategories (a,b,c...)

  1. import Module

     ```jsx
     import {
       Box,
       Flex,
       FormControl,
       FormLabel,
       Input,
     } from "@chakra-ui/react";
     import { useMemo } from "react";
     import { useForm } from "react-hook-form";

     import { CodeSelect } from "@mobyen-frontend/common";
     import useUserRoles from "features/user/hooks/useUserRoles";
     ```

     1. External modules: Sort alphabetically based on what comes after from
     2. Internal modules: Sort alphabetically based on what comes after from

  2. interface: Sort contents alphabetically within scope

     ```jsx
     interface SearchPanelProps {
       isSearching: boolean;
       onChange: (param: {
         email: string | null,
         ext: string | null,
         mobile: string | null,
         name: string | null,
         tel: string | null,
         userRole: string | null,
         useYN: string | null,
       }) => void;
       onReset: () => void;
     }
     ```

  3. defaultProps: Sort contents alphabetically within scope

     ```jsx
     const defaultProps = {
       isSearching: false,
       onChange(_param: {
         email: null,
         ext: null,
         mobile: null,
         name: null,
         tel: null,
         userRole: null,
         useYN: null,
       }) {},
       onReset() {},
     };
     ```

  4. component

     ```jsx
     function SearchPanel({ isSearching, onChange, onReset }: SearchPanelProps) {
       const { handleSubmit, register, reset, resetField } = useForm<{
         search: string;
         searchType?: "email" | "ext" | "mobile" | "name" | "tel";
         useYN: string;
         userRole: string;
       }>();

       const { data: userRoles } = useUserRoles({ publicYN: "Y" });

       const handleFormSubmit = handleSubmit(
         ({ search, searchType, userRole, useYN }) => {
           let email = null;
           let ext = null;
           let mobile = null;
           let name = null;
           let tel = null;
           if (searchType) {
             email = searchType === "email" ? search : null;
             ext = searchType === "ext" ? search : null;
             mobile = searchType === "mobile" ? search : null;
             name = searchType === "name" ? search : null;
             tel = searchType === "tel" ? search : null;
           } else {
             resetField("search");
           }
           onChange({
             email: email ?? null,
             ext: ext ?? null,
             mobile: mobile ?? null,
             name: name ?? null,
             tel: tel ?? null,
             userRole: userRole ? userRole : null,
             useYN: useYN ? useYN : null,
           });
         }
       );

       const handleResetButtonClick = () => {
         reset();
         onReset();
       };

       const userRoleOptions = useMemo(
         () =>
           userRoles?.map((role) => ({
             code: String(role.id),
             name: role.name ?? "",
           })) ?? [],
         [userRoles]
       );
       const searchTypeOption = [
         {
           code: "name",
           name: "Name",
         },
         {
           code: "email",
           name: "Email",
         },
         {
           code: "tel",
           name: "Phone Number",
         },
         {
           code: "ext",
           name: "Extension Number",
         },
         {
           code: "mobile",
           name: "Mobile Number",
         },
       ];

       return (
         <Flex
           as="form"
           flexDirection="column"
           gap={2}
           onSubmit={handleFormSubmit}
           width="100%"
         >
           <Box
             borderBottomColor="black"
             borderBottomWidth="1px"
             borderTopColor="black"
             borderTopWidth="1px"
             p={3}
           >
             <FormControl>
               <FormLabel fontSize="xs" fontWeight="bold" htmlFor="userRole">
                 Search Conditions
               </FormLabel>
               <Flex flexWrap="wrap" gap={2}>
                 <CodeSelect
                   codes={userRoleOptions}
                   flex={{ md: 1 }}
                   id="userRole"
                   minWidth={{ md: "150px" }}
                   maxWidth={{ lg: "200px" }}
                   placeholder="Role"
                   {...register("userRole")}
                 />
                 <CodeSelect
                   codes={[
                     { code: "Y", name: "In Use" },
                     { code: "N", name: "Not in Use" },
                   ]}
                   flex={{ sm: 1 }}
                   id="useYN"
                   maxWidth={{ lg: "200px" }}
                   minWidth={{ md: "150px" }}
                   placeholder="Usage Status"
                   {...register("useYN")}
                 />
                 <CodeSelect
                   codes={searchTypeOption}
                   flex={{ sm: 1 }}
                   id="searchType"
                   maxWidth={{ lg: "170px" }}
                   minWidth={{ md: "130px" }}
                   placeholder="Search Condition"
                   {...register("searchType")}
                 />
                 <Input
                   flex={{ md: 2 }}
                   id="search"
                   maxWidth={{ lg: "300px" }}
                   minWidth={{ md: "200px" }}
                   placeholder="Search Term"
                   {...register("search")}
                 />
                 <Input
                   disabled={isSearching}
                   hidden
                   id="searchButton"
                   type="submit"
                 />
                 <Input
                   hidden
                   id="resetButton"
                   type="button"
                   onClick={handleResetButtonClick}
                 />
               </Flex>
             </FormControl>
           </Box>
         </Flex>
       );
     }
     ```

     1. React hooks: Sort alphabetically based on declaration name
     2. Custom hooks: Sort alphabetically based on declaration name
     3. useState: Sort alphabetically based on first state variable
     4. function: Sort alphabetically based on declaration name
     5. useEffect
     6. watch functions

  5. defaultProps

     ```jsx
     SearchPanel.defaultProps = defaultProps;
     ```

  6. export default

     ```jsx
     export default SearchPanel;
     ```

### 2.8. Error Handling

Properly handling errors in applications improves stability and response to exceptional situations. Below are guidelines for error handling.

1. Exception Handling: Implement appropriate exception handling for code blocks where exceptions may occur. This involves using try-catch statements to catch exceptions, outputting appropriate log messages, or displaying error messages to users.
2. Error Handling: Implement error handling at the highest level of the application. This involves displaying notifications and providing appropriate guidance to users when unexpected exceptions occur.
3. Logging: Record logs and include traceable information when errors occur. This can help with debugging and problem-solving.
4. User Feedback: Provide appropriate feedback to users when errors occur. This can help users understand and deal with problem situations.
5. Exception Handling Module: Modularize handling of common exceptions in the application to improve reusability.

It's good to consider potential exceptional situations in advance and implement appropriate error handling to improve stability and user experience.

## 3. Project Structure

### 3.1. File and Folder Structure
