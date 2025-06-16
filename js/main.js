let isTransitioning = false;
let currentSection = null;


function showSection(sectionId) {
	if (isTransitioning || currentSection === sectionId) return;

	const header = document.getElementById('header-group');
	const subtitle = document.getElementById('subtitle');
	const nav = document.getElementById('nav');

	if (!nav.classList.contains('moved')) {
		isTransitioning = true;

		// fade out header + subtitle
		header.classList.add('opacity-0');
		subtitle.classList.add('opacity-0');

		setTimeout(() => {
			// smoothly move nav to fixed 30px from top
			nav.style.transform = `translateY(calc(-1 * (100vh / 2 - 40px)))`;
			nav.classList.add('moved');

      document.querySelector('main').classList.remove('z-20');
      document.getElementById('content').classList.add('z-20');

			setTimeout(() => {
				showOnlySection(sectionId);
				isTransitioning = false;
			}, 500);
		}, 500);
	} 
  else 
  {
		isTransitioning = true;
		showOnlySection(sectionId);
		isTransitioning = false;
	}
}

function showOnlySection(id) {
	const allSections = document.querySelectorAll('#content > div');
	allSections.forEach(sec => sec.classList.add('hidden'));

	const target = document.getElementById(id);
	if (target) {
		target.classList.remove('hidden');
		currentSection = id;
	}
}

function goHome() {
	if (isTransitioning) return;

	const header = document.getElementById('header-group');
	const subtitle = document.getElementById('subtitle');
	const nav = document.getElementById('nav');

	isTransitioning = true;

	showOnlySection(null);
	currentSection = null;

	// smoothly move nav back to center
	nav.style.transform = 'translateY(0)';
	nav.classList.remove('moved');

	setTimeout(() => {
		header.classList.remove('opacity-0');
		subtitle.classList.remove('opacity-0');

    document.querySelector('main').classList.add('z-20');
    document.getElementById('content').classList.remove('z-20');


		setTimeout(() => {
			isTransitioning = false;
		}, 500);
	}, 500);
}

function openProject(projectId) {
  document.getElementById('projects-section').classList.add('hidden');
  document.getElementById(projectId).classList.remove('hidden');
}

function closeProject(projectId) {
  document.getElementById(projectId).classList.add('hidden');
  document.getElementById('projects-section').classList.remove('hidden');
}