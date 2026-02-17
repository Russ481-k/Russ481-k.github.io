---
title: "Entasis Engine - AI 모델 설계"
date: "2025-02-13"
category: "projects"
description: "가상자산 데이터 분석 시스템의 AI 모델 아키텍처 및 구현 상세"
tags:
  [
    "ai",
    "machine-learning",
    "deep-learning",
    "lstm",
    "ensemble",
    "prediction",
    "risk-analysis",
  ]
thumbnail: ""
---

# 금융 데이터 분석 시스템 AI 모델 설계

## 모델 아키텍처 개요

### 1. 예측 모델 구조

#### 1.1 LSTM 기반 시계열 예측

```python
class PricePredictionLSTM(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers, output_dim):
        super().__init__()
        self.lstm = nn.LSTM(
            input_dim,
            hidden_dim,
            num_layers,
            batch_first=True,
            dropout=0.2
        )
        self.fc = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        predictions = self.fc(lstm_out[:, -1, :])
        return predictions
```

#### 1.2 앙상블 모델 구성

```python
class EnsembleModel:
    def __init__(self):
        self.models = {
            'lstm': PricePredictionLSTM(...),
            'random_forest': RandomForestRegressor(...),
            'xgboost': XGBRegressor(...),
            'lightgbm': LGBMRegressor(...)
        }
        self.weights = {
            'lstm': 0.4,
            'random_forest': 0.2,
            'xgboost': 0.2,
            'lightgbm': 0.2
        }
```

### 2. 특징 엔지니어링

#### 2.1 기술적 지표

```python
def calculate_technical_indicators(df):
    # 이동평균
    df['sma_20'] = df['close'].rolling(window=20).mean()
    df['sma_50'] = df['close'].rolling(window=50).mean()

    # RSI
    delta = df['close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    df['rsi'] = 100 - (100 / (1 + gain/loss))

    # MACD
    exp1 = df['close'].ewm(span=12, adjust=False).mean()
    exp2 = df['close'].ewm(span=26, adjust=False).mean()
    df['macd'] = exp1 - exp2
    df['signal'] = df['macd'].ewm(span=9, adjust=False).mean()

    return df
```

#### 2.2 시장 감성 분석

```python
def analyze_market_sentiment(text_data):
    sentiment_model = pipeline(
        "sentiment-analysis",
        model="finbert-sentiment"
    )
    scores = sentiment_model(text_data)
    return aggregate_sentiment_scores(scores)
```

## 학습 파이프라인

### 1. 데이터 전처리

#### 1.1 시계열 데이터 준비

```python
def prepare_time_series(data, sequence_length):
    sequences = []
    targets = []

    for i in range(len(data) - sequence_length):
        seq = data[i:(i + sequence_length)]
        target = data[i + sequence_length]
        sequences.append(seq)
        targets.append(target)

    return np.array(sequences), np.array(targets)
```

#### 1.2 데이터 정규화

```python
def normalize_features(data):
    scaler = MinMaxScaler()
    normalized_data = scaler.fit_transform(data)
    return normalized_data, scaler
```

### 2. 모델 학습

#### 2.1 LSTM 학습 프로세스

```python
def train_lstm_model(model, train_loader, val_loader, epochs):
    optimizer = optim.Adam(model.parameters())
    criterion = nn.MSELoss()

    for epoch in range(epochs):
        model.train()
        for batch_X, batch_y in train_loader:
            optimizer.zero_grad()
            outputs = model(batch_X)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()

        # 검증
        model.eval()
        val_loss = validate_model(model, val_loader, criterion)
        print(f'Epoch {epoch}: Val Loss = {val_loss:.4f}')
```

#### 2.2 앙상블 모델 통합

```python
def ensemble_predict(models, weights, X):
    predictions = []
    for model_name, model in models.items():
        pred = model.predict(X)
        predictions.append(pred * weights[model_name])
    return np.sum(predictions, axis=0)
```

## 성능 평가

### 1. 평가 메트릭

#### 1.1 예측 정확도 평가

```python
def evaluate_predictions(y_true, y_pred):
    metrics = {
        'mse': mean_squared_error(y_true, y_pred),
        'mae': mean_absolute_error(y_true, y_pred),
        'r2': r2_score(y_true, y_pred),
        'mape': mean_absolute_percentage_error(y_true, y_pred)
    }
    return metrics
```

#### 1.2 백테스팅

```python
def backtest_strategy(model, historical_data, initial_capital=10000):
    portfolio = Portfolio(initial_capital)
    signals = generate_trading_signals(model, historical_data)

    for timestamp, signal in signals.items():
        if signal > 0:
            portfolio.long_position(timestamp)
        elif signal < 0:
            portfolio.short_position(timestamp)

    return portfolio.calculate_returns()
```

## 리스크 관리

### 1. 리스크 모니터링

#### 1.1 Value at Risk (VaR) 계산

```python
def calculate_var(returns, confidence_level=0.95):
    return np.percentile(returns, (1 - confidence_level) * 100)
```

#### 1.2 Expected Shortfall

```python
def calculate_expected_shortfall(returns, var):
    return returns[returns <= var].mean()
```

### 2. 포지션 사이징

```python
def calculate_position_size(prediction, confidence, account_size):
    base_size = account_size * 0.02  # 2% 리스크 룰
    adjusted_size = base_size * confidence
    return min(adjusted_size, account_size * 0.05)  # 최대 5% 제한
```

## 배포 및 모니터링

### 1. 모델 서빙

#### 1.1 모델 직렬화

```python
def save_model(model, path):
    torch.save({
        'model_state_dict': model.state_dict(),
        'hyperparameters': model.hyperparameters,
        'scaler': model.scaler
    }, path)
```

#### 1.2 실시간 추론

```python
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prediction = model.predict(preprocess_data(data))
    confidence = calculate_prediction_confidence(prediction)
    return jsonify({
        'prediction': prediction,
        'confidence': confidence
    })
```

### 2. 성능 모니터링

```python
def monitor_model_performance(predictions, actuals):
    metrics = calculate_metrics(predictions, actuals)
    alert_if_degraded(metrics)
    log_performance(metrics)
```

이 문서는 금융 데이터 분석 시스템의 AI 모델 설계 및 구현 상세를 제공합니다. 모델은 지속적으로 개선되며, 성능 메트릭과 리스크 관리 전략도 함께 업데이트됩니다.
