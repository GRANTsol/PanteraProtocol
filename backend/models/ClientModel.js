import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const clientSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // References the admin who created the client
    },
    clientId: {
      type: String,
      required: true,
      unique: true, // Ensures each client has a unique identifier
    },
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
      select: false, // Exclude password from queries
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    },
    auditHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Audit", // References audit reports linked to this client
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// 📌 Compare Entered Password with Hashed Password
clientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 📌 Hash Password Before Saving to Database
clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
