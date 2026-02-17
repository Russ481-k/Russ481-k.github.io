---
title: "Entasis Engine - UI/UX  "
date: "2025-02-13"
category: "projects"
description: "         "
tags:
  [
    "ui",
    "ux",
    "design",
    "wireframe",
    "component",
    "responsive",
    "accessibility",
  ]
thumbnail: ""
---

#     UI/UX  

##   

### 1.  

```css
:root {
  /*   */
  --primary-100: #e3f2fd;
  --primary-500: #2196f3;
  --primary-900: #0d47a1;

  /*   */
  --secondary-100: #f3e5f5;
  --secondary-500: #9c27b0;
  --secondary-900: #4a148c;

  /*   */
  --success: #4caf50;
  --warning: #ffc107;
  --error: #f44336;
  --info: #2196f3;

  /*   */
  --neutral-100: #f5f5f5;
  --neutral-300: #e0e0e0;
  --neutral-500: #9e9e9e;
  --neutral-700: #616161;
  --neutral-900: #212121;
}
```

### 2. 

```css
:root {
  /*   */
  --font-primary: "Inter", sans-serif;
  --font-secondary: "Roboto Mono", monospace;

  /*   */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */

  /*   */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-bold: 700;
}
```

### 3.  

```css
.container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-4);

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

##   

### 1.  

#### 1.1  

```typescript
interface CandlestickProps {
  data: {
    timestamp: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  width?: number;
  height?: number;
  theme?: "light" | "dark";
}

const Candlestick: React.FC<CandlestickProps> = ({
  data,
  width = 800,
  height = 400,
  theme = "light",
}) => {
  //  
};
```

#### 1.2  

```typescript
interface TechnicalIndicatorProps {
  type: "MA" | "RSI" | "MACD";
  data: number[];
  parameters: {
    period?: number;
    signal?: number;
  };
}
```

### 2.  

```typescript
interface DashboardLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  header,
  main,
  footer,
}) => (
  <div className="dashboard-layout">
    {sidebar && <aside className="sidebar">{sidebar}</aside>}
    <div className="main-content">
      {header && <header className="header">{header}</header>}
      <main className="main">{main}</main>
      {footer && <footer className="footer">{footer}</footer>}
    </div>
  </div>
);
```

##   

### 1.  

```mermaid
graph TD
    A[ ] --> B[  ]
    B --> C{  }
    C -->| | D[ ]
    C -->|AI | E[ ]
    D --> F[  ]
    E --> F
    F --> G[ ]
    G --> H[ ]
    H --> I[]
```

### 2.  

```mermaid
graph TD
    A[ ] --> B[  ]
    B --> C[ ]
    C --> D{ ?}
    D -->|Yes| E[]
    D -->|No| F[ ]
    E --> G[ ]
    G --> F
```

##   

### 1. 

```scss
$breakpoints: (
  "mobile": 320px,
  "tablet": 768px,
  "desktop": 1024px,
  "wide": 1440px,
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}
```

### 2.  

```scss
.trading-view {
  display: grid;
  gap: 1rem;

  @include respond-to("mobile") {
    grid-template-columns: 1fr;
  }

  @include respond-to("tablet") {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to("desktop") {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

##  

### 1. ARIA 

```typescript
const PriceAlert: React.FC = () => (
  <div role="alert" aria-live="polite" aria-atomic="true">
    <span className="price-change">+5.23%</span>
  </div>
);
```

### 2.  

```typescript
const TradingPanel: React.FC = () => {
  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        incrementPrice();
        break;
      case "ArrowDown":
        decrementPrice();
        break;
      case "Enter":
        submitOrder();
        break;
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyPress}
      role="region"
      aria-label=" "
    >
      {/*    */}
    </div>
  );
};
```

##   

### 1.  

```typescript
const usabilityTests = [
  {
    name: "  ",
    steps: [
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    success_criteria: [
      "3  ",
      "  ",
      "  4/5 ",
    ],
  },
];
```

### 2.  

```typescript
interface UserFeedback {
  task: string;
  completion_time: number;
  error_count: number;
  satisfaction: number;
  comments: string;
}
```

      UI/UX   .      ,   . 
