import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  images: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    longDescription: {
      type: String,
      default: '',
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'other',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ order: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ category: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);
