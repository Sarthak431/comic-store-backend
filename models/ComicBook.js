import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const comicBookSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Comic book name is required"],
      trim: true,
      minlength: [2, "Comic book name must be at least 2 characters long"],
      maxlength: [100, "Comic book name cannot exceed 100 characters"],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [2, "Author name must be at least 2 characters long"],
      maxlength: [100, "Author name cannot exceed 100 characters"],
      index: true,
    },
    year: {
      type: Number,
      required: [true, "Year of publication is required"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discount cannot exceed the product price",
      },
    },
    pages: {
      type: Number,
      min: [1, "Number of pages must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Number of pages must be an integer",
      },
    },
    condition: {
      type: String,
      enum: {
        values: ["new", "used"],
        message: 'Condition must be either "new" or "used"',
      },
      required: [true, "Condition is required"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

comicBookSchema.virtual("finalPrice").get(function () {
  return this.price - this.discount;
});

comicBookSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }

  next();
});

comicBookSchema.index({ name: 1, author: 1 });

const ComicBook = model("ComicBook", comicBookSchema);

export default ComicBook;
