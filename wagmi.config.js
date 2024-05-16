import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import EDUCATIONAL_CONTRACT_ABI from "./graph/abi.json";

export default defineConfig({
  out: 'src/utils/generated.js',
  contracts: [
    {
      name: "EducationalRecords",
      abi: EDUCATIONAL_CONTRACT_ABI,
    },
  ],
  plugins: [react(),],
})
