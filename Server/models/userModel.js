import mongoose from "mongoose";

// User Schema:
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fman-avatar-image-for-profile_13001882.html&psig=AOvVaw26jRsqd2smIzRrl2cPIMF-&ust=1717840585036000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCdpoCdyYYDFQAAAAAdAAAAABAEhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fuser-profile-avatar_13369988.html&psig=AOvVaw26jRsqd2smIzRrl2cPIMF-&ust=1717840585036000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCdpoCdyYYDFQAAAAAdAAAAABAo",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// User Model:
const User = mongoose.model("User", userSchema);

export default User;
