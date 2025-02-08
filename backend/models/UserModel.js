import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Prevents password from being returned in queries
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isMaster: {
      type: Boolean,
      required: true,
      default: false, // Master Admins have the highest privileges
    },
    profilePicture: {
      type: String,
      default:
        "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// 📌 Compare Entered Password with Hashed Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 📌 Hash Password Before Saving to Database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
