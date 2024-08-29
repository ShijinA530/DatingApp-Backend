import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dob: {
      type: Date,
    },
    bio: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      place:{
        type: String,
      }
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    qualification: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
    },
    drinking: {
      type: String,
    },
    smoking: {
      type: String,
    },
    genderPreference: {
      type: String,
      enum: ["MEN", "WOMEN", "BOTH"],
    },
    profileImage: {
      publicId: String,
      url: String,
    },
    additionalImage: [
      {
        publicId: String,
        url: String,
      },
    ],
    reel: {
      publicId: String,
      url: String,
    },
    relationshipGoal: {
      type: String,
    },
    doNotShowFor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

profileSchema.index({ location: "2dsphere" });

const ProfileModel = new mongoose.model('Profile', profileSchema);

export default ProfileModel;
