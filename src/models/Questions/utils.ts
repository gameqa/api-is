import { ArchiveReason } from "./interface";
// constants
export const MIN_WORD_COUNT = 3;
export const VERIFICATION_COUNTS = 2;
export const ARCHIVE_REASONS: ArchiveReason[] = [
	"long-answer",
	"unintelligible",
	"variable-answer",
];
