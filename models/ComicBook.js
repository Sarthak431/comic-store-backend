import mongoose from 'mongoose';
import slugify from 'slugify'; // Optionally, for generating slugs from book name

const { Schema, model } = mongoose;

const comicBookSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'Comic book name is required'],
        trim: true,
        minlength: [2, 'Comic book name must be at least 2 characters long'],
        maxlength: [100, 'Comic book name cannot exceed 100 characters'],
        index: true, // Adding index to improve query performance on name field
      },
      slug: {
        type: String,
        unique: true,
      },
      author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        minlength: [2, 'Author name must be at least 2 characters long'],
        maxlength: [100, 'Author name cannot exceed 100 characters'],
        index: true, // Adding index for author as well
      },
      year: {
        type: Number,
        required: [true, 'Year of publication is required'],
        min: [1900, 'Year must be greater than or equal to 1900'],
        max: [new Date().getFullYear(), 'Year cannot be in the future'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
      },
      discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%'],
        validate: {
          validator: function (value) {
            // Ensure discount is less than or equal to 100% of the price
            return value <= this.price;
          },
          message: 'Discount cannot exceed the product price',
        },
      },
      pages: {
        type: Number,
        min: [1, 'Number of pages must be at least 1'],
        validate: {
          validator: Number.isInteger,
          message: 'Number of pages must be an integer',
        },
      },
      condition: {
        type: String,
        enum: {
          values: ['new', 'used'],
          message: 'Condition must be either "new" or "used"',
        },
        required: [true, 'Condition is required'],
      },
      description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: '',
      }
    },
    {
      timestamps: true,
      toJSON: { virtuals: true }, // Include virtuals when converting to JSON
      toObject: { virtuals: true }, // Include virtuals when converting to plain objects
    }
  );
// Virtual to calculate final price after discount
comicBookSchema.virtual('finalPrice').get(function() {
  return this.price - this.discount;
});

// Pre-save hook to generate slug from name (useful for SEO-friendly URLs)
comicBookSchema.pre('save', function (next) {
  // Generate slug if name is modified or if the document is new
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, { lower: true });
  }

  next();
});


// Indexing fields to improve query performance
comicBookSchema.index({ name: 1, author: 1 }); // Compound index for name and author

const ComicBook = model('ComicBook', comicBookSchema);

export default ComicBook;
