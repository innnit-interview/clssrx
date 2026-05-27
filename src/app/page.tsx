import styles from './page.module.css';
import PetitonUpdateModal from '@/components/PetitionUpdateModal';

export default function Home() {
	return (
		<main className={styles.page}>
			<PetitonUpdateModal />
		</main>
	);
}
