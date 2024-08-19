import {BadRequestException, Body, Controller, Put, Post, Delete, ParseIntPipe, Res, Param, Get} from '@nestjs/common';
import {AppService} from './app.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';
import { CreateUserProfileDto } from './dtos/CreateUserProfile.dto';
import { UpdateUserProfileDto } from './dtos/UpdateUserProfile.dto';
import { CreateClassDto } from './dtos/createClass.dto';
import { UpdateClassDto } from './dtos/updateClass.dto';
import { CreateSubjectDto } from './dtos/createSubject.dto';
import { UpdateSubjectDto } from './dtos/updateSubject.dto';

@Controller('api')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private jwtService: JwtService,
    ) {
    }

// User Module 
// User Registration
    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('category') category: any,
    ) {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.appService.create({
            name,
            email,
            password: hashedPassword,
            category,
        });

        delete user.password;

        return user;
    }

  // User Login
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.appService.findOne({ where: { email } });

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        return {
            jwt,
            message: 'logged in successfully'
        };
    }

    // User Update
    @Put(':id/update')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        await this.appService.updateUser(id, updateUserDto);
    }

    // User Logout
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'logged out successfully'
        }
    }
  
    //Delete
    @Delete('user/:id/delete')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number){
        await this.appService.deleteUser(id);
    }

    // All User List
    @Get()
    getUsers() {
        return this.appService.findUsers();
    }

    //Category Module
    // Create 
    @Post('create/category')
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        this.appService.createCategory(createCategoryDto);
    }

    // List
    @Get('categories')
    getCategories() {
        return this.appService.getCategoryList();
    }

    // Update
    @Put('category/:id/update')
    async updateCategoryById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        await this.appService.updateCategory(id, updateCategoryDto);
    }

    //Delete
    @Delete('category/:id/delete')
    async deleteCategoryById(
        @Param('id', ParseIntPipe) id: number){
        await this.appService.deleteUserProfile(id);
    }


    //Profile Module
    // Create 
    @Post(':id/create/profile')
    createUserProfile( 
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto,) {
        return this.appService.createUserProfile(id, createUserProfileDto);
    }

    // List
    @Get('profiles')
    getProfiles() {
        return this.appService.getProfileList();
    }

    // Update
    @Put('profile/:id/update')
    async updateProfileById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserProfileDto: UpdateUserProfileDto,
    ) {
        await this.appService.updateProfile(id, updateUserProfileDto);
    }

    //Delete
    @Delete('profile/:id/delete')
    async deleteProfileById(
        @Param('id', ParseIntPipe) id: number){
        await this.appService.deleteUserProfile(id);
    }

    //Class Module
    // Create 
    @Post('create/class')
    createClass( 
        @Body() createClassDto: CreateClassDto,) {
        return this.appService.createClass(createClassDto);
    }

    // List
    @Get('classes')
    getClassess() {
        return this.appService.getClassList();
    }

    // Update
    @Put('class/:id/update')
    async updateClassById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateClassDto: UpdateClassDto,
    ) {
        await this.appService.updateClass(id, updateClassDto);
    }

    //Delete
    @Delete('class/:id/delete')
    async deleteClassById(
        @Param('id', ParseIntPipe) id: number){
        await this.appService.deleteClass(id);
    }

   //Subject Module

    // Create 
    @Post('create/subject')
    createSubject( 
        @Body() createSubjectDto: CreateSubjectDto,) {
        return this.appService.createSubject(createSubjectDto);
    }

    // List
    @Get('subjects')
    getSubjects() {
        return this.appService.getSubjectList();
    }

    // Update
    @Put('subject/:id/update')
    async updateSubjectById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSubjectDto: UpdateSubjectDto,
    ) {
        await this.appService.updateSubject(id, updateSubjectDto);
    }

    //Delete
    @Delete('subject/:id/delete')
    async deleteSubjectById(
        @Param('id', ParseIntPipe) id: number){
        await this.appService.deleteSubject(id);
    }
}