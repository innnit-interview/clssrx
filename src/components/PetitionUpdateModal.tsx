'use client';

import { PetitionUpdateFormValues } from '@/types/petitionUpdate';
import styles from './PetitionUpdateModal.module.css';

import { useEffect, useRef, useState } from 'react';

const initialValues = {
	title: '',
	content: '',
	authorName: '',
};

export default function PetitonUpdateModal() {
	const [values, setValues] = useState<PetitionUpdateFormValues>(initialValues);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [isAuthorEditable, setIsAuthorEditable] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
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

		setSuccessMessage('');
	};

	const handleSaveDraft = (event: React.FormEvent) => {
		event.preventDefault();

		//validate fields

		//if errors return no success

		//save to local storage
		//show success message
	};

	return (
		<dialog
			className={styles.modal}
			aria-labelledby='update-dialog-title'
			onCancel={(event) => event.preventDefault()}
		>
			<div className={styles.header}>
				<span className={styles.closeIcon} aria-hidden='true'>
					x
				</span>
				<h1 id='update-dialog-title' className={styles.title}>
					Neues Update erstellen
				</h1>
			</div>

			<form className={styles.form} onSubmit={handleSaveDraft} noValidate>
				<div>
					<label htmlFor='update-title'>Titel</label>
					<input
						id='update-title'
						type='text'
						maxLength={100}
						className={styles.input}
						value={values.title}
						onChange={(e) => updateFormField('title', e.target.value)}
					></input>
				</div>

				<div>
					<label htmlFor='update-content'>Deine Neuigkeiten</label>
					<textarea
						id='update-content'
						value={values.content}
						className={styles.inputLongText}
						placeholder='Bitte schreibe ein paar Worte zu deinem Update.'
						onChange={(e) => updateFormField('content', e.target.value)}
					></textarea>
				</div>

				<section
					className={styles.senderSection}
					aria-labelledby='sender-title'
				>
					<div className={styles.senderTitleFrame}>
						<h2 id='sender-title'>Absender</h2>
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

					<label htmlFor='update-sender'>Absender</label>
					<input
						type='text'
						id='update-sender'
						className={styles.input}
						readOnly={!isAuthorEditable}
						value={values.authorName}
						onChange={(event) =>
							updateFormField('authorName', event.target.value)
						}
					/>
				</section>

				<div className={styles.buttons}>
					<button type='button'>Abbrechen</button>
					<button type='submit'>Entwurf speichern</button>
					<button type='button'>Update veröffentlichen</button>
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
