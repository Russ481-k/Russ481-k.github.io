---
title: "Convention Document"
date: "2024-03-20"
category: "frontend"
description: " "
tags: ["Convention", "Documentation"]
thumbnail: ""
---

## 1. 

1.  :        .
2.   :       .
3.   :           .
4.   :         .
5.  :           .

## 2.   

### 2.1. 

1. Prettier   .

### 2.2.  

     .        .

1.  
   -          .
   -     .
   -        . : myVariable, userName
2.   
   -    let  . : let count = 0;
   -        .
3.   
   -    const  . : const PI = 3.14;
   -        .
4.   
   -        .
   -            .

        .        ,          .

### 2.3.  

         .        .

1.   
   -     .    ,    .
   -     ,      .
2.    
   -        . : calculateTotal, loginUser
   -          .
   -      (camelCase)  . : calculateTaxAmount, loginUserWithCredentials
3.   
   -     (parameter)   .
   -       ,        .
4.   
   -        .
   -    ,        .
5.   
   -    (scope)  .         ,     .

      .      ,       .

### 2.4. 

        .        .

1.  
   -  UI   .         .
   -      ,    .     .
2.   
   -     .
   -       . : User, LoginForm, Header
3.  
   -        .        .
   -        ,     .

       .           .

### 2.5. 

        .          .     .

1.  
   -       .
   -         .
2.   
   -     .
   -       .       .
   -     ,     .
   -      .

     .           .

### 2.6.  

        .     .

1.   
   -  :        .          .
   -  :      .    ,      . : firstName, userAge
   - :     .     ,      .
2.   
   -  :      .      . : getUserData, calculateTotal
   -  :      .    ,      . : fetchData, updateProfile
3.  
   -  :     .      ,    . : UserService, HomePage
   -  :        .           .
4.    : routes type  src      index .
   -  
     -   :      ,    
   -  
     -  :    ,    . : user-service.js, home-page.tsx
   -  :       . : .ts, .tsx

            .       .

### 2.7.  

       .

      .

- (1,2,3…)    .
- (a,b,c…)  .

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

     1.  : from  ,   .
     2.  : from  ,   .

  2. interface:       .

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

  3. defaultProps:       .

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
           name: "",
         },
         {
           code: "email",
           name: "",
         },
         {
           code: "tel",
           name: "",
         },
         {
           code: "ext",
           name: "",
         },
         {
           code: "mobile",
           name: "",
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
                 
               </FormLabel>
               <Flex flexWrap="wrap" gap={2}>
                 <CodeSelect
                   codes={userRoleOptions}
                   flex={{ md: 1 }}
                   id="userRole"
                   minWidth={{ md: "150px" }}
                   maxWidth={{ lg: "200px" }}
                   placeholder=""
                   {...register("userRole")}
                 />
                 <CodeSelect
                   codes={[
                     { code: "Y", name: "" },
                     { code: "N", name: "" },
                   ]}
                   flex={{ sm: 1 }}
                   id="useYN"
                   maxWidth={{ lg: "200px" }}
                   minWidth={{ md: "150px" }}
                   placeholder=""
                   {...register("useYN")}
                 />
                 <CodeSelect
                   codes={searchTypeOption}
                   flex={{ sm: 1 }}
                   id="searchType"
                   maxWidth={{ lg: "170px" }}
                   minWidth={{ md: "130px" }}
                   placeholder=""
                   {...register("searchType")}
                 />
                 <Input
                   flex={{ md: 2 }}
                   id="search"
                   maxWidth={{ lg: "300px" }}
                   minWidth={{ md: "200px" }}
                   placeholder=""
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

     1.  :   ,   .
     2.  :   ,   .
     3. useState:    ,   .
     4. function:   ,   .
     5. useEffect
     6. watch 

  5. defaultProps

     ```jsx
     SearchPanel.defaultProps = defaultProps;
     ```

  6. export default

     ```jsx
     export default SearchPanel;
     ```

### 2.8.  

           .     .

1.  :           .  try-catch    ,           .
2.  :      .         ,       .
3. :         .        .
4.  :       .            .
5.   :            .

       ,          .

## 3.  

### 3.1.    

```jsx
- `package`:   
    - `app`:     
        - `node_modules`:     
        - `public`:    
        - `src`:    .
            - `api`:  API    .
            - `assets`:    (,  ) 
            - `components`:   React   
            - `features`:      
            - `libs`:    ,    
            - `redux`:  , ,   .
            - `routes`:     .
            - `type`:     .
            - `App.css`:    CSS  
            - `App.test.tsx`:     
            - `index.css`: index.html    CSS   
            - `index.tsx`: React DOM      .
            - `react-app-env.d.ts`: Create React App    TypeScript   
            - `reportWebVitals.ts`:        
            - `setupProxy.js`:      ,   API     .
            - `setupTest.ts`:     
            - `theme.ts`:     
    - `common`:     
        - `dist`:      
        - `src`:      
        - `package.json`:      
        - `tsconfig.json`:   TypeScript   
```

### 3.2.   

        .      .

1. :
   -     .      ,     .
   -    ,       .         .
   -    ,      API .
   -   ,        .
2.  :
   -  UI    .    UI    ,         .
   -     ,       .      .
   -     ,  UI     .     .
   -    ,    .
   -     ,        .

     ,        .            .

### 3.3.  

        .     .

1.    :
   -        .     ,     .
   -    Redux    .
2.   :
   -    .             .
3.   :
   -          .          .
   - React Context API, ReactQuery      .
4.   :
   -       . API ,                .
   - Redux-Thunk    .

### 3.4. 

             .    .

1.   :
   - React     React Router   .
2.  :
   -  URL        .
   -    URL   ,        .
3. :
   -         .
   - useNavigate react-router-dom Navigate     .
4.   :
   -        ,      .
     - AppLayout:    
     - NonAuthenticationLayout:    
   -  ,             .

   ,         .           .

## 4.  

### 4.1.   

             .       .

1.  :
   -        .
   -         ,       .
   -                .
2.  :
   -            .
   -   Font Awesome .
   -     ,           .
3.    :
   -     assets  .

### 4.2. .

      . Chakra UI         UI     .  Chakra UI     .

1. Chakra UI:
   -  Chakra UI .
   - ChakraProvider   Chakra UI  .
2.  :
   - Chakra UI       .      .
   -         .
   - Chakra UI ThemeProvider         .
3.  :
   - Chakra UI          .
   - "@chakra-ui/media-query"       .        .
4.  :
   -   Chakra UI     .
   -        .

Chakra UI            .          .

### 4.3.    

        .        .          :

1. emotion:
   - emotion CSS-in-JS , JavaScript   CSS    .          .
2. reduxjs:
   - reduxjs   ,         . redux        .
3. ag-grid-react:
   - ag-grid-react    ,       .           .
4. axios:
   - axios HTTP  ,       . REST API     .
5. date-fns:
   - date-fns JavaScript   ,        .   ,  ,     .
6. framer-motion:
   - framer-motion React    ,         .     .
7. lodash:
   - lodash JavaScript  ,    . , ,        .
8. quill:
   - quill    ,          . , ,        .
9. react-datepicker:
   - react-datepicker React    ,        .       .
10. web-vitals:
    - web-vitals      ,       .          .
11. xlsx:
    - xlsx Excel   ,     . Excel        .
12. monaco-editor:
    - monaco-editor     ,  ,  ,      .  IDE     .

              .          . 6. framer-motion:

- framer-motion React    ,         .     .

7. lodash:
   - lodash JavaScript  ,    . , ,        .
8. quill:
   - quill    ,          . , ,        .
9. react-datepicker:
   - react-datepicker React    ,        .       .
10. web-vitals:
    - web-vitals      ,       .          .
11. xlsx:
    - xlsx Excel   ,     . Excel        .
12. monaco-editor:
    - monaco-editor     ,  ,  ,      .  IDE     .

              .          .
