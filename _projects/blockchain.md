---
order: 5
layout: project-details
title: Blockchain
subtitle: Blockchain Technology
description: >
  Blockchain is a basic implementation of a blockchain using Python that demonstrates the
  fundamentals of blockchain technology for secure and decentralized systems.
date: October 2024
client: Personal Project
website: https://github.com/joherrer/blockchain
categories: [Python, Blockchain, Cryptography]
tech:
  - Python
  - SHA-256
  - Pytest

images:
  - /assets/img/projects/blockchain/blockchain.webp

lead: >
    Blockchain demonstrates key concepts, including genesis block creation, 
    adding new blocks, and validating the integrity of the chain 
    in a simple, educational Python implementation.

accordion:
  overview: >
    Blockchain illustrates the core principles of a blockchain, including block creation, hashing,
    and linking blocks in a secure chain. Each block is immutable and secured using SHA-256 hashes.
    The program includes a Genesis block, supports adding new blocks, and validates the chain's
    integrity.
  challenge: >
    Create a simple, educational blockchain that demonstrates how blocks are linked, hashed, and
    validated, while ensuring the code remains reliable, secure, well-structured, and maintainable.
  solution: >
    I implemented a Python blockchain with a Block class containing index, timestamp, data, and
    SHA-256 hashes. The Blockchain class manages the chain, creates the Genesis block, adds new
    blocks, and validates the chain's integrity. Test scripts using Pytest ensure the correct
    behaviour of the code.
features:
  left:
    - Genesis block creation
    - Adding new blocks
    - Blockchain validation
  right:
    - SHA-256 hashing
    - Immutable block attributes
    - Unit tests with Pytest
---
