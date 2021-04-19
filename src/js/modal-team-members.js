import templateOfTeam from '../templates/modal-team-members.hbs';

const ancorRef = document.querySelector('#team-ancor');
const markup = templateOfTeam();
// console.log(ancorRef);
ancorRef.insertAdjacentHTML('beforeend', markup);

// class ModalTeam {
//   constructor(ancor) {
//     this.ancor = ancor;
//   }
// }
