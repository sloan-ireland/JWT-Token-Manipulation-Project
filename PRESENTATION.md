# Nonalgorithm and RSA Vulnerabilities in JWT Tokens

JSON Web Tokens (JWT) are a popular way of authenticating users and exchanging information between parties in web applications. However, JWT tokens are not immune to security risks and vulnerabilities. In this article, we will discuss two common types of attacks on JWT tokens: nonalgorithm and RSA vulnerabilities.

## The JWT Format

A JSON Web Token consists of three parts. The header, payload, and signature. Each of these components are separated by the ```.``` character, and are base64-url encoded. 

Throughout this short explanation, we'll be using the token ```eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFjb2IiLCJlbWFpbCI6ImphY29iQHdlYnNpdGUuY29tIiwiaW5mbyI6eyJ1c2VySUQiOiI2YWI0ZGM4MjYzZGMzYmFhNzIifX0.uPsufJbQsVwg_gPiEQRy1w6Tkahk9yuywnU59eXBdQoqXYMh5AJfbad2u_UjG5_O```
as an example

### The Header

A JWT Header consists of properties defining the mechanics of a given token, including the algorithm that the token is signed with. Sometimes, information regarding the key that a token can be verified with is stored here. In our token, we can see that the token is signed with an HMAC SHA-384 algorithm by decoding the first part.
```eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9``` -> 
```{"alg": "HS384","typ": "JWT"}```

### The Payload

This contains all of the information about the client that the server has authenticated, and therefore will believe to be true. Some priveleged information is also stored here by careless developers sometimes.
```eyJ1c2VyIjoiamFjb2IiLCJlbWFpbCI6ImphY29iQHdlYnNpdGUuY29tIiwiaW5mbyI6eyJ1c2VySUQiOiI2YWI0ZGM4MjYzZGMzYmFhNzIifX0``` -> 
```{"user":"jacob","email":"jacob@website.com","info":{"userID": "6ab4dc8263dc3baa72"}}```

### The Signature

A JWT Header consists of properties defining the mechanics of a given token, including the algorithm that the token is signed with. Sometimes, information regarding the key that a token can be verified with is stored here. In our token, we can see that the token is signed with an HMAC SHA-384 algorithm by decoding the first part. Some priveleged information is also stored here by careless developers sometimes.
```eyJ1c2VyIjoiamFjb2IiLCJlbWFpbCI6ImphY29iQHdlYnNpdGUuY29tIiwiaW5mbyI6eyJ1c2VySUQiOiI2YWI0ZGM4MjYzZGMzYmFhNzIifX0``` -> 
```{"user":"jacob","email":"jacob@website.com","info":{"userID": "6ab4dc8263dc3baa72"}}```


## None algorithm Attack

A nonalgorithm attack is a type of attack where the attacker modifies the header of a JWT token to change the algorithm field from a cryptographic algorithm (such as HS256 or RS256) to "none". This means that the token is not signed or verified by any secret key or public key. If the server does not validate the algorithm field and blindly accepts the token, the attacker can forge any payload and impersonate any user.

To prevent this attack, the server should always check the algorithm field of the token and reject any token that has "none" as the algorithm. The server should also use a whitelist of allowed algorithms and not rely on the token header to determine the algorithm.

## RSA Vulnerability

An RSA vulnerability is a type of attack where the attacker exploits the fact that some JWT libraries use the same function to verify both symmetric and asymmetric signatures. For example, if the server uses HS256 (a symmetric algorithm) to sign the tokens, but the verification function accepts both HS256 and RS256 (an asymmetric algorithm) signatures, the attacker can create a fake token with RS256 as the algorithm and use the public key of the server as the secret key to sign the token. The verification function will then use the same public key to verify the token and accept it as valid.

To prevent this attack, the server should use different functions to verify symmetric and asymmetric signatures, or use a library that does this automatically. The server should also not expose its public key to untrusted parties or use it for other purposes than verifying tokens.

## Locating JWT Tokens in a Web Browser
When working with JWT tokens, it can be useful to inspect and analyze the tokens that are being sent and received by your web application. By locating and examining the tokens, you can gain insights into the information they contain and identify any potential security risks or vulnerabilities. 

### Tool of the trade: Browser Developer Tools

Most modern web browsers come with built-in developer tools that allow you to inspect network requests and view the details of HTTP headers. Follow these steps to locate JWT tokens using browser developer tools:

1. Open the web application in your browser.
2. Right-click anywhere on the page and select "Inspect" or "Inspect Element" from the context menu. This will open the browser's developer tools.
3. Navigate to the "Network" or "Network Monitor" tab in the developer tools.
4. Perform the desired actions in the web application that involve JWT tokens, such as logging in or making authenticated requests.
Look for requests that include an "Authorization" header. JWT tokens are commonly transmitted as bearer tokens in the "Authorization" header. The token will be prefixed with the word "Bearer" followed by a space.
5. In the "Name" or "Path" column of the network requests, look for endpoints or URLs that indicate authentication or protected resources. For example, endpoints like "/login," "/user," or "/api" may be relevant.
6. Click on the request that contains the JWT token to view its details. The "Headers" section should display the "Authorization" header and the JWT token.