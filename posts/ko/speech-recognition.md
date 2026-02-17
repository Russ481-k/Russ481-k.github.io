---
title: "    "
date: "2025-02-12"
category: "frontend"
description: "     ,              ."
tags: ["voice", "algorithm", "similarity", "frontend", "sinei"]
thumbnail: ""
---

!          ,          ** **     .              .

---

## 1.    

        ,           .        .

### 1.1   

     ,    :

- **MFCC (Mel-Frequency Cepstral Coefficients):**         .
- **Spectrogram:**        .
- **PLP (Perceptual Linear Prediction):**         .
- **Chroma Features:**   ( )      .

---

### 1.2   

           :

- **HMM (Hidden Markov Model):**     ,    .
- **DTW (Dynamic Time Warping):**       .
- **GMM (Gaussian Mixture Model):**      .

---

### 1.3   

           .    :

- **RNN (Recurrent Neural Networks):**      ,
  - **LSTM (Long Short-Term Memory):**     RNN .
  - **GRU (Gated Recurrent Unit):** LSTM  .
- **CNN (Convolutional Neural Networks):**     .
- **Transformers:**        ,
  - **Wav2Vec:**     self-supervised 
  - **Conformer:** CNN Transformer     .

---

### 1.4   

   ,      :

- **n-gram:**     .
- **BERT (Bidirectional Encoder Representations from Transformers):**      .
- **GPT (Generative Pre-trained Transformer):**        .

---

### 1.5  

        :

- **Beam Search Decoding:**      .
- **CTC (Connectionist Temporal Classification):**       .
- **End-to-End Models:**       .

---

### 1.6      

        :

- **Noise Reduction:**   .
- **Echo Cancellation:** () .
- **Beamforming:**        .

---

### 1.7 Open Source     

         :

- **DeepSpeech:** Mozilla     .
- **Kaldi:**       .
- **Whisper:** OpenAI     .

---

## 2.      :   

       ,  ,        ** ** .         .

### 2.1  :  

  ,     .           .             .

---

### 2.2   :    

#### 2.2.1   (Levenshtein Distance)

     ** **          .         .

```tsx
// Levenshtein Distance ( )
const levenshteinDistance = (str1: string, str2: string): number => {
  const prev = Array(str1.length + 1).fill(0);
  const current = Array(str1.length + 1).fill(0);

  for (let i = 0; i <= str1.length; i++) prev[i] = i;

  for (let j = 1; j <= str2.length; j++) {
    current[0] = j;
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      current[i] = Math.min(
        prev[i] + 1, // 
        current[i - 1] + 1, // 
        prev[i - 1] + cost // 
      );
    }
    [prev, current] = [current, prev]; //  
  }

  return prev[str1.length];
};
```

** :**

-  2D   1D      50% ,   30% .

---

#### 2.2.2   (Jaccard Similarity)

           .          .

```tsx
// Jaccard Similarity ( )
const jaccardSimilarity = (str1: string, str2: string): number => {
  const set1 = new Set(str1.split(""));
  const set2 = new Set(str2.split(""));
  const intersection = [...set1].filter((x) => set2.has(x)).length;
  const union = new Set([...set1, ...set2]).size;
  return intersection / union;
};
```

** :**

-         20% ,   15% .

---

#### 2.2.3   (Initial Consonant Similarity)

       .  , **""** **""**       .

```tsx
//   ( )
const getInitialConsonants = (str: string): string => {
  const consonantsCache: { [key: string]: string } = {};
  return str
    .split("")
    .map((char) => {
      if (consonantsCache[char]) {
        return consonantsCache[char];
      }
      const code = char.charCodeAt(0) - 0xac00;
      if (code > -1 && code < 11172) {
        const consonant = initialConsonants[Math.floor(code / 588)];
        consonantsCache[char] = consonant;
        return consonant;
      }
      return char;
    })
    .join("");
};
```

** :**

-      ,    25%    10% .

---

### 2.3    

            .           .

```tsx
const initialConsonants = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

const similarityAlgorithm = (voiceText: string) => {
  //  :     
  const preprocessText = (str: string): string => {
    return str.replace(/\s+/g, "").toLowerCase();
  };

  //   ( )
  const getInitialConsonants = (str: string): string => {
    const consonantsCache: { [key: string]: string } = {};
    return str
      .split("")
      .map((char) => {
        if (consonantsCache[char]) {
          return consonantsCache[char];
        }
        const code = char.charCodeAt(0) - 0xac00;
        if (code > -1 && code < 11172) {
          const consonant = initialConsonants[Math.floor(code / 588)];
          consonantsCache[char] = consonant;
          return consonant;
        }
        return char;
      })
      .join("");
  };

  //   ( )
  const jaccardSimilarity = (str1: string, str2: string): number => {
    const set1 = new Set(str1.split(""));
    const set2 = new Set(str2.split(""));
    const intersection = [...set1].filter((x) => set2.has(x)).length;
    const union = new Set([...set1, ...set2]).size;
    return intersection / union;
  };

  //   ( )
  const levenshteinDistance = (str1: string, str2: string): number => {
    const prev = Array(str1.length + 1).fill(0);
    const current = Array(str1.length + 1).fill(0);
    for (let i = 0; i <= str1.length; i++) prev[i] = i;
    for (let j = 1; j <= str2.length; j++) {
      current[0] = j;
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        current[i] = Math.min(
          prev[i] + 1,
          current[i - 1] + 1,
          prev[i - 1] + cost
        );
      }
      [prev, current] = [current, prev];
    }
    return prev[str1.length];
  };

  //   
  const initialConsonantsSimilarity = (target: string): number => {
    const sourceInitials = getInitialConsonants(preprocessText(voiceText));
    const targetInitials = getInitialConsonants(preprocessText(target));
    const distance = levenshteinDistance(sourceInitials, targetInitials);
    return (
      1 - distance / Math.max(sourceInitials.length, targetInitials.length)
    );
  };

  //   
  const jaccardSimilarityMeasure = (target: string): number => {
    return jaccardSimilarity(preprocessText(voiceText), preprocessText(target));
  };

  //   
  const levenshteinSimilarityMeasure = (target: string): number => {
    const distance = levenshteinDistance(
      preprocessText(voiceText),
      preprocessText(target)
    );
    return 1 - distance / Math.max(voiceText.length, target.length);
  };

  //    ( )
  const combinedSimilarity = (target: string): number => {
    const levSim = levenshteinSimilarityMeasure(target);
    const jacSim = jaccardSimilarityMeasure(target);
    const initSim = initialConsonantsSimilarity(target);
    return levSim * 0.4 + jacSim * 0.3 + initSim * 0.3;
  };

  return {
    initialConsonantsSimilarity,
    jaccardSimilarity: jaccardSimilarityMeasure,
    levenshteinSimilarity: levenshteinSimilarityMeasure,
    combinedSimilarity,
  };
};

//  
const algorithm = similarityAlgorithm("");
const targetText = "";

console.log(" :", algorithm.initialConsonantsSimilarity(targetText));
console.log(" :", algorithm.jaccardSimilarity(targetText));
console.log(" :", algorithm.levenshteinSimilarity(targetText));
console.log(" :", algorithm.combinedSimilarity(targetText));
```

---

## 3.   

         ,   (:  ,  )   .            ,                .

---

## 4. 

             . ** **, ** **, ** **     15%,   20%   .               .

           ,         .

.
