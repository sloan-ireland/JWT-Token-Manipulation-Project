# JWT Token Manipulation Project
![logo](https://miro.medium.com/v2/resize:fit:1170/1*AMeiWwTqbLAUe0bvdVTVLA.png)
## Purpose

The purpose of this project is to demonstrate and explore the manipulation of JSON Web Tokens (JWT) on a website. JWT tokens are a popular method for authentication and exchanging information between parties in web applications. This project aims to showcase the vulnerabilities and security risks associated with JWT tokens and how they can be manipulated.

## Project Description

The project consists of a web application hosted on the website http://159.65.40.248/. The application allows users to log in using a username and password. Upon successful login, a JWT token is generated and stored in the user's session. The token is used for subsequent requests to the server to access protected resources.

The project focuses on two specific vulnerabilities in JWT tokens: nonalgorithm attack and RSA vulnerability. The nonalgorithm attack involves modifying the token's algorithm field to "none," allowing unauthorized access and impersonation. The RSA vulnerability exploits the improper verification of symmetric and asymmetric signatures in the token.

## Getting Started

To run and experiment with this project, follow these steps:

1. Clone the project repository from GitHub: https://github.com/Stuycs-K/final-project-4-irelands-kirmayerj.git
2. Install the necessary dependencies by running the following command: 
```
npm install
```
 - This command will use npm (Node Package Manager) to install the dependencies specified in the package.json file.


3. Open a web browser and navigate to http://159.65.40.248/ to access the website.
4. Use the provided login form to enter the correct username (jimmy) and password (jimmy) for authentication.
5. Explore the functionality of the web application and observe the vulnerabilities associated with JWT token manipulation (Read more under PRESENTATION.md for specifics on how to do this)
6. Attempt to CTF in the task presented in HOMEWORK.md

## Disclaimer

This project is purely for educational and demonstration purposes. It should not be used for any malicious activities or unauthorized access to systems. Use this project responsibly and with the necessary permissions. 

## Copyright

© 2023 Sloan Ireland and Jason Kirmayer

This project is licensed under the **ThisIsMine** Policy - see the [LICENSE](https://www.bing.com/ck/a?!&&p=3b44a9a64d0e13aeJmltdHM9MTY4NTMxODQwMCZpZ3VpZD0xMmRhYzlkOC1mYzgzLTY0Y2YtMjMzNi1kYjRmZmQ5MTY1ZDYmaW5zaWQ9NTIxMA&ptn=3&hsh=3&fclid=12dac9d8-fc83-64cf-2336-db4ffd9165d6&psq=rickroll&u=a1aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g_dj1kUXc0dzlXZ1hjUQ&ntb=1) file for details.


## Resources

- [JSON Web Tokens (JWT) Introduction](https://jwt.io/introduction/)
- [OWASP JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html)
- [Node.js Documentation](https://nodejs.org/)
- [Express.js Documentation](https://expressjs.com/)

