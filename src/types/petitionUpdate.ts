export type PetitionUpdateFormValues = {
	title: string;
	content: string;
	authorName: string;
};

export type PetitionUpdateFormErrors = Partial<
	Record<keyof PetitionUpdateFormValues, string>
>;

export type PetitionUpdateDraft = PetitionUpdateFormValues & {
	savedAt: string;
};
