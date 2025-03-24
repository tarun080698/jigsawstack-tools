import { JigsawStack } from "jigsawstack";

const jigsawstack = JigsawStack({
  apiKey: process.env.JIGSAWSTACK_SECRET_KEY!,
});

export default jigsawstack;
