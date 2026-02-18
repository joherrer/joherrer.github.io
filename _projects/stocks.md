---
order: 4
layout: project-details
title: Stocks
subtitle: Web Application
description: >
  Stocks is a web application built with Python and Flask that allows users to simulate stock
  trading, enabling them to buy, sell, and track stocks with real-time price updates and
  transaction history.
date: September 2023
client: Personal Project
website: https://github.com/joherrer/stocks
categories: [Python, Web Development, Finance]
tech:
  - Python
  - Flask
  - HTML
  - CSS
  - JavaScript
  - SQLite
  - SQLAlchemy
  - Flask-Session
  - Werkzeug
images:
  - /assets/img/projects/stocks/stocks-1.webp
  - /assets/img/projects/stocks/stocks-2.webp
  - /assets/img/projects/stocks/stocks-3.webp
  - /assets/img/projects/stocks/stocks-4.webp

lead: >
  Stocks provides a simulated stock trading experience, allowing users to create accounts, 
  buy and sell stocks with real-time price updates, manage portfolios, and review 
  transaction history in a responsive dashboard.

accordion:
  overview: >
    Stocks is a web application built with Python and Flask that retrieves real-time 
    stock data from an external API. User accounts, portfolios, and transactions are
    stored in an SQL database. The app features a clean, responsive interface optimized 
    for all devices.
  challenge: >
    Create a web application that simulates stock trading with real-time data while 
    maintaining accurate portfolio tracking, secure user accounts, and a responsive 
    design optimized for all devices.
  solution: >
    I built a Python and Flask backend that fetches live stock data from the Yahoo 
    Finance API, manages user accounts with Werkzeug and Flask-Session, and stores 
    data with SQLAlchemy in a SQLite database. The frontend uses HTML, CSS, and Jinja 
    for a responsive, user-friendly experience.

features:
  left:
    - Real-time stock price updates
    - User-friendly interface
    - Buy and sell simulated stocks
  right:
    - Secure authentication
    - Transaction history tracking
    - Multi-device support
---
