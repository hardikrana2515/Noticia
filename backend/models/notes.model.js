import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discription: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      default: "General",
      trim: true,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual to support standard 'description' spelling seamlessly
noteSchema.virtual("description").get(function () {
  return this.discription;
}).set(function (v) {
  this.discription = v;
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
