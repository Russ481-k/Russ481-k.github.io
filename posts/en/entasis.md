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
3. 최소 단위기간에 1인이 감당할 수 있는 작업량에 대해 명확한 기준이 없이 무리하게 기능을 추가하여 4주라는 시간 대비 과한 범위를 적용하였고 그 범위를 재설정하는 것에 적지 않은 시간이 소요되었다.
4. 차트 이외에 트렌젝션 데이터와 유저 수익률 및 트랜잭션 데이터를 검색엔진에 노출되기 어려운 CSR형태로 구현하였다.
5. 상태관리 라이브러리를 활용하지 못하여 실시간 가격(currentPrice)이 자식 컴포넌트로 깊게 내려가는 props drilling 현상이 발생했다.
6. 잘못된 접근을 알리는 404페이지를 구현하였으나, 지갑이 등록 되었을 경우에만 접근할 수 있는 페이지로 구분하지 못했다.
7. 서버와의 통신을 HTTP요청을 통해 구현하여 대규모 트래픽에 대비하지 못했다.

## Future Action

1. 프로젝트를 진행함에 따라 그 기간을 어떻게 설정해야 적절한지 알 수 있었고 그것을 측정하는 것 또한 프로젝트의 중요한 부분이라는 점을 알 수 있었다. 프로젝트 초기부터 CPM을 설정하여 진행상황 평가를 공유하며 작업 진도에 대한 합의를 하는 것이 필요하다는 것을 알 수 있었다.
2. NEXTJS를 통해 SSR을 구현, SEO를 실현할 수 있는, 사용자들에게 노출될 수 있는 웹 서비스로 구현해야겠다.
3. 효율적인 컴포넌트 구조를 찾기 위해 Redux, Mobx, Recoil 등의 상태관리 라이브러리와 리액트의 컴포지션, 컨택스트, 포탈을 사용을 고려하여 데이터 흐름 최적화에 대한 고민을 해야겠다.
4. 지갑의 등록되었을 경우에만 볼 수 있는 버튼을 구현함으로 유저데이터를 안전하게 관리하는 접근 영역이 명료한 웹 서비스로 리팩토링해야겠다.
5. 데이터 처리에 대한 피드백 받은 내용을 토대로 실시간 데이터 연동 웹소켓을 적용해야겠다.

## **기술적 문제 해결**

- **랜더링 최적화**에 문제가 있었다. **프로젝트 종료 3일 전**에 거래 토큰 다양화 과정에서 실시간 차트 **데이터 요청이 기하급수로 늘어나는 것**을 보았다. **웹은 시간이 갈수록 무거워졌고 DB의 용량이 무한히 커졌으며 체인 네트워크는 수 시간 만에 8G의 용량을 소진해 버렸다.** 같은 내용을 랜더링 하지 않는 **useMemo**나 랜더링을 최소화하기 위해 상태를 전역으로 관리하는 **Redux** 사용을 고려 하였으나, 우선 기존의 작성되었던 모든 **useEffect의 디펜던시**를 확인 해 보았다. 차트 데이터, 실시간 데이터, 실시간 데이터들의 일정시간 경과 후 차트 배열에 축적 시키는 과정에서 useEffect의 디펜던시에 해당 **요소 값**이 전부 들어가 있었다. 즉 **차트에 포함되는 함수와 배열이 변경될 때 마다 관련된 모든 컴포넌트에서 리랜더링이 일어났던 것**이다. 해당 디펜던시에 난수 적용 **단위 기간과 같은 간격으로 비동기 처리**를 할 수 있도록 했더니 기하급수 리랜더링 문제는 해결되었다.
- **캔들 차트**에서 **스크롤 이벤트**에 대한 이해 없이 작업을 진행하다 보니, 차트를 제외한 페이지와의 **스크롤 값 충돌** 문제와 **마우스 포인터의 값**을 구하는 작업에 어려움을 느꼈다. 입력되는 스크롤 값에 대해 차트 컴포넌트와 메인페이지와의 입력 값의 구분이 필요했고 **스크롤을 제한하고 제한을 푸는 작업**이 필요하다 생각했다. 해당 키워드로 검색해보니, **document.body.style.overflow의 값을 unset과 hidden으로 독립**시킬 수 있다는 것을 알게 되었고, 메인페이지에서 스크롤을 할 때마다 차트에 영향을 주는 문제를 해결했다.
- **SVG**를 통해 차트의 가격 높이 값과 거래량 높이 값을 설정해 준 후 **마우스 포인터의 위치에 비례한 값**을 보여주는 것에서 어려움이 있었다. 분명 해당 가격의 소수점 둘째 자리까지 **정확히** 맞아 떨어지는 것을 확인했는데, 며칠 뒤에 그 값이 **음수**로 바뀌어 있었다. 당혹스러웠지만 다시 살펴 보았다. 차트의 위치 값은 위로 **올라갈수록** 커지지만 마우스의 위치 값은 **아래로 내려올수록** 커진다는 것에서 값이 반전되거나 음수를 출력하는 문제가 발생한 것이었다. **방정식**으로 정확한 값을 구할 수 있었으나 잘못된 식을 대입했었고 **차트와 거래량 간의 값 차이**를 생각하지 않고 동일한 요소 값을 설정 했던 것에서 문제가 발생했음을 깨닫고 **캔들은 최댓값과 최솟값**이 달라질 수 있지만 **거래량은 최솟값이 0으로 고정**인 것을 이해하여 오류를 해결했다.

### 프로젝트를 마치며

NEXTjs를 통해 SSR을 구현하여 SEO를 구현하기를 바란다.

서버의 차트데이터 로직 구현 외 백엔드와 컨트랙트 부분에 역할을 맡지 못한 점 또한 추후 솔로 프로젝트로 구현해야겠다.
