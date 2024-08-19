import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Category } from './Entities/category.entity';
import { User } from './Entities/user.entity';
import { Profile } from './Entities/profile.entity';
import { Class } from './Entities/class.entity';
import { Subject } from './Entities/subject.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tubba',
      database: 'organization_final',
      entities: [Category, User, Profile, Class, Subject],
      synchronize: true,
    }),
    TypeOrmModule.forFeature( [Category, User, Profile, Class, Subject]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 