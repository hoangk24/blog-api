import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuardPrivate extends AuthGuard('jwt') {}

@Injectable()
export class JwtAuthGuardPublic extends AuthGuard('jwt-public') {}
