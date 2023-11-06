import { IonPage, IonContent } from '@ionic/react';
import './ExploreContainer.css';
import QCULogo from '../../imgs/Logo/cropped-qculogopng-1-copy-300x300.png';
interface ContainerProps {
  name: string;
}

const CampusSelect: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
      <section className="flex items-center h-full p-16 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
      <img src={QCULogo} className="mx-auto w-40 -mt-80" />
			<h2 className="mb-8 font-extrabold text-7xl dark:text-gray-600">
				<span className="bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent">QCU-IOSK</span>
			</h2>
			
			<a rel="noopener noreferrer" href="/SelectCampus" className="px-8 py-3 font-semibold border-2 mt-20  border-sky-700 rounded-2xl">Continue</a>
		</div>
	</div>
</section>

      </IonContent>
    </IonPage>
  );
};

export default CampusSelect;