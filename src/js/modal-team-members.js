import templateOfTeam from '../templates/modal-team-members.hbs';

const ancorRef = document.querySelector('#team-ancor');
const markup = templateOfTeam();

ancorRef.insertAdjacentHTML('beforeend', markup);
