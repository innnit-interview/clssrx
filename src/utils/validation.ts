import {
	PetitionUpdateFormErrors,
	PetitionUpdateFormValues,
} from '@/types/petitionUpdate';

export const TITLE_MAX_LENGTH = 100;
export const CONTENT_MAX_LENGTH = 10000;

export function validatePetitionUpdateForm(
	values: PetitionUpdateFormValues,
): PetitionUpdateFormErrors {
	const errors: PetitionUpdateFormErrors = {};

	if (!values.title.trim()) {
		errors.title = 'Bitte gib einen Titel ein.';
	} else if (values.title.trim().length > TITLE_MAX_LENGTH) {
		errors.title = `Der Titel darf maximal ${TITLE_MAX_LENGTH} Zeichen lang sein.`;
	}

	if (!values.content.trim()) {
		errors.content = 'Bitte gib einen Update-Text ein.';
	} else if (values.content.trim().length > CONTENT_MAX_LENGTH) {
		errors.content = `Der Update-Text darf maximal ${CONTENT_MAX_LENGTH} Zeichen lang sein.`;
	}

	if (!values.authorName.trim()) {
		errors.authorName = 'Bitte gib einen Absender ein.';
	}

	return errors;
}
