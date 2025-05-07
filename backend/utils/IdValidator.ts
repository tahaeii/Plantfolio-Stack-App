import { HttpException } from '@nestjs/common';
import mongoose from 'mongoose';

export function isValidId(modelName:string,id: string):void {
    const isValidId=mongoose.Types.ObjectId.isValid(id);
    if(!isValidId) throw new HttpException(`${modelName} not found!`,404)  
}
