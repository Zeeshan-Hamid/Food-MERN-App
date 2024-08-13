const mongoose = require("mongoose");
const { marked } = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    },
    image: {
        type: String,
        required: true,
    },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

blogSchema.pre("validate", function (next) {
  
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  next();
});

module.exports = mongoose.model("Blog", blogSchema);
