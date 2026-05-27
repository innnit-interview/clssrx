'use client';

import {
	PetitionUpdateDraft,
	PetitionUpdateFormErrors,
	PetitionUpdateFormValues,
} from '@/types/petitionUpdate';
import styles from './PetitionUpdateModal.module.css';

import { useEffect, useRef, useState } from 'react';
import {
	validatePetitionUpdateForm,
	TITLE_MAX_LENGTH,
	CONTENT_MAX_LENGTH,
} from '@/utils/validation';

const DEFAULT_AUTHOR_NAME = 'Petra Petitionsstarterin';

const initialValues = {
	title: '',
	content: '',
	authorName: DEFAULT_AUTHOR_NAME,
};

export default function PetitionUpdateModal() {
	const [values, setValues] = useState<PetitionUpdateFormValues>(initialValues);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [errors, setErrors] = useState<PetitionUpdateFormErrors>({});
	const [isAuthorEditable, setIsAuthorEditable] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		//open dialog when component mounts

		const dialog = dialogRef.current;
		if (!dialog) return;

		if (!dialog.open) {
			dialog.showModal();
		}
	}, []);

	const updateFormField = (
		fieldName: keyof PetitionUpdateFormValues,
		value: string,
	) => {
		setValues((currentValues) => ({
			...currentValues,
			[fieldName]: value,
		}));

		setErrors((currentErrors) => ({
			...currentErrors,
			[fieldName]: undefined,
		}));

		setSuccessMessage('');
	};

	const handleSaveDraft = (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		//checking if form values are valid, if not set error messages and return early
		const validationErrors = validatePetitionUpdateForm(values);
		setErrors(validationErrors);

		// Stop early when validation fails so no incomplete draft is saved
		if (Object.keys(validationErrors).length > 0) {
			setSuccessMessage('');
			return;
		}

		const draft: PetitionUpdateDraft = {
			title: values.title.trim(),
			content: values.content.trim(),
			authorName: values.authorName.trim(),
			savedAt: new Date().toISOString(),
		};

		// Store the latest valid draft as a serialized object in localStorage.

		localStorage.setItem('petitionUpdateDraft', JSON.stringify(draft));
		setSuccessMessage('Entwurf erfolgreich gespeichert!');

		//reset form after saving draft
		setValues(initialValues);
		setIsAuthorEditable(false);
	};

	return (
		<dialog
			ref={dialogRef}
			className={styles.modal}
			aria-labelledby='update-dialog-title'
			onCancel={(event) => event.preventDefault()}
		>
			<span className={styles.closeIcon} aria-hidden='true'>
				x
			</span>
			<h1 id='update-dialog-title' className={styles.title}>
				Neues Update erstellen
			</h1>

			<form className={styles.form} onSubmit={handleSaveDraft} noValidate>
				<div className={styles.formField}>
					<label htmlFor='update-title' className={styles.label}>
						Titel
					</label>
					<input
						id='update-title'
						type='text'
						maxLength={TITLE_MAX_LENGTH}
						className={styles.input}
						value={values.title}
						onChange={(e) => updateFormField('title', e.target.value)}
						aria-invalid={!!errors.title}
						aria-describedby={errors.title ? 'title-error' : undefined}
					/>

					{errors.title && (
						<p id='title-error' className={styles.errorMessage} role='alert'>
							{errors.title}
						</p>
					)}
				</div>

				<div className={styles.formField}>
					<label htmlFor='update-content' className={styles.label}>
						Deine Neuigkeiten
					</label>
					<textarea
						id='update-content'
						value={values.content}
						className={styles.inputLongText}
						placeholder='Bitte schreibe ein paar Worte zu deinem Update.'
						onChange={(e) => updateFormField('content', e.target.value)}
						aria-invalid={!!errors.content}
						aria-describedby={errors.content ? 'content-error' : undefined}
						maxLength={CONTENT_MAX_LENGTH}
					/>

					{errors.content && (
						<p id='content-error' className={styles.errorMessage} role='alert'>
							{errors.content}
						</p>
					)}
				</div>

				<section
					className={styles.senderSection}
					aria-labelledby='sender-title'
				>
					<div className={styles.senderTitleFrame}>
						<h2 id='sender-title' className={styles.label}>
							Absender
						</h2>
						<div className={styles.switchSection}>
							<input
								type='checkbox'
								id='editSenderCheckbox'
								checked={isAuthorEditable}
								onChange={(e) => setIsAuthorEditable(e.target.checked)}
							/>
							<label htmlFor='editSenderCheckbox'>Absender ändern</label>
						</div>
					</div>

					<p>
						Hier hast du die Option, das Update unter einem anderen Namen zu
						veröffentlichen.
					</p>

					<label
						htmlFor='update-authorName'
						className={styles.authorInputLabel}
					>
						Absender
					</label>
					<input
						type='text'
						id='update-authorName'
						value={values.authorName}
						className={styles.authorInput}
						disabled={!isAuthorEditable}
						onChange={(event) =>
							updateFormField('authorName', event.target.value)
						}
						aria-invalid={Boolean(errors.authorName)}
						aria-describedby={
							errors.authorName ? 'author-name-error' : undefined
						}
					/>

					{errors.authorName && (
						<p id='author-name-error' className={styles.errorMessage}>
							{errors.authorName}
						</p>
					)}
				</section>

				<div className={styles.buttons}>
					<button
						type='button'
						className={`${styles.button} ${styles.cancelButton}`}
					>
						Abbrechen
					</button>
					<button
						type='submit'
						className={`${styles.button} ${styles.saveButton}`}
					>
						Entwurf speichern
					</button>
					<button
						type='button'
						className={`${styles.button} ${styles.publishButton}`}
					>
						Update veröffentlichen
					</button>
				</div>

				{successMessage && (
					<p className={styles.successMessage} role='status'>
						{successMessage}
					</p>
				)}
			</form>
		</dialog>
	);
}
