import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: Function) {

    const authHeader = req.get('authorization');
    if (!authHeader) {
        console.log("No Authorization header...");
        req.authMessage = "No Authorization header";
        req.isAuthorized = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        console.log("No token in Authorization header...");
        req.authMessage = "No token in Authorization header";
        req.isAuthorized = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'mysimplekey');
    } catch(err) {
        req.authMessage = "Invalid token";
        req.isAuthorized = false;
        return next();
    }
    if (!decodedToken) {
        req.authMessage = "Invalid token";
        req.isAuthorized = false;
        return next();
    }
    req.isAuthorized = true;
    req.userId = decodedToken.userId;
    next();

  }
}
