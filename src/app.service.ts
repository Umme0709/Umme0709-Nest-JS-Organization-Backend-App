import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './Entities/category.entity';
import { User } from './Entities/user.entity';
import { Profile } from './Entities/profile.entity';
import { Class } from './Entities/class.entity';
import { Subject } from './Entities/subject.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryParams, UpdateCategoryParams, UpdateUserParams, UpdateUserProfileParams } from 'src/utils/types';
import { CreateUserProfileParams, CreateClassParams, UpdateClassParams, CreateSubjectParams, UpdateSubjectParams } from 'src/utils/types';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
    @InjectRepository(Subject) private subjectRepository: Repository<Subject>,
  ){

  }

  //User List
  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'classes']});
 }
 
 //Registration
  async create(data: any): Promise<User>{
    return this.userRepository.save(data);
  }

  //Login
  async findOne(condition: any): Promise<User>{
    return this.userRepository.findOne(condition);
  }

  //User Update
  async updateUser(id: number, updateUserDetails: UpdateUserParams){
    return this.userRepository.update({ id }, { ...updateUserDetails });
}

  //User Delete
  deleteUser(id: number) {
    return this.userRepository.delete( {id});
  }

  //Category
  createCategory(categoryDetails: CreateCategoryParams) {
    const newCategory = this.categoryRepository.create({ 
        ...categoryDetails
    });
    return this.categoryRepository.save(newCategory)
  }

  getCategoryList() {
    return this.categoryRepository.find();
  }

  updateCategory(id: number, updateCategoryDetails: UpdateCategoryParams){
    return this.categoryRepository.update({ id }, { ...updateCategoryDetails });
  }

  deleteCategory(id: number) {
    return this.categoryRepository.delete( {id});
  }

  //Peofile
  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ){
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
        throw new HttpException(
            'User not found. Cannot create Profile',
            HttpStatus.BAD_REQUEST,
    
        );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);

  }

  getProfileList() {
    return this.profileRepository.find({ relations: ['user', 'category']});
  }

  updateProfile(id: number, updateUserProfileDetails: UpdateUserProfileParams){
    return this.profileRepository.update({ id }, { ...updateUserProfileDetails });
  }

  deleteUserProfile(id: number) {
    return this.profileRepository.delete( {id});
  }

// Class
  async createClass(
    createClassDetails: CreateClassParams,
  ){
    const class_t = this.classRepository.create({...createClassDetails});
    return this.classRepository.save(class_t);

  }

  getClassList() {
    return this.classRepository.find({ relations: ['user']});
  }

  updateClass(id: number, updateClassDetails: UpdateClassParams){
    return this.classRepository.update({ id }, { ...updateClassDetails });
  }

  deleteClass(id: number) {
    return this.classRepository.delete( {id});
  }

  //Subject
  async createSubject(
    createSubjectDetails: CreateSubjectParams,
  ){
    const subject = this.subjectRepository.create({...createSubjectDetails});
    return this.subjectRepository.save(subject);

  }
  
  getSubjectList() {
    return this.subjectRepository.find({ relations: ['class']});
  }

  updateSubject(id: number, updateSubjectDetails: UpdateSubjectParams){
    return this.subjectRepository.update({ id }, { ...updateSubjectDetails });
  }

  deleteSubject(id: number) {
    return this.subjectRepository.delete( {id});
  }
}
