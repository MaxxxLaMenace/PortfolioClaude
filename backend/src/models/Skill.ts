import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'language' | 'other';
  level: number;
  icon: string;
  order: number;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'tools', 'language', 'other'],
      required: [true, 'Category is required'],
    },
    level: {
      type: Number,
      required: [true, 'Level is required'],
      min: [1, 'Level must be at least 1'],
      max: [100, 'Level cannot exceed 100'],
    },
    icon: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: false,
  }
);

skillSchema.index({ category: 1, order: 1 });

export const Skill = mongoose.model<ISkill>('Skill', skillSchema);
