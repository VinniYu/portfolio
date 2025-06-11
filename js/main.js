let isTransitioning = false;

function showSection() 
{
	if (isTransitioning) return;

	const header = document.getElementById('header-group');
	const subtitle = document.getElementById('subtitle');
	const nav = document.getElementById('nav');

	if (!nav.classList.contains('moved')) {
		isTransitioning = true;

		// Fade out header + subtitle
		header.classList.add('opacity-0');
		subtitle.classList.add('opacity-0');

		setTimeout(() => {
			const offset = nav.getBoundingClientRect().top - 45;
			nav.style.transform = `translateY(-${offset}px)`;
			nav.classList.add('moved');

			// Unlock after nav finishes moving
			setTimeout(() => {
				isTransitioning = false;
			}, 500); // match nav movement duration
		}, 500); // match fade-out duration
	}
}

function goHome() 
{
	if (isTransitioning) return;
  
	const header = document.getElementById('header-group');
	const subtitle = document.getElementById('subtitle');
	const nav = document.getElementById('nav');

	isTransitioning = true;

	nav.style.transform = 'translateY(0)';
	nav.classList.remove('moved');

	setTimeout(() => {
		header.classList.remove('opacity-0');
		subtitle.classList.remove('opacity-0');

		// Unlock after header fades in
		setTimeout(() => {
			isTransitioning = false;
		}, 500); // match fade-in duration
	}, 500); // match nav slide duration
}
