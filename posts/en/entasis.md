---
title: "Entasis"
date: "2024-03-20"
category: "projects"
description: "Digital Asset Exchange Development"
tags:
  [
    "React",
    "Express",
    "MySQL",
    "Web3.js",
    "AWS",
    "Ganache",
    "Truffle",
    "ERC20",
    "MetaMask",
    "Figma",
  ]
thumbnail: "/images/entasis/entasis_circuit.gif"
---

## 1. Introduction

- Project Name: ENTASIS
- Github Link: [GitHub - codestates-beb/BEB-07-final-entasis](https://github.com/codestates-beb/BEB-07-final-entasis)
- Blockchain Network Address: [http://18.183.252.200:8545](http://18.183.252.200:8545/) Chain ID: 1337

### Yoon Subin

- Position: PM / Full Stack / Design
- Personal Github: https://github.com/Russ481-k
- Tech Stack: Figma / Javascript / React / HTML / CSS / MySQL / Sequelize / Node.js / Scale-Liner / Axios
- Implemented Features:
  - Project Planning & Management
  - Design Conceptualization and Implementation
  - Frontend UI/UX Implementation
  - Chart Implementation
  - Data Requests through Server APIs
  - Real-time Data Generation Implementation

## 2. Project Overview

[ STO Exchange "ENTASIS" ]
![Trading](/images/entasis/entasis_trade.gif)

The goal of this project is to help investors understand what STOs are, what features they have, and how to invest in them, thereby expanding investment in security tokens.

[Larry Fink Interview](https://www.youtube.com/watch?v=0fmODCTVs0g)

In an interview on December 1, 2022, BlackRock CEO Larry Fink stated that through STOs, broker fees included in current securities trading costs would be distributed to trading parties, lowering fees, and ST holders would be able to vote.

Larry Fink's perspective on STOs helped inform our project topic selection.

[STO Explanation Video](https://www.youtube.com/watch?v=PSVpth7uqb4&t=650s)

The tokens we commonly know are 'utility tokens' based on ICOs.

So what is an STO?

![STO Explanation](/images/entasis/entasis_sto.png)

First, we need to understand what "Security Tokens" are, which form the basis of STOs.

Security tokens (ST) are securities issued by companies in cryptocurrency form instead of stocks or bonds. These security tokens represent legal ownership in the company, rather than just rights to use services provided by the blockchain platform.

Therefore, holding security tokens allows you to receive dividends from the company's profits or blockchain platform assets.

Since security tokens serve the same purpose as securities like stocks and bonds, they must be subject to legal and policy regulation. They must be issued according to relevant laws, just as stocks are issued according to commercial law procedures.

STO refers to listing these security tokens for trading, similar to an IPO.

![STO Explanation 2](/images/entasis/entasis_sto2.png)

[ About Service ]
Entasis is an "STO Exchange Tutorial" that helps individual investors better understand and approach security tokens by allowing them to invest in actual STs, with some features of real STO exchanges scaled down.

## 3. Basic Environment Setup

### Token Price Formation and Volatility

While prices are typically formed through Market Maker & Market Taker trading in real exchanges, we implemented price formation through random numbers due to the tutorial nature of this project and limited expected traffic.

We created three ST markets with short-term volatility, medium-long term volatility, and company quarterly profit announcements set by random numbers. Dividends are distributed according to shareholding ratio by applying dividend rates to quarterly profits.
Token holders can vote according to their shareholding ratio.

### Blockchain

Ethereum: We ran the Ganache network in the background on an EC2 instance and deployed contracts using Truffle.
We fundamentally used ERC20 for token trading functionality and extracted operator/controller variables and trading restriction functions from ERC1400 to add some security token features.
We deployed three contracts diversifying into three companies, as investors need to analyze and trade various tokens. When token trades occur, holder arrays store token ownership to verify dividend distribution eligibility.
All staking features were implemented within the contract to enforce trading restrictions during staking, using block.timestamp to verify expiration.

## 4. Project Documentation

I want to document Project Entasis using the 4F method.

- Fact: Document what issues were considered through the project and how concepts were understood and problems solved
- Feeling: Honestly record emotions felt during project progress
- Finding: Record what was learned while solving problems and areas needing improvement in attempted solutions
- Future Action: Record learning methods to apply in the next project, items needing more consideration, communication methods, etc.

### Fact

Key Features

- **Main page centered on real-time price movement charts updating every second**
  - Charts can be adjusted to view candles in 1min, 15min, 1hr, 4hr, 1day, 1week units
  - When chart is focused, scroll value adjusts chart range rather than page height by setting candle width values
  - When chart is focused, crosshair coordinates are displayed with point values shown at corresponding heights for price and volume areas
- **Wallet Registration via MetaMask**

![MetaMask Integration](/images/entasis/entasis_metamask.png)

- Aiming for WEB3.0, user state is managed primarily through wallets
- No separate signup needed; automatic login with MetaMask wallet registration
- Redirects to MetaMask installation link if not installed
- Registers new MetaMask wallets in DB on first login

- **Tutorial and Usage Instructions**
  ![Tutorial](/images/entasis/entasis_tutorial.gif)

  - Uses CSS transitions to move modals while conveying overall service usage to users
  - Implemented as modal process tutorial rather than forcing actual trading experience due to concerns about mandating profit/loss experiences

- **FAUCET: Initial Capital of 50ETH**

![Tutorial Process](/images/entasis/entasis_tutorial.gif)

![Faucet](/images/entasis/entasis_faucet.png)

- Automatically grants 50ETH through faucet feature upon tutorial completion
- Faucet limited to one-time use

- **Security Token Purchase and Sale using ETH**

![Trading Fees](/images/entasis/entasis_sign.png)

- Users can buy and sell tokens based on real-time price changes
- Investors sign transactions through MetaMask for token trading

![Trading Fees](/images/entasis/entasis_fee.png)

- Trading fee automatically calculated at 0.04% of transaction amount

- **Dividend Voting**

![Voting](/images/entasis/entasis_vote.gif)

- Dividend rate voting conducted to determine rate for dividends paid every 10 minutes
- Dividends received even without voting

- **Dividend Distribution**
  ![Dividends](/images/entasis/entasis_dividend.gif)
  - Dividends paid according to investor's token holdings relative to totalSupply per token

[Transaction History Before Dividend Payment]
![Trade History](/images/entasis/entasis_trade.gif)

[Transaction History After Dividend Payment]
![Post-Trade History](/images/entasis/entasis_after_trade.png)

When dividend payment time shown below website logo passes, dividends are automatically paid and recorded in History.

- **Trading Restrictions (Circuit Breaker)**

![Circuit Breaker](/images/entasis/entasis_circuit_breaker.png)

- Restricts trading on all tokens in case of extreme price volatility
- Trading disabled for 1 minute with token prices frozen
- Due to unlikely extreme price movements in this project, circuit breaker activates via button press to demonstrate trading restriction functionality

[Circuit Breaker Activation]
![Circuit Breaker Activation](/images/entasis/entasis_circuit.gif)

[Circuit Breaker Deactivation]
![Circuit Breaker Deactivation](/images/entasis/entasis_circuit_end.gif)

- **Staking Feature**
  ![Staking](/images/entasis/entasis_staking.png)
  - Staking involves depositing digital assets to blockchain network, similar to bank deposits
  - Means lending held digital assets for blockchain validation
  - When staking, tokens are deposited for a period and returned with relatively high interest rewards upon maturity
  - However, tokens cannot be used during staking period - even if price changes make you want tokens back, they cannot be withdrawn during this period

[When Requesting Staking]
![Staking Screen 1](/images/entasis/entasis_staking_1.png)

- Users click Staking button to send MetaMask-signed data to desired ST contract
- Returns error if already staking or token balance less than entered Amount
- Upon successful staking, Amount List and Reward List update with remaining reward time shown

[When Withdrawing Rewards]
![Staking Screen 2](/images/entasis/entasis_staking_2.png)

- When Reward Time changes to "Able", users can click Reward button to send MetaMask-signed reward withdrawal function data
- Contract verifies maturity date and sends staked Amount plus Reward if valid
  - Reward button disabled if not matured
- Amount List and Reward List reset to 0 after token and reward transfer

# [About Dev]

## Tech Stack

![Tech Stack](/images/entasis/entasis_tech_stack.png)

## Wireframe

https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FHP5FZix2FedecrcLWhUsb7%2FProject_Entasis%3Fnode-id%3D0%253A1%26t%3DL4XWojmyo6BCQvJK-1

## Flowchart

- **Chart Data Flow**

https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FjC6wwRAyBiQJ8Y0nB6iyiH%2FUntitled%3Fnode-id%3D0%253A1%26t%3DrlPZeEHfPYzyxIO4-1

## Architecture

![Architecture](/images/entasis/entasis_arch.png)

The architecture consists of static host pages using S3, service server using EC2, cloud database server, and blockchain network server.

- CI/CD pipeline configured using Github Actions for automatic deployment on Github pushes
- Client deployed through AWS IAM S3 access, blockchain network runs Ganache in background on AWS EC2
- Server designed for automatic background service using Docker and Github Container Registry on EC2

## Database Schema Diagram

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7a81b8d5-5578-4f17-9037-10eedb81a23a/Untitled.png)

## API Documentation

[API Documentation](https://www.notion.so/API-feb98146eeb4481193df2505f966b9c6?pvs=21)

## Smart Contract and Token Economy Design

[Smart Contract Design](https://www.notion.so/ebe74ce3e9af4b7db5edf7ae39c7728e?pvs=21)

## Feeling

The 4-week period was meaningful in implementing volatility and market forms. Most memorable was sharing the joy of growing assets as team members shared their returns.

While we wanted to cover NFTs and derivatives like futures/options, time constraints left us wanting more.

It was valuable time learning we could implement services ourselves and identifying needed technologies.

## Finding

1. Without clear criteria for manageable workload per minimum time unit, we over-ambitiously added features requiring significant time to rescope relative to 4 weeks
2. Implemented transaction data, user returns and transaction data in CSR form difficult for search engines to index beyond charts
3. Without clear criteria for manageable workload per minimum time unit, we over-ambitiously added features requiring significant time to rescope relative to 4 weeks
4. Chart data and transaction data and user returns data are implemented in CSR form difficult for search engines to index beyond charts
5. We did not use state management libraries and experienced props drilling phenomenon where real-time price (currentPrice) goes deeply into child components
6. We implemented a 404 page to indicate incorrect access, but failed to separate pages that can only be accessed if a wallet is registered
7. We implemented server communication through HTTP requests and did not handle large-scale traffic

## Future Action

1. As we progressed, we learned how to set the project duration appropriately and how to measure it, which is an important part of the project. It was valuable to set CPM from the beginning of the project and share progress evaluations to reach an agreement on the project's progress.
2. We need to implement SSR through NEXTJS to achieve SEO and create a web service that can be exposed to users.
3. To find an efficient component structure, we need to consider using state management libraries like Redux, Mobx, Recoil and React's composition, context, and portal to optimize data flow.
4. We need to refactor the web service to be a secure web service that can only be accessed if a wallet is registered by implementing a button that can only be viewed if a wallet is registered.
5. We need to apply a real-time data-linked web socket based on feedback on data processing.

## **Technical Problem Solving**

- There was an issue with **rendering optimization**. **3 days before project completion**, we observed **exponential growth in data requests** for real-time charts during token diversification. **The web became increasingly heavy over time, DB capacity grew infinitely, and the chain network consumed 8G of capacity within hours.** We considered using **useMemo** to avoid rendering the same content or **Redux** for global state management to minimize rendering, but first checked all **useEffect dependencies** in existing code. Chart data, real-time data, and the process of accumulating real-time data into chart arrays after a certain time period had all their **element values** in useEffect dependencies. In other words, **re-rendering occurred in all related components whenever functions and arrays included in charts changed**. The exponential re-rendering issue was resolved by applying **asynchronous processing at intervals matching random number generation periods** to those dependencies.

- Working on the **candlestick chart** without understanding **scroll events** led to difficulties with **scroll value conflicts** between the chart and other pages, and obtaining **mouse pointer values**. We needed to distinguish between input values for the chart component and main page, and thought we needed to work on **restricting and unrestricting scrolling**. Searching these keywords, we learned we could **isolate document.body.style.overflow values between unset and hidden**, resolving the issue of main page scrolling affecting the chart.

- After setting price height and volume height values through **SVG**, we faced challenges showing values **proportional to mouse pointer position**. While we confirmed values matched precisely to two decimal places, days later those values had become **negative**. Upon review, we realized chart position values **increase upward** while mouse position values **increase downward**, causing value inversion and negative output issues. While we could find exact values using **equations**, we had applied incorrect formulas and set identical element values without considering **differences between chart and volume values**. We resolved the error by understanding that while **candles can have different max and min values**, **volume has a fixed minimum of 0**.

### At the end of the project

I hope to implement SSR through NEXTjs to achieve SEO.

In addition to implementing the chart data logic on the server, I also failed to take on the role of the backend and contract parts in the future solo project.
