# FENGEN: Real-Time Gameplay Optimization with EfficientNet

FENGEN (FEN Generation) is a real-time chess gameplay optimization tool that uses deep learning to recognize chessboard states from screenshots and recommend optimal moves. It leverages the EfficientNet-B0 convolutional neural network architecture to classify each square of a chessboard image into one of 13 classes (12 chess pieces + empty). Once the board state is reconstructed, it is converted to a FEN string and passed to the Stockfish engine to compute the best move.

## Overview

This project demonstrates the potential of convolutional neural networks (CNNs) to automate visual chessboard recognition and augment traditional chess engines with real-time image-based input. The core model achieves 100% square-level classification accuracy on test data, enabling reliable gameplay analysis.

## Key Features

- Real-time screen capture and chessboard detection
- Square-wise classification using EfficientNet-B0
- FEN string generation from classified board state
- Integration with Stockfish chess engine for optimal move prediction

## Dataset

- Collected 10,541 chessboard images from Chess.com using custom screenshot tools
- Annotated each square with one of 13 labels: [empty, white/black pawns, rooks, knights, bishops, queens, kings]
- Dataset split: 80% training, 10% validation, 10% test

## Preprocessing

- Sliced each board image into 64 squares (8×8)
- Applied data augmentation (rotations, flips)
- Normalized inputs and resized to 224×224 pixels

## Model Architecture

- Based on EfficientNet-B0, pre-trained on ImageNet
- Final fully connected layer replaced with 13-class output
- Trained using weighted cross-entropy loss to handle class imbalance
- Optimized with Adam, learning rate 0.001, for 3 epochs

## Performance

- Validation Accuracy: 100%
- F1 Score: 100%
- Model converged in under 3 epochs using Metal Performance Shaders (MPS)

## Real-Time Chessboard Detection

- Screen captured using `mss` Python library
- Chessboard detected with contour filtering and aspect ratio checks
- Squares extracted from ROI and passed to the classifier

## FEN Generation

- Classifications compiled row by row into Forsyth–Edwards Notation (FEN)
- Metadata appended: active color, castling rights, move number
- Example FEN output: `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1`

## Move Prediction with Stockfish

- FEN is passed to Stockfish using `python-chess`
- Stockfish computes best move with 1-second time limit
- Move is displayed in algebraic notation (e.g., `e2e4`)

## Future Work

- Add a real-time GUI for gameplay interaction
- Improve performance using direct memory capture instead of screenshots
- Expand dataset with mobile and real-life chessboards
- Extend model for strategy suggestion or full-game prediction
- Build a Sim2Real pipeline for physical board recognition

## Demo and Source Code

- [Video Demo](https://youtu.be/BiFJEw0nAWQ)
- [GitHub Repository](https://github.com/estebanifig/eeng439-final_project.git)

## Authors

Esteban Figueroa (esteban.figueroa@yale.edu)  
Vinni Yu (vinni.yu@yale.edu)  
Electrical Engineering Department, Yale University
