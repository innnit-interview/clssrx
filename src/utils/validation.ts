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
		errors.title = 'Title is required';
	} else if (values.title.length > TITLE_MAX_LENGTH) {
		errors.title = `Title must be less than ${TITLE_MAX_LENGTH} characters`;
	}

	if (!values.content.trim()) {
		errors.content = 'Content is required';
	} else if (values.content.length > CONTENT_MAX_LENGTH) {
		errors.content = `Content must be less than ${CONTENT_MAX_LENGTH} characters`;
	}

	if (!values.authorName.trim()) {
		errors.authorName = 'Author name is required';
	}

	return errors;
}
