// @ts-check
import { defineConfig } from "astro/config";

// Static output for S3 + CloudFront. Directory URLs with trailing slashes
// resolve as /projects/<slug>/index.html on the S3 website endpoint.
export default defineConfig({
  site: "https://ramonerobertson.dev",
  trailingSlash: "always",
  build: { format: "directory" }
});
