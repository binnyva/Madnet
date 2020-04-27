import { IonContent, IonPage, IonChip, IonGrid, IonRow, IonCol, IonList, IonItem, IonAvatar, IonLabel, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonTextarea, IonRadioGroup, IonRadio, IonListHeader, IonFab, IonFabButton, IonIcon, IonButton, IonToggle} from '@ionic/react';

import { pencil, close } from 'ionicons/icons';
import React from 'react';
// import ExploreContainer from '../components/ExploreContainer';

import './Profile.css';
import './All.css';

import Title from '../components/Title';
import { authContext } from "../contexts/AuthContext"

const Profile = () => {

	const { user } = React.useContext(authContext)	
	let breakcondition = false;
	const [ disable, setDisable ] = React.useState(true);
	const sexArray = {
		"m": "Male",
		"f": "Female",
		"o": "Not Specified"
	}

	const [ name, setName ] = React.useState(user.name);
	const [ email, setEmail ] = React.useState(user.email);
	const [ phone, setPhone ] = React.useState(user.phone);
	const [ sex, setSex ] = React.useState(user.sex);
	const [ birthday, setBirthday ] = React.useState(user.birthday);
	const [ address, setAddress ] = React.useState(user.address);
	
	const openEdit = () => {
		setDisable(false);	  
	}

	const closeEdit = () => {
		setDisable(true);
	}


	return (
    <IonPage>
        <Title />

        <IonContent className="dark">           
        	<IonGrid>
        		<IonRow>
                	<IonCol size-md="6">
						<IonList>
							<IonCard className="dark no-shadow">								
								<IonCardHeader>
									<IonCardTitle>Personal Details</IonCardTitle>									
								</IonCardHeader>
								<IonCardContent>

									<IonItem className="noHover profileContainer">
										<IonAvatar className="profileImage">
											<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
										</IonAvatar>								
									</IonItem>

									<IonItem className="centerAlign">
										<IonLabel>{user.name}<br/>#{user.id}</IonLabel>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Name</IonLabel>
										<IonInput required type="text" value={user.name} onIonChange={e => setName(e.target.value)} disabled={disable}></IonInput>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Email</IonLabel>
										<IonInput required type="email" value={user.email} disabled={disable} onIonChange={e => setEmail(e.target.value)}></IonInput>
									</IonItem>
									<IonItem>			
										<IonLabel position="stacked">Phone</IonLabel>
										<IonInput required type="text" value={user.phone} disabled={disable} onIonChange={e => setPhone(e.target.value)}></IonInput>
									</IonItem>
									<IonItem className={ !disable ? "hidden": null }>
										<IonLabel position="stacked">Sex</IonLabel>
										<IonInput required type="text" value={sexArray[user.sex]} disabled></IonInput>
									</IonItem>
									<IonRadioGroup className={ disable ? "hidden": null } value={user.sex} onIonChange={e => setSex(e.target.value)}>
										<IonListHeader>
											<IonLabel>Sex</IonLabel>
										</IonListHeader>

										<IonItem>
										<IonLabel>Male</IonLabel>
										<IonRadio mode="ios" name="sex" slot="start" value="m" />
										</IonItem>

										<IonItem>
										<IonLabel>Female</IonLabel>
										<IonRadio mode="ios" name="sex" slot="start" value="f" />
										</IonItem>

										<IonItem>
										<IonLabel>Other</IonLabel>
										<IonRadio mode="ios" name="sex" slot="start" value="o"/>
										</IonItem>
									</IonRadioGroup>
									<IonItem>	
										<IonLabel position="stacked">Birthday</IonLabel>
										<IonInput required type="date" value={user.birthday} disabled={disable} onIonChange={e => setBirthday(e.target.value)}></IonInput>
									</IonItem>
									<IonItem>			
										<IonLabel position="stacked">Address</IonLabel>
										<IonTextarea required value={user.address} disabled={disable} onIonChange={e => setAddress(e.target.value)}></IonTextarea>
									</IonItem>
									<IonItem className={ disable? "hidden": null}>
										<IonButton expand="full" size="default" color="primary" type="submit">Save</IonButton>
									</IonItem>														
								</IonCardContent>
							</IonCard>							
						</IonList>
					</IonCol>
					<IonCol size-md="6">						
						<IonList>
							<IonCard className="light no-shadow">								
								<IonCardHeader>
									<IonCardTitle>MAD Profile Details</IonCardTitle>									
								</IonCardHeader>
								<IonCardContent>	
									<IonItem>
										<IonLabel position="stacked">Volunteer ID </IonLabel>
										<IonInput required type="text" value={user.id} disabled></IonInput>
									</IonItem>						
									<IonItem>											
										<IonLabel position="stacked">Roles: </IonLabel>								
										<ul className="roleList">
										{								
										user.groups.map((roles, index) => {									
											if(!breakcondition){
												if(index < 3){
													return (
														<li key={index}><IonChip className="roles">{roles.name}</IonChip></li>
													)
												}
												else{	
													breakcondition = true;
													return (
														<li key={index}><IonChip className="roles">+ {user.groups.length - index} More</IonChip></li>
													)										
												}											
											}
										})
										}	
										</ul>						
									</IonItem>							
									{ (user.mad_email) ? (
										<IonItem>
											<IonLabel position="stacked">Official Email: </IonLabel>
											<IonInput required type="text" value={user.mad_email} disabled></IonInput>
										</IonItem>
									): null }	
									<IonItem>
										<IonLabel position="stacked">MAD City: </IonLabel>
										<IonInput required type="text" value={user.city} disabled></IonInput>
									</IonItem>
									<IonItem>
										<IonLabel position="stacked">Joined On: </IonLabel>
										<IonInput required type="date" value={new Date(user.joined_on).toISOString().slice(0,10)} disabled></IonInput>
									</IonItem>						
								</IonCardContent>
							</IonCard>
							<IonCard className="dark no-shadow">								
								<IonCardHeader>
									<IonCardTitle>Profile Settings</IonCardTitle>									
								</IonCardHeader>
								<IonCardContent>
									<IonItem>
										<IonLabel>Notifcation</IonLabel>
										<IonToggle color="primary" />
									</IonItem>
								</IonCardContent>
							</IonCard>
						</IonList>																
					</IonCol>
				</IonRow>              
            </IonGrid>
			<IonFab onClick={openEdit} vertical="bottom" horizontal="end" slot="fixed" className={ !disable? "hidden": null }>
				<IonFabButton><IonIcon icon={pencil}/></IonFabButton>
			</IonFab>
			<IonFab onClick={closeEdit} vertical="bottom" horizontal="end" slot="fixed" className={ disable? "hidden": null }>
				<IonFabButton><IonIcon icon={close}/></IonFabButton>
			</IonFab>
		</IonContent>
	</IonPage>
	);
};

export default Profile;