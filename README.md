# Totally Legit Web Scraper 

## Overview
This project is a simple web scraping tool built using JavaScript and Bun. It fetches technology news headlines and links from popular websites, starting with Wired.com as an example.

## What is Web Scraping?
Web scraping is a technique used to extract data from websites automatically. Instead of manually copying information, the tool reads the website's content and collects the desired data.

## About Cheerio
The tool uses Cheerio, which is a JavaScript library that helps read and parse HTML code from web pages. It works like jQuery but is designed for use in server-side environments. With Cheerio, the tool can easily find specific parts of a webpage, like article headlines or links.

## Why Specify a User-Agent?
When the tool requests a webpage, it tells the website who it is by setting a "User-Agent" header. This header makes the request look like it's coming from a regular web browser (like Chrome or Firefox), which helps avoid blocks or restrictions that websites put on automated tools or bots.

For example, the User-Agent string used here mimics a Windows 10 desktop browser: Mozilla/5.0 (Windows NT 10.0; Win64; x64) 


This improves the chances that the website will serve the full content and not deny the request.

## How to Use
1. Install dependencies with Bun:
bun add cheerio axios puppeteer

2. Run the scraper script:
bun run index.js

3. The tool will display a list of technology news headlines and the links to the articles.
