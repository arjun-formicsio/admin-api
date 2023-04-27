import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptionModule } from 'src/auth/encrypt.module';
import { EncryptionService } from 'src/auth/encrypt.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [EncryptionModule],
        useFactory: (encService: EncryptionService) => {
          const schema = UserSchema;
          schema.pre<User>('save', function (next: Function) {
            console.log("in pre save")
            const user = this;
            if (user.password) {
              console.log("plaintext password: ", user.password)
              encService
                .hash(user.password)
                .then((hash) => {
                  user.password = hash;
                  return next();
                })
                .catch((err) => next(err));
              // bcrypt.hash(user.password, saltRounds, (err, hash) => {
              //   if (err) return next(err);
              //   user.password = hash;
              //   next();
              // });
            }
          });
          return schema;
        },
        inject: [EncryptionService],
      },
    ]),
  ],
  providers: [UserService, EncryptionService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
