import type { Data } from "./data"

export type ToleranceImportMergeNumber = 1 | 1.5 | 2 | 2.8 | 3.5

export type ToleranceLabel =
  | "Ultra Low Tolerance"
  | "Low Tolerance"
  | "Medium Tolerance"
  | "High Tolerance"
  | "Ultra High Tolerance"

// export const TOLERANCE_INFO = {
//   1.5: {
//     label: "Ultra Low Tolerance",
//     description:
//       "Only merges positions that are almost perfectly overlapping. Maximum precision, minimal merging.",
//   },
//   2.0: {
//     label: "Low Tolerance",
//     description:
//       "Allows merging of very close positions while remaining highly precise.",
//   },
//   2.5: {
//     label: "Medium Tolerance",
//     description:
//       "Balanced merging. Slight differences in coordinates will be accepted.",
//   },
//   3: {
//     label: "High Tolerance",
//     description:
//       "More flexible merging, useful when imported data contains inconsistencies.",
//   },
//   4: {
//     label: "Ultra High Tolerance",
//     description:
//       "Very forgiving merging. Even noticeably distant positions may be merged.",
//   },
// } satisfies Record<ToleranceImportMergeNumber, { label: ToleranceLabel; description: string }>

export type BackupEntry = {
  id: string
  createdAt: number
  data: Data[]
}