import { Body } from './components/Body/Body';
import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page}>
      <h1>Geo Processor Aplicattion</h1>

      <Body />
		</div>
	);
}
