import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
  //ParseIntPipe,
  ParseUUIDPipe,
  ValidationPipe,
  UsePipes,
  // Query,
  // Req,
  UseFilters,
  Logger,
  //HttpCode,
  //HttpStatus,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
// import { CustomValidationPipe } from './pipes/validation.pipe';
import { UserService } from './user.service';
import { CustomExcrptionFilter } from 'src/common/filters/custom-excrption/custom-excrption.filter';
import { IsPublic, Roles } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'config/env-variables.interface';

// The UseFilters decorator is used to apply a filter to a controller only.
@UseFilters(CustomExcrptionFilter)
@Controller('users')
@UsePipes(ValidationPipe)
export class UsersController {
  logger: Logger = new Logger(UsersController.name);

  constructor(
    private readonly userSrevice: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    // console.log(this.configService.get<string>('DATABASE_HOST', 'root'));
    // console.log(
    //   this.configService.get('EMAIL', {
    //     infer: true,
    //   }),
    // );
    //  console.log(process.env.EMAIL);
  }

  //@SetMetadata('IsPublic', true)
  @IsPublic()
  @Get()
  async find() // @Query('username', CustomValidationPipe) username: string,
  //  @Req() req: Request,
  : Promise<UserEntity[]> {
    // console.log('Request', req.body);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    this.logger.log('Fetching all users');
    const users = await this.userSrevice.findUsers();
    this.logger.debug(`Found ${users.length} users`);

    return users;
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) identity: string) {
    return this.userSrevice.findUserById(identity);
  }

  @Post()
  create(
    @Body(new ValidationPipe({ groups: ['create'] })) userData: createUserDto,
  ) {
    return this.userSrevice.createUser(userData);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ groups: ['update'] })) userUpdate: UpdateUserDto,
  ) {
    return this.userSrevice.updateUser(id, userUpdate);
  }

  @Roles('admin')
  @Delete(':id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userSrevice.deleteUser(id);
  }
}
